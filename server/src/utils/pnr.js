exports.generatePNR = () => {
  const ts = Date.now().toString().slice(-7);
  const rand = Math.floor(100 + Math.random() * 900);
  return `${ts}${rand}`; // 10 digits
};

exports.generateOrderRef = () => `RWG_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
