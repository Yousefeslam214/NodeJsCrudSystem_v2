// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Access Denied' });
//     }
// console.log('yosuef')
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECERT_KEY);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(400).json({ message: 'Invalid Token' });
//     }
// };

// module.exports = { verifyToken };
