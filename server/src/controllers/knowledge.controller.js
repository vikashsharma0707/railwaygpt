const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/ApiResponse');
const rag = require('../rag/rag.service');

exports.upload = asyncHandler(async (req, res) => {
  const { title, category, tags, content } = req.body;
  const kb = await rag.ingest({
    title: title || req.file?.originalname,
    category,
    tags: tags ? tags.split(',').map(s => s.trim()) : [],
    content: content || (req.file ? require('fs').readFileSync(req.file.path, 'utf8') : ''),
    uploadedBy: req.user._id,
  });
  apiResponse(res, kb, 'Ingested', 201);
});

exports.search = asyncHandler(async (req, res) =>
  apiResponse(res, await rag.hybridSearch(req.query.q, Number(req.query.k) || 5)));

exports.list = asyncHandler(async (req, res) => apiResponse(res, await rag.list()));
exports.remove = asyncHandler(async (req, res) => { await rag.remove(req.params.id); apiResponse(res, null, 'Deleted'); });
