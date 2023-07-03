const express = require("express");
const {
  getAllMotes,
  createMote,
  getMoteById,
  updateMote,
  deleteMote,
  getByUserId,
} = require("../controllers/moteController");

const router = express.Router();

router.get("/", getAllMotes);
router.post("/", createMote);

router.get("/:id", getMoteById);
router.patch("/:id", updateMote);
router.delete("/:id", deleteMote);

router.get("/myMotes/:id", getByUserId);

module.exports = router;
