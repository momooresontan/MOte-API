const Mote = require("../models/moteModel");

exports.getAllMotes = async (req, res) => {
  const motes = await Mote.find();
  if (!motes) {
    res.status(404);
    throw new Error("No motes found!");
  }
};
