const database = require('../db_models/users')
const jwt = require('jsonwebtoken')

const middleIsALogin = async (req, res, next) => {
    try {
        const [login, password] = [req.body.txtUsername, req.body.txtPassword]

        const conn = await database.createConnection()

        const result = await database.isALogin(login)


        if (result) {
            const id = await database.getUserId(login)

            res.locals.userData = {
                userLogin: login,
                userPassword: password,
                userId: id
            }

            database.closeConnection(conn)

            return next()
        } else {
            database.closeConnection(conn)

            res.json({
                status: result,
                errorMsg: 'Invalid login.'
            })
        }
    } catch (error) {
        res.json({
            status: false,
            errorMsg: 'Error with data validation, try again.'
        })
    }
}


const middleIsAnAccount = async (req, res, next) => {
    try {
        const conn = await database.createConnection()
        const userData = res.locals.userData

        const result = await database.isARegister(userData.userLogin, userData.userPassword)

        database.closeConnection(conn)

        if (result.status) {
            res.locals.result = result
            return next()
        } else {

            res.json({
                status: result.status,
                errorMsg: result.errorMsg
            })
        }

    } catch (error) {
        res.json({
            status: false,
            errorMsg: 'Error with data validation, try again.'
        })
    }
}


const signToken = async (req, res, next) => {
    try {
        const userData = res.locals.userData

        const token = jwt.sign({
                clientId: userData.userId._id,
                clientLogin: userData.userLogin
            },
            process.env.JWT_KEY, {
                expiresIn: '60m'
            })

        res.locals.userInfo = {
            status: true,
            token: token
        }

        next()
    } catch (error) {
        res.json({
            status: false,
            errorMsg: 'Error with data validation, try again.'
        })
    }
}


module.exports = {
    middleIsALogin,
    middleIsAnAccount,
    signToken
}