import express from 'express'
import dotenv from 'dotenv'
import homeApi from './routes/homeApi'
import morgan from 'morgan'
import Connect from './Connect'
import Signup from './routes/Signup'
import login from './routes/login'
import admin from './routes/products'
import notAdmin from './routes/user'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'
const cors = require('cors')

dotenv.config()

const uploadDir = path.join(__dirname, 'image/');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

const port = process.env.PORT
const app = express()
app.use('/image', express.static(uploadDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


app.use(morgan('dev'))
app.use(homeApi)
app.use('/api', Signup)
app.use('/api', login)
app.use('/api', admin)
app.use('/api', notAdmin)

app.listen(port, () => {
    console.log('http://localhost:4000/')
})

Connect()