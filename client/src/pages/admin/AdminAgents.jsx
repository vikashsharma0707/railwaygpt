// import { useEffect, useState } from 'react';
// import { adminApi, aiApi } from '../../api/endpoints';

// export default function AdminAgents() {
//   const [logs, setLogs] = useState([]);
//   const [agents, setAgents] = useState([]);
//   useEffect(() => {
//     adminApi.agentLogs().then((r) => setLogs(r.data.data));
//     aiApi.agents().then((r) => setAgents(r.data.data));
//   }, []);
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
//       <h1 className="text-2xl font-bold">Agents</h1>
//       <div className="card">
//         <h2 className="font-semibold mb-3">Catalog ({agents.length})</h2>
//         <div className="grid md:grid-cols-3 gap-2">
//           {agents.map((a) => (
//             <div key={a.key} className="rounded-lg border border-white/10 p-3">
//               <div className="font-medium">{a.name}</div>
//               <div className="text-xs text-slate-400">{a.category} · {a.key}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="card overflow-auto">
//         <h2 className="font-semibold mb-3">Recent agent runs</h2>
//         <table className="w-full text-sm">
//           <thead className="text-slate-400"><tr><th className="text-left">Time</th><th className="text-left">Agent</th><th className="text-left">User</th><th>Latency</th><th>Tools</th></tr></thead>
//           <tbody>
//             {logs.map((l) => (
//               <tr key={l._id} className="border-t border-white/5">
//                 <td className="py-2">{new Date(l.createdAt).toLocaleTimeString()}</td>
//                 <td>{l.agent}</td><td>{l.user?.name || 'guest'}</td>
//                 <td className="text-center">{l.latencyMs} ms</td>
//                 <td className="text-center">{l.toolCalls?.length || 0}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }





import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminApi, aiApi } from '../../api/endpoints';
import {
  Bot, Search, RefreshCw, Download, Filter, X, ChevronDown, ChevronLeft, ChevronRight,
  Zap, Gauge, Wrench, TrendingUp, TrendingDown, Activity, AlertTriangle, Inbox,
  Sparkles, ArrowUpDown, Clock, User as UserIcon, PlayCircle,
} from 'lucide-react';

/* ----------------------------------------------------------------------- */
/* TOKENS                                                                   */
/* ----------------------------------------------------------------------- */
const C = {
  bg: '#050816',
  surface: '#0F172A',
  card: '#111827',
  border: 'rgba(255,255,255,0.06)',
  purple: '#7C3AED',
  cyan: '#06B6D4',
  emerald: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  blue: '#3B82F6',
  sub: '#94A3B8',
};
const easeOut = [0.16, 1, 0.3, 1];

