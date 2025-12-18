const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sosRoutes = require("./routes/sosRoutes");
const userRoutes = require("./routes/userRoutes"); // ✅ ADD THIS
const driverRoutes = require("./routes/driverRoutes");

const rideRoutes = require("./routes/rideRoutes");

const app = express();

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// Rate limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: "Too many requests from this IP, please try again later",
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/community", require("./routes/communityRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/rides", rideRoutes)



// Health check
app.get("/", (req, res) => {
  res.send("Carpool API is running");
});

module.exports = app;
