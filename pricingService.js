const PriceCalculation = (totalDistance, itemType, basePrice, baseDistance, kmPrice) => {
    if (totalDistance <= baseDistance) {
      return basePrice;
    }
  
    if (itemType === 'perishable') {
      return basePrice + (totalDistance - baseDistance) * kmPrice;
    }
    return basePrice + (totalDistance - baseDistance) * (kmPrice / 2);
  };
  
  module.exports = PriceCalculation;