/* ----------------------------------------------------------------------- */
/* SHARED PRIMITIVES                                                        */
/* ----------------------------------------------------------------------- */
function GlassCard({ children, className = '', glow, ...rest }) {
  return (
    <motion.div
      className={`relative rounded-[24px] border backdrop-blur-xl overflow-hidden ${className}`}
      style={{ background: 'rgba(15,23,42,0.55)', borderColor: C.border }}
      whileHover={glow ? { y: -4, boxShadow: `0 20px 60px -20px ${glow}55` } : { y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value = 0, suffix = '', decimals = 0, duration = 1 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const from = display;
    const to = Number(value) || 0;
    const step = (ts) => {
      const t = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <span>{decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString('en-IN')}{suffix}</span>;
}

function Sparkline({ data, color }) {
  if (!data || data.length < 2) return <div className="h-8" />;
  const w = 96, h = 32;
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  const gid = `spark-${color.replace('#', '')}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#${gid})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AmbientBackground() {
  const particles = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    id: i, size: 2 + (i % 3), left: (i * 41) % 100, delay: (i % 9) * 0.7, dur: 9 + (i % 5) * 2,
  })), []);
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" style={{ background: C.bg }}>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
      />
      <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full opacity-40 blur-3xl"
        style={{ background: `radial-gradient(circle, ${C.purple}55 0%, transparent 65%)` }} />
      <motion.div className="absolute top-1/3 -left-20 w-[550px] h-[550px] rounded-full blur-3xl opacity-25"
        style={{ background: `radial-gradient(circle, ${C.cyan}50 0%, transparent 70%)` }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-20"
        style={{ background: `radial-gradient(circle, ${C.emerald}40 0%, transparent 70%)` }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
      {particles.map((p) => (
        <motion.span key={p.id} className="absolute rounded-full" style={{ width: p.size, height: p.size, left: `${p.left}%`, background: C.cyan, opacity: 0.45, boxShadow: `0 0 8px ${C.cyan}` }}
          initial={{ y: '110vh' }} animate={{ y: '-10vh' }} transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }} />
      ))}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 0%, transparent 50%, #050816 100%)' }} />
    </div>
  );
}

function EmptyState({ title, subtitle, icon: Icon = Inbox, action }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4" style={{ background: `${C.purple}1A` }}>
        <Icon size={28} style={{ color: C.purple }} />
      </div>
      <p className="text-white font-medium">{title}</p>
      {subtitle && <p className="text-sm mt-1" style={{ color: C.sub }}>{subtitle}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

function SkeletonBlock({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border ${className}`} style={{ background: C.card, borderColor: C.border }}>
      <motion.div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
        animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }} />
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* DERIVED ANALYTICS — computed only from real fields returned by the API  */
/* (agent.key/name/category, log.createdAt/agent/user/latencyMs/toolCalls) */
/* ----------------------------------------------------------------------- */
function useAgentAnalytics(agents, logs) {
  return useMemo(() => {
    const todayStr = new Date().toDateString();
    const todayLogs = logs.filter((l) => l.createdAt && new Date(l.createdAt).toDateString() === todayStr);

    const perAgent = {};
    logs.forEach((l) => {
      const key = l.agent || 'unknown';
      if (!perAgent[key]) perAgent[key] = { count: 0, totalLatency: 0, toolCalls: 0, todayCount: 0 };
      perAgent[key].count += 1;
      perAgent[key].totalLatency += l.latencyMs || 0;
      perAgent[key].toolCalls += l.toolCalls?.length || 0;
      if (l.createdAt && new Date(l.createdAt).toDateString() === todayStr) perAgent[key].todayCount += 1;
    });

    const agentStats = Object.entries(perAgent).map(([key, s]) => ({
      key,
      requests: s.count,
      avgLatency: s.count ? Math.round(s.totalLatency / s.count) : 0,
      toolCalls: s.toolCalls,
      todayCount: s.todayCount,
    }));

    const totalToolCalls = logs.reduce((sum, l) => sum + (l.toolCalls?.length || 0), 0);
    const avgLatencyOverall = logs.length ? Math.round(logs.reduce((s, l) => s + (l.latencyMs || 0), 0) / logs.length) : 0;
    const activeAgentKeys = new Set(todayLogs.map((l) => l.agent));

    const mostUsed = [...agentStats].sort((a, b) => b.requests - a.requests)[0];
    const slowest = [...agentStats].sort((a, b) => b.avgLatency - a.avgLatency)[0];
    const fastest = [...agentStats].filter((a) => a.avgLatency > 0).sort((a, b) => a.avgLatency - b.avgLatency)[0];
    const highestToolCalls = [...agentStats].sort((a, b) => b.toolCalls - a.toolCalls)[0];

    return {
      perAgentMap: perAgent,
      agentStats,
      todayLogsCount: todayLogs.length,
      totalToolCalls,
      avgLatencyOverall,
      activeAgentKeys,
      mostUsed,
      slowest,
      fastest,
      highestToolCalls,
    };
  }, [agents, logs]);
}

function latencyTier(ms) {
  if (!ms) return { label: 'No data', color: C.sub };
  if (ms < 800) return { label: 'Fast', color: C.emerald };
  if (ms < 2500) return { label: 'Moderate', color: C.amber };
  return { label: 'Slow', color: C.red };
}

/* ----------------------------------------------------------------------- */
/* HEADER                                                                   */
/* ----------------------------------------------------------------------- */
function Header({ onRefresh, refreshing, onExport, activeToday, totalAgents, search, setSearch, onOpenFilters, filterCount }) {
  return (
    <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }}
      className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-2">
          <span>🤖</span> AI Agents Control Center
        </h1>
        <p className="mt-1" style={{ color: C.sub }}>Monitor, analyze and manage every AI agent in RailwayGPT AI.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agents, logs, users..."
            className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-sm text-white placeholder:text-slate-500 outline-none border focus:border-white/20"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.border }}
          />
        </div>

        <button onClick={onOpenFilters} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium border transition"
          style={{ borderColor: filterCount ? `${C.purple}80` : C.border, background: filterCount ? `${C.purple}1F` : 'rgba(255,255,255,0.03)' }}>
          <Filter size={15} /> Filter
          {filterCount > 0 && <span className="w-5 h-5 rounded-full text-[11px] flex items-center justify-center" style={{ background: C.purple }}>{filterCount}</span>}
        </button>

        <button onClick={onExport} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium border transition hover:border-white/20"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.border }}>
          <Download size={15} /> Export
        </button>

        <button onClick={onRefresh} disabled={refreshing} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition disabled:opacity-60"
          style={{ background: C.purple, color: '#fff', boxShadow: `0 8px 24px -8px ${C.purple}99` }}>
          <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} /> Refresh
        </button>

        <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-2xl" style={{ background: `${C.emerald}1A`, color: C.emerald }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: C.emerald }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: C.emerald }} />
          </span>
          {activeToday}/{totalAgents} active today
        </span>
      </div>
    </motion.div>
  );
}

