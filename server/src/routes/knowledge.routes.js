const r = require('express').Router();
const c = require('../controllers/knowledge.controller');
const { protect } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const upload = require('../middleware/upload');

r.get('/search', c.search);
r.get('/', c.list);
r.post('/', protect, requireRole('admin'), upload.single('file'), c.upload);
r.delete('/:id', protect, requireRole('admin'), c.remove);

module.exports = r;
