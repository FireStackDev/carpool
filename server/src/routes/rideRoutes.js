const express = require("express");
const { body } = require("express-validator");
const rideController = require("../controllers/rideController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// // CREATE RIDE (DRIVER)
router.post(
  "/",
  authMiddleware.protect,
  [
    body("origin").notEmpty(),
    body("destination").notEmpty(),
    body("date").notEmpty(),
    body("seatsAvailable").isInt({ min: 1 }),
    body("pricePerSeat").isFloat({ min: 0 }),
  ],
  rideController.createRide
);

// // GET AVAILABLE RIDES (PASSENGER)
router.get("/", authMiddleware.protect, rideController.getAvailableRides);

// // GET DRIVER RIDES (IMPORTANT)
router.get("/my", authMiddleware.protect, rideController.getDriverRides);

// // SOS
router.post("/:rideId/sos", authMiddleware.protect, rideController.sendSOS);

// // REVIEW
router.post("/:rideId/review", authMiddleware.protect, rideController.addReview);

module.exports = router;