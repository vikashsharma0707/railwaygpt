const router  = require('express').Router();
const c       = require('../controllers/policy.controller');
const { protect }      = require('../middleware/auth');
const { requireRole }  = require('../middleware/rbac');
const multer  = require('multer');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

// ── Admin only routes ─────────────────────────────────────────────────────────
router.use(protect, requireRole('admin'));

// Policies
router.get   ('/policies',          c.listPolicies);
router.post  ('/policies',          c.createPolicy);
router.put   ('/policies/:id',      c.updatePolicy);
router.delete('/policies/:id',      c.deletePolicy);

// FAQs
router.get   ('/faqs',              c.listFAQs);
router.post  ('/faqs',              c.createFAQ);
router.put   ('/faqs/:id',          c.updateFAQ);
router.delete('/faqs/:id',          c.deleteFAQ);

// PDF Documents
router.post  ('/documents',         upload.single('file'), c.uploadPDF);
router.get   ('/documents',         c.listDocuments);
router.delete('/documents/:id',     c.deleteDocument);
router.get   ('/documents/:id/status', c.documentStatus);

// One-time seed
router.post  ('/seed',              c.seedPolicies);

module.exports = router;