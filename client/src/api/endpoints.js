// // import api from './axios';
// // export const authApi = {
// //   login: (data) => api.post('/auth/login', data),
// //   register: (data) => api.post('/auth/register', data),
// //   me: () => api.get('/auth/me'),
// //   logout: (refreshToken) => api.post('/auth/logout', { refreshToken }),
// //   forgot: (email) => api.post('/auth/forgot-password', { email }),
// //   reset: (token, password) => api.post('/auth/reset-password', { token, password }),
// //   changePassword: (data) => api.post('/auth/change-password', data),
// //   updateProfile: (data) => api.put('/auth/profile', data),
// // };
// // export const trainApi = {
// //   search: (params) => api.get('/trains/search', { params }),
// //   list: () => api.get('/trains'),
// //   get: (id) => api.get(`/trains/${id}`),
// //   create: (data) => api.post('/trains', data),
// //   update: (id, data) => api.put(`/trains/${id}`, data),
// //   remove: (id) => api.delete(`/trains/${id}`),
// // };
// // export const bookingApi = {
// //   create: (data) => api.post('/bookings', data),
// //   mine: () => api.get('/bookings/mine'),
// //   byPNR: (pnr) => api.get(`/bookings/pnr/${pnr}`),
// //   byId: (id) => api.get(`/bookings/${id}`),
// //   cancel: (id) => api.post(`/bookings/${id}/cancel`),
// //   ticketUrl: (id) => `${api.defaults.baseURL}/bookings/${id}/ticket.pdf`,
// //   listAll: () => api.get('/bookings'),
// // };
// // export const paymentApi = {
// //   order: (bookingId) => api.post('/payments/order', { bookingId }),
// //   verify: (data) => api.post('/payments/verify', data),
// //   mine: () => api.get('/payments/mine'),
// //   list: () => api.get('/payments'),
// //   refund: (id) => api.post(`/payments/${id}/refund`),
// // };
// // export const aiApi = {
// //   agents: () => api.get('/ai/agents'),
// //   chat: (payload) => api.post('/ai/chat', payload),
// //   conversations: () => api.get('/ai/conversations'),
// //   conversation: (id) => api.get(`/ai/conversations/${id}`),
// //   remove: (id) => api.delete(`/ai/conversations/${id}`),
// //   streamUrl: () => `${api.defaults.baseURL}/ai/chat/stream`,
// // };
// // export const knowledgeApi = {
// //   list: () => api.get('/knowledge'),
// //   search: (q) => api.get('/knowledge/search', { params: { q } }),
// //   upload: (data) => api.post('/knowledge', data),
// //   remove: (id) => api.delete(`/knowledge/${id}`),
// // };
// // export const notifApi = {
// //   list: () => api.get('/notifications'),
// //   read: (id) => api.put(`/notifications/${id}/read`),
// //   broadcast: (data) => api.post('/notifications/broadcast', data),
// // };
// // export const adminApi = {
// //   dashboard: () => api.get('/admin/dashboard'),
// //   analytics: () => api.get('/admin/analytics'),
// //   users: () => api.get('/admin/users'),
// //   block: (id) => api.post(`/admin/users/${id}/block`),
// //   unblock: (id) => api.post(`/admin/users/${id}/unblock`),
// //   audit: () => api.get('/admin/audit-logs'),
// //   agentLogs: () => api.get('/admin/agent-logs'),
// // };


// import api from './axios';

// export const authApi = {
//   login: (data) => api.post('/auth/login', data),
//   register: (data) => api.post('/auth/register', data),
//   me: () => api.get('/auth/me'),
//   logout: (refreshToken) => api.post('/auth/logout', { refreshToken }),
//   forgot: (email) => api.post('/auth/forgot-password', { email }),
//   reset: (token, password) => api.post('/auth/reset-password', { token, password }),
//   changePassword: (data) => api.post('/auth/change-password', data),
//   updateProfile: (data) => api.put('/auth/profile', data),
// };

// export const trainApi = {
//   search: (params) => api.get('/trains/search', { params }),
//   list: () => api.get('/trains'),
//   get: (id) => api.get(`/trains/${id}`),
//   create: (data) => api.post('/trains', data),
//   update: (id, data) => api.put(`/trains/${id}`, data),
//   remove: (id) => api.delete(`/trains/${id}`),
  
