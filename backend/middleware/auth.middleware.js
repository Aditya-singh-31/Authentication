const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const  asyncHandler  = require("../utils/asyncHandler");
const  CustomError  = require("../utils/CustomError");

const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new CustomError("Authorization header missing", 401);
    }

    // expect "Bearer <token>"
    const parts = authHeader.split(" ");
    const token = parts[1];

    if (!token) {
        throw new CustomError("Token is missing", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const authUser = await userModel.findById(decoded.id).select("-password");

    if (!authUser) {
        throw new CustomError("User not found", 404);
    }

    req.user = authUser;
    next();
});


module.exports = authMiddleware;