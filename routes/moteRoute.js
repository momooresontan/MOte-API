const express = require("express");

const router = express.Router();

router.get("/", getAllMotes);
router.post("/", createMote);

router.get("/:id", getMoteById);
router.put("/:id", updateMote);
router.delete("/:id", deleteMote);
