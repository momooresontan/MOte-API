const express = require("express");
const {
  getAllMotes,
  createMote,
  getMoteById,
  updateMote,
  deleteMote,
  getByUserId,
  likeMote,
} = require("../controllers/moteController");

const router = express.Router();

router.get("/", getAllMotes);
router.post("/", createMote);

router.get("/:id", getMoteById);
router.patch("/:id", updateMote);
router.delete("/:id", deleteMote);

router.get("/myMotes/:id", getByUserId);

router.post("/like/:id", likeMote);

module.exports = router;
