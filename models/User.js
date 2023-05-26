const mongoose = require('mongoose')
const { Schema } = mongoose;
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    firstname: {
        type: String,
        trim: true
    },
    secondname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    hourCost: {
        type: Number,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    aboutMe: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}
module.exports = mongoose.model('User', userSchema)