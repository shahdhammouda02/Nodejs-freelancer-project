//const Employee = require('../models/Employee')

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require('../models/User')
// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const token = req.headers.authorization 

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id);
    if(!user)  {
        
        return next(new ErrorHandler('user not found!.', 401))

    }
    req.user = user   
    next()
})
