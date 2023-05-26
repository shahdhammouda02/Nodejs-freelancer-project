const ErrorHandler = require('../utils/errorHandler');
const mongoMsgToArr = (err) => {
    return Object.values(err.errors).map(val => val.message)
}
const loger = require('../utils/loger')


module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;

    let error = { ...err }

    error.message = err.message;

    // Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`
        error = new ErrorHandler(message, 400)
    }

    // Handling Mongoose Validation Error
    if (err.name === 'ValidationError') {
        error.message = mongoMsgToArr(error)
    }
    /*
            // Handling Mongoose duplicate key errors
            if (err.code === 11000) {
                const message = `Duplicate ${Object.keys(err.keyValue)} entered`
                error = new ErrorHandler(message, 400)
            }
    
            // Handling wrong JWT error
            if (err.name === 'JsonWebTokenError') {
                const message = 'JSON Web Token is invalid. Try Again!!!'
                error = new ErrorHandler(message, 400)
            }
    
            // Handling Expired JWT error
            if (err.name === 'TokenExpiredError') {
                const message = 'JSON Web Token is expired. Try Again!!!'
                error = new ErrorHandler(message, 400)
            }
    */
    console.log(error);

    loger.info(`${req.url} : ${JSON.stringify( error )}`)

    return res.status(error.statusCode || 500).json({
        success: false,
        statusCode: error.statusCode || 500,
        message: error.message || 'Internal Server Error'
    })





}
