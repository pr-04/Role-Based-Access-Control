const jwt = require('jsonwebtoken');

function authenticate(req,res,next){
  const auth = req.headers.authorization;
  if(!auth || !auth.startsWith('Bearer ')){
    return res.status(401).json({ message: 'Missing token' });
  }
  const token = auth.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    next();
  }catch(err){
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { authenticate };
