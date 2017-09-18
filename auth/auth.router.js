const jwt = require('jsonwebtoken')
const router = require('express').Router()
const db = require('../db')
const JWT_TOKEN = process.env.JWT_TOKEN
const TOKEN_EXPIRE_TIME = parseInt(process.env.TOKEN_EXPIRE_TIME)

router.post('/token', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db('users')
        .select(['password', 'username', 'id'])
        .where('username', username)
        .limit(1)
        .then(([user]) => {
            if (user.password === password) res.send(generateToken(user))
            else res.send('password not matching')
        })
        .catch(err => res.send(err))
})

function generateToken(user) {
    const token = jwt.sign(user, JWT_TOKEN, {
        expiresIn: TOKEN_EXPIRE_TIME
    })
    console.log("generateToken", token)
    return token
}

module.exports = router
