require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

// Middleware to verify JWT
const verifyPref = (req, res, next) => {

    const { q } = req.body;

    if(!q) {

        next(res.status(400).json({message: "No Preferences"}))
    }

    next()
};

module.exports = verifyPref