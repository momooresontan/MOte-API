const mongoose = require("mongoose");

const moteSchema = new mongoose.Schema({
  mote: {
    type: String,
    required: [true, "Say something"],
  },
});
