const users = require('../db/usersDB')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

function loginUser(req, res)  {
    const {
        email,
        password
    } = req.body;

    // Find the user by email
    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }

    // Compare the password with the hashed password
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }

    // Generate a JWT token
    const token = jwt.sign({
        email
    }, secretKey, {
        expiresIn: '1h'
    });

    // Send the token as a response to the client
    res.json({
        token
    });
}

module.exports = loginUser