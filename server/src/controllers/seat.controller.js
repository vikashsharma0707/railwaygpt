const predictionService = require('../services/prediction.service');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/ApiResponse');

exports.predictWaitlist = asyncHandler(async (req, res) => {
  const { wlNumber, trainClass, trainId } = req.body;

  if (!wlNumber || !trainClass) {
    return apiResponse(res, null, 'WL Number and Class are required', 400);
  }

  const result = await predictionService.predictWaitlistConfirmation(
    parseInt(wlNumber), 
    trainClass, 
    trainId
  );

  apiResponse(res, result, 'Waitlist prediction successful');
});