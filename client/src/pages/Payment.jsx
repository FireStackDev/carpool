// src/pages/Payment.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { ride, seats } = state;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-3">Payment</h2>

      <p>Route: {ride.origin} → {ride.destination}</p>
      <p>Seats: {seats}</p>
      <p>Total: ₹{ride.pricePerSeat * seats}</p>

      <div className="border p-4 mt-3 rounded">
        <p>UPI ID: rideshare@upi</p>
        <p>Scan QR (Demo)</p>
      </div>

      <button
        onClick={() => {
          alert("Payment confirmed (Demo)");
          navigate("/passenger/my-rides");
        }}
        className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded"
      >
        I Have Paid
      </button>
    </div>
  );
}
