import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axios";

export default function DriverRideDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const res = await api.get(`/rides/${id}`);
        setRide(res.data);
      } catch (err) {
        alert("Failed to load ride details");
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!ride) return <p className="p-6">Ride not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Ride Details</h1>

      {/* Ride Info */}
      <div className="bg-white rounded-xl border p-4 space-y-2">
        <p><b>Route:</b> {ride.origin} → {ride.destination}</p>
        <p><b>Date:</b> {new Date(ride.date).toLocaleString()}</p>
        <p><b>Seats Available:</b> {ride.seatsAvailable}</p>
        <p><b>Price per seat:</b> ₹{ride.pricePerSeat}</p>
        <p><b>Status:</b> {ride.status}</p>
      </div>

      {/* Passenger List */}
      <div className="bg-white rounded-xl border p-4">
        <h2 className="font-semibold mb-2">Passengers</h2>

        {ride.passengers.length === 0 ? (
          <p className="text-sm text-gray-500">No passengers yet</p>
        ) : (
          <ul className="space-y-2">
            {ride.passengers.map((p) => (
              <li key={p._id} className="border rounded p-2">
                <p><b>Name:</b> {p.name}</p>
                <p><b>Phone:</b> {p.phone}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-emerald-600 text-white rounded"
          onClick={() => alert("Ride marked as completed (demo)")}
        >
          Mark Completed
        </button>

        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}
