const express = require('express');
const {
    getUsers,
    getUserById,
    register,
    updateUser,
    deleteUser,
    login
} = require('../controllers/user.controller');

const verifyToken = require('../middleware/verifiyToken');

// const verifyToken = require('../middlewares/verifyToken');  // assuming you have an auth middleware

const router = express.Router();

// Route to get all users
router.route('/').get(verifyToken, getUsers);
// If you need to add authentication, you can uncomment the following line
// router.route('/').get(verifyToken, getUsers);

// Route to get a user by ID
router.route('/:id').get(verifyToken, getUserById).delete(deleteUser)
// router.route('/:id')

// Route to register a new user
router.route('/register').post(register);

// Route for user login
router.route('/login').post(login);
// router.delete('/users/:id', deleteUser);

module.exports = router;
