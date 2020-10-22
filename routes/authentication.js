const express = require('express')
const router = express.Router()

//middlewares
const {
    middleIsALogin,
    middleIsAnAccount,
    signToken
} = require('../public/middlewares/login-middlewares')

const {
    middleIsARegister,
    middleCreateUser
} = require('../public/middlewares/register-middlewares')



router.post('/login', middleIsALogin, middleIsAnAccount, signToken, async (req, res) => {

    const status = res.locals.userInfo.status
    const token = res.locals.userInfo.token

    res.json({
        status: status,
        token: token
    })
})


router.post('/register', middleIsARegister, middleCreateUser, async (req, res) => {

    const status = res.locals.data.status
    const token = res.locals.data.token

    res.json({
        status: status,
        token: token
    })
})


/* res.render("index", {
    name: name,
    language: lang,
    error: error,
    products: products
}) */


module.exports = router