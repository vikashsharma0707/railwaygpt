// import { useEffect, useState } from 'react';
// import { notifApi } from '../../api/endpoints';
// import { useSocket } from '../../context/SocketContext.jsx';

// export default function Notifications() {
//   const [list, setList] = useState([]);
//   const socket = useSocket();
//   useEffect(() => { notifApi.list().then((r) => setList(r.data.data)); }, []);
//   useEffect(() => {
//     if (!socket) return;
//     const onN = (n) => setList((xs) => [n, ...xs]);
//     socket.on('notification', onN);
//     return () => socket.off('notification', onN);
//   }, [socket]);
//   return (
//     <div className="max-w-3xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold">Notifications</h1>
//       <div className="space-y-2 mt-4">
//         {list.length === 0 && <p className="text-slate-400">No notifications.</p>}
//         {list.map((n) => (
//           <div key={n._id} className="card">
//             <div className="flex items-center justify-between">
//               <div className="font-semibold">{n.title}</div>
//               <span className="chip">{n.type}</span>
//             </div>
//             <p className="text-sm text-slate-300 mt-1">{n.message}</p>
//             <div className="text-xs text-slate-500 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, BellOff, Zap, Info, CheckCircle,
  AlertCircle, XCircle, Train, CreditCard, Bot,
} from 'lucide-react';
import { notifApi } from '../../api/endpoints';
import { useSocket } from '../../context/SocketContext.jsx';

// ── Notification type config (UI only) ────────────────────────────────────────
const TYPE_CONFIG = {
  booking:  { icon: Train,       color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
  payment:  { icon: CreditCard,  color: 'text-emerald-400',bg: 'bg-emerald-500/10 border-emerald-500/20' },
  alert:    { icon: AlertCircle, color: 'text-amber-400',  bg: 'bg-amber-500/10  border-amber-500/20'  },
  ai:       { icon: Bot,         color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  success:  { icon: CheckCircle, color: 'text-emerald-400',bg: 'bg-emerald-500/10 border-emerald-500/20' },
  error:    { icon: XCircle,     color: 'text-rose-400',   bg: 'bg-rose-500/10   border-rose-500/20'   },
  info:     { icon: Info,        color: 'text-sky-400',    bg: 'bg-sky-500/10    border-sky-500/20'    },
};
const getType = (t = '') => TYPE_CONFIG[t?.toLowerCase()] ?? TYPE_CONFIG.info;

function timeAgo(date) {
  const sec = Math.floor((Date.now() - new Date(date)) / 1000);
  if (sec < 60)   return 'just now';
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400)return `${Math.floor(sec / 3600)}h ago`;
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] animate-pulse">
    <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-40 bg-white/[0.06] rounded" />
      <div className="h-3 w-full bg-white/[0.04] rounded" />
      <div className="h-3 w-20 bg-white/[0.03] rounded" />
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// ALL STATE, API, SOCKET LOGIC — COMPLETELY UNCHANGED
// ═══════════════════════════════════════════════════════════════
export default function Notifications() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  // ── LOGIC UNCHANGED ────────────────────────────────────────────────────────
  useEffect(() => {
    notifApi.list()
      .then((r) => setList(r.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!socket) return;
    const onN = (n) => setList((xs) => [n, ...xs]);
    socket.on('notification', onN);
    return () => socket.off('notification', onN);
  }, [socket]);

  // ── UI ─────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#020617] text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-violet-500/15 border border-violet-500/25
                            flex items-center justify-center">
              <Bell size={20} className="text-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Notifications</h1>
              <p className="text-slate-500 text-xs mt-0.5">
                {loading ? '—' : `${list.length} total`} · Live via Socket.IO
              </p>
            </div>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full
                          bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </motion.div>

        {/* Skeleton */}
        {loading && (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
          </div>
        )}

        {/* Empty */}
        {!loading && list.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-3xl bg-white/[0.04] border border-white/[0.06]
                            flex items-center justify-center mb-4">
              <BellOff size={26} className="text-slate-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-400 mb-1">No notifications</h3>
            <p className="text-slate-600 text-sm">You're all caught up!</p>
          </motion.div>
        )}

        {/* Notification list */}
        {!loading && list.length > 0 && (
          <div className="space-y-2.5">
            <AnimatePresence initial={false}>
              {list.map((n, idx) => {
                const { icon: Icon, color, bg } = getType(n.type);
                return (
                  <motion.div
                    key={n._id}
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 40, scale: 0.96 }}
                    transition={{ duration: 0.25, delay: idx < 8 ? idx * 0.04 : 0 }}
                    className="flex items-start gap-4 p-4 rounded-2xl
                               bg-[#0F172A]/70 border border-white/[0.06]
                               hover:border-white/[0.12] hover:bg-[#0F172A]/90
                               transition-all duration-200 group"
                  >
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center
                                    flex-shrink-0 ${bg}`}>
                      <Icon size={16} className={color} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-white leading-tight">{n.title}</p>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold
                                            border capitalize ${bg} ${color}`}>
                            {n.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{n.message}</p>
                      <p className="text-[10px] text-slate-600 mt-1.5 font-medium">
                        {timeAgo(n.createdAt)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}