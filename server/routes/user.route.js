const express = require('express');
const {
    getUsers,
    getUserById,
    register,
    updateUser,
    deleteUser,
    login
} = require('../controllers/user.controller');

const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("FILE", file);
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user~${Date.now()}.${ext}`
        cb(null, fileName)
    }
})
const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0]
    if (imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(appError.create('file must be an image', 400), false)
    }
}
const upload = multer({ storage: diskStorage, fileFilter })


const verifyToken = require('../middleware/verifiyToken');

// const verifyToken = require('../middlewares/verifyToken');  // assuming you have an auth middleware

const router = express.Router();

// Route to get all users
router.route('/').get(getUsers);
// If you need to add authentication, you can uncomment the following line
// router.route('/').get(verifyToken, getUsers);

// Route to get a user by ID
router.route('/:id').get(verifyToken, getUserById).delete(deleteUser)
// router.route('/:id')

// Route to register a new user
router.route('/register').post(upload.single('picture') ,register);

// Route for user login
router.route('/login').post(login);
// router.delete('/users/:id', deleteUser);

module.exports = router;
