const Users = require("../model/users-model");
const { HttpCode } = require("../helpers/constants");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

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
    const { email, subscription } = newUser;
    return res.status(HttpCode.CREATED).json({
      status: `${HttpCode.CREATED} Created`,
      code: HttpCode.CREATED,
      data: {
        email,
        subscription,
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
    if (!user || !isValidPassword) {
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

module.exports = {
  regitrUserContr,
  loginUserContr,
  logoutUserContr,
  currentUserContr,
};
