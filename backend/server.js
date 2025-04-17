// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require("./routes/protectedRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const slotRoutes = require("./routes/slotRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.get('/', (req, res) => {
  res.send('🎉 Gym Booking API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use('/api/auth', authRoutes);
app.use("/api/user", protectedRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/slots", slotRoutes);