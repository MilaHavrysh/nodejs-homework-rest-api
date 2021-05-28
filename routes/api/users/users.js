const express = require("express");
const router = express.Router();
const {
  regitrUserContr, 
  loginUserContr, 
  logoutUserContr,     
  }=require('../../../controllers/users-controllers')
  
  router.post("/signup", regitrUserContr);
  router.post("/login",  loginUserContr);
  router.post("/logout",  logoutUserContr);


  module.exports = router;