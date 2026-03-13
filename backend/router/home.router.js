const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { UserProfile } = require("../controller/auth.controller");

const router = express.Router();

router.get("/profile", authMiddleware, UserProfile);

module.exports = router;