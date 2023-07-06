const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Mote = require("../models/moteModel");
const User = require("../models/userModel");
const Like = require("../models/likeModel");
const Comment = require("../models/commentModel");

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
  const likeCount = mote.likes.length;
  mote.like_count = likeCount;

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

exports.getByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const userMotes = await User.findById(userId).populate("motes");
  if (!userMotes) {
    res.status(404);
    throw new Error("No motes found!");
  }
  res.status(200).json({ userMotes });
});

exports.likeMote = asyncHandler(async (req, res) => {
  const { liked, user } = req.body;
  if (!liked || !user) {
    res.status(400);
    throw new Error("All fields are mandatory & must be true!");
  }
  const id = req.params.id;
  const mote = await Mote.findById(id);
  if (!mote) {
    res.status(500).json({ message: "Mote not found!" });
  }
  const isLiked = new Like({
    liked,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await isLiked.save({ session });
    mote.likes.push(isLiked.user);
    await mote.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
  }

  res.status(201).json({ isLiked });
});

exports.unlikeMote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const mote = await Mote.findById(id);
  if (!mote) {
    res.status(500).json({ message: "Mote not found!" });
  }
  const { user } = req.body;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await mote.save({ session });
    mote.likes.pull(user);
    await mote.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
  }

  res.status(201).json({ message: "Mote unliked" });
});

exports.addComment = asyncHandler(async (req, res) => {
  const { text, user, moteId } = req.body;
  if (!text || !user) {
    res.status(400);
    throw new Error("All fields required!");
  }
  const mote = await Mote.findById(moteId);
  if (!mote) {
    res.status(500).json({ message: "Mote not found!" });
  }
  const existingUser = await User.findById(user);
  if (!existingUser) {
    res.status(500).json({ message: "User not found!" });
  }
  const comment = new Comment({
    text,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await comment.save({ session });
    mote.comments.push(comment);
    await mote.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
  }

  res.status(201).json({ comment });
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const comment = await Comment.findById(id).populate("mote");
  console.log(comment);
  // await comment.mote.comments.pull(comment);
  // await comment.mote.save();
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }
  res.status(204).json({ message: "Comment deleted" });
});
