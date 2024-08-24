const mongoose = require('mongoose');
const validator = require('validator')
const userRoles = require('../utils/userRoutes')

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter your username"]
  },
  gmail: {
    type: String,
    required: [true, "Please enter your Gmail address"],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid Gmail address']
  },
  password: {
    type: String,
    required: [true, "Please enter your password"]
  },
  age: {
    type: Number,
    required: [true, "Please enter your age"]
  },
  role: {
    type: String,
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
    default: userRoles.USER
  },
  picture: {
    type: String,
    default: 'uploads/avatar.png'
  },
},
  {
    timestamps: true
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
