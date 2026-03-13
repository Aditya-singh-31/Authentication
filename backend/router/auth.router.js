const express = require("express");
const {UserRegister, UserLogin, VerifyEmail} = require("../controller/auth.controller");

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/verify/:Token", VerifyEmail);

module.exports = router;