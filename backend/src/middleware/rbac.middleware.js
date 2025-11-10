function can(permission){
  return (req,res,next)=>{
    const role = req.user.role;
    if(role === 'Admin') return next(); // Admin has all permissions
    if(role === 'Editor' && permission.startsWith('posts:')) return next(); // Editor can edit posts
    return res.status(403).json({ message:'Forbidden' });
  }
}

module.exports = { can };
