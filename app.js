const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const moteRouter = require("./routes/moteRoute");
const connectDB = require("./config/connectDB");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

connectDB();
const app = express();

//Middlewares
app.use(express.json());

//Mounting routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/motes", moteRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
