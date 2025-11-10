const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ message:'User not found' });
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if(!isMatch) return res.status(400).json({ message:'Invalid credentials' });

  const token = jwt.sign({ id:user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
  res.json({ accessToken: token, user:{ id:user._id, name:user.name, email:user.email, role:user.role } });
}
