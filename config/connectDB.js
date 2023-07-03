const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB = process.env.DB_CONNECTION_STRING.replace(
  "<password>",
  process.env.DB_PASSWORD
);

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(DB);
    console.log(
      `Database connected: ${connect.connection.host} ${connect.connection.name}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