//   // Extra admin/train management APIs
//   cancel: (id) => api.post(`/trains/${id}/cancel`),
//   suspend: (id) => api.post(`/trains/${id}/suspend`),
//   reschedule: (id, data) => api.post(`/trains/${id}/reschedule`, data),
//   importCSV: (formData) => api.post('/trains/import', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   }),
//   popularRoutes: () => api.get('/trains/popular-routes'),   // for dashboard
// };

// export const bookingApi = {
//   create: (data) => api.post('/bookings', data),
//   mine: () => api.get('/bookings/mine'),
//   byPNR: (pnr) => api.get(`/bookings/pnr/${pnr}`),
//   byId: (id) => api.get(`/bookings/${id}`),
//   cancel: (id) => api.post(`/bookings/${id}/cancel`),
//   // ticketUrl: (id) => `${api.defaults.baseURL}/bookings/${id}/ticket.pdf`,
//   ticketUrl: (id) => {
//     const token = localStorage.getItem('access');
//     const baseUrl = `${api.defaults.baseURL}/bookings/${id}/ticket.pdf`;
//     return token ? `${baseUrl}?token=${encodeURIComponent(token)}` : baseUrl;
//   },
//   listAll: () => api.get('/bookings'),        // admin use
// };

// export const paymentApi = {
//   order: (bookingId) => api.post('/payments/order', { bookingId }),
//   verify: (data) => api.post('/payments/verify', data),
//   mine: () => api.get('/payments/mine'),
//   list: () => api.get('/payments'),
//   refund: (id) => api.post(`/payments/${id}/refund`),
// };

// export const aiApi = {
//   agents: () => api.get('/ai/agents'),
//   chat: (payload) => api.post('/ai/chat', payload),
//   conversations: () => api.get('/ai/conversations'),
//   conversation: (id) => api.get(`/ai/conversations/${id}`),
//   remove: (id) => api.delete(`/ai/conversations/${id}`),
//   streamUrl: () => `${api.defaults.baseURL}/ai/chat/stream`,
// };

// export const knowledgeApi = {
//   list: () => api.get('/knowledge'),
//   search: (q) => api.get('/knowledge/search', { params: { q } }),
//   upload: (data) => api.post('/knowledge', data),
//   remove: (id) => api.delete(`/knowledge/${id}`),
// };

// export const notifApi = {
//   list: () => api.get('/notifications'),
//   read: (id) => api.put(`/notifications/${id}/read`),
//   broadcast: (data) => api.post('/notifications/broadcast', data),
// };

// export const adminApi = {
//   dashboard: () => api.get('/admin/dashboard'),
//   analytics: () => api.get('/admin/analytics'),
//   users: () => api.get('/admin/users'),
//   block: (id) => api.post(`/admin/users/${id}/block`),
//   unblock: (id) => api.post(`/admin/users/${id}/unblock`),
//   audit: () => api.get('/admin/audit-logs'),
//   agentLogs: () => api.get('/admin/agent-logs'),
// };



/**
 * client/src/api/endpoints.js
 * Tumhara existing file + ragApi + policyApi ADD karo neeche
 */

import api from './axios';

// ── Existing APIs (mat chhedo) ─────────────────────────────────────────────

export const authApi = {
  login:          (data)          => api.post('/auth/login', data),
  register:       (data)          => api.post('/auth/register', data),
  me:             ()              => api.get('/auth/me'),
  logout:         (refreshToken)  => api.post('/auth/logout', { refreshToken }),
  forgot:         (email)         => api.post('/auth/forgot-password', { email }),
  reset:          (token, password) => api.post('/auth/reset-password', { token, password }),
  changePassword: (data)          => api.put('/auth/change-password', data),
  updateProfile:  (data)          => api.put('/auth/profile', data),
};

