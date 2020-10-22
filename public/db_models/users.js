const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const dbURI = require('../../config/db')

/* 
    '0': 'disconnected',
    '1': 'connected',
    '2': 'connecting',
    '3': 'disconnecting',
    '99': 'uninitialized',
 */

const userSchema = mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})


mongoose.model('users', userSchema)




const createConnection = async () => {
    try {
        let db = await mongoose.connect(dbURI.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return db
    } catch (error) {
        console.log(error)
        return false
    }
}


const isConnected = async (db) => {
    try {
        if (db.connection.readyState == 1) {
            return true
        } else if (db.connection.readyState == 0) {
            return false
        }
    } catch (error) {
        console.log('The connection, It failed.')
        return false
    }
}


const createUser = async (login, password) => {
    try {
        const user = mongoose.model('users')

        await new user({
            login: login,
            password: password
        }).save()

        const id = await getUserId(login)

        return {
            status: true,
            userInfo: {
                userId: id,
                userLogin: login
            }
        }
    } catch (error) {
        console.log(error)

        return {
            status: false
        }
    }
}


const closeConnection = db => {
    try {
        db.connection.close()
        return true
    } catch (error) {
        return false
    }
}


const getUserId = async (login) => {
    try {
        const userModel = mongoose.model('users')

        return await userModel.findOne({
            login: login
        }, '_id').exec()
    } catch (error) {
        console.log(error)
    }
}


const isALogin = async (login) => {
    try {
        const userModel = mongoose.model('users')

        return await userModel.exists({
            login: login
        })
    } catch (error) {
        return false
    }
}


const isARegister = async (login, password) => {
    try {
        const userModel = mongoose.model('users')

        const encryptedPassword = await userModel.findOne({
            login: login
        }, 'password').exec()

        const compareResponse = await bcrypt.compare(password, encryptedPassword.password)

        if (compareResponse) {
            return {
                status: true
            }
        } else {
            return {
                status: false,
                errorMsg: "Login and Password doesn't match."
            }
        }

    } catch (error) {
        return {
            status: false,
            errorMsg: error
        }
    }
}

/* createConnection().then(conn => {
    isALogin('draemgirl').then(result => {
        console.log(result)
    }).finally(()=>{
        closeConnection(conn)   
    })
}) */

module.exports = {
    createConnection,
    isConnected,
    createUser,
    closeConnection,
    isALogin,
    isARegister,
    getUserId,
    mongoose
}