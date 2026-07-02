/**
 * TatkalBooking.jsx
 * client/src/pages/user/TatkalBooking.jsx
 *
 * Route: /tatkal/:trainId  (add to App.jsx — see instructions)
 *
 * Flow:
 *  1. Shows train + class + journey date (passed via location.state from TrainSearch)
 *  2. Live countdown until Tatkal window opens
 *  3. Once open — shows live seat count + fare breakdown
 *  4. Passenger form (max 4, no concessions)
 *  5. Submit → tatkalApi.book() → redirect to payment
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FiClock, FiZap, FiUsers, FiPlus, FiTrash2,
  FiAlertTriangle, FiCheckCircle, FiArrowRight, FiTag,
} from 'react-icons/fi';
import api from '../../api/axios';

// ─── API (inline — see endpoints.js patch below for permanent home) ──────────
const tatkalApi = {
  availability: (params) => api.get('/tatkal/availability', { params }),
  windowStatus: (params) => api.get('/tatkal/window-status', { params }),
  book:         (data)   => api.post('/tatkal/book', data),
};

const CLASS_LABELS = { SL: 'Sleeper', '3A': 'AC 3-Tier', '2A': 'AC 2-Tier', CC: 'Chair Car', '2S': 'Second Sitting' };

// ─── Countdown timer ──────────────────────────────────────────────────────────
function useCountdown(opensAt) {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    if (!opensAt) return;
    const target = new Date(opensAt).getTime();

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setRemaining(0); return; }
      setRemaining(diff);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [opensAt]);

  if (remaining === null) return null;
  if (remaining <= 0) return { expired: true };

  const totalSec = Math.floor(remaining / 1000);
  return {
    expired: false,
    hours:   Math.floor(totalSec / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  };
}

// ─── Passenger row ────────────────────────────────────────────────────────────
function PassengerRow({ index, data, onChange, onRemove, canRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-indigo-400">Passenger {index + 1}</span>
        {canRemove && (
          <button onClick={() => onRemove(index)} className="text-rose-400 hover:text-rose-300 p-1">
            <FiTrash2 size={14}/>
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <input
          value={data.name} onChange={e => onChange(index, 'name', e.target.value)}
          placeholder="Full name" required
          className="col-span-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
        />
        <input
          type="number" min="1" max="120"
          value={data.age} onChange={e => onChange(index, 'age', e.target.value)}
          placeholder="Age" required
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
        />
        <select
          value={data.gender} onChange={e => onChange(index, 'gender', e.target.value)}
          className="rounded-lg border border-white/[0.08] bg-[#0A0F1E] px-3 py-2 text-sm text-white focus:outline-none"
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function TatkalBooking() {
  const { trainId } = useParams();
  const location     = useNavigate ? useLocation() : {};
  const navigate      = useNavigate();

  // Train context — passed from TrainSearch via navigate(state) OR query params fallback
  const params       = new URLSearchParams(window.location.search);
  const travelClass   = location.state?.class || params.get('class') || 'SL';
  const journeyDate   = location.state?.date  || params.get('date')  || new Date().toISOString().slice(0, 10);
  const fromCode      = location.state?.fromCode || params.get('from') || '';
  const toCode         = location.state?.toCode   || params.get('to')   || '';

  const [avail,     setAvail]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [submitting,setSubmitting]= useState(false);

  const [passengers, setPassengers] = useState([
    { name: '', age: '', gender: 'M', berthPreference: 'any' },
  ]);

  const countdown = useCountdown(avail?.window?.opensAt);

  // ── Fetch availability ──────────────────────────────────────────────────
  const loadAvailability = useCallback(async () => {
    try {
      const res = await tatkalApi.availability({ trainId, class: travelClass, date: journeyDate });
      setAvail(res.data?.data);
      setError(null);
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not load Tatkal availability');
    } finally {
      setLoading(false);
    }
  }, [trainId, travelClass, journeyDate]);

  useEffect(() => { loadAvailability(); }, [loadAvailability]);

  // Poll every 15s once window is close to opening / open — keeps seat count live
  useEffect(() => {
    if (!avail) return;
    const interval = setInterval(loadAvailability, 15000);
    return () => clearInterval(interval);
  }, [avail, loadAvailability]);

  // Re-fetch the moment countdown hits zero
  useEffect(() => {
    if (countdown?.expired) loadAvailability();
  }, [countdown?.expired, loadAvailability]);

  // ── Passenger handlers ──────────────────────────────────────────────────
  const updatePassenger = (i, field, value) => {
    setPassengers(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p));
  };

  const addPassenger = () => {
    if (passengers.length >= 4) return toast.error('Maximum 4 passengers allowed in Tatkal');
    setPassengers(prev => [...prev, { name: '', age: '', gender: 'M', berthPreference: 'any' }]);
  };

  const removePassenger = (i) => {
    setPassengers(prev => prev.filter((_, idx) => idx !== i));
  };

  // ── Submit booking ──────────────────────────────────────────────────────
  const handleBook = async () => {
    if (!avail?.window?.isOpen) {
      return toast.error('Tatkal booking window is not open yet');
    }
    if (passengers.some(p => !p.name.trim() || !p.age)) {
      return toast.error('Please fill all passenger details');
    }
    if (passengers.length > avail.availableSeats) {
      return toast.error(`Only ${avail.availableSeats} Tatkal seats left`);
    }

    setSubmitting(true);
    try {
      const res = await tatkalApi.book({
        trainId,
        journeyDate,
        class: travelClass,
        fromCode,
        toCode,
        passengers: passengers.map(p => ({ ...p, age: Number(p.age) })),
      });

      const booking = res.data?.data?.booking;
      toast.success(`Tatkal booking created! PNR: ${booking.pnr}`);
      navigate(`/pay/${booking._id}`);
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Tatkal booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen text-white px-4 py-8"
      style={{ background: 'linear-gradient(160deg,#060810 0%,#080D1A 60%,#060810 100%)' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <FiZap className="text-amber-400" size={20}/>
            <span className="text-[11px] font-mono text-amber-400 tracking-widest">TATKAL QUOTA</span>
          </div>
          <h1 className="text-2xl font-bold">Tatkal Booking</h1>
          <p className="text-sm text-slate-400 mt-1">
            {CLASS_LABELS[travelClass] || travelClass} · {new Date(journeyDate).toDateString()}
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="space-y-3">
            {[1,2].map(i => (
              <div key={i} className="h-24 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }}/>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-5 flex items-start gap-3">
            <FiAlertTriangle className="text-rose-400 flex-shrink-0 mt-0.5" size={18}/>
            <p className="text-sm text-rose-300">{error}</p>
          </div>
        )}

        {avail && !loading && (
          <>
            {/* Countdown / Status card */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border p-5 mb-4 ${
                avail.window.isOpen
                  ? 'border-emerald-500/30 bg-emerald-500/[0.07]'
                  : 'border-amber-500/30 bg-amber-500/[0.07]'
              }`}>
              <div className="flex items-center gap-2 mb-3">
                {avail.window.isOpen
                  ? <FiCheckCircle className="text-emerald-400" size={18}/>
                  : <FiClock className="text-amber-400" size={18}/>}
                <span className={`text-sm font-semibold ${avail.window.isOpen ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {avail.window.message}
                </span>
              </div>

              {!avail.window.isOpen && countdown && !countdown.expired && (
                <div className="flex items-center gap-3 justify-center py-3">
                  {[
                    { label: 'HRS', val: countdown.hours   },
                    { label: 'MIN', val: countdown.minutes },
                    { label: 'SEC', val: countdown.seconds },
                  ].map(t => (
                    <div key={t.label} className="text-center">
                      <div className="text-3xl font-bold font-mono text-white tabular-nums">
                        {String(t.val).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] text-slate-500 tracking-widest">{t.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {avail.window.isOpen && (
                <div className="flex items-center gap-2 mt-2">
                  <FiUsers className="text-emerald-400" size={14}/>
                  <span className="text-sm text-white font-mono">
                    {avail.availableSeats} / {avail.totalTatkalSeats} Tatkal seats available
                  </span>
                </div>
              )}
            </motion.div>

            {/* Fare breakdown */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <FiTag className="text-indigo-400" size={14}/>
                <span className="text-xs font-mono text-slate-400 tracking-widest">FARE BREAKDOWN</span>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Base fare</span><span className="font-mono">₹{avail.baseFare}</span>
                </div>
                <div className="flex justify-between text-amber-400">
                  <span>Tatkal surcharge</span><span className="font-mono">+₹{avail.surcharge}</span>
                </div>
                <div className="flex justify-between text-white font-semibold pt-1.5 border-t border-white/[0.08]">
                  <span>Per passenger</span><span className="font-mono">₹{avail.tatkalFare}</span>
                </div>
              </div>
            </motion.div>

            {/* Passenger form */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 tracking-widest">PASSENGERS (max 4)</span>
                {passengers.length < 4 && (
                  <button onClick={addPassenger}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                    <FiPlus size={12}/> Add
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {passengers.map((p, i) => (
                    <PassengerRow
                      key={i} index={i} data={p}
                      onChange={updatePassenger} onRemove={removePassenger}
                      canRemove={passengers.length > 1}
                    />
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-3 rounded-lg bg-amber-500/[0.06] border border-amber-500/15 px-3 py-2">
                <p className="text-[11px] text-amber-300/80">
                  ⚠️ No concessions applicable in Tatkal. Valid photo ID mandatory at travel.
                </p>
              </div>
            </motion.div>

            {/* Total + Submit */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-300">Total ({passengers.length} passenger{passengers.length > 1 ? 's' : ''})</span>
                <span className="text-2xl font-bold font-mono text-white">
                  ₹{avail.tatkalFare * passengers.length}
                </span>
              </div>

              <button
                onClick={handleBook}
                disabled={!avail.window.isOpen || submitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg,#D97706,#F59E0B)' }}
              >
                {submitting ? 'Booking...' : (
                  <>
                    <FiZap size={16}/>
                    {avail.window.isOpen ? 'Book Tatkal Now' : 'Window Not Open Yet'}
                    {avail.window.isOpen && <FiArrowRight size={14}/>}
                  </>
                )}
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}