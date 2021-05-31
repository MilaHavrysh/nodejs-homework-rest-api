const express = require("express");
const router = express.Router();
const guard = require("../../../helpers/guard");
const {
  regitrUserContr,
  loginUserContr,
  logoutUserContr,
  currentUserContr,
} = require("../../../controllers/users-controllers");

router.post("/signup", regitrUserContr);
router.post("/login", loginUserContr);
router.post("/logout", guard, logoutUserContr);
router.get("/current", guard, currentUserContr);

module.exports = router;
