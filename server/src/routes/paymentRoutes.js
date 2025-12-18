const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { makePayment } = require("../controllers/paymentController");

const router = express.Router();

// console.log("authMiddleware:", authMiddleware);
// console.log("makePayment:", makePayment);

router.post("/", authMiddleware.protect, makePayment);

module.exports = router;
