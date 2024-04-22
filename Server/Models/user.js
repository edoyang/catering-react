const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  address: String,
  city: String
});

module.exports = mongoose.model('User', userSchema);