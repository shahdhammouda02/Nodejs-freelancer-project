const express = require('express');
var cors=require('cors');
require('dotenv').config({ path: './configs/config.env' })
const path = require('path')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors')
const ErrorHandler = require('./utils/errorHandler');
const {isAuthenticatedUser} = require('./middlewares/auth')
const product = require('./components/project/route')
const authRoute = require('./components/auth/route')
const userRoute = require('./components/user/route')


const app = express();
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use('/' , authRoute)
app.use(isAuthenticatedUser)
app.use('/' , userRoute)
app.use('/', product)
app.get((req, res, next) => {
    next(new ErrorHandler('dfdf', 404))
})

// Middleware to handle errors
app.use(errorMiddleware);
app.use(cors({
    origin: ['http://example.com', 'http://example1.com', 'http://example2.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

module.exports = app

