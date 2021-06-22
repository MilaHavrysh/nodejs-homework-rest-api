const Users = require("../model/users-model");
const { HttpCode } = require("../helpers/constants");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UploadAvatar = require("../services/upload-avatars");
const EmailService = require("../services/email");
const { CreateSenderSendgrid } = require("../services/sender");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;

const regitrUserContr = async (req, res, next) => {
  try {
    const user = await Users.findUserByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        Status: `${HttpCode.CONFLICT} Conflict`,
        message: "Email in use",
      });
    }
    const newUser = await Users.createUser(req.body);
    const { email, subscription, avatarURL, verificationToken } = newUser;
    try {
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new CreateSenderSendgrid()
      );
      await emailService.sendVerifyPassportEmail(verificationToken, email);
    } catch (e) {
      console.log(e.message);
    }
    return res.status(HttpCode.CREATED).json({
      status: `${HttpCode.CREATED} Created`,
      code: HttpCode.CREATED,
      data: {
        email,
        subscription,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUserContr = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findUserByEmail(email);
    const isValidPassword = await user?.validPassword(password);
    if (!user || !isValidPassword || !user.verify) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        Status: `${HttpCode.UNAUTHORIZED} Unauthorized`,
        message: "Email or password is wrong",
      });
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "24h" });
    await Users.updateToken(user.id, token);
    return res.status(HttpCode.OK).json({
      status: `${HttpCode.OK} OK`,
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutUserContr = async (req, res, next) => {
  await Users.updateToken(req.user.id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const currentUserContr = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      status: "success",
      code: 200,
      data: {
        message: `Current user: ${email}, subscription:${subscription}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

const avatarUserContr = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadAvatar(AVATARS_OF_USERS);
    const avatarUrl = await uploads.saveAvatarToStatic({
      idUser: id,
      pathFile: req.file.path,
      name: req.file.filename,
      oldFile: req.user.avatarURL,
    });
    await Users.updateAvatar(id, avatarUrl);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { avatarUrl },
    });
  } catch (error) {
    next(error);
  }
  console.table(typeof req.user.avatar);
};

const verifyContr = async (req, res, next) => {
  try {
    const user = await Users.getByVerifyToken(req.params.verificationToken);
    console.log(user);
    if (user) {
      await Users.updateVerifyToken(user.id, true, null);
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Verification successful",
      });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "User not found" });
  } catch (error) {
    next(error);
  }
};

const repeatEmailVerifyContr = async (req, res, next) => {
  const user = await Users.findUserByEmail(req.body.email);
  if (user) {
    const { email, verificationToken, verify } = user;
    if (!verify) {
      try {
        const emailService = new EmailService(
          process.env.NODE_ENV,
          new CreateSenderSendgrid()
        );

        await emailService.sendVerifyPassportEmail(verificationToken, email);
        return res.status(HttpCode.OK).json({
          status: "success",
          code: HttpCode.OK,
          message: "Verification email sent",
        });
      } catch (e) {
        console.log(e.message);
        return next(e);
      }
    }
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Verification has already been passed",
    });
  }
  return res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "missing required field email",
  });
};

module.exports = {
  regitrUserContr,
  loginUserContr,
  logoutUserContr,
  currentUserContr,
  avatarUserContr,
  verifyContr,
  repeatEmailVerifyContr,
};
