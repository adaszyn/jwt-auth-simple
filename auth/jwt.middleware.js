const jwt = require('jsonwebtoken')
const JWT_TOKEN = process.env.JWT_TOKEN
const TOKEN_EXPIRE_TIME = parseInt(process.env.TOKEN_EXPIRE_TIME)

function validateToken(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(401).send('Token not provided')
    }
    const decoded = jwt.verify(token, JWT_TOKEN, {
        maxAge: TOKEN_EXPIRE_TIME
    }, function (err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).send('Token expired')
            }
            return res.status(500).send('Server error')
        }
        if (decoded) {
            req.user = decoded
        } else {
            return res.send('invalid token')
        }
        next()
    })
}

module.exports = validateToken