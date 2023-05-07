require('dotenv').config();
const express = require('express');
const router = express.Router();
const Ajv = require('ajv');
const ajv = new Ajv({
    allErrors: true
});
const addFormats = require('ajv-formats');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
addFormats(ajv);

const user = require('../schema/user');
const users = require('../db/usersDB');
const preferences = require('../db/preferencesDB')
const verifyJWT = require('../middlewares/jwt-verify');
const verifyPref = require('../middlewares/preferences-verify');
const registerUser = require('../controllers/register')
const loginUser = require('../controllers/login')
const updatePreferences = require('../controllers/updatePreferences')
const getPreferences = require('../controllers/getPreferences');
const deletePreference = require('../controllers/deletePreference')
const getNews = require('../controllers/news')
const heartbeat = require('../controllers/heartbeat')
const {
    default: axios
} = require('axios');
let cache = require('../db/cache')

// Compile the schema with AJV
const validateUser = ajv.compile(user);

// Secret key for JWT
const secretKey = process.env.JWT_SECRET;

router.get('/', (req, res) => {
    res.send('Hello, world!');
});

router.post('/register', registerUser)

// POST route for user login
router.post('/login', loginUser);

router.put('/preferences',verifyJWT, verifyPref, updatePreferences);

router.get('/preferences',verifyJWT, getPreferences)

router.delete('/preferences/:topic', verifyJWT, deletePreference);

router.get('/news', verifyJWT, getNews)



setInterval(heartbeat, 300000)

module.exports = router;