/* ----------------------------------------------------------------------- */
/* STAT CARDS                                                               */
/* ----------------------------------------------------------------------- */
function StatCard({ index, label, value, icon: Icon, color, suffix = '', series, footnote }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 * index, ease: easeOut }}>
      <GlassCard glow={color} className="p-5 group">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 30% 0%, ${color}1A 0%, transparent 60%)` }} />
        <div className="relative flex items-center justify-between">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${color}1A`, border: `1px solid ${color}33` }}>
            <Icon size={20} style={{ color }} />
          </div>
          {series && <Sparkline data={series} color={color} />}
        </div>
        <div className="relative mt-5">
          <p className="text-xs" style={{ color: C.sub }}>{label}</p>
          <p className="text-2xl font-bold text-white mt-1 tracking-tight tabular-nums">
            <Counter value={value} suffix={suffix} />
          </p>
          {footnote && <p className="text-[11px] mt-1" style={{ color: C.sub }}>{footnote}</p>}
        </div>
      </GlassCard>
    </motion.div>
  );
}

/* ----------------------------------------------------------------------- */
/* AGENT CARD                                                               */
/* ----------------------------------------------------------------------- */
const CATEGORY_COLORS = {
  search: C.cyan, booking: C.purple, prediction: C.amber, payment: C.emerald,
  support: C.blue, security: C.red, memory: C.purple, analytics: C.cyan,
};
function categoryColor(cat = '') {
  const key = Object.keys(CATEGORY_COLORS).find((k) => cat.toLowerCase().includes(k));
  return CATEGORY_COLORS[key] || C.sub;
}

