const Ride = require("../models/Ride");
const Booking = require("../models/Booking");

// ================= CREATE BOOKING (PAYMENT FIRST) =================
const createBooking = async (req, res) => {
  try {
    const { rideId, paymentMethod } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    if (ride.passengers.includes(req.user.id)) {
      return res.status(400).json({ message: "Already booked this ride" });
    }

    if (ride.seatsAvailable <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    const booking = await Booking.create({
      ride: ride._id,
      passenger: req.user.id,
      driver: ride.driver,
      paymentMethod, // UPI / QR / CASH
      paymentId: "MANUAL_PAYMENT",
    });

    ride.passengers.push(req.user.id);
    ride.seatsAvailable -= 1;

    if (ride.seatsAvailable === 0) {
      ride.status = "BOOKED";
    }

    await ride.save();

    res.status(201).json({
      success: true,
      message: "Ride booked successfully",
      booking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Booking failed" });
  }
};

// ================= PASSENGER BOOKINGS =================
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ passenger: req.user.id })
      .populate("ride")
      .populate("driver", "name phone")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
};
