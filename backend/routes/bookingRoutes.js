const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const { bookSlot, cancelBooking, getAllBookings,
    updateBookingStatus,} = require("../controllers/bookingController");

router.post("/book", protect, bookSlot);
router.delete("/cancel/:id", protect, cancelBooking);

router.get("/all", protect, adminOnly, getAllBookings);
router.put("/status/:id", protect, adminOnly, updateBookingStatus);
// Admin-only routes
router.get("/all", protect, getAllBookings);
router.put("/status/:id", protect, updateBookingStatus);
module.exports = router;
