require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

// Middleware to verify JWT
const verifyPref = (req, res, next) => {

    const { q } = req.body;

    if(!q) {

        next('Preferences not verified')
    }

    next()
};

module.exports = verifyPref