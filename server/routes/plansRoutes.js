const express = require("express");
const {
  savePlan,
  getPlans,
  removefromPlans,
} = require("../controllers/plansController");
const { protect } = require("../Middleware/authMiddleware");
const router = express.Router();
router.post("/savePlan", protect, savePlan);
router.get("/getPlans", protect, getPlans);
router.delete("/removefromPlans/:id", protect, removefromPlans);
module.exports = router;
