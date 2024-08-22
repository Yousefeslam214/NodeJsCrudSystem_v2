const asyncWrapper = require('../middleware/asyncWrapper');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hST = require('../utils/httpStatusText');
const AppError = require('../utils/appError'); // Ensure correct import
const userRoles = require('../utils/userRoutes')

const generateJWT = require('../utils/jwt'); // Typo: should be 'generateJWT'



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
  const { userName, gmail, password, age, picture, role } = req.body;
  const existingUser = await User.findOne({ gmail });
  if (existingUser) {
    return next(AppError.create('User with this email already exists', 400, hST.FAIL));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    gmail,
    password: hashedPassword,
    age,
    picture,
    role
  });
  const token = await generateJWT({ email: newUser.gmail, id: newUser._id, role: newUser.role });
  newUser.token = token;

  await newUser.save();
  res.status(201).json({
    status: hST.SUCCESS,
    data: { newUser }
  });
});

// Update a user
const updateUser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { password, ...updateData } = req.body;

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
  console.log('JWT_SECRET_KEY:', process.env.JWT_SECERT_KEY);

  const { gmail, password } = req.body;
  if (!gmail && !password) {
    return next(AppError.create('Email and pass are required', 400, hST.FAIL));
  }
  const user = await User.findOne({ gmail });

  if (!user) {
    return next(AppError.create('User not found', 404, hST.FAIL));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(AppError.create('Invalid credentials', 401, hST.FAIL));
  }

  // Use the secret key from the .env file
  const token = jwt.sign({ id: user._id, type: user.type }, process.env.JWT_SECERT_KEY, { expiresIn: '1h' });

  res.status(200).json({
    status: hST.SUCCESS,
    data: { token, user: { id: user._id, userName: user.userName, gmail: user.gmail, type: user.type } }
  });
});

module.exports = {
  getUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login
};
