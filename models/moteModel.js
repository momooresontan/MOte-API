const mongoose = require("mongoose");

const moteSchema = new mongoose.Schema(
  {
    text: {
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
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Like",
      },
    ],
    comment_count: {
      type: Number,
      //default: 0,
    },
    like_count: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// moteSchema.post("save", function (next) {
//   const likeCount = this.likes.length;
//   this.like_count = likeCount;
//   next();
// });

const Mote = mongoose.model("Mote", moteSchema);

module.exports = Mote;