function AgentCard({ agent, stats, isActive, index, onAction }) {
  const color = categoryColor(agent.category);
  const tier = latencyTier(stats?.avgLatency);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.4), ease: easeOut }}
    >
      <GlassCard glow={color} className="p-5 h-full flex flex-col">
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{
          background: `linear-gradient(135deg, ${color}10, transparent 50%)`,
        }} />
        <div className="relative flex items-start justify-between mb-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${color}1A`, border: `1px solid ${color}33` }}>
            <Bot size={20} style={{ color }} />
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: isActive ? C.emerald : C.sub }}>
            <span className="relative flex h-2 w-2">
              {isActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: C.emerald }} />}
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: isActive ? C.emerald : '#475569' }} />
            </span>
            {isActive ? 'Used today' : 'Idle today'}
          </span>
        </div>

        <h3 className="relative text-sm font-semibold text-white truncate">{agent.name}</h3>
        <div className="relative flex items-center gap-1.5 mt-1 mb-3">
          <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${color}1A`, color }}>
            {agent.category || 'general'}
          </span>
          <span className="text-[11px] font-mono text-slate-500 truncate">{agent.key}</span>
        </div>

        <div className="relative grid grid-cols-2 gap-2 mt-auto pt-3 border-t" style={{ borderColor: C.border }}>
          <div>
            <p className="text-[11px] text-slate-500">Requests</p>
            <p className="text-sm font-semibold text-white">{stats?.requests || 0}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-500">Avg Latency</p>
            <p className="text-sm font-semibold" style={{ color: tier.color }}>{stats?.avgLatency ? `${stats.avgLatency}ms` : '—'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[11px] text-slate-500">Tool Calls</p>
            <p className="text-sm font-semibold text-white">{stats?.toolCalls || 0}</p>
          </div>
        </div>

        <div className="relative flex gap-2 mt-4">
          <button onClick={() => onAction('view', agent)} className="flex-1 text-[11px] font-medium py-2 rounded-xl border transition hover:border-white/20"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.border, color: '#fff' }}>
            View Details
          </button>
          <button onClick={() => onAction('test', agent)} className="flex items-center justify-center gap-1 text-[11px] font-medium py-2 px-3 rounded-xl transition"
            style={{ background: `${C.emerald}1A`, color: C.emerald }}>
            <PlayCircle size={13} /> Test
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
}

/* ----------------------------------------------------------------------- */
/* AGENT DETAIL MODAL                                                       */
/* ----------------------------------------------------------------------- */
function AgentDetailModal({ agent, stats, onClose }) {
  if (!agent) return null;
  const color = categoryColor(agent.category);
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}
          className="relative w-full max-w-md rounded-3xl border backdrop-blur-2xl p-6"
          style={{ background: 'rgba(15,23,42,0.92)', borderColor: C.border }}>
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={18} /></button>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${color}1A` }}>
            <Bot size={22} style={{ color }} />
          </div>
          <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
          <p className="text-xs font-mono text-slate-500 mt-0.5">{agent.key}</p>
          <span className="inline-block text-[11px] px-2 py-0.5 rounded-full font-medium mt-2" style={{ background: `${color}1A`, color }}>
            {agent.category || 'general'}
          </span>

          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <p className="text-[11px] text-slate-500">Requests</p>
              <p className="text-lg font-bold text-white mt-0.5">{stats?.requests || 0}</p>
            </div>
            <div className="rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <p className="text-[11px] text-slate-500">Avg Latency</p>
              <p className="text-lg font-bold text-white mt-0.5">{stats?.avgLatency || 0}ms</p>
            </div>
            <div className="rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <p className="text-[11px] text-slate-500">Tool Calls</p>
              <p className="text-lg font-bold text-white mt-0.5">{stats?.toolCalls || 0}</p>
            </div>
          </div>

          <p className="text-xs mt-5" style={{ color: C.sub }}>
            Metrics reflect activity captured in agent execution logs. Run a manual test to verify the agent responds as expected.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ----------------------------------------------------------------------- */
/* AI INSIGHTS SIDEBAR                                                      */
/* ----------------------------------------------------------------------- */
function InsightRow({ icon: Icon, color, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}1A` }}>
        <Icon size={15} style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px]" style={{ color: C.sub }}>{label}</p>
        <p className="text-sm font-medium text-white truncate">{value}</p>
      </div>
    </div>
  );
}

function AIInsightsPanel({ analytics, agentsByKey }) {
  const nameOf = (key) => agentsByKey[key]?.name || key || '—';
  return (
    <GlassCard className="p-6 h-full" glow={C.purple}>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${C.purple}26` }}>
          <Sparkles size={18} style={{ color: C.purple }} />
        </div>
        <h2 className="text-lg font-semibold text-white">AI Insights</h2>
      </div>

      <div className="space-y-3">
        <InsightRow icon={TrendingUp} color={C.emerald} label="Most Used Agent" value={analytics.mostUsed ? `${nameOf(analytics.mostUsed.key)} (${analytics.mostUsed.requests})` : 'No data yet'} />
        <InsightRow icon={TrendingDown} color={C.red} label="Slowest Agent" value={analytics.slowest?.avgLatency ? `${nameOf(analytics.slowest.key)} (${analytics.slowest.avgLatency}ms)` : 'No data yet'} />
        <InsightRow icon={Zap} color={C.cyan} label="Fastest Agent" value={analytics.fastest ? `${nameOf(analytics.fastest.key)} (${analytics.fastest.avgLatency}ms)` : 'No data yet'} />
        <InsightRow icon={Wrench} color={C.amber} label="Highest Tool Calls" value={analytics.highestToolCalls ? `${nameOf(analytics.highestToolCalls.key)} (${analytics.highestToolCalls.toolCalls})` : 'No data yet'} />
        <InsightRow icon={Gauge} color={C.blue} label="Average Response" value={analytics.avgLatencyOverall ? `${analytics.avgLatencyOverall}ms` : 'No data yet'} />
        <InsightRow icon={Activity} color={C.purple} label="Today's AI Requests" value={analytics.todayLogsCount} />
      </div>

      <p className="text-[11px] mt-5 leading-relaxed" style={{ color: C.sub }}>
        Insights are computed directly from agent execution logs. Success/failure breakdown will appear here once executions start recording an outcome field.
      </p>
    </GlassCard>
  );
}

