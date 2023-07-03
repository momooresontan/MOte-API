const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  liked: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Like must have a user!"],
  },
});
