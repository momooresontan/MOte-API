const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Mote = require("../models/moteModel");
const User = require("../models/userModel");

exports.getAllMotes = asyncHandler(async (req, res) => {
  const motes = await Mote.find();
  if (!motes) {
    res.status(404);
    throw new Error("No motes found!");
  }
  res.status(200).json(motes);
});

exports.createMote = asyncHandler(async (req, res) => {
  const {
    text,
    user,
    images,
    video,
    comments,
    comment_count,
    likes,
    likes_count,
  } = req.body;
  if (!text || !user) {
    res.status(400);
    throw new Error("All fields required!");
  }
  const existingUser = await User.findById(user);
  if (!existingUser) {
    res.status(500).json({ message: "User not found!" });
  }
  const mote = new Mote({
    text,
    user,
    images,
    video,
    comments,
    comment_count,
    likes,
    likes_count,
  });

  const session = await mongoose.startSession();
  session.startTransaction();
  await mote.save({ session });
  existingUser.motes.push(mote);
  await existingUser.save({ session });
  await session.commitTransaction();

  res.status(201).json({ mote });
});

exports.getMoteById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const mote = await Mote.findById(id);
  if (!mote) {
    res.status(404);
    throw new Error("Mote not found!");
  }
  res.status(200).json({ mote });
});

exports.updateMote = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const id = req.params.id;
  const updatedMote = await Mote.findByIdAndUpdate(id, { text });
  if (!updatedMote) {
    res.status(500);
    throw new Error("Unable to update the mote!");
  }
  res.status(200).json({ updatedMote });
});

exports.deleteMote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const mote = await Mote.findByIdAndDelete(id).populate("user");
  await mote.user.motes.pull(mote);
  await mote.user.save();
  if (!mote) {
    res.status(404);
    throw new Error("Mote not found!");
  }
  res.status(204).json({ message: "Mote has been deleted" });
});
