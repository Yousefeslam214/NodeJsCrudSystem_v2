const asyncWrapper = require('../middleware/asyncWrapper');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hST = require('../utils/httpStatusText');
const AppError = require('../utils/appError'); // Ensure correct import
const userRoles = require('../utils/userRoutes')
const multer = require('multer');
const uploadFile = require('../utils/uploadToFirebase.js'); // Import the upload function
const cookieParser = require('cookie-parser');

const generateJWT = require('../utils/jwt'); // Typo: should be 'generateJWT'

const { bucket } = require('../firebase.js'); // Import from firebase.js


// Multer setup for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Ensure dotenv is configured
require('dotenv').config();

// Get all users
const getUsers = asyncWrapper(async (req, res, next) => {
  console.log(req.headers)
  const users = await User.find({});
  res.status(200).json({
    status: hST.SUCCESS,
    data: { users }
  });
});

// Get user by ID
const getUserById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(AppError.create('User not found', 404, hST.FAIL));
  }
  res.status(200).json({
    status: hST.SUCCESS,
    data: { user }
  });
});




// Register a new user
const register = asyncWrapper(async (req, res, next) => {
  // console.log('yousef')
  const { userName, gmail, password, age, picture, role } = req.body;
  // console.log(req.body)
  const oldUser = await User.findOne({ gmail: gmail })
  if (oldUser) {
    const error = AppError.create('user already exists', 400, hST.FAIL)
    return next(error)
  }
  // password hashing
  const hashedPassword = await bcrypt.hash(password, 1)
  const newUser = new User({
    userName,
    gmail,
    password: hashedPassword,
    age,
    role,
    picture: ""
  });

  const token = await generateJWT({ gmail: newUser.gmail, id: newUser._id, role: newUser.role });
  newUser.token = token;


  await newUser.save();
  try {
    const fileUrl = await uploadFile(req.file, `folder/${Date.now()}_${req.file.originalname}`);
    newUser.picture = fileUrl;
    await newUser.save();

    res.status(201).json({
      status: hST.SUCCESS, data: {
        user: newUser
      }
    });
  }
  catch (error) {
    return res.status(404).json({
      status: hST.ERROR,
      data: {
        message: 'user create but the picture not created',
        user: newUser
      }
    });
  }
});

// Update a user
const updateUser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { password, gmail, ...updateData } = req.body;

  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  const user = await User.findByIdAndUpdate(id, updateData, { new: true });
  if (!user) {
    return next(AppError.create('User not found', 404, hST.FAIL));
  }
  res.status(200).json({
    status: hST.SUCCESS,
    data: { user }
  });
});

// Delete a user
const deleteUser = asyncWrapper(async (req, res, next) => {
  console.log(req.params)
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(AppError.create('User not found', 404, hST.FAIL));

  }

  // await User.deleteOne({ _id: req.params.courseId })


  res.status(200).json({
    status: hST.SUCCESS,
    data: { message: 'User deleted successfully' }
  });
});

// User login
const login = asyncWrapper(async (req, res, next) => {
  const { gmail, password } = req.body;
  console.log(req.body)
  if (!gmail && !password) {
    const error = AppError.create('gmail and password are required', 400, hST.FAIL);
    return next(error);
  }

  const user = await User.findOne({ gmail: gmail });
  if (!user) {
    const error = AppError.create('user not found', 400, hST.FAIL);
    return next(error)
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  console.log(password)
  console.log(user.password)
  console.log(matchedPassword)
  if (user && matchedPassword) {
    // logged in successfully

    const token = await generateJWT({ gmail: user.gmail, id: user._id, role: user.role })
    const id = user._id
    // Set the token in an HTTP-only cookie
    // res.cookie('token', token, {
    //   httpOnly: true
    //   , // Prevents client-side JavaScript from accessing the cookie
    //   secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    //   sameSite: 'Lax', // Allows cookies to be sent with top-level navigations and GET requests
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    //   path: '/', // Make the cookie accessible on all routes
    // });
    // // Set the id in another HTTP-only cookie
    // res.cookie('userIdFromNode', String(id), {
    //   httpOnly: true, // Client-side JavaScript can't access this cookie
    //   secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
    //   sameSite: 'Lax', // Allows cookies to be sent with top-level navigations
    //   maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
    //   path: '/' // Cookie available across the entire site
    // });
    // res.setHeader('Set-Cookie', cookie.serialize('nauserIdme', String(id), {
    //   httpOnly: true,
    //   maxAge: 60 * 60 * 24 * 7 // 1 week
    // }));
    return res.json({ status: hST.SUCCESS, data: { token, id } })
  } else {
    const error = AppError.create('something wrong', 500, hST.FAIL)
    return next(error)
  }

});

module.exports = {
  getUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login
};
