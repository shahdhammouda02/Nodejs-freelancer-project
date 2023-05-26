const User = require('../../models/User')
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');
const mongoose = require("mongoose");
const _ = require("lodash");


exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    const user = req.user;

    let userDb = await User.findById(user._id);
    let data =req.body;
    if (data.oldPassword && data.newPassword) {

    if (userDb.password == data.oldPassword) 
    { 
    
    userDb.password = data.newPassword
    }
    
    }
    _.assign(userDb, data);
    await userDb.save();
    res.send(userDb);
} 
)   

