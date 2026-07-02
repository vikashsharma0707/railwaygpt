// // // import { useEffect, useState } from 'react';
// // // import toast from 'react-hot-toast';
// // // import { bookingApi } from '../../api/endpoints';
// // // import EmptyState from '../../components/ui/EmptyState.jsx';

// // // export default function MyTickets() {
// // //   const [list, setList] = useState([]);
// // //   useEffect(() => { bookingApi.mine().then((r) => setList(r.data.data)); }, []);
// // //   const cancel = async (id) => {
// // //     try { await bookingApi.cancel(id); setList((xs) => xs.map(x => x._id === id ? { ...x, status: 'cancelled' } : x)); toast.success('Cancelled'); }
// // //     catch (e) { toast.error(e?.response?.data?.message || 'Failed'); }
// // //   };
// // //   return (
// // //     <div className="max-w-5xl mx-auto px-4 py-10">
// // //       <h1 className="text-2xl font-bold">My Tickets</h1>
// // //       <div className="mt-6 space-y-3">
// // //         {list.length === 0 && <EmptyState title="No tickets yet" subtitle="Start by searching a train." />}
// // //         {list.map((b) => (
// // //           <div key={b._id} className="card flex flex-wrap items-center gap-4">
// // //             <div className="flex-1 min-w-[240px]">
// // //               <div className="font-semibold">{b.trainName} #{b.trainNumber}</div>
// // //               <div className="text-sm text-slate-400">{b.fromStation} → {b.toStation} • {new Date(b.journeyDate).toDateString()}</div>
// // //               <div className="text-xs text-slate-500">PNR: {b.pnr} • {b.class} • {b.passengers.length} pax</div>
// // //             </div>
// // //             <span className={`chip ${b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' : b.status === 'cancelled' ? 'bg-rose-500/20 text-rose-300' : ''}`}>{b.status}</span>
// // //             <a className="btn-ghost" href={bookingApi.ticketUrl(b._id)} target="_blank" rel="noreferrer">PDF</a>
// // //             {b.status !== 'cancelled' && <button className="btn-danger" onClick={() => cancel(b._id)}>Cancel</button>}
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }




// // import { useEffect, useState } from 'react';
// // import toast from 'react-hot-toast';
// // import { bookingApi } from '../../api/endpoints';
// // import EmptyState from '../../components/ui/EmptyState.jsx';

// // export default function MyTickets() {
// //   const [list, setList] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchTickets();
// //   }, []);

// //   const fetchTickets = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await bookingApi.mine();
// //       setList(res.data?.data || []);
// //     } catch (err) {
// //       toast.error("Failed to load tickets");
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const cancel = async (id) => {
// //     if (!window.confirm("Are you sure you want to cancel this ticket?")) return;
    
// //     try {
// //       await bookingApi.cancel(id);
// //       setList(prev => prev.map(ticket => 
// //         ticket._id === id ? { ...ticket, status: 'cancelled' } : ticket
// //       ));
// //       toast.success('Ticket cancelled successfully');
// //     } catch (e) {
// //       toast.error(e?.response?.data?.message || 'Cancellation failed');
// //     }
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto px-4 py-10">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-3xl font-bold">My Tickets</h1>
// //         <button onClick={fetchTickets} className="text-violet-400 hover:text-violet-300">
// //           Refresh
// //         </button>
// //       </div>

// //       {loading ? (
// //         <div className="text-center py-12">Loading your tickets...</div>
// //       ) : list.length === 0 ? (
// //         <EmptyState 
// //           title="No tickets yet" 
// //           subtitle="Start by searching and booking a train." 
// //         />
// //       ) : (
// //         <div className="space-y-4">
// //           {list.map((b) => (
// //             <div key={b._id} className="bg-gray-900 border border-gray-700 rounded-3xl p-6 flex flex-col md:flex-row md:items-center gap-6">
// //               <div className="flex-1">
// //                 <div className="font-semibold text-lg">{b.trainName} • #{b.trainNumber}</div>
// //                 <div className="text-slate-400 mt-1">
// //                   {b.fromStation} → {b.toStation}
// //                 </div>
// //                 <div className="text-sm text-slate-500 mt-1">
// //                   {new Date(b.journeyDate).toDateString()} • {b.class} Class • {b.passengers?.length || 0} Passengers
// //                 </div>
// //                 <div className="text-xs font-mono text-slate-400 mt-2">PNR: {b.pnr}</div>
// //               </div>

// //               <div className="flex flex-col items-end gap-3">
// //                 <span className={`px-4 py-1 rounded-full text-sm font-medium ${
// //                   b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
// //                   b.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 
// //                   'bg-yellow-500/20 text-yellow-400'
// //                 }`}>
// //                   {b.status?.toUpperCase()}
// //                 </span>

// //                 {/* <a 
// //                   href={bookingApi.ticketUrl(b._id)} 
// //                   target="_blank" 
// //                   rel="noreferrer"
// //                   className="btn-ghost px-5 py-2 text-sm"
// //                 >
// //                   Download PDF
// //                 </a> */}


// // <a 
// //   href={bookingApi.ticketUrl(b._id)} 
// //   target="_blank" 
// //   rel="noreferrer"
// //   className="btn-ghost px-5 py-2"
// // >
// //   Download PDF
// // </a>
// //                 {b.status !== 'cancelled' && b.status !== 'completed' && (
// //                   <button 
// //                     onClick={() => cancel(b._id)}
// //                     className="text-red-400 hover:text-red-500 text-sm font-medium"
// //                   >
// //                     Cancel Ticket
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }







// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Download, RefreshCw } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { bookingApi } from '../../api/endpoints';
// import EmptyState from '../../components/ui/EmptyState.jsx';

// export default function MyTickets() {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const fetchTickets = async () => {
//     try {
//       setLoading(true);
//       const res = await bookingApi.mine();
//       setList(res.data?.data || []);
//     } catch (err) {
//       toast.error("Failed to load tickets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cancel = async (id) => {
//     if (!window.confirm("Are you sure you want to cancel this ticket?")) return;
//     try {
//       await bookingApi.cancel(id);
//       setList(prev =>
//         prev.map(ticket =>
//           ticket._id === id ? { ...ticket, status: 'cancelled' } : ticket
//         )
//       );
//       toast.success('Ticket cancelled');
//     } catch (e) {
//       toast.error('Cancellation failed');
//     }
//   };

//   const statusStyles = {
//     confirmed: "bg-emerald-500/20 text-emerald-400",
//     cancelled: "bg-red-500/20 text-red-400",
//     completed: "bg-blue-500/20 text-blue-400",
//     waiting: "bg-amber-500/20 text-amber-400",
//     rac: "bg-purple-500/20 text-purple-400",
//   };

//   return (
//     <div className="min-h-screen bg-[#09090B] text-white px-4 py-10">
      
//       {/* HEADER */}
//       <div className="max-w-6xl mx-auto mb-10">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-semibold tracking-tight">
//               My Railway Tickets
//             </h1>
//             <p className="text-slate-400 mt-1">
//               Manage all your journeys in one place
//             </p>
//           </div>

//           <button
//             onClick={fetchTickets}
//             className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
//           >
//             <RefreshCw size={18} />
//           </button>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//           {[
//             { label: "Total", value: list.length },
//             { label: "Confirmed", value: list.filter(x => x.status === "confirmed").length },
//             { label: "Cancelled", value: list.filter(x => x.status === "cancelled").length },
//             { label: "Completed", value: list.filter(x => x.status === "completed").length },
//           ].map((s, i) => (
//             <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur">
//               <div className="text-2xl font-semibold">{s.value}</div>
//               <div className="text-sm text-slate-400">{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-6xl mx-auto space-y-6">

//         {/* LOADING SKELETON */}
//         {loading && (
//           <div className="space-y-4">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="h-40 rounded-3xl bg-white/5 animate-pulse" />
//             ))}
//           </div>
//         )}

//         {/* EMPTY */}
//         {!loading && list.length === 0 && (
//           <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
//             <h2 className="text-xl font-semibold">No tickets yet</h2>
//             <p className="text-slate-400 mt-2">
//               Book your first journey and it will appear here
//             </p>
//           </div>
//         )}

