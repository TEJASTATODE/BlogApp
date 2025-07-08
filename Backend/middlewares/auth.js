const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const { verifyToken } = require('../utils/jwt');

async function requireAuth(req, res, next) {
  const token = req.cookies.token|| req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: "Please register and login" });
  }

  try {
    const userPayload = verifyToken(token);
    if (!userPayload) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Fetch user from DB to confirm validity and get full user details
    const user = await User.findById(userPayload._id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
   console.log("Token received:", token);
   console.log("Decoded payload:", userPayload);
   console.log("JWT_SECRET:", process.env.JWT_SECRET);
}


module.exports = {
  requireAuth,
};