// src/utils/priceCalculator.js

// mock distance table (km)
const DISTANCE_MAP = {
  "howrah-sector5": 22,
  "sector5-howrah": 22,
  "howrah-saltlake": 20,
  "saltlake-sector5": 8,
};

const PETROL_PRICE = 100; // ₹ per litre
const MILEAGE = 15; // km per litre
const SEATS = 4;

exports.calculatePricePerSeat = (origin, destination) => {
  const key = `${origin.toLowerCase()}-${destination.toLowerCase()}`;
  const distance = DISTANCE_MAP[key] || 15; // default 15km

  const costPerKm = PETROL_PRICE / MILEAGE;
  const totalFuelCost = distance * costPerKm;

  return Math.ceil(totalFuelCost / SEATS);
};
