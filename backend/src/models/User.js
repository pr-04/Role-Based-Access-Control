const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: { type: String, enum: ['Admin','Editor','Viewer'], default: 'Viewer' }
});

module.exports = mongoose.model('User', UserSchema);
