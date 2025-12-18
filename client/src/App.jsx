// client/src/App.jsx

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import PassengerDashboard from "./pages/dashboard/PassengerDashboard";
import DriverDashboard from "./pages/dashboard/DriverDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

import PassengerProfilePage from "./pages/profile/PassengerProfilePage";
import DriverProfilePage from "./pages/profile/DriverProfilePage";
import CompleteProfile from "./pages/profile/CompleteProfile";
import DriverVehicleProfile from "./pages/profile/DriverVehicleProfile";

import PassengerMyRides from "./pages/passenger/MyRides";
import PassengerRideDetails from "./pages/passenger/RideDetails";
import DriverMyRides from "./pages/driver/MyRides";
import DriverRideDetails from "./pages/driver/RideDetails";

import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Ai from "./components/Ai";
import Payment from "./pages/Payment";
import ReviewPage from "./components/ReviewPage";

import CommunityList from "./pages/CommunityList";
import Community from "./pages/Community";

function App() {
  return (
    <Layout>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />

        {/* ================= COMPLETE PROFILE ================= */}
        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />

        {/* ================= PASSENGER ================= */}
        <Route
          path="/passenger/dashboard"
          element={
            <ProtectedRoute allowedRoles={["passenger"]}>
              <PassengerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/passenger/profile"
          element={
            <ProtectedRoute allowedRoles={["passenger"]}>
              <PassengerProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/passenger/my-rides"
          element={
            <ProtectedRoute allowedRoles={["passenger"]}>
              <PassengerMyRides />
            </ProtectedRoute>
          }
        />

        <Route
          path="/passenger/ride/:id"
          element={
            <ProtectedRoute allowedRoles={["passenger"]}>
              <PassengerRideDetails />
            </ProtectedRoute>
          }
        />

        {/* ================= DRIVER ================= */}
        <Route
          path="/driver/dashboard"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/profile"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/vehicle"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverVehicleProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/my-rides"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverMyRides />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/ride/:id"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverRideDetails />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= REVIEW ================= */}
        <Route
          path="/review"
          element={
            <ProtectedRoute allowedRoles={["passenger"]}>
              <ReviewPage />
            </ProtectedRoute>
          }
        />

        {/* ================= COMMUNITY ================= */}
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <CommunityList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/community/local"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Ai />
    </Layout>
  );
}

export default App;
