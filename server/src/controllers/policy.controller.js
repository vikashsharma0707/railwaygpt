const asyncHandler  = require('../utils/asyncHandler');
const ApiResponse   = require('../utils/ApiResponse');
const ApiError      = require('../utils/ApiError');
const Policy        = require('../models/Policy');
const FAQ           = require('../models/FAQ');
const RagDocument   = require('../models/RagDocument');
const ragPipeline   = require('../services/rag/ragPipeline');

// ══════════════════════════════════════════════════════════════════════════════
// POLICY CRUD
// ══════════════════════════════════════════════════════════════════════════════

exports.listPolicies = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = {};
  if (category) filter.category = category;

  const policies = await Policy.find(filter)
    .sort({ createdAt: -1 })
    .populate('addedBy', 'name')
    .lean();

  ApiResponse(res, policies, 'Policies fetched');
});

exports.createPolicy = asyncHandler(async (req, res) => {
  const { title, category, content, tags } = req.body;
  if (!title || !content) throw new ApiError(400, 'Title and content required');

  const policy = await Policy.create({
    title, category, content,
    tags:    Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean),
    addedBy: req.user._id,
  });

  // Index into RAG so it becomes searchable immediately
  await ragPipeline.indexPolicyOrFAQ({
    id:       policy._id.toString(),
    type:     'policy',
    title:    policy.title,
    content:  policy.content,
    category: policy.category,
  });

  ApiResponse(res, policy, 'Policy created', 201);
});

exports.updatePolicy = asyncHandler(async (req, res) => {
  const { title, category, content, tags, isActive } = req.body;

  const policy = await Policy.findByIdAndUpdate(
    req.params.id,
    {
      title, category, content, isActive,
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean),
    },
    { new: true }
  );
  if (!policy) throw new ApiError(404, 'Policy not found');

  // Re-index in RAG
  await ragPipeline.indexPolicyOrFAQ({
    id:       policy._id.toString(),
    type:     'policy',
    title:    policy.title,
    content:  policy.content,
    category: policy.category,
  });

  ApiResponse(res, policy, 'Policy updated');
});

exports.deletePolicy = asyncHandler(async (req, res) => {
  const policy = await Policy.findByIdAndDelete(req.params.id);
  if (!policy) throw new ApiError(404, 'Policy not found');

  await ragPipeline.deleteFromIndex(req.params.id);
  ApiResponse(res, null, 'Policy deleted');
});

// ══════════════════════════════════════════════════════════════════════════════
// FAQ CRUD
// ══════════════════════════════════════════════════════════════════════════════

exports.listFAQs = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = {};
  if (category) filter.category = category;

  const faqs = await FAQ.find(filter)
    .sort({ createdAt: -1 })
    .populate('addedBy', 'name')
    .lean();

  ApiResponse(res, faqs, 'FAQs fetched');
});

exports.createFAQ = asyncHandler(async (req, res) => {
  const { question, answer, category, tags } = req.body;
  if (!question || !answer) throw new ApiError(400, 'Question and answer required');

  const faq = await FAQ.create({
    question, answer, category,
    tags:    Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean),
    addedBy: req.user._id,
  });

  await ragPipeline.indexPolicyOrFAQ({
    id:      faq._id.toString(),
    type:    'faq',
    title:   faq.question,
    content: faq.answer,
    category: faq.category,
  });

  ApiResponse(res, faq, 'FAQ created', 201);
});

exports.updateFAQ = asyncHandler(async (req, res) => {
  const { question, answer, category, tags, isActive } = req.body;

  const faq = await FAQ.findByIdAndUpdate(
    req.params.id,
    {
      question, answer, category, isActive,
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean),
    },
    { new: true }
  );
  if (!faq) throw new ApiError(404, 'FAQ not found');

  await ragPipeline.indexPolicyOrFAQ({
    id:      faq._id.toString(),
    type:    'faq',
    title:   faq.question,
    content: faq.answer,
    category: faq.category,
  });

  ApiResponse(res, faq, 'FAQ updated');
});

