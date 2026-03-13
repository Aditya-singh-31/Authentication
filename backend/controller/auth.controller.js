const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");

const UserRegister = asyncHandler(async(req, res) => {
    let {name, email, password} = req.body;

    if (!name || !email || !password) {
        throw new CustomError('All fields are required', 400);
    }

    const isExisted = await userModel.findOne({ email });

    if (isExisted) {
        throw new CustomError("User already exists", 409);
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        name,
        email,
        password: hashedPass,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({
        message: "User registered",
        success: true,
        user: newUser,
    });
    
});


const UserLogin = asyncHandler(async(req, res) => {
    let {email, password} = req.body;

    if (!email || !password) {
        throw new CustomError("All fields are required", 400);
    }

    const existedUser = await userModel.findOne({ email });

    if (!existedUser) {
        throw new CustomError("User not found", 404);
    }

    const comparePass = await bcrypt.compare(password, existedUser.password);

    if (!comparePass) {
        throw new CustomError("Incorrect email or password", 401);
    }

    const token = jwt.sign({ id: existedUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
        message: "User logged in successfully",
        success: true,
        user: existedUser,
    });
});

const VerifyEmail = asyncHandler(async(req, res) => {
    const { Token } = req.params;

    const decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.id);

    if (!user) {
        throw new CustomError("User not found", 404);
    }

    if (user.isVerified) {
        return res.status(200).json({
            message: "Email already verified",
            success: true,
        });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({
        message: "Email verified",
        success: true,
    });
});


const UserProfile = asyncHandler(async(req, res) => {
    const userID = req.user._id;

    const user = await userModel.findById(userID).select("-password");

    if (!user) {
        throw new CustomError("User not found", 404);
    }

    res.status(200).json({
        success: true,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            verified: user.isVerified,
        },
    });
});


module.exports = {UserRegister, UserLogin, VerifyEmail, UserProfile};