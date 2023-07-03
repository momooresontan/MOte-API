const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    res.status(404);
    throw new Error("No users found!");
  }
  res.status(200).json(users);
});
