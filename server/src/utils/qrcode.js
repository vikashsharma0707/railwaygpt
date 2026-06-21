const QRCode = require('qrcode');

exports.toDataURL = async (payload) => {
  const text = typeof payload === 'string' ? payload : JSON.stringify(payload);
  return QRCode.toDataURL(text, { errorCorrectionLevel: 'M', margin: 1, width: 256 });
};
