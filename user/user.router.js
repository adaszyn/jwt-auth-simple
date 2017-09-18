const router = require('express').Router()
const db = require('../db')
const validateToken = require('../auth/jwt.middleware')

router.get('/', validateToken, (req, res) => {
    // tokenDebug('decoded token', req.user)
    if (!req.user) {
        return res.send('No token provided')
    }
    db('users')
        .select(['username', 'id'])
        .where('id', req.user.id)
        .limit(1)
        .then((users) => res.send(users))
        .catch((err) => res.send(err))
})

router.post('/', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db('users')
        .insert({
            username,
            password
        })
        .then(([id]) => {
            return db('users').where('id', id).limit(1)
        })
        .then(([user]) => res.status(200).send(user))
        .catch(err => res.status(500).send(err))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    db('users')
        .where('id', id)
        .limit(1)
        .then(users => res.send(users))
        .catch(() => res.status(500).send('internal error'))
})

module.exports = router