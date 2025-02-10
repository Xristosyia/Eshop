const jwt = require('jsonwebtoken');
const User = require('../models/User');  // User model

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// // Protect route and ensure user is an admin
// const protectAdmin = (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Get token from header
  
//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;

//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Not authorized as an admin' });
//     }
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Not authorized, invalid token' });
//   }
// };


// // // const admin = (req, res, next) => {
// // //     if (req.user && req.user.role === 'admin') {
// // //       next();
// // //     } else {
// // //       res.status(403).json({ message: 'Admin access required' });
// // //     }
// // //   };
  
//   module.exports = { protect, protectAdmin };


// authMiddleware.js


const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as an admin' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

module.exports = { protect, protectAdmin };