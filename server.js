const express = require('express')
const app = express()
const db = require('./db')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const tokenDebug = require('debug')('APP:token')
const PORT = process.env.PORT || 8080
const userRouter = require('./user/user.router')
const authRouter = require('./auth/auth.router')

const JWT_TOKEN = process.env.JWT_TOKEN
const TOKEN_EXPIRE_TIME = parseInt(process.env.TOKEN_EXPIRE_TIME)

if (!JWT_TOKEN || !TOKEN_EXPIRE_TIME) {
    console.error('JWT_TOKEN or TOKEN_EXPIRE_TIME not in env.')
    process.exit(1)
}

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/user', userRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log('listening on port 8080')
})