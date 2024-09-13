const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const {
    getUsers,
    getUserById,
    register,
    updateUser,
    deleteUser,
    login
} = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifiyToken');  // assuming you have an auth middleware
const { bucket } = require('../firebase'); // Import initialized Firebase SDK

// Multer setup for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Express router setup
const router = express.Router();

// Routes setup
router.route('/').get(getUsers);
router.route('/:id').get(
    verifyToken,
    getUserById).delete(deleteUser).put(upload.single('picture'), updateUser);
router.route('/register').post(upload.single('picture'), register);
router.route('/login').post(login);

module.exports = router;
