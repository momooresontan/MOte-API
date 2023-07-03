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
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [],
  },
  {
    timestamps: true,
  }
);

const Mote = mongoose.model("Mote", moteSchema);

module.exports = Mote;
