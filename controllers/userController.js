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
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User already exists! Login instead" });
  }

  //Hash pasword
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
    motes,
  });
  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User data invalid!");
  }
});
