const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

exports.bookSlot = async (req, res) => {
  const { slotId } = req.body;
  const userId = req.user.id; // from JWT

  try {
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    if (slot.booked >= slot.capacity) {
      return res.status(400).json({ message: "Slot is full" });
    }

    const booking = new Booking({ user: userId, slot: slotId });
    await booking.save();

    // increment booked
    slot.booked += 1;
    await slot.save();

    res.status(201).json({ message: "Booking request sent", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelBooking = async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id;

  try {
    const booking = await Booking.findOne({ _id: bookingId, user: userId });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Decrement slot
    const slot = await Slot.findById(booking.slot);
    if (slot) {
      slot.booked -= 1;
      await slot.save();
    }

    await booking.deleteOne();

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user slot");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateBookingStatus = async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body; // "approved" or "rejected"

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: `Booking ${status}`, booking });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
