const { validationResult } = require("express-validator");
const Ride = require("../models/Ride");

/**
 * ================= CREATE RIDE (DRIVER)
 * POST /api/rides
 */
exports.createRide = async (req, res) => {
  console.log("Create Ride Fired !");
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const {
      origin,
      destination,
      date,
      seatsAvailable,
      pricePerSeat,
    } = req.body;

    const ride = await Ride.create({
      driver: req.user.id,
      origin,
      destination,
      date,
      seatsAvailable,
      pricePerSeat,
      status: "OPEN",
    });

    res.status(201).json({
      success: true,
      message: "Ride created successfully",
      ride,
    });
  } catch (err) {
    console.error("Create ride error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while creating ride",
    });
  }
};

/**
 * ================= GET AVAILABLE RIDES (PASSENGER)
 * GET /api/rides
 */
exports.getAvailableRides = async (req, res) => {
  try {
    const rides = await Ride.find({
      status: "OPEN",
      seatsAvailable: { $gt: 0 },
    })
      .populate("driver", "name phone email")
      .sort({ date: 1 });

    res.json(rides);
  } catch (err) {
    console.error("Get rides error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching rides",
    });
  }
};

/**
 * ================= GET DRIVER RIDES (IMPORTANT)
 * GET /api/rides/my
 */
exports.getDriverRides = async (req, res) => {
  try {
    const rides = await Ride.find({ driver: req.user.id })
      .sort({ createdAt: -1 });

    res.json(rides);
  } catch (err) {
    console.error("Driver rides error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching driver rides",
    });
  }
};

/**
 * ================= SEND SOS
 * POST /api/rides/:rideId/sos
 */
exports.sendSOS = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    ride.sosEvents.push({
      user: req.user.id,
      message: "SOS triggered during ride",
    });

    await ride.save();

    res.json({
      success: true,
      message: "SOS alert recorded successfully",
    });
  } catch (err) {
    console.error("SOS error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while sending SOS",
    });
  }
};

/**
 * ================= ADD REVIEW
 * POST /api/rides/:rideId/review
 */
exports.addReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { rating, comment } = req.body;

    const ride = await Ride.findById(req.params.rideId);
    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    ride.reviews.push({
      passenger: req.user.id,
      rating,
      comment: comment || "",
    });

    await ride.save();

    res.json({
      success: true,
      message: "Review added successfully",
    });
  } catch (err) {
    console.error("Add review error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while adding review",
    });
  }
};
