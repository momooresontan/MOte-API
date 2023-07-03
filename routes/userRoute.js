const express = require("express");
const { getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);

router.post("/signup");
router.post("/login");

module.exports = router;
