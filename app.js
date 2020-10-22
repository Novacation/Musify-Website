const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const auth = require('./routes/authentication')
const musify = require('./routes/musify')


//configs
app.use(express.static(path.join(__dirname, '/public')))

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

//global middlewares
app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*")

    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", "GET, POST")
    app.use(cors())
    next()
})

//routes
app.use('/Musify', musify)

app.use('/Musify/user-authentication', auth)

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log('Server running.');
})