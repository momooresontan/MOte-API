const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    res.status(404).json({ message: "No users found!" });
  }
  res.status(200).json(users);
});

exports.signup = asyncHandler(async (req, res) => {
  const { username, email, password, role, motes } = req.body;
  if(!username || !email)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User already exists! Login instead" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = 
});
