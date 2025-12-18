const express = require("express");
const { body } = require("express-validator");
const rideController = require("../controllers/rideController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE RIDE (DRIVER)
router.post(
  "/",
  authMiddleware,
  [
    body("origin").notEmpty(),
    body("destination").notEmpty(),
    body("date").notEmpty(),
    body("seatsAvailable").isInt({ min: 1 }),
    body("pricePerSeat").isFloat({ min: 0 }),
  ],
  rideController.createRide
);

// GET AVAILABLE RIDES (PASSENGER)
router.get("/", authMiddleware, rideController.getAvailableRides);

// GET DRIVER RIDES (IMPORTANT)
router.get("/my", authMiddleware, rideController.getDriverRides);

// SOS
router.post("/:rideId/sos", authMiddleware, rideController.sendSOS);

// REVIEW
router.post("/:rideId/review", authMiddleware, rideController.addReview);

module.exports = router;
