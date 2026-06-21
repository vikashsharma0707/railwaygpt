


// const fs = require('fs');
// const csv = require('csv-parser');
// const asyncHandler = require('../utils/asyncHandler');
// const apiResponse = require('../utils/ApiResponse');
// const trainService = require('../services/train.service');
// const audit = require('../services/audit.service');

// const multer = require('multer');

// // Multer setup for CSV upload
// const upload = multer({ 
//   dest: 'uploads/',
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only CSV files are allowed!'), false);
//     }
//   }
// });

// exports.upload = upload; // Export for use in routes

// // ====================== Train CRUD ======================

// // exports.search = asyncHandler(async (req, res) => {
// //   const data = await trainService.search(req.query);
// //   apiResponse(res, data, 'OK', 200, { count: data.length });
// // });



// exports.search = asyncHandler(async (req, res) => {
//   const data = await trainService.search(req.query);
//   apiResponse(res, data, 'Trains found successfully', 200, { count: data.length });
// });

// exports.list = asyncHandler(async (req, res) => {
//   const data = await trainService.list();
//   apiResponse(res, data);
// });

// exports.get = asyncHandler(async (req, res) => {
//   const train = await trainService.get(req.params.id);
//   apiResponse(res, train);
// });

// exports.create = asyncHandler(async (req, res) => {
//   const train = await trainService.create(req.body);
//   audit.log(req, { 
//     action: 'train.create', 
//     resource: 'Train', 
//     resourceId: train._id 
//   });
//   apiResponse(res, train, 'Train created successfully', 201);
// });

// exports.update = asyncHandler(async (req, res) => {
//   const train = await trainService.update(req.params.id, req.body);
//   audit.log(req, { 
//     action: 'train.update', 
//     resource: 'Train', 
//     resourceId: req.params.id 
//   });
//   apiResponse(res, train, 'Train updated successfully');
// });

// exports.remove = asyncHandler(async (req, res) => {
//   await trainService.remove(req.params.id);
//   audit.log(req, { 
//     action: 'train.delete', 
//     resource: 'Train', 
//     resourceId: req.params.id, 
//     severity: 'warning' 
//   });
//   apiResponse(res, null, 'Train deleted successfully');
// });

// exports.cancel = asyncHandler(async (req, res) => {
//   const result = await trainService.cancel(req.params.id);
//   apiResponse(res, result, 'Train cancelled');
// });

// exports.suspend = asyncHandler(async (req, res) => {
//   const result = await trainService.suspend(req.params.id);
//   apiResponse(res, result, 'Train suspended');
// });

// exports.reschedule = asyncHandler(async (req, res) => {
//   const result = await trainService.reschedule(req.params.id, req.body);
//   apiResponse(res, result, 'Train rescheduled');
// });

// // ====================== CSV Import ======================
// exports.importCSV = asyncHandler(async (req, res) => {
//   if (!req.file) {
//     return apiResponse(res, null, 'No CSV file uploaded', 400);
//   }

//   const rows = [];

//   await new Promise((resolve, reject) => {
//     fs.createReadStream(req.file.path)
//       .pipe(csv())
//       .on('data', (data) => rows.push(data))
//       .on('end', resolve)
//       .on('error', reject);
//   });

//   // Delete file after processing
//   try {
//     fs.unlinkSync(req.file.path);
//   } catch (err) {
//     console.error('Error deleting temp file:', err);
//   }

//   const created = await trainService.bulkImport(rows);
  
//   apiResponse(res, { 
//     inserted: created.length,
//     totalProcessed: rows.length 
//   }, 'CSV imported successfully');
// });




const fs  = require('fs');
const csv = require('csv-parser');
const multer       = require('multer');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse  = require('../utils/ApiResponse');
const trainService = require('../services/train.service');
const audit        = require('../services/audit.service');
const ApiError     = require('../utils/ApiError');

// ─── Multer ──────────────────────────────────────────────────────────────────
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed!'), false);
    }
  },
});
exports.upload = upload;

// ─── Search ──────────────────────────────────────────────────────────────────
exports.search = asyncHandler(async (req, res) => {
  const {
    sourceCode, destinationCode,
    from,       to,
    date,
    class: travelClass,
  } = req.query;

  const src  = (sourceCode || from  || '').trim().toUpperCase();
  const dest = (destinationCode || to || '').trim().toUpperCase();

  // Return 400 explicitly — do NOT let a plain Error bubble to asyncHandler
  if (!src || !dest) {
    return res
      .status(400)
      .json({ success: false, message: 'sourceCode (or from) and destinationCode (or to) are required' });
  }

  const data = await trainService.search({ sourceCode: src, destinationCode: dest, date, class: travelClass });
  return apiResponse(res, data, 'Trains found successfully', 200, { count: data.length });
});

// ─── CRUD ────────────────────────────────────────────────────────────────────
exports.list = asyncHandler(async (req, res) => {
  const data = await trainService.list();
  apiResponse(res, data);
});

exports.get = asyncHandler(async (req, res) => {
  const train = await trainService.get(req.params.id);
  apiResponse(res, train);
});

exports.create = asyncHandler(async (req, res) => {
  const train = await trainService.create(req.body);
  audit.log(req, { action: 'train.create', resource: 'Train', resourceId: train._id });
  apiResponse(res, train, 'Train created successfully', 201);
});

exports.update = asyncHandler(async (req, res) => {
  const train = await trainService.update(req.params.id, req.body);
  audit.log(req, { action: 'train.update', resource: 'Train', resourceId: req.params.id });
  apiResponse(res, train, 'Train updated successfully');
});

exports.remove = asyncHandler(async (req, res) => {
  await trainService.remove(req.params.id);
  audit.log(req, { action: 'train.delete', resource: 'Train', resourceId: req.params.id, severity: 'warning' });
  apiResponse(res, null, 'Train deleted successfully');
});

exports.cancel     = asyncHandler(async (req, res) => apiResponse(res, await trainService.cancel(req.params.id),     'Train cancelled'));
exports.suspend    = asyncHandler(async (req, res) => apiResponse(res, await trainService.suspend(req.params.id),    'Train suspended'));
exports.reschedule = asyncHandler(async (req, res) => apiResponse(res, await trainService.reschedule(req.params.id, req.body), 'Train rescheduled'));

// ─── CSV Import ──────────────────────────────────────────────────────────────
exports.importCSV = asyncHandler(async (req, res) => {
  if (!req.file) return apiResponse(res, null, 'No CSV file uploaded', 400);

  const rows = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (d) => rows.push(d))
      .on('end', resolve)
      .on('error', reject);
  });

  try { fs.unlinkSync(req.file.path); } catch (e) { console.error('Temp file delete error:', e); }

  const created = await trainService.bulkImport(rows);
  apiResponse(res, { inserted: created.length, totalProcessed: rows.length }, 'CSV imported successfully');
});