/* ----------------------------------------------------------------------- */
/* EXECUTIONS DATA GRID                                                     */
/* ----------------------------------------------------------------------- */
function ExecutionsGrid({ logs, search, agentFilter, agentsByKey }) {
  const [sortKey, setSortKey] = useState('time');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(0);
  const pageSize = 8;

  const filtered = useMemo(() => {
    let rows = logs.filter((l) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || l.agent?.toLowerCase().includes(q) || l.user?.name?.toLowerCase().includes(q);
      const matchesAgent = agentFilter === 'all' || l.agent === agentFilter;
      return matchesSearch && matchesAgent;
    });
    rows = [...rows].sort((a, b) => {
      let av, bv;
      if (sortKey === 'time') { av = new Date(a.createdAt || 0).getTime(); bv = new Date(b.createdAt || 0).getTime(); }
      else if (sortKey === 'latency') { av = a.latencyMs || 0; bv = b.latencyMs || 0; }
      else if (sortKey === 'tools') { av = a.toolCalls?.length || 0; bv = b.toolCalls?.length || 0; }
      else { av = 0; bv = 0; }
      return sortDir === 'asc' ? av - bv : bv - av;
    });
    return rows;
  }, [logs, search, agentFilter, sortKey, sortDir]);

  useEffect(() => { setPage(0); }, [search, agentFilter, sortKey, sortDir]);

  const pageCount = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const pageItems = filtered.slice(page * pageSize, page * pageSize + pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const SortHeader = ({ k, label, align = 'left' }) => (
    <th className={`p-3.5 font-medium cursor-pointer select-none ${align === 'right' ? 'text-right' : 'text-left'}`} onClick={() => toggleSort(k)}>
      <span className="inline-flex items-center gap-1">
        {label} <ArrowUpDown size={11} className="opacity-50" />
      </span>
    </th>
  );

  return (
    <GlassCard className="p-6">
      <h2 className="text-lg font-semibold text-white mb-5">Recent Agent Executions</h2>

      {pageItems.length ? (
        <>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="sticky top-0" style={{ color: C.sub }}>
                <tr>
                  <SortHeader k="time" label="Time" />
                  <th className="p-3.5 font-medium text-left">Agent</th>
                  <th className="p-3.5 font-medium text-left">User</th>
                  <SortHeader k="latency" label="Latency" align="right" />
                  <SortHeader k="tools" label="Tools" align="right" />
                  <th className="p-3.5 font-medium text-right">Performance</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((l, i) => {
                  const tier = latencyTier(l.latencyMs);
                  return (
                    <motion.tr key={l._id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                      className="hover:bg-white/[0.03] rounded-xl transition" style={{ borderTop: `1px solid ${C.border}` }}>
                      <td className="p-3.5 text-slate-400 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5"><Clock size={12} />{l.createdAt ? new Date(l.createdAt).toLocaleTimeString() : '—'}</span>
                      </td>
                      <td className="p-3.5 text-white font-medium">{agentsByKey[l.agent]?.name || l.agent}</td>
                      <td className="p-3.5 text-slate-300">
                        <span className="inline-flex items-center gap-1.5"><UserIcon size={12} className="text-slate-500" />{l.user?.name || 'guest'}</span>
                      </td>
                      <td className="p-3.5 text-right text-slate-300 tabular-nums">{l.latencyMs ?? '—'} ms</td>
                      <td className="p-3.5 text-right text-slate-300 tabular-nums">{l.toolCalls?.length || 0}</td>
                      <td className="p-3.5 text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${tier.color}1A`, color: tier.color }}>
                          {tier.label}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-5">
            <span className="text-xs" style={{ color: C.sub }}>
              Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length}
            </span>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}
                className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border disabled:opacity-40 text-slate-300" style={{ borderColor: C.border }}>
                <ChevronLeft size={13} /> Prev
              </button>
              <button onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))} disabled={page >= pageCount - 1}
                className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border disabled:opacity-40 text-slate-300" style={{ borderColor: C.border }}>
                Next <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <EmptyState title="No executions match your filters" subtitle="Try widening your search or clearing filters." />
      )}
    </GlassCard>
  );
}

