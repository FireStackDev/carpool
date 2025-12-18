import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/axios";

export default function RideDetails() {
  const { id } = useParams();
  const [ride, setRide] = useState(null);

  useEffect(() => {
    api.get("/rides").then(res => {
      const found = res.data.find(r => r._id === id);
      setRide(found);
    });
  }, [id]);

  if (!ride) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Ride Details</h2>

      <p><b>Route:</b> {ride.origin} → {ride.destination}</p>
      <p><b>Date:</b> {new Date(ride.date).toLocaleString()}</p>
      <p><b>Driver:</b> {ride.driver?.name}</p>
      <p><b>Phone:</b> {ride.driver?.phone}</p>
      <p><b>Price:</b> ₹{ride.pricePerSeat}</p>
      <p><b>Payment:</b> UPI / Cash (Demo)</p>
      <p><b>Status:</b> Confirmed</p>
    </div>
  );
}
