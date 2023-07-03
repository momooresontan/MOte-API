const asyncHandler = require("express-async-handler");
const Mote = require("../models/moteModel");

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
  const mote = await Mote.create({
    text,
    user,
    images,
    video,
    comments,
    comment_count,
    likes,
    likes_count,
  });
});
