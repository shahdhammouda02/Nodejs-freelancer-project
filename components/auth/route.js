const router = require('express').Router()
const { postLoginPage , postRegisterPage , updateProfile} = require('./auth')

router.route('/login').post(postLoginPage)
router.route('/register').post(postRegisterPage)
router.route('/update').put(updateProfile)

module.exports = router