const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const {jwtSecret, tokens} = require('../../config/config').jwt;

const generateAccesToken = email => {
    const payload = {
        email
    };
    return jwt.sign(payload, jwtSecret)
};
const getTokenPayload = token => {
    return new Promise ((rs,rj)=>{
        jwt.verify(token, jwtSecret, (err,data)=>{
            if (err) return rs(err);
            return rs(data)
        });
    })
};

module.exports = {generateAccesToken, getTokenPayload};