const User = require('../models/User');

exports.listUsers = async (req,res)=>{
  const users = await User.find().select('-passwordHash');
  res.json(users);
}

exports.updateUserRole = async (req,res)=>{
  const user = await User.findById(req.params.id);
  if(!user) return res.status(404).json({ message:'Not found' });
  user.role = req.body.role || user.role;
  await user.save();
  res.json(user);
}
