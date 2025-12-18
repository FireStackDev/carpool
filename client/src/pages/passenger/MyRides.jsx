import { useEffect, useState } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function MyRides() {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/rides/passenger/my").then(res => {
      setRides(res.data);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Rides</h1>

      {rides.length === 0 ? (
        <p>No rides booked yet.</p>
      ) : (
        rides.map(ride => (
          <div
            key={ride._id}
            className="border rounded-xl p-4 mb-3 bg-white shadow"
          >
            <p className="font-semibold">
              {ride.origin} → {ride.destination}
            </p>
            <p>Date: {new Date(ride.date).toLocaleString()}</p>
            <p>Driver: {ride.driver?.name}</p>
            <p>Status: Upcoming</p>

            <button
              onClick={() => navigate(`/passenger/ride/${ride._id}`)}
              className="mt-2 px-4 py-1 bg-indigo-600 text-white rounded"
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
}
