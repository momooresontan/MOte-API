const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    liked: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Like must have a user!"],
    },

    // mote: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Motes",
    //   required: [true, "Like must belong to a mote!"],
    // },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
