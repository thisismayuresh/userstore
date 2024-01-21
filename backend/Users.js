const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  dob: { type: Date },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
