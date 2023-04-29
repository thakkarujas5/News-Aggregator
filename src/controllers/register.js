const Ajv = require('ajv');
const ajv = new Ajv({
    allErrors: true
});
const addFormats = require('ajv-formats');
addFormats(ajv);
const user = require('../schema/user');
const validateUser = ajv.compile(user);
const bcrypt = require('bcrypt');
const users = require('../db/usersDB')
function registerUser (req, res)  {

    const data = req.body;

    // Validate the user registration data
    const valid = validateUser(data);

    if (!valid) {
        const errors = validate.errors.map((error) => {
            return {
                field: error.dataPath,
                message: error.message
            };
        });
        return res.status(400).json({
            errors
        });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(data.password, saltRounds);

    // Save user data to database
    // ...

    // Save user data to database
    const user = {
        name: data.name,
        email: data.email,
        password: hashedPassword,
    };

    users.push(user)

    // Send response to client
    res.json({
        message: 'User registered successfully'
    });

}

module.exports = registerUser;