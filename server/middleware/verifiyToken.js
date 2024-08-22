const jwt = require('jsonwebtoken')
const httpStatusText = require('../utils/httpStatusText')
const appError = require('../utils/appError')



// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Access Denied' });
//     }
//     console.log('yosuef')
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECERT_KEY);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(400).json({ message: 'Invalid Token' });
//     }
// };

// module.exports = { verifyToken };






const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if (!authHeader) {
        return res.status(401).json('token is required');
    }
    const token = authHeader.split(' ')[1]
    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECERT_KEY);
        // console.log("currentUser", currentUser)
        req.currentUser = currentUser
        next();
    } catch (err) {
        const error = appError.create('invalid token', 401, httpStatusText.FAIL);
        return next(error)
    }
}
module.exports = verifyToken