exports.deleteFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) throw new ApiError(404, 'FAQ not found');

  await ragPipeline.deleteFromIndex(req.params.id);
  ApiResponse(res, null, 'FAQ deleted');
});

// ══════════════════════════════════════════════════════════════════════════════
// PDF UPLOAD — Admin uploads railway policy PDFs
// ══════════════════════════════════════════════════════════════════════════════

exports.uploadPDF = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file uploaded');

  const allowed = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ];
  if (!allowed.includes(req.file.mimetype)) {
    throw new ApiError(400, 'Only PDF, DOCX, TXT files allowed');
  }

  // Save to MongoDB
  const doc = await RagDocument.create({
    originalName: req.file.originalname,
    fileName:     `${Date.now()}_${req.file.originalname}`,
    mimeType:     req.file.mimetype,
    size:         req.file.size,
    fileData:     req.file.buffer,
    category:     req.body.category || 'general',
    uploadedBy:   req.user._id,
    status:       'processing',
  });

  // Process async — don't block HTTP response
  setImmediate(async () => {
    try {
      await ragPipeline.ingestDocument(doc);
    } catch (e) {
      console.error('[RAG] ingest failed:', e.message);
    }
  });

  ApiResponse(res, {
    _id:    doc._id,
    name:   doc.originalName,
    status: 'processing',
  }, 'File uploaded — processing started', 201);
});

exports.listDocuments = asyncHandler(async (req, res) => {
  const docs = await RagDocument.find()
    .select('-fileData')
    .sort({ createdAt: -1 })
    .populate('uploadedBy', 'name')
    .lean();
  ApiResponse(res, docs, 'Documents fetched');
});

exports.deleteDocument = asyncHandler(async (req, res) => {
  const doc = await RagDocument.findByIdAndDelete(req.params.id);
  if (!doc) throw new ApiError(404, 'Document not found');

  // Delete all chunks + vectors
  await ragPipeline.deleteDocument(req.params.id);
  ApiResponse(res, null, 'Document deleted');
});

exports.documentStatus = asyncHandler(async (req, res) => {
  const doc = await RagDocument.findById(req.params.id)
    .select('status pageCount chunkCount errorMessage originalName')
    .lean();
  if (!doc) throw new ApiError(404, 'Document not found');
  ApiResponse(res, doc, 'Status fetched');
});

// ══════════════════════════════════════════════════════════════════════════════
// SEED — Pre-load real railway policies (run once)
// ══════════════════════════════════════════════════════════════════════════════

