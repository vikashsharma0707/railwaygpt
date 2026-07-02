// import { useState } from 'react';
// import { bookingApi } from '../../api/endpoints';

// export default function PNRStatus() {
//   const [pnr, setPnr] = useState('');
//   const [b, setB] = useState(null);
//   const [err, setErr] = useState('');
//   const lookup = async () => {
//     setErr(''); setB(null);
//     try { const r = await bookingApi.byPNR(pnr); setB(r.data.data); if (!r.data.data) setErr('Not found'); }
//     catch (e) { setErr(e?.response?.data?.message || 'Failed'); }
//   };
//   return (
//     <div className="max-w-3xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold">PNR Status</h1>
//       <div className="card mt-6 flex gap-2">
//         <input className="input" value={pnr} onChange={(e) => setPnr(e.target.value)} placeholder="Enter 10-digit PNR" />
//         <button className="btn-primary" onClick={lookup}>Check</button>
//       </div>
//       {err && <p className="text-rose-400 mt-3">{err}</p>}
//       {b && (
//         <div className="card mt-4">
//           <div className="font-semibold">{b.trainName} #{b.trainNumber}</div>
//           <div className="text-sm text-slate-400">{b.fromStation} → {b.toStation} • {new Date(b.journeyDate).toDateString()}</div>
//           <div className="mt-3 space-y-1 text-sm">
//             {b.passengers.map((p, i) => (
//               <div key={i}>{i+1}. {p.name} ({p.age}/{p.gender}) — {p.coach} / {p.seatNumber} — <b>{p.status}</b></div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingApi } from '../../api/endpoints';
import {
  Search, Train, MapPin, Calendar, User,
  Hash, CheckCircle, Clock, XCircle, AlertCircle, Loader2
} from 'lucide-react';

// ── Status badge config ───────────────────────────────────────────────────────
const STATUS_STYLE = {
  CONFIRMED: { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25', icon: CheckCircle },
  CNF:       { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25', icon: CheckCircle },
  WL:        { color: 'text-amber-400   bg-amber-500/10   border-amber-500/25',   icon: Clock       },
  RAC:       { color: 'text-sky-400     bg-sky-500/10     border-sky-500/25',     icon: AlertCircle },
  CANCELLED: { color: 'text-rose-400    bg-rose-500/10    border-rose-500/25',    icon: XCircle     },
};
const statusStyle = (s = '') => STATUS_STYLE[s?.toUpperCase()] ?? STATUS_STYLE.WL;

const GENDER_LABEL = { M: 'Male', F: 'Female', male: 'Male', female: 'Female' };

export default function PNRStatus() {
  // ── ALL LOGIC UNCHANGED ────────────────────────────────────────────────────
  const [pnr, setPnr] = useState('');
  const [b,   setB]   = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    setErr(''); setB(null); setLoading(true);
    try {
      const r = await bookingApi.byPNR(pnr);
      setB(r.data.data);
      if (!r.data.data) setErr('Not found');
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  // ── UI ─────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0B1120] py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl
                          bg-violet-500/15 border border-violet-500/25 mb-4">
            <Hash className="text-violet-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">PNR Status</h1>
          <p className="text-slate-400 text-sm mt-1.5">
            Enter your 10-digit PNR number to check booking status
          </p>
        </motion.div>

        {/* Search card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#151D2D]/80 border border-white/[0.06] rounded-2xl p-4
                     backdrop-blur-sm shadow-xl shadow-black/20 mb-4"
        >
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                value={pnr}
                onChange={(e) => setPnr(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && lookup()}
                placeholder="Enter 10-digit PNR number"
                maxLength={10}
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.06]
                           rounded-xl text-white text-sm placeholder-slate-500
                           focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/[0.03]
                           transition-all duration-200 font-mono tracking-widest"
              />
            </div>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={lookup}
              disabled={loading || pnr.length < 10}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                         bg-gradient-to-r from-violet-600 to-violet-500 text-white
                         hover:from-violet-500 hover:to-violet-400
                         disabled:opacity-40 disabled:cursor-not-allowed
                         shadow-lg shadow-violet-900/30 transition-all"
            >
              {loading
                ? <Loader2 size={15} className="animate-spin" />
                : <Search size={15} />}
              Check
            </motion.button>
          </div>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {err && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-4
                         bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
            >
              <XCircle size={15} className="flex-shrink-0" />
              {err}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result card */}
        <AnimatePresence>
          {b && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[#151D2D] border border-white/[0.06] rounded-2xl overflow-hidden
                         shadow-xl shadow-black/20"
            >
              {/* Train info header */}
              <div className="px-6 py-5 border-b border-white/[0.06]
                              bg-gradient-to-r from-violet-500/[0.06] to-transparent">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25
                                    flex items-center justify-center flex-shrink-0">
                      <Train size={18} className="text-violet-400" />
                    </div>
                    <div>
                      <h2 className="text-white font-semibold text-base">{b.trainName}</h2>
                      <p className="text-slate-400 text-xs font-mono mt-0.5">#{b.trainNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono
                                  bg-white/[0.04] border border-white/[0.08] text-slate-300">
                    <Hash size={10} className="text-slate-500" />
                    {pnr}
                  </div>
                </div>

                {/* Route + Date */}
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin size={13} className="text-violet-400" />
                    <span className="text-emerald-400 font-medium">{b.fromStation}</span>
                    <span className="text-slate-600">→</span>
                    <span className="text-violet-400 font-medium">{b.toStation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar size={13} className="text-slate-500" />
                    {new Date(b.journeyDate).toDateString()}
                  </div>
                </div>
              </div>

              {/* Passengers */}
              <div className="px-6 py-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Passengers · {b.passengers?.length}
                </p>
                <div className="space-y-2.5">
                  {b.passengers?.map((p, i) => {
                    const { color, icon: StatusIcon } = statusStyle(p.status);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-center gap-3 p-3.5 rounded-xl
                                   bg-white/[0.03] border border-white/[0.05]
                                   hover:bg-white/[0.05] transition-colors"
                      >
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20
                                        flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400">
                          {i + 1}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-white text-sm font-medium">{p.name}</span>
                            <span className="text-slate-500 text-xs">
                              {p.age}y · {GENDER_LABEL[p.gender] || p.gender}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <User size={10} className="text-slate-600" />
                              Coach <span className="text-slate-300 font-mono ml-0.5">{p.coach}</span>
                            </span>
                            <span className="text-slate-600">·</span>
                            <span>
                              Seat <span className="text-slate-300 font-mono">{p.seatNumber}</span>
                            </span>
                          </div>
                        </div>

                        {/* Status badge */}
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                          text-xs font-semibold border flex-shrink-0 ${color}`}>
                          <StatusIcon size={11} />
                          {p.status}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}