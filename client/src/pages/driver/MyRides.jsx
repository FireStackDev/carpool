import { useEffect, useState } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function DriverMyRides() {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/rides/driver/my").then(res => {
      setRides(res.data);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Created Rides</h1>

      {rides.map(ride => (
        <div key={ride._id} className="border p-4 rounded-xl mb-3">
          <p className="font-semibold">
            {ride.origin} → {ride.destination}
          </p>
          <p>Date: {new Date(ride.date).toLocaleString()}</p>
          <p>Seats Left: {ride.seatsAvailable}</p>

          <button
            onClick={() => navigate(`/driver/ride/${ride._id}`)}
            className="text-sm px-3 py-1 bg-indigo-600 text-white rounded"
            >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
