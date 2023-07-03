const express = require("express");
const userRouter = require("../routes/userRoute");

const app = express();

//Mounting routes
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
