const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    ...req.body,
    password: hashedPassword
  });
  await newUser.save();
  res.status(201).json({ message: 'User registered' });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'secret', 
      { expiresIn: '1h' }
    );
    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id, 
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}

module.exports = { register, login };