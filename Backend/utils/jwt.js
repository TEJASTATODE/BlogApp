const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || "pussycat"; // Use a strong secret in production!

// Generate a JWT for a user object
function generateToken(user) {
  return jwt.sign(
    { _id: user._id, email: user.email }, // payload
    SECRET,
    { expiresIn: '1h' }
  );
}

// Verify a JWT and return the payload, or null if invalid
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };