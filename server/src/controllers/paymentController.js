const Payment = require("../models/Payment");
const Booking = require("../models/Booking");
const Ride = require("../models/Ride");

exports.makePayment = async (req, res) => {
  try {
    const { rideId, method } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // Create booking first
    const booking = await Booking.create({
      ride: ride._id,
      passenger: req.user.id,
      status: "confirmed",
    });

    // Create payment (DEMO)
    const payment = await Payment.create({
      booking: booking._id,
      amount: ride.pricePerSeat,
      method, // UPI / QR / CASH
    });

    // Update ride
    ride.passengers.push(req.user.id);
    ride.seatsAvailable -= 1;

    if (ride.seatsAvailable === 0) {
      ride.status = "BOOKED";
    }

    await ride.save();

    res.json({
      success: true,
      message: "Payment successful & ride booked",
      booking,
      payment,
    });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ message: "Payment failed" });
  }
};
