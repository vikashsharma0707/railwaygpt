exports.predictWaitlistConfirmation = async (wlNumber, trainClass, trainId) => {
  // Simple but realistic prediction logic (can be replaced with ML model later)
  const baseProbability = 65; // Base chance

  let probability = baseProbability;

  // Rule-based logic
  if (wlNumber <= 5) probability = 92;
  else if (wlNumber <= 15) probability = 78;
  else if (wlNumber <= 30) probability = 62;
  else if (wlNumber <= 50) probability = 45;
  else if (wlNumber <= 80) probability = 28;
  else probability = 12;

  // Class adjustment
  if (trainClass === '1A' || trainClass === '2A') {
    probability += 8; // Premium classes have better confirmation
  } else if (trainClass === 'SL') {
    probability -= 5;
  }

  // Final capping
  probability = Math.min(98, Math.max(5, probability));

  return {
    wlNumber,
    class: trainClass,
    predictedProbability: probability,
    status: probability > 70 ? 'High Chance' : 
            probability > 45 ? 'Moderate Chance' : 'Low Chance',
    recommendation: probability > 65 ? 
      "Good chance of confirmation. Book confidently." :
      "Consider alternate trains or wait for RAC."
  };
};