require('dotenv').config()

if (process.env.NODE_ENV == "production") {
    module.exports={mongoURI: process.env.DB_Heroku_URI}
} else {
    module.exports={mongoURI: process.env.DB_Local_URI}
}