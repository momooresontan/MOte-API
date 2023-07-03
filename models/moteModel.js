const mongoose = require("mongoose");

const moteSchema = new mongoose.Schema(
  {
    mote: {
      type: String,
      required: [true, "Say something"],
    },
    images: {
      type: String,
    },
    video: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Mote must belong to a user!"],
    },
    comments_user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes_user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: {
      type: Number,
    },
    likes: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Mote = mongoose.model("Mote", moteSchema);

module.exports = Mote;
