const router = require('express').Router()
const User = require('../../models/User')
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');
const sendToken = require('../../utils/jwtToken');
const mongoose = require("mongoose");
const _ = require("lodash");



// Login User 
exports.postLoginPage = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('الرجاء إدخال البريد الإلكتروني وكلمة المرور.', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email , password } , {password : 0})

    if (!user) {
        return next(new ErrorHandler('خطأ في البريد الإلكتروني أو كلمة المرور.', 400));
    }
    sendToken(user, 200, res)
})

//register user 
exports.postRegisterPage = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email })
    if (existUser) {
        return next(new ErrorHandler('المستخدم موجود مسبقاً.', 400));
    }
    const user = await User.create({
        name,
        email,
        password
    })

    delete user.password

    sendToken(user, 200, res)
})






exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    const userId = req.body.userId;

    if (!mongoose.isValidObjectId(userId)) return next(new ErrorHandler("", 404));
    let user = await User.findById(userId);

    let data = req.body;
    _.assign(user, data);
    await user.save();
    res.send(user);
} 
)   

