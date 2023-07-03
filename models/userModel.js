const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User name required!"],
      unique: [true, "User name already taken!"],
    },
    email: {
      type: String,
      required: [true, "User email required!"],
      unique: [true, "User email already used!"],
    },
    password: {
      type: String,
      required: [true, "User password required!"],
      minlength: [8, "Password mus have ay least 8 characters!"],
    },
    role: {
      type: String,
      default: "user",
    },
    motes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Mote",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
