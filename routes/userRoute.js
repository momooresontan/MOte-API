const express = require("express");
const { getAllUsers, signup } = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);

router.post("/signup", signup);
router.post("/login");

module.exports = router;
