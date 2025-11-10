const jwt = require('jsonwebtoken');
const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES = '7d';

function signAccess(payload, secret){
  return jwt.sign(payload, secret, { expiresIn: ACCESS_EXPIRES });
}

function signRefresh(payload, secret){
  return jwt.sign(payload, secret, { expiresIn: REFRESH_EXPIRES });
}

function verify(token, secret){
  return jwt.verify(token, secret);
}

module.exports = { signAccess, signRefresh, verify };
