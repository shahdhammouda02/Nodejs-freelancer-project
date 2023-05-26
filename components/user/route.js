const router = require('express').Router()
const {  updateProfile } = require('./controller')

router.route('/updateProfile').post(updateProfile)


module.exports = router