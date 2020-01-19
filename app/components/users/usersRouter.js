const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {signin, signup} = require('./usersController');
const {getTokenPayload} = require('../../servises/token');
const {getUser} = require('./usersServis');

router.get('/', async (req, res, next) => {
    const token = req.headers.authorization;
    const payload = await getTokenPayload(token);
    const {err, user} = await getUser(payload);

    if (user){
        delete user.password;
        return res.success(user);
    }
    res.forbidden('Token invalid');
});

router.post('/auth', bodyParser.json({strict: false,}), async (req, res, next) => {
    const {err, user} = await signin(req.body);
    if (err) return res.unauthorized(err);

    res.success(user);
});
router.post('/signup', bodyParser.json({strict: false,}), async (req, res, next) => {
    const {err, user} = await signup(req.body);
    if (err) return res.unauthorized(err);

    res.success(user);
});

module.exports = router;