export const trainApi = {
  search:       (params) => api.get('/trains/search', { params }),
  list:         ()       => api.get('/trains'),
  get:          (id)     => api.get(`/trains/${id}`),
  create:       (data)   => api.post('/trains', data),
  update:       (id, data) => api.put(`/trains/${id}`, data),
  remove:       (id)     => api.delete(`/trains/${id}`),
  cancel:       (id)     => api.post(`/trains/${id}/cancel`),
  suspend:      (id)     => api.post(`/trains/${id}/suspend`),
  reschedule:   (id, data) => api.post(`/trains/${id}/reschedule`, data),
  importCSV:    (formData) => api.post('/trains/import', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  popularRoutes: ()      => api.get('/trains/popular-routes'),
};

export const bookingApi = {
  create:   (data) => api.post('/bookings', data),
  mine:     ()     => api.get('/bookings/mine'),
  byPNR:    (pnr)  => api.get(`/bookings/pnr/${pnr}`),
  byId:     (id)   => api.get(`/bookings/${id}`),
  cancel:   (id)   => api.post(`/bookings/${id}/cancel`),
  ticketUrl: (id)  => {
    const token   = localStorage.getItem('access');
    const baseUrl = `${api.defaults.baseURL}/bookings/${id}/ticket.pdf`;
    return token ? `${baseUrl}?token=${encodeURIComponent(token)}` : baseUrl;
  },
  ticketPDF: (id)  => api.get(`/bookings/${id}/ticket.pdf`, { responseType: 'blob' }),
  listAll:  ()     => api.get('/bookings'),
};

export const paymentApi = {
  order:  (bookingId) => api.post('/payments/order', { bookingId }),
  verify: (data)      => api.post('/payments/verify', data),
  mine:   ()          => api.get('/payments/mine'),
  list:   ()          => api.get('/payments'),
  refund: (id)        => api.post(`/payments/${id}/refund`),
};

export const aiApi = {
  agents:        ()        => api.get('/ai/agents'),
  chat:          (payload) => api.post('/ai/chat', payload),
  conversations: ()        => api.get('/ai/conversations'),
  conversation:  (id)      => api.get(`/ai/conversations/${id}`),
  remove:        (id)      => api.delete(`/ai/conversations/${id}`),
  streamUrl:     ()        => `${api.defaults.baseURL}/ai/chat/stream`,
};

export const notifApi = {
  list:      ()     => api.get('/notifications'),
  read:      (id)   => api.put(`/notifications/${id}/read`),
  broadcast: (data) => api.post('/notifications/broadcast', data),
};

export const adminApi = {
  dashboard:  () => api.get('/admin/dashboard'),
  analytics:  () => api.get('/admin/analytics'),
  users:      () => api.get('/admin/users'),
  block:      (id) => api.post(`/admin/users/${id}/block`),
  unblock:    (id) => api.post(`/admin/users/${id}/unblock`),
  audit:      () => api.get('/admin/audit-logs'),
  agentLogs:  () => api.get('/admin/agent-logs'),
};

// ── NEW: Policy + FAQ + PDF (Admin) ───────────────────────────────────────

export const policyApi = {
  // Policies
  listPolicies:   (params)   => api.get('/knowledge/policies', { params }),
  createPolicy:   (data)     => api.post('/knowledge/policies', data),
  updatePolicy:   (id, data) => api.put(`/knowledge/policies/${id}`, data),
  deletePolicy:   (id)       => api.delete(`/knowledge/policies/${id}`),

  // FAQs
  listFAQs:       (params)   => api.get('/knowledge/faqs', { params }),
  createFAQ:      (data)     => api.post('/knowledge/faqs', data),
  updateFAQ:      (id, data) => api.put(`/knowledge/faqs/${id}`, data),
  deleteFAQ:      (id)       => api.delete(`/knowledge/faqs/${id}`),

  // PDF Documents
  uploadDocument: (formData) => api.post('/knowledge/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  listDocuments:   ()        => api.get('/knowledge/documents'),
  deleteDocument:  (id)      => api.delete(`/knowledge/documents/${id}`),
  documentStatus:  (id)      => api.get(`/knowledge/documents/${id}/status`),

  // One-time seed
  seed:            ()        => api.post('/knowledge/seed'),
};

// ── NEW: RAG Chat (User) ───────────────────────────────────────────────────

export const ragApi = {
  ask:                (body) => api.post('/rag/ask', body),
  listConversations:  ()     => api.get('/rag/conversations'),
  getConversation:    (sid)  => api.get(`/rag/conversations/${sid}`),
  deleteConversation: (sid)  => api.delete(`/rag/conversations/${sid}`),
};