exports.seedPolicies = asyncHandler(async (req, res) => {
  const existing = await Policy.countDocuments();
  if (existing > 0) {
    return ApiResponse(res, { skipped: true }, 'Policies already seeded');
  }

  const POLICIES = [
    {
      title: 'Tatkal Cancellation & Refund Policy',
      category: 'tatkal',
      tags: ['tatkal', 'cancel', 'refund'],
      content: `TATKAL TICKET CANCELLATION RULES:
1. Tatkal tickets are NON-REFUNDABLE if cancelled after chart preparation.
2. Before chart preparation — AC classes: flat charge ₹240 minimum. Non-AC: ₹180 minimum.
3. If train cancelled by Railways: Full refund automatically.
4. If train more than 3 hours late: Full refund by filing TDR within 72 hours.
5. Tatkal charges NOT refunded in any voluntary cancellation.
6. TDR deadline: Same day trains within 30 minutes of departure. Others within 72 hours.`,
    },
    {
      title: 'Regular Ticket Cancellation & Refund Policy',
      category: 'refund',
      tags: ['cancel', 'refund', 'charges'],
      content: `REGULAR TICKET CANCELLATION RULES:
More than 48 hours before departure: Minimum flat charge ₹240 (1A), ₹200 (2A), ₹180 (3A), ₹120 (SL).
Between 12 to 48 hours: 25% of total fare.
Between 4 to 12 hours: 50% of total fare.
Less than 4 hours or after departure: NO REFUND.
Waitlisted tickets not confirmed at chart time: Auto full refund within 5-7 days.
Refund timeline: Online payment 3-7 business days. Counter tickets only at station.`,
    },
    {
      title: 'Senior Citizen Concession Rules',
      category: 'concession',
      tags: ['senior citizen', 'concession', 'discount'],
      content: `SENIOR CITIZEN CONCESSION STATUS (2024):
Current Status: SUSPENDED since March 2020 (COVID-19). Not yet restored.
Full fare applicable for senior citizens currently.
Active concessions: Divyangjan 25-75%, Cancer patients 75%, War widows 75%.`,
    },
    {
      title: 'PNR Status Guide',
      category: 'pnr',
      tags: ['pnr', 'status', 'waitlist', 'rac'],
      content: `PNR STATUS MEANINGS:
CNF/Confirmed: Seat confirmed. Coach and seat shown after chart preparation.
RAC: Share a berth. Can board train. May get full berth if someone cancels.
WL (Waitlist): If not confirmed at chart time ticket auto-cancelled with full refund.
WL 1-10: High chance of confirmation. WL 11-30: Moderate. WL 30+: Low chance.
Chart preparation: Usually 4 hours before departure.`,
    },
    {
      title: 'Tatkal Booking Rules',
      category: 'tatkal',
      tags: ['tatkal', 'booking', 'timing'],
      content: `TATKAL BOOKING RULES:
AC Classes (2A, 3A, CC): Opens 1 day before journey at 10:00 AM.
Non-AC Classes (SL, 2S): Opens 1 day before journey at 11:00 AM.
Tatkal Charges: 2A 30% of basic fare (min ₹400 max ₹500). 3A (min ₹300 max ₹400). SL (min ₹100 max ₹200).
Restrictions: No concessions. Maximum 4 passengers per PNR. ID proof mandatory. Name change NOT allowed.`,
    },
  ];

  const FAQS = [
    { question: 'Ticket cancel karne ke baad kitne din mein refund aata hai?', answer: 'Online booked tickets ka refund 3-7 business days mein original payment method pe aata hai.', category: 'cancellation', tags: ['refund', 'days'] },
    { question: 'WL ticket confirm nahi hua toh kya hoga?', answer: 'Chart preparation ke time WL ticket confirm nahi hua toh ticket automatically cancel ho jaata hai aur full refund 5-7 din mein aata hai.', category: 'pnr', tags: ['waitlist', 'auto'] },
    { question: 'Tatkal ticket pe naam change ho sakta hai?', answer: 'Nahi. Tatkal ticket pe naam change bilkul allowed nahi hai. Original passenger ka valid photo ID mandatory hai.', category: 'tatkal', tags: ['name change'] },
    { question: 'Senior citizen ko abhi discount milta hai?', answer: '2024 mein senior citizen concession suspended hai. March 2020 se band hai. Full fare dena padta hai.', category: 'general', tags: ['senior citizen'] },
    { question: 'RAC ticket pe kitni seat milti hai?', answer: 'RAC mein ek side lower berth ka aadha hissa milta hai jo doosre RAC passenger ke saath share karte hain. Train mein board kar sakte ho.', category: 'pnr', tags: ['rac'] },
  ];

  const policyDocs = await Policy.insertMany(
    POLICIES.map(p => ({ ...p, addedBy: req.user._id }))
  );
  const faqDocs = await FAQ.insertMany(
    FAQS.map(f => ({ ...f, addedBy: req.user._id }))
  );

  // Index all into RAG
  for (const p of policyDocs) {
    await ragPipeline.indexPolicyOrFAQ({ id: p._id.toString(), type: 'policy', title: p.title, content: p.content, category: p.category });
  }
  for (const f of faqDocs) {
    await ragPipeline.indexPolicyOrFAQ({ id: f._id.toString(), type: 'faq', title: f.question, content: f.answer, category: f.category });
  }

  ApiResponse(res, { policies: policyDocs.length, faqs: faqDocs.length }, 'Seeded successfully');
});