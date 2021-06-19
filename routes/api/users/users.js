const express = require("express");
const router = express.Router();
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");
const {
  regitrUserContr,
  loginUserContr,
  logoutUserContr,
  currentUserContr,
  avatarUserContr,
  verifyContr,
  repeatEmailVerifyContr,
} = require("../../../controllers/users-controllers");

router.get("/verify/:verificationToken", verifyContr);
router.post("/verify", repeatEmailVerifyContr);
router.post("/signup", regitrUserContr);
router.post("/login", loginUserContr);
router.post("/logout", guard, logoutUserContr);
router.get("/current", guard, currentUserContr);
router.patch("/avatars", [guard, upload.single("avatarURL")], avatarUserContr);

module.exports = router;
