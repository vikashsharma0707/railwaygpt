# Tatkal Booking — Integration Steps

No existing file is overwritten. Only 3 new files + 2 one-line additions.

## ════════════════════════════════════════════════════════
## STEP 1 — Copy new server files (exact paths)
## ════════════════════════════════════════════════════════

server/src/services/tatkal.service.js     ← copy
server/src/controllers/tatkal.controller.js ← copy
server/src/routes/tatkal.routes.js        ← copy

## ════════════════════════════════════════════════════════
## STEP 2 — server/src/routes/index.js — add ONE line
## ════════════════════════════════════════════════════════

Open your existing file (don't replace it), it currently looks like:

```js
const r = require('express').Router();

r.get('/health', (req, res) => res.json({ ok: true, ts: Date.now() }));
r.use('/auth', require('./auth.routes'));
r.use('/trains', require('./train.routes'));
r.use('/bookings', require('./booking.routes'));
r.use('/payments', require('./payment.routes'));
r.use('/ai', require('./ai.routes'));
r.use('/knowledge', require('./knowledge.routes'));
r.use('/notifications', require('./notification.routes'));
r.use('/admin', require('./admin.routes'));
r.use('/knowledge', require('./policy.routes'));
r.use('/rag',       require('./rag.routes'));

module.exports = r;
```

Add this ONE line anywhere before `module.exports = r;`:

```js
r.use('/tatkal', require('./tatkal.routes'));
```

## ════════════════════════════════════════════════════════
## STEP 3 — Copy new client file
## ════════════════════════════════════════════════════════

client/src/pages/user/TatkalBooking.jsx   ← copy

## ════════════════════════════════════════════════════════
## STEP 4 — client/src/App.jsx — add ONE import + ONE route
## ════════════════════════════════════════════════════════

Add import near your other user page imports:

```js
import TatkalBooking from './pages/user/TatkalBooking.jsx';
```

Add the route inside your <ProtectedRoute /> block (where Booking/Payment routes are):

```jsx
<Route element={<ProtectedRoute />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="book/:trainId" element={<Booking />} />
  <Route path="tatkal/:trainId" element={<TatkalBooking />} />   {/* ← ADD THIS LINE */}
  <Route path="pay/:bookingId" element={<Payment />} />
  ...
</Route>
```

## ════════════════════════════════════════════════════════
## STEP 5 — (Optional) client/src/api/endpoints.js — cleaner API
## ════════════════════════════════════════════════════════

The TatkalBooking.jsx page already works standalone (it defines its own
inline tatkalApi using your existing axios instance). If you'd prefer
it centralized like your other APIs, add this to endpoints.js:

```js
export const tatkalApi = {
  availability: (params) => api.get('/tatkal/availability', { params }),
  windowStatus: (params) => api.get('/tatkal/window-status', { params }),
  book:         (data)   => api.post('/tatkal/book', data),
};
```

Then in TatkalBooking.jsx replace:
```js
import api from '../../api/axios';
const tatkalApi = { ... };
```
with:
```js
import { tatkalApi } from '../../api/endpoints';
```

## ════════════════════════════════════════════════════════
## STEP 6 — How to navigate INTO Tatkal booking from TrainSearch
## ════════════════════════════════════════════════════════

In your TrainSearch.jsx, wherever you show class options (SL/3A/2A/CC),
add a "Book Tatkal" button next to the regular "Book Now" button:

```jsx
<button
  onClick={() => navigate(`/tatkal/${train._id}`, {
    state: {
      class:    selectedClass,     // 'SL' | '3A' | '2A' | 'CC' | '2S'
      date:     searchDate,        // 'YYYY-MM-DD'
      fromCode: train.sourceCode,
      toCode:   train.destinationCode,
    },
  })}
  className="rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-3 py-1.5"
>
  ⚡ Tatkal
</button>
```

If you don't want to touch TrainSearch.jsx right now, the page also
works with URL query params as fallback:

```
/tatkal/64f8a1.../?class=SL&date=2026-07-01&from=BCT&to=NDLS
```

## ════════════════════════════════════════════════════════
## WHAT THIS REUSES vs WHAT'S NEW
## ════════════════════════════════════════════════════════

REUSED (zero changes needed):
  - Booking model            (quota: 'TQ' already in your QUOTAS enum)
  - Train model               (inventory, fare — read only)
  - generatePNR() util
  - protect middleware
  - asyncHandler, apiResponse, ApiError utils
  - Your existing /pay/:bookingId flow — Tatkal booking redirects there
    after creation, same Razorpay payment flow as regular bookings

NEW (added, nothing overwritten):
  - tatkal.service.js   — surcharge calc + window timing + booking creation
  - tatkal.controller.js
  - tatkal.routes.js
  - TatkalBooking.jsx   — full UI with live countdown + fare breakdown

## ════════════════════════════════════════════════════════
## TEST IT
## ════════════════════════════════════════════════════════

```bash
# Restart server
cd server && npm run dev

# Test availability endpoint directly
curl "http://localhost:5000/api/tatkal/availability?trainId=<id>&class=SL&date=2026-07-01"

# Should return:
# { success: true, data: { baseFare, surcharge, tatkalFare, availableSeats, window: {...} } }
```