//         {/* TICKETS */}
//         {!loading && list.map((b, i) => (
//           <motion.div
//             key={b._id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05 }}
//             whileHover={{ y: -4 }}
//             className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur p-6 shadow-xl"
//           >
//             {/* TOP */}
//             <div className="flex justify-between items-start">
//               <div>
//                 <div className="text-lg font-semibold">
//                   {b.trainName}
//                 </div>
//                 <div className="text-slate-400 text-sm">
//                   #{b.trainNumber}
//                 </div>
//               </div>

//               <div className={`px-4 py-1 rounded-full text-sm ${statusStyles[b.status]}`}>
//                 {b.status?.toUpperCase()}
//               </div>
//             </div>

//             {/* ROUTE */}
//             <div className="flex items-center justify-between mt-6">
//               <div className="text-center">
//                 <div className="text-lg font-semibold">{b.fromStation}</div>
//                 <div className="text-xs text-slate-400">FROM</div>
//               </div>

//               <div className="flex-1 mx-4">
//                 <div className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent relative">
//                   <div className="absolute left-1/2 -translate-x-1/2 -top-1 text-xs text-slate-400">
//                     →
//                   </div>
//                 </div>
//               </div>

//               <div className="text-center">
//                 <div className="text-lg font-semibold">{b.toStation}</div>
//                 <div className="text-xs text-slate-400">TO</div>
//               </div>
//             </div>

//             {/* META */}
//             <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-400">
//               <div>{new Date(b.journeyDate).toDateString()}</div>
//               <div>{b.class} Class</div>
//               <div>{b.passengers?.length || 0} Passengers</div>
//             </div>

//             {/* FOOTER */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-4">

//               {/* PNR */}
//               <div className="bg-black/30 border border-white/10 rounded-xl px-4 py-2 font-mono text-sm">
//                 PNR: {b.pnr}
//               </div>

//               {/* ACTIONS */}
//               <div className="flex gap-3">
//                 <a
//                   href={bookingApi.ticketUrl(b._id)}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
//                 >
//                   <Download size={16} />
//                   Download
//                 </a>

//                 {b.status !== 'cancelled' && b.status !== 'completed' && (
//                   <button
//                     onClick={() => cancel(b._id)}
//                     className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>

//             </div>
//           </motion.div>
//         ))}

//       </div>
//     </div>
//   );
// }






import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, RefreshCw, Train, MapPin, Calendar,
  Clock, Users, Copy, CheckCheck, Zap, X,
  ChevronDown, ArrowRight, Ticket, Search,
  TrendingUp, AlertCircle, CheckCircle, XCircle, Filter
} from 'lucide-react';
import toast from 'react-hot-toast';
import { bookingApi } from '../../api/endpoints';

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS = {
  confirmed: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/25', icon: CheckCircle,  dot: 'bg-emerald-400', pulse: true  },
  cancelled:  { color: 'text-rose-400',   bg: 'bg-rose-500/10   border-rose-500/25',   icon: XCircle,      dot: 'bg-rose-400',   pulse: false },
  completed:  { color: 'text-sky-400',    bg: 'bg-sky-500/10    border-sky-500/25',    icon: CheckCircle,  dot: 'bg-sky-400',    pulse: false },
  waiting:    { color: 'text-amber-400',  bg: 'bg-amber-500/10  border-amber-500/25',  icon: AlertCircle,  dot: 'bg-amber-400',  pulse: true  },
  rac:        { color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/25', icon: AlertCircle,  dot: 'bg-violet-400', pulse: true  },
};
const getStatus = (s = '') => STATUS[s?.toLowerCase()] ?? STATUS.waiting;

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
    <div className="flex justify-between mb-6">
      <div className="space-y-2">
        <div className="h-5 w-44 bg-white/[0.07] rounded-lg" />
        <div className="h-3 w-24 bg-white/[0.04] rounded" />
      </div>
      <div className="h-7 w-24 bg-white/[0.06] rounded-full" />
    </div>
    <div className="flex items-center gap-4 mb-6">
      <div className="h-8 w-16 bg-white/[0.07] rounded-lg" />
      <div className="flex-1 h-px bg-white/[0.05]" />
      <div className="h-8 w-16 bg-white/[0.07] rounded-lg" />
    </div>
    <div className="flex gap-3">
      <div className="h-8 w-32 bg-white/[0.05] rounded-xl" />
      <div className="h-8 w-24 bg-white/[0.05] rounded-xl" />
    </div>
  </div>
);

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, accent }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-[#0F172A]/70 border border-white/[0.06] backdrop-blur-sm
               rounded-2xl p-4 hover:border-white/[0.12] transition-all"
  >
    <div className="flex items-start justify-between mb-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent}`}>
        <Icon size={16} />
      </div>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-xs text-slate-500 mt-0.5 font-medium">{label}</p>
  </motion.div>
);

