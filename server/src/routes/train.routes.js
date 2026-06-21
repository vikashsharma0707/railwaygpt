// const r = require('express').Router();
// const c = require('../controllers/train.controller');
// const { protect } = require('../middleware/auth');
// const { requireRole } = require('../middleware/rbac');
// const upload = require('../middleware/upload');

// r.get('/search', c.search);
// r.get('/', c.list);
// r.get('/:id', c.get);

// r.post('/', protect, requireRole('admin'), c.create);
// r.put('/:id', protect, requireRole('admin'), c.update);
// r.delete('/:id', protect, requireRole('admin'), c.remove);
// r.post('/:id/cancel', protect, requireRole('admin'), c.cancel);
// r.post('/:id/suspend', protect, requireRole('admin'), c.suspend);
// r.post('/:id/reschedule', protect, requireRole('admin'), c.reschedule);
// r.post('/import/csv', protect, requireRole('admin'), upload.single('file'), c.importCSV);

// module.exports = r;


const router = require('express').Router();
const trainController = require('../controllers/train.controller');
const { protect } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const uploadMiddleware = require('../middleware/upload'); // Ya jahan bhi aapka multer middleware hai

// Public routes
router.get('/search', trainController.search);
router.get('/', trainController.list);
router.get('/:id', trainController.get);

// Protected Admin Routes
router.post('/', protect, requireRole('admin'), trainController.create);
router.put('/:id', protect, requireRole('admin'), trainController.update);
router.delete('/:id', protect, requireRole('admin'), trainController.remove);

router.post('/:id/cancel', protect, requireRole('admin'), trainController.cancel);
router.post('/:id/suspend', protect, requireRole('admin'), trainController.suspend);
router.post('/:id/reschedule', protect, requireRole('admin'), trainController.reschedule);

// CSV Import Route
router.post('/import', 
  protect, 
  requireRole('admin'), 
  uploadMiddleware.single('file'),   // ← Correct multer middleware
  trainController.importCSV
);

module.exports = router;