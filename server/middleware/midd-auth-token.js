const jwt = require('jsonwebtoken');
const UserModel = require('../models/user-model'); 

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) return res.status(401).json({ message: 'Not authenticated' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = await UserModel.findById(user.id);
  console.log(req.user);
    next();
  });
};

module.exports = authenticateToken;
