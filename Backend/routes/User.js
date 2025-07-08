const express = require("express");
const { generateToken } = require("../utils/jwt");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Register (API)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password });
    await user.save();
    res.status(201).json({ 
      message: "User registered successfully", 
      user: { _id: user._id, email: user.email } // Do not send password!
    });
  } catch (error) {
    res.status(400).json({ error: "Error registering user" });
  }
});

// Login (API)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email});
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "No hashed password found" });
    }

    const token = generateToken(user);
    res.status(200).json({ 
      message: "Login successful", 
      token, 
      user: { _id: user._id, email: user.email } // Do not send password!
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = router;