// ── PNR Copy pill ─────────────────────────────────────────────────────────────
function PNRPill({ pnr }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(pnr).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl
                 bg-white/[0.04] border border-white/[0.08]
                 hover:border-violet-500/40 hover:bg-violet-500/[0.05]
                 transition-all duration-200 group"
    >
      <span className="font-mono text-xs text-slate-300 tracking-widest">{pnr}</span>
      <AnimatePresence mode="wait" initial={false}>
        {copied
          ? <motion.span key="ok"  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <CheckCheck size={12} className="text-emerald-400" />
            </motion.span>
          : <motion.span key="cp" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Copy size={12} className="text-slate-500 group-hover:text-violet-400 transition-colors" />
            </motion.span>
        }
      </AnimatePresence>
    </button>
  );
}

// ── Ticket Card ───────────────────────────────────────────────────────────────
function TicketCard({ b, onCancel, idx }) {
  const [expanded, setExpanded] = useState(false);
  const st = getStatus(b.status);
  const StatusIcon = st.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: idx * 0.07 }}
      whileHover={{ y: -2 }}
      className="relative rounded-[28px] border border-white/[0.07]
                 bg-gradient-to-br from-[#0F172A]/90 to-[#0B1120]/80
                 backdrop-blur-xl shadow-xl shadow-black/30
                 hover:border-white/[0.14] hover:shadow-violet-900/10
                 transition-all duration-300 overflow-hidden"
    >
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r
                      from-transparent via-violet-500/30 to-transparent" />

      <div className="p-6">
        {/* ── TOP ROW ──────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20
                            flex items-center justify-center flex-shrink-0">
              <Train size={18} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-white leading-tight">{b.trainName}</h3>
              <span className="font-mono text-[11px] text-slate-500">#{b.trainNumber}</span>
            </div>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full
                           border text-xs font-semibold flex-shrink-0 ${st.bg} ${st.color}`}>
            {st.pulse && (
              <span className={`w-1.5 h-1.5 rounded-full ${st.dot} animate-pulse`} />
            )}
            <StatusIcon size={11} />
            {b.status?.toUpperCase()}
          </div>
        </div>

        {/* ── ROUTE TIMELINE ───────────────────────────────────────── */}
        <div className="flex items-center gap-4 py-4 px-2
                        bg-white/[0.02] rounded-2xl border border-white/[0.04] mb-5">
          {/* Source */}
          <div className="text-center min-w-[72px]">
            <p className="text-2xl font-black text-white tracking-tight leading-none">
              {b.fromStation}
            </p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Origin</p>
          </div>

          {/* Line */}
          <div className="flex-1 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            <div className="flex-1 relative h-px">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/50 via-violet-500/50 to-violet-500/50" />
              {/* Moving train dot */}
              <motion.div
                animate={{ left: ['5%', '90%', '5%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-1.5 w-3 h-3 rounded-full bg-violet-400 shadow-lg shadow-violet-500/50"
              />
            </div>
            <div className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
          </div>

          {/* Destination */}
          <div className="text-center min-w-[72px]">
            <p className="text-2xl font-black text-white tracking-tight leading-none">
              {b.toStation}
            </p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Destination</p>
          </div>
        </div>

        {/* ── META CHIPS ───────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            { icon: Calendar, label: new Date(b.journeyDate).toDateString() },
            { icon: Clock,    label: b.departureTime || '—' },
            { icon: Train,    label: b.class ? `${b.class} Class` : '—' },
            { icon: Users,    label: `${b.passengers?.length || 0} Pax` },
          ].map(({ icon: Icon, label }) => (
            <div key={label}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs
                         text-slate-400 bg-white/[0.03] border border-white/[0.06]">
              <Icon size={11} className="text-slate-500" />
              {label}
            </div>
          ))}
        </div>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4
                        border-t border-white/[0.05]">
          {/* PNR */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider">PNR</span>
            <PNRPill pnr={b.pnr} />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {/* Expand */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setExpanded(v => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium
                         text-slate-400 bg-white/[0.04] border border-white/[0.07]
                         hover:bg-white/[0.07] transition-colors"
            >
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown size={13} />
              </motion.span>
              {expanded ? 'Less' : 'Details'}
            </motion.button>

            {/* Download */}
            <motion.a
              whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}
              href={bookingApi.ticketUrl(b._id)}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium
                         text-violet-400 bg-violet-500/10 border border-violet-500/25
                         hover:bg-violet-500/20 transition-colors"
            >
              <Download size={13} /> Download
            </motion.a>

            {/* Cancel */}
            {b.status !== 'cancelled' && b.status !== 'completed' && (
              <motion.button
                whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}
                onClick={() => onCancel(b._id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium
                           text-rose-400 bg-rose-500/10 border border-rose-500/25
                           hover:bg-rose-500/20 transition-colors"
              >
                <X size={13} /> Cancel
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* ── EXPANDED PANEL ───────────────────────────────────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/[0.06]"
          >
            <div className="p-6 space-y-5 bg-white/[0.01]">

              {/* Passengers */}
              {b.passengers?.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
                    Passengers
                  </p>
                  <div className="space-y-2">
                    {b.passengers.map((p, i) => {
                      const pst = getStatus(p.status);
                      const PSIcon = pst.icon;
                      return (
                        <div key={i}
                          className="flex items-center gap-3 p-3 rounded-xl
                                     bg-white/[0.03] border border-white/[0.05]">
                          <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20
                                          flex items-center justify-center text-xs font-bold text-violet-400 flex-shrink-0">
                            {i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{p.name}</p>
                            <p className="text-[11px] text-slate-500">
                              {p.age}y · {p.gender} · Coach {p.coach} · Seat {p.seatNumber}
                            </p>
                          </div>
                          <span className={`flex items-center gap-1 px-2 py-1 rounded-full
                                           text-[10px] font-semibold border ${pst.bg} ${pst.color}`}>
                            <PSIcon size={9} /> {p.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Fare */}
              {b.totalFare && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Fare
                  </p>
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl
                                  bg-white/[0.03] border border-white/[0.05]">
                    <span className="text-sm text-slate-400">Total Fare</span>
                    <span className="text-base font-bold text-white">₹{b.totalFare}</span>
                  </div>
                </div>
              )}

              {/* Booking time */}
              {b.createdAt && (
                <p className="text-[11px] text-slate-600">
                  Booked on {new Date(b.createdAt).toLocaleString('en-IN')}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
// ALL STATE, API CALLS, LOGIC — COMPLETELY UNCHANGED
export default function MyTickets() {
  const [list,    setList]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [filter,  setFilter]  = useState('all');

  useEffect(() => { fetchTickets(); }, []);

  // ── LOGIC UNCHANGED ────────────────────────────────────────────────────────
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await bookingApi.mine();
      setList(res.data?.data || []);
    } catch (err) {
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const cancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this ticket?')) return;
    try {
      await bookingApi.cancel(id);
      setList(prev =>
        prev.map(t => t._id === id ? { ...t, status: 'cancelled' } : t)
      );
      toast.success('Ticket cancelled');
    } catch (e) {
      toast.error('Cancellation failed');
    }
  };

  // Client-side filter (UI only, no API change)
  const filtered = list.filter(b => {
    const matchSearch =
      !search ||
      b.pnr?.includes(search) ||
      b.trainName?.toLowerCase().includes(search.toLowerCase()) ||
      b.fromStation?.toLowerCase().includes(search.toLowerCase()) ||
      b.toStation?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || b.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    total:     list.length,
    confirmed: list.filter(x => x.status === 'confirmed').length,
    cancelled: list.filter(x => x.status === 'cancelled').length,
    completed: list.filter(x => x.status === 'completed').length,
    waiting:   list.filter(x => x.status === 'waiting' || x.status === 'rac').length,
  };

  // ── UI ─────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">

      {/* ── HERO HEADER ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Aurora blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-30%] left-[-10%] w-[500px] h-[400px] rounded-full
                          bg-violet-800/20 blur-[120px]" />
          <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full
                          bg-indigo-800/15 blur-[130px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-violet-500/15 border border-violet-500/25
                                flex items-center justify-center">
                  <Ticket size={18} className="text-violet-400" />
                </div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
                  Travel Wallet
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                My Railway Tickets
              </h1>
              <p className="text-slate-400 text-sm mt-1.5 max-w-md">
                Manage, download and track all your train journeys in one place.
              </p>
            </div>

            <motion.button
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
              onClick={fetchTickets}
              disabled={loading}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08]
                         hover:bg-white/[0.10] transition-colors flex items-center justify-center
                         disabled:opacity-40"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin text-violet-400' : 'text-slate-400'} />
            </motion.button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-8">
            <StatCard icon={Ticket}       label="Total"     value={counts.total}     accent="bg-violet-500/10 text-violet-400" />
            <StatCard icon={CheckCircle}  label="Confirmed" value={counts.confirmed} accent="bg-emerald-500/10 text-emerald-400" />
            <StatCard icon={TrendingUp}   label="Waiting"   value={counts.waiting}   accent="bg-amber-500/10 text-amber-400" />
            <StatCard icon={XCircle}      label="Cancelled" value={counts.cancelled} accent="bg-rose-500/10 text-rose-400" />
            <StatCard icon={Zap}          label="Completed" value={counts.completed} accent="bg-sky-500/10 text-sky-400" />
          </div>
        </div>
      </div>

      {/* ── SEARCH + FILTER BAR ──────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-3 p-3
                        bg-[#0F172A]/70 border border-white/[0.06] rounded-2xl
                        backdrop-blur-sm">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by PNR, train, station..."
              className="w-full pl-9 pr-4 py-2 bg-white/[0.04] border border-white/[0.06]
                         rounded-xl text-sm text-white placeholder-slate-500
                         focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="appearance-none pl-8 pr-8 py-2 bg-white/[0.04] border border-white/[0.06]
                         rounded-xl text-sm text-slate-200 cursor-pointer
                         focus:outline-none focus:border-violet-500/50 transition-all min-w-[150px]"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="waiting">Waiting</option>
              <option value="rac">RAC</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>

          {(search || filter !== 'all') && (
            <button
              onClick={() => { setSearch(''); setFilter('all'); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs
                         text-slate-400 hover:text-white bg-white/[0.04]
                         border border-white/[0.06] hover:bg-white/[0.08] transition-colors"
            >
              <X size={12} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* ── TICKET LIST ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 space-y-4">

        {/* Skeleton */}
        {loading && [...Array(4)].map((_, i) => <SkeletonCard key={i} />)}

        {/* Empty */}
        {!loading && list.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-violet-500/10 border border-violet-500/20
                            flex items-center justify-center mb-5">
              <Train size={32} className="text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Tickets Yet</h3>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed mb-6">
              Book your first journey and it will appear here.
            </p>
            <a href="/trainsSearch"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                         bg-gradient-to-r from-violet-600 to-indigo-600 text-white
                         text-sm font-semibold hover:from-violet-500 hover:to-indigo-500
                         transition-all shadow-lg shadow-violet-900/30">
              <Search size={15} /> Search Trains <ArrowRight size={14} />
            </a>
          </motion.div>
        )}

        {/* No filter results */}
        {!loading && list.length > 0 && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-sm">No tickets match your filter.</p>
            <button
              onClick={() => { setSearch(''); setFilter('all'); }}
              className="mt-3 text-violet-400 text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Ticket cards */}
        {!loading && filtered.map((b, i) => (
          <TicketCard key={b._id} b={b} onCancel={cancel} idx={i} />
        ))}
      </div>
    </div>
  );
}