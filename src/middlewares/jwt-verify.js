require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

// Middleware to verify JWT
const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
  
    const [bearer, token] = authHeader.split(' ');
  
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid authorization header' });
    }
  
    try {
      const decodedToken = jwt.verify(token, secretKey);
      req.user = { email: decodedToken.email };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };

  module.exports = verifyJwt