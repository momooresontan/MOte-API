const mongoose = require("mongoose");

const moteSchema = new mongoose.Schema({
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
  originalMoteId: {
    type: null,
  },
});
