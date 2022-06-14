const express = require("express");
const { getHotels, addHotels } = require("../controllers/hotelsController");
const router = express.Router();
router.get("/", getHotels);
router.post("/addHotels", addHotels);
module.exports = router;