/* ----------------------------------------------------------------------- */
/* FILTER PANEL                                                             */
/* ----------------------------------------------------------------------- */
function FilterPanel({ open, onClose, categories, categoryFilter, setCategoryFilter, agentFilter, setAgentFilter, agents, activityFilter, setActivityFilter }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden">
          <div className="rounded-2xl border p-5 grid sm:grid-cols-3 gap-4" style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.border }}>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Category</label>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-white outline-none">
                {categories.map((c) => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Agent</label>
              <select value={agentFilter} onChange={(e) => setAgentFilter(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-white outline-none">
                <option value="all">All Agents</option>
                {agents.map((a) => <option key={a.key} value={a.key}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Activity</label>
              <select value={activityFilter} onChange={(e) => setActivityFilter(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-white outline-none">
                <option value="all">All</option>
                <option value="active">Used today</option>
                <option value="idle">Idle today</option>
              </select>
            </div>
            <button onClick={onClose} className="sm:col-span-3 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 py-1">
              <X size={13} /> Close filters
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------------------------------------------------- */
/* LOADING / ERROR                                                          */
/* ----------------------------------------------------------------------- */
function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonBlock key={i} className="h-32" />)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonBlock key={i} className="h-44" />)}
      </div>
      <SkeletonBlock className="h-72" />
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <GlassCard className="p-10 max-w-md w-full" glow={C.red}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5" style={{ background: `${C.red}1A` }}>
          <AlertTriangle size={30} style={{ color: C.red }} />
        </motion.div>
        <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
        <p className="text-sm mb-7" style={{ color: C.sub }}>{message}</p>
        <button onClick={onRetry} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium text-white transition" style={{ background: C.purple }}>
          <RefreshCw size={16} /> Try Again
        </button>
      </GlassCard>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* MAIN PAGE                                                                */
/* ----------------------------------------------------------------------- */
export default function AdminAgents() {
  const [logs, setLogs] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [agentFilter, setAgentFilter] = useState('all');
  const [activityFilter, setActivityFilter] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState(null);

  const load = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      setError(null);
      const [logsRes, agentsRes] = await Promise.all([adminApi.agentLogs(), aiApi.agents()]);
      setLogs(logsRes.data.data || []);
      setAgents(agentsRes.data.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load agent data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const analytics = useAgentAnalytics(agents, logs);
  const agentsByKey = useMemo(() => Object.fromEntries(agents.map((a) => [a.key, a])), [agents]);
  const categories = useMemo(() => ['all', ...new Set(agents.map((a) => a.category).filter(Boolean))], [agents]);

  const filteredAgents = useMemo(() => {
    const q = search.toLowerCase();
    return agents.filter((a) => {
      const matchesSearch = !q || a.name?.toLowerCase().includes(q) || a.key?.toLowerCase().includes(q) || a.category?.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === 'all' || a.category === categoryFilter;
      const matchesAgentFilter = agentFilter === 'all' || a.key === agentFilter;
      const isActive = analytics.activeAgentKeys.has(a.key);
      const matchesActivity = activityFilter === 'all' || (activityFilter === 'active' ? isActive : !isActive);
      return matchesSearch && matchesCategory && matchesAgentFilter && matchesActivity;
    });
  }, [agents, search, categoryFilter, agentFilter, activityFilter, analytics.activeAgentKeys]);

  const filterCount = [categoryFilter !== 'all', agentFilter !== 'all', activityFilter !== 'all'].filter(Boolean).length;

  const requestsSparkline = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toDateString();
    });
    return days.map((day) => logs.filter((l) => l.createdAt && new Date(l.createdAt).toDateString() === day).length || 0.5);
  }, [logs]);

  const handleExport = () => {
    const header = 'Time,Agent,User,LatencyMs,ToolCalls\n';
    const rows = logs.map((l) => [
      l.createdAt ? new Date(l.createdAt).toISOString() : '',
      l.agent || '',
      l.user?.name || 'guest',
      l.latencyMs || 0,
      l.toolCalls?.length || 0,
    ].join(','));
    const blob = new Blob([header + rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agent-logs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAgentAction = (action, agent) => {
    if (action === 'view') setSelectedAgent(agent);
    if (action === 'test') {
      // Hook into a real test-run endpoint when one exists; logs locally for now.
      console.info(`Test run requested for agent: ${agent.key}`);
    }
  };

  return (
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-10 py-8" style={{ color: '#fff', background: C.bg }}>
      <AmbientBackground />

      <div className="relative max-w-[1500px] mx-auto space-y-8">
        <Header
          onRefresh={() => load(true)}
          refreshing={refreshing}
          onExport={handleExport}
          activeToday={analytics.activeAgentKeys.size}
          totalAgents={agents.length}
          search={search}
          setSearch={setSearch}
          onOpenFilters={() => setFiltersOpen((o) => !o)}
          filterCount={filterCount}
        />

        <FilterPanel
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          categories={categories}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          agentFilter={agentFilter}
          setAgentFilter={setAgentFilter}
          agents={agents}
          activityFilter={activityFilter}
          setActivityFilter={setActivityFilter}
        />

        {loading && <LoadingState />}

        {!loading && error && <ErrorState message={error} onRetry={() => load()} />}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              <StatCard index={0} label="Total Agents" value={agents.length} icon={Bot} color={C.purple} />
              <StatCard index={1} label="Active Today" value={analytics.activeAgentKeys.size} icon={Activity} color={C.emerald} />
              <StatCard index={2} label="Today's Requests" value={analytics.todayLogsCount} icon={Zap} color={C.cyan} series={requestsSparkline} />
              <StatCard index={3} label="Avg Latency" value={analytics.avgLatencyOverall} suffix="ms" icon={Gauge} color={C.amber} />
              <StatCard index={4} label="Tool Calls" value={analytics.totalToolCalls} icon={Wrench} color={C.blue} />
              <StatCard index={5} label="Total Executions" value={logs.length} icon={TrendingUp} color={C.red} footnote="all-time logged" />
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Agent Catalog <span style={{ color: C.sub }} className="font-normal text-sm">({filteredAgents.length})</span>
                </h2>
                {filteredAgents.length ? (
                  <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredAgents.map((agent, i) => (
                      <AgentCard
                        key={agent.key}
                        agent={agent}
                        stats={analytics.perAgentMap[agent.key]}
                        isActive={analytics.activeAgentKeys.has(agent.key)}
                        index={i}
                        onAction={handleAgentAction}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <GlassCard className="p-6">
                    <EmptyState title="No agents match your filters" subtitle="Try clearing search or filters." icon={Bot} />
                  </GlassCard>
                )}
              </div>

              <div className="lg:col-span-1">
                <AIInsightsPanel analytics={analytics} agentsByKey={agentsByKey} />
              </div>
            </div>

            {logs.length ? (
              <ExecutionsGrid logs={logs} search={search} agentFilter={agentFilter} agentsByKey={agentsByKey} />
            ) : (
              <GlassCard className="p-6">
                <EmptyState
                  title="No Agent Activity Yet"
                  subtitle="Once agents start handling requests, executions will show up here."
                  icon={Bot}
                  action={
                    <button onClick={() => load(true)} className="px-5 py-2.5 rounded-2xl text-sm font-medium text-white" style={{ background: C.purple }}>
                      Refresh
                    </button>
                  }
                />
              </GlassCard>
            )}
          </>
        )}
      </div>

      <AgentDetailModal agent={selectedAgent} stats={selectedAgent ? analytics.perAgentMap[selectedAgent.key] : null} onClose={() => setSelectedAgent(null)} />
    </div>
  );
}
