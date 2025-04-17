/*const express = require("express");
const router = express.Router();
const { createSlot, getAllSlots } = require("../controllers/slotController");
const adminOnly = require("../middleware/adminMiddleware");


router.post("/create", createSlot); // optional: add admin protect
router.get("/", getAllSlots);

router.post("/create", protect, adminOnly, createSlot); // now only admin can create slots

module.exports = router;*/


const express = require("express");
const router = express.Router();
const { createSlot, getAllSlots } = require("../controllers/slotController");
const protect = require("../middleware/authMiddleware"); // ✅ You must import this
const adminOnly = require("../middleware/adminMiddleware"); // ✅ This is okay

// ✅ Only admin can create slots
router.post("/create", protect, adminOnly, createSlot);

// ✅ All users can view slots
router.get("/", getAllSlots);

module.exports = router;
