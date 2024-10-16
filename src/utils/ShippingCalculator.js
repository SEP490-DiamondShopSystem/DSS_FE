export const calculateShippingCost = (distanceInKm) => {
    const costPerKm = 50000; // 50,000 VND per 1km
    return Math.ceil(distanceInKm) * costPerKm; // round up to the nearest km
  };
  