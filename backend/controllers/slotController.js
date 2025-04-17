const Slot = require("../models/Slot");

exports.createSlot = async (req, res) => {
  const { date, time, capacity } = req.body;

  try {
    const slot = new Slot({ date, time, capacity });
    await slot.save();
    res.status(201).json({ message: "Slot created", slot });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
