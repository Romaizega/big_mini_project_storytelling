const bcrypt = require('bcrypt');
const userModel = require('../models/users_model');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Checking empty fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Checking username length
  if (username.length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters long.' });
  }

  // Checking email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // Checkin strong password
  const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long and include at least one letter and one number.',
    });
  }

  try {
     // Checking uniqe user
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const existingUsername = await userModel.getUserByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already in use.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user on DB
    const newUser = await userModel.createUser(username, email, hashedPassword);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register };
