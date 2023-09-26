const express = require('express')

const router = express.Router()

const {userSignupValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')

router.post('/signup', userSignupValidator,runValidation, (req, res) => {
    const {name, email, password} = req.body
    res.send('signup')
})



module.exports = router