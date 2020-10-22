const database = require('../db_models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const middleIsARegister = async (req, res, next) => {
    try {
        const [login, password] = [req.body.userLogin, req.body.userPassword]

        const conn = await database.createConnection()

        const result = await database.isALogin(login)

        if (result) {
            res.json({
                status: false,
                errorMsg: 'Login unavaiable.'
            })
        } else {
            res.locals.userData = {
                userLogin: login,
                userPassword: password
            }

            return next()
        }

        database.closeConnection(conn)
    } catch (error) {
        res.json({
            status: false,
            errorMsg: error
        })
    }
}


const middleCreateUser = async (req, res, next) => {
    try {
        const userData = res.locals.userData
        const [login, password] = [userData.userLogin, userData.userPassword]

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.json({
                    status: false,
                    errorMsg: err
                })
            }

            database.createUser(login, hash).then(result => {
                if (result.status === true) {

                    const token = jwt.sign({
                            userId: result.userInfo.userId,
                            userLogin: result.userInfo.userLogin
                        },
                        process.env.JWT_KEY, {
                            expiresIn: "5m"
                        })

                    res.locals.data = {
                        status: true,
                        token: token
                    }

                    next()

                } else {
                    res.status(200).json({
                        status: false
                    })
                }
            })
        })

    } catch (error) {
        res.json({
            status: false,
            errorMsg: error
        })
    }
}

module.exports = {
    middleIsARegister,
    middleCreateUser
}