// import { useEffect, useState } from 'react';
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
// import { adminApi } from '../../api/endpoints';

// const COLORS = ['#2563eb','#10b981','#f59e0b','#ef4444','#a855f7','#06b6d4','#84cc16','#ec4899'];

// export default function AdminAnalytics() {
//   const [a, setA] = useState(null);
//   useEffect(() => { adminApi.analytics().then((r) => setA(r.data.data)); }, []);
//   if (!a) return <div className="p-10">Loading…</div>;
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
//       <h1 className="text-2xl font-bold">Analytics</h1>

//       <div className="card">
//         <h2 className="font-semibold mb-2">Daily Revenue</h2>
//         <ResponsiveContainer width="100%" height={260}>
//           <LineChart data={a.dailyRevenue}>
//             <XAxis dataKey="_id" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip />
//             <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div className="card">
//           <h2 className="font-semibold mb-2">Daily Bookings</h2>
//           <ResponsiveContainer width="100%" height={240}>
//             <BarChart data={a.dailyBookings}>
//               <XAxis dataKey="_id" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip />
//               <Bar dataKey="count" fill="#10b981" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="card">
//           <h2 className="font-semibold mb-2">Cancellations</h2>
//           <ResponsiveContainer width="100%" height={240}>
//             <BarChart data={a.cancellations}>
//               <XAxis dataKey="_id" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip />
//               <Bar dataKey="count" fill="#ef4444" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="card">
//         <h2 className="font-semibold mb-2">Agent Usage</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie data={a.agentUsage} dataKey="count" nameKey="_id" outerRadius={110}>
//               {a.agentUsage.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
//             </Pie>
//             <Legend /><Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }




import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, LineChart, Line,
} from 'recharts';
import { adminApi } from '../../api/endpoints';
import {
  IndianRupee, Ticket, XCircle, Bot, Percent, Trophy, RefreshCw, Download,
  Search, AlertTriangle, Inbox, Sparkles, TrendingUp, TrendingDown, Calendar,
  ArrowUpRight, ArrowDownRight, Flame,
} from 'lucide-react';

/* ----------------------------------------------------------------------- */
/* TOKENS                                                                   */
/* ----------------------------------------------------------------------- */
const C = {
  bg: '#050816',
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
const PIE_COLORS = [C.purple, C.cyan, C.emerald, C.amber, C.red, C.blue, '#84CC16', '#EC4899'];
const RANGES = [
  { key: '7', label: '7 Days' },
  { key: '30', label: '30 Days' },
  { key: '90', label: '90 Days' },
  { key: 'all', label: 'All Time' },
];

/* ----------------------------------------------------------------------- */
/* SHARED PRIMITIVES                                                       */
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

function Counter({ value = 0, prefix = '', suffix = '', decimals = 0, duration = 1 }) {
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
  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString('en-IN');
  return <span>{prefix}{formatted}{suffix}</span>;
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
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
      }} />
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

const TooltipStyle = { background: '#0B1120', border: `1px solid ${C.border}`, borderRadius: 12, color: '#fff', fontSize: 12, padding: '8px 12px' };

function ChartCard({ title, subtitle, children, action }) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between mb-4 gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-xs mt-0.5" style={{ color: C.sub }}>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </GlassCard>
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
/* DATE-RANGE HELPER — filters the real _id (date) keyed arrays client-side */
/* ----------------------------------------------------------------------- */
function filterByRange(arr, rangeKey) {
  if (!arr) return [];
  if (rangeKey === 'all') return arr;
  const days = Number(rangeKey);
  const cutoff = Date.now() - days * 86400000;
  return arr.filter((d) => {
    const t = new Date(d._id).getTime();
    return isNaN(t) ? true : t >= cutoff;
  });
}

/* ----------------------------------------------------------------------- */
/* DERIVED ANALYTICS — strictly from real fields: dailyRevenue, dailyBookings,
   cancellations, agentUsage. Nothing here is invented.                    */
/* ----------------------------------------------------------------------- */
function useAnalyticsDerived(data, rangeKey) {
  return useMemo(() => {
    if (!data) return null;

    const dailyRevenue = filterByRange(data.dailyRevenue, rangeKey);
    const dailyBookings = filterByRange(data.dailyBookings, rangeKey);
    const cancellations = filterByRange(data.cancellations, rangeKey);
    const agentUsage = data.agentUsage || [];

    const totalRevenue = dailyRevenue.reduce((s, d) => s + (d.total || 0), 0);
    const totalBookings = dailyBookings.reduce((s, d) => s + (d.count || 0), 0);
    const totalCancellations = cancellations.reduce((s, d) => s + (d.count || 0), 0);
    const totalAgentRequests = agentUsage.reduce((s, d) => s + (d.count || 0), 0);
    const cancellationRate = totalBookings ? (totalCancellations / totalBookings) * 100 : 0;

    const sortedRevenue = [...dailyRevenue].sort((a, b) => new Date(a._id) - new Date(b._id));
    const lastTwo = sortedRevenue.slice(-2);
    const revenueGrowth = lastTwo.length === 2 && lastTwo[0].total
      ? ((lastTwo[1].total - lastTwo[0].total) / lastTwo[0].total) * 100
      : 0;

    const sortedBookings = [...dailyBookings].sort((a, b) => new Date(a._id) - new Date(b._id));
    const lastTwoB = sortedBookings.slice(-2);
    const bookingGrowth = lastTwoB.length === 2 && lastTwoB[0].count
      ? ((lastTwoB[1].count - lastTwoB[0].count) / lastTwoB[0].count) * 100
      : 0;

    const highestRevenueDay = sortedRevenue.length ? [...sortedRevenue].sort((a, b) => b.total - a.total)[0] : null;
    const topAgent = agentUsage.length ? [...agentUsage].sort((a, b) => b.count - a.count)[0] : null;

    // Simple linear trend projection for the next point, computed transparently
    // from the real revenue series — clearly labeled as an estimate in the UI,
    // never presented as a guaranteed figure.
    let projectedNext = null;
    if (sortedRevenue.length >= 3) {
      const n = sortedRevenue.length;
      const xs = sortedRevenue.map((_, i) => i);
      const ys = sortedRevenue.map((d) => d.total || 0);
      const xMean = xs.reduce((a, b) => a + b, 0) / n;
      const yMean = ys.reduce((a, b) => a + b, 0) / n;
      const num = xs.reduce((s, x, i) => s + (x - xMean) * (ys[i] - yMean), 0);
      const den = xs.reduce((s, x) => s + (x - xMean) ** 2, 0) || 1;
      const slope = num / den;
      const intercept = yMean - slope * xMean;
      projectedNext = Math.max(Math.round(intercept + slope * n), 0);
    }

    const avgRevenue = sortedRevenue.length ? totalRevenue / sortedRevenue.length : 0;

    const cancellationTrend = cancellations.length >= 2
      ? (cancellations[cancellations.length - 1].count > cancellations[cancellations.length - 2].count ? 'rising' : 'falling')
      : 'steady';

    return {
      dailyRevenue: sortedRevenue,
      dailyBookings: sortedBookings,
      cancellations: [...cancellations].sort((a, b) => new Date(a._id) - new Date(b._id)),
      agentUsage,
      totalRevenue,
      totalBookings,
      totalCancellations,
      totalAgentRequests,
      cancellationRate,
      revenueGrowth,
      bookingGrowth,
      highestRevenueDay,
      topAgent,
      projectedNext,
      avgRevenue,
      cancellationTrend,
    };
  }, [data, rangeKey]);
}

/* ----------------------------------------------------------------------- */
/* HEADER                                                                   */
/* ----------------------------------------------------------------------- */
function useLiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function Header({ onRefresh, refreshing, onExportCsv, search, setSearch, range, setRange }) {
  const now = useLiveClock();
  return (
    <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }}
      className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-2">
          <span>📊</span> AI Analytics Center
        </h1>
        <p className="mt-1" style={{ color: C.sub }}>Real-time insights and business intelligence for RailwayGPT AI.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agent, date..."
            className="w-full pl-10 pr-3 py-2.5 rounded-2xl text-sm text-white placeholder:text-slate-500 outline-none border focus:border-white/20"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.border }}
          />
        </div>

        <div className="flex items-center rounded-2xl border p-1" style={{ borderColor: C.border, background: 'rgba(255,255,255,0.03)' }}>
          {RANGES.map((r) => (
            <button key={r.key} onClick={() => setRange(r.key)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium transition"
              style={range === r.key ? { background: C.purple, color: '#fff' } : { color: C.sub }}>
              {r.label}
            </button>
          ))}
        </div>

        <button onClick={onExportCsv} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium border transition hover:border-white/20"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.border }}>
          <Download size={15} /> Export CSV
        </button>

        <button onClick={onRefresh} disabled={refreshing} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition disabled:opacity-60"
          style={{ background: C.purple, color: '#fff', boxShadow: `0 8px 24px -8px ${C.purple}99` }}>
          <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} /> Refresh
        </button>

        <div className="hidden md:flex flex-col items-end px-4 py-2 rounded-2xl border text-right"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.border }}>
          <span className="text-sm font-mono text-white tabular-nums">{now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          <span className="text-[11px] text-slate-500">IST · Live</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ----------------------------------------------------------------------- */
/* KPI CARDS                                                                */
/* ----------------------------------------------------------------------- */
function KpiCard({ index, label, value, icon: Icon, color, prefix = '', suffix = '', decimals = 0, growth, series }) {
  const hasGrowth = typeof growth === 'number' && !isNaN(growth) && isFinite(growth);
  const positive = growth >= 0;
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 * index, ease: easeOut }}>
      <GlassCard glow={color} className="p-5 group">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 30% 0%, ${color}1A 0%, transparent 60%)` }} />
        <div className="relative flex items-center justify-between">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${color}1A`, border: `1px solid ${color}33` }}>
            <Icon size={20} style={{ color }} />
          </div>
          {hasGrowth && (
            <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: positive ? `${C.emerald}1A` : `${C.red}1A`, color: positive ? C.emerald : C.red }}>
              {positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
              {Math.abs(growth).toFixed(1)}%
            </span>
          )}
        </div>
        <div className="relative mt-5 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs" style={{ color: C.sub }}>{label}</p>
            <p className="text-2xl font-bold text-white mt-1 tracking-tight tabular-nums">
              <Counter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
            </p>
          </div>
          {series && series.length > 1 && <Sparkline data={series} color={color} />}
        </div>
      </GlassCard>
    </motion.div>
  );
}

/* ----------------------------------------------------------------------- */
/* AI INSIGHTS PANEL — only real, derived facts                            */
/* ----------------------------------------------------------------------- */
function InsightRow({ icon: Icon, color, label, value, sub }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}1A` }}>
        <Icon size={15} style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px]" style={{ color: C.sub }}>{label}</p>
        <p className="text-sm font-medium text-white truncate">{value}</p>
        {sub && <p className="text-[11px] mt-0.5" style={{ color: C.sub }}>{sub}</p>}
      </div>
    </div>
  );
}

function AIInsightsPanel({ d }) {
  if (!d) return null;
  const trendIcon = d.cancellationTrend === 'rising' ? TrendingUp : d.cancellationTrend === 'falling' ? TrendingDown : Sparkles;
  const trendColor = d.cancellationTrend === 'rising' ? C.red : d.cancellationTrend === 'falling' ? C.emerald : C.sub;

  return (
    <GlassCard className="p-6 h-full" glow={C.purple}>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${C.purple}26` }}>
          <Sparkles size={18} style={{ color: C.purple }} />
        </div>
        <h2 className="text-lg font-semibold text-white">AI Insights</h2>
      </div>

      <div className="space-y-3">
        <InsightRow icon={Trophy} color={C.amber} label="Highest Revenue Day"
          value={d.highestRevenueDay ? `${d.highestRevenueDay._id}` : 'No data yet'}
          sub={d.highestRevenueDay ? `₹${d.highestRevenueDay.total.toLocaleString('en-IN')}` : null} />
        <InsightRow icon={Bot} color={C.cyan} label="Top AI Agent"
          value={d.topAgent ? `${d.topAgent._id}` : 'No data yet'}
          sub={d.topAgent ? `${d.topAgent.count} requests` : null} />
        <InsightRow icon={trendIcon} color={trendColor} label="Cancellation Trend"
          value={d.cancellationTrend.charAt(0).toUpperCase() + d.cancellationTrend.slice(1)}
          sub={`${d.cancellationRate.toFixed(1)}% of bookings cancelled`} />
        <InsightRow icon={IndianRupee} color={C.emerald} label="Average Daily Revenue"
          value={`₹${Math.round(d.avgRevenue).toLocaleString('en-IN')}`} />
        {d.projectedNext !== null && (
          <InsightRow icon={Sparkles} color={C.purple} label="Next-Day Revenue Estimate"
            value={`₹${d.projectedNext.toLocaleString('en-IN')}`}
            sub="Simple trend projection from recent days — not a guarantee" />
        )}
      </div>
    </GlassCard>
  );
}

/* ----------------------------------------------------------------------- */
/* CHARTS                                                                   */
/* ----------------------------------------------------------------------- */
function RevenueChart({ data, average, projectedNext }) {
  const chartData = useMemo(() => {
    const rows = data.map((d) => ({ name: d._id, revenue: d.total }));
    if (projectedNext !== null && rows.length) {
      rows.push({ name: 'Next (est.)', projected: projectedNext, revenue: null });
    }
    return rows;
  }, [data, projectedNext]);

  if (!data.length) return <EmptyState title="No revenue data" subtitle="Revenue will appear once bookings are recorded." />;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.purple} stopOpacity={0.5} />
            <stop offset="100%" stopColor={C.purple} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="name" stroke={C.sub} fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke={C.sub} fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={TooltipStyle} formatter={(v, key) => [`₹${(v || 0).toLocaleString('en-IN')}`, key === 'projected' ? 'Estimate' : 'Revenue']} />
        <Area type="monotone" dataKey="revenue" stroke={C.purple} strokeWidth={2.5} fill="url(#revGrad)" connectNulls />
        <Line type="monotone" dataKey="projected" stroke={C.cyan} strokeWidth={2} strokeDasharray="6 4" dot={{ r: 3 }} />
        {average > 0 && <Line type="monotone" dataKey={() => average} stroke={C.amber} strokeWidth={1.5} strokeDasharray="2 4" dot={false} legendType="none" />}
      </AreaChart>
    </ResponsiveContainer>
  );
}

function BookingTrendChart({ data, granularity, setGranularity }) {
  const grouped = useMemo(() => {
    if (granularity === 'daily' || !data.length) return data.map((d) => ({ name: d._id, count: d.count }));
    const bucket = granularity === 'weekly' ? 7 : 30;
    const out = [];
    for (let i = 0; i < data.length; i += bucket) {
      const chunk = data.slice(i, i + bucket);
      out.push({ name: `${chunk[0]._id}${chunk.length > 1 ? ` → ${chunk[chunk.length - 1]._id}` : ''}`, count: chunk.reduce((s, d) => s + d.count, 0) });
    }
    return out;
  }, [data, granularity]);

  return (
    <>
      <div className="flex justify-end gap-1 mb-2">
        {['daily', 'weekly', 'monthly'].map((g) => (
          <button key={g} onClick={() => setGranularity(g)} className="text-[11px] px-2.5 py-1 rounded-lg font-medium transition capitalize"
            style={granularity === g ? { background: C.cyan, color: '#000' } : { color: C.sub, background: 'rgba(255,255,255,0.03)' }}>
            {g}
          </button>
        ))}
      </div>
      {grouped.length ? (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={grouped}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="name" stroke={C.sub} fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke={C.sub} fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={TooltipStyle} />
            <Bar dataKey="count" fill={C.cyan} radius={[8, 8, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState title="No booking data" />
      )}
    </>
  );
}

/* ----------------------------------------------------------------------- */
/* MINI HEATMAP CALENDAR — derived from real dailyBookings counts           */
/* ----------------------------------------------------------------------- */
function HeatmapCalendar({ data }) {
  if (!data.length) return <EmptyState title="No activity to map yet" />;
  const max = Math.max(...data.map((d) => d.count), 1);
  const intensity = (count) => {
    const pct = count / max;
    if (pct === 0) return 'rgba(255,255,255,0.04)';
    if (pct < 0.25) return `${C.purple}33`;
    if (pct < 0.5) return `${C.purple}66`;
    if (pct < 0.75) return `${C.purple}99`;
    return C.purple;
  };
  return (
    <div className="flex flex-wrap gap-1.5">
      {data.map((d) => (
        <div key={d._id} title={`${d._id}: ${d.count} bookings`} className="w-5 h-5 rounded-md" style={{ background: intensity(d.count) }} />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* LOADING / ERROR                                                          */
/* ----------------------------------------------------------------------- */
function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {Array.from({ length: 5 }).map((_, i) => <SkeletonBlock key={i} className="h-32" />)}
      </div>
      <SkeletonBlock className="h-80" />
      <div className="grid lg:grid-cols-2 gap-6">
        <SkeletonBlock className="h-72" />
        <SkeletonBlock className="h-72" />
      </div>
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
export default function AdminAnalytics() {
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [range, setRange] = useState('30');
  const [granularity, setGranularity] = useState('daily');

  const load = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      setError(null);
      const res = await adminApi.analytics();
      setRaw(res.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const d = useAnalyticsDerived(raw, range);

  const filteredAgentUsage = useMemo(() => {
    if (!d) return [];
    const q = search.toLowerCase();
    return d.agentUsage.filter((a) => !q || a._id?.toLowerCase().includes(q));
  }, [d, search]);

  const filteredRevenue = useMemo(() => {
    if (!d) return [];
    const q = search.toLowerCase();
    return d.dailyRevenue.filter((r) => !q || r._id?.toLowerCase().includes(q));
  }, [d, search]);

  const handleExportCsv = () => {
    if (!d) return;
    const lines = ['Date,Revenue,Bookings,Cancellations'];
    const dates = new Set([
      ...d.dailyRevenue.map((x) => x._id),
      ...d.dailyBookings.map((x) => x._id),
      ...d.cancellations.map((x) => x._id),
    ]);
    [...dates].sort().forEach((date) => {
      const rev = d.dailyRevenue.find((x) => x._id === date)?.total || 0;
      const book = d.dailyBookings.find((x) => x._id === date)?.count || 0;
      const cancel = d.cancellations.find((x) => x._id === date)?.count || 0;
      lines.push(`${date},${rev},${book},${cancel}`);
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${range}days-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const revenueSeries = d?.dailyRevenue.map((x) => x.total) || [];
  const bookingSeries = d?.dailyBookings.map((x) => x.count) || [];
  const cancelSeries = d?.cancellations.map((x) => x.count) || [];

  return (
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-10 py-8" style={{ color: '#fff', background: C.bg }}>
      <AmbientBackground />

      <div className="relative max-w-[1500px] mx-auto space-y-8">
        <Header
          onRefresh={() => load(true)}
          refreshing={refreshing}
          onExportCsv={handleExportCsv}
          search={search}
          setSearch={setSearch}
          range={range}
          setRange={setRange}
        />

        {loading && <LoadingState />}

        {!loading && error && <ErrorState message={error} onRetry={() => load()} />}

        {!loading && !error && (!raw || (!raw.dailyRevenue?.length && !raw.dailyBookings?.length && !raw.agentUsage?.length)) && (
          <GlassCard className="p-6">
            <EmptyState
              title="No analytics available"
              subtitle="Once bookings, payments, or AI agent activity start, your insights will show up here."
              icon={Inbox}
              action={
                <button onClick={() => load(true)} className="px-5 py-2.5 rounded-2xl text-sm font-medium text-white" style={{ background: C.purple }}>
                  Refresh
                </button>
              }
            />
          </GlassCard>
        )}

        {!loading && !error && d && (raw.dailyRevenue?.length || raw.dailyBookings?.length || raw.agentUsage?.length) && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              <KpiCard index={0} label="Total Revenue" value={d.totalRevenue} prefix="₹" icon={IndianRupee} color={C.purple} growth={d.revenueGrowth} series={revenueSeries} />
              <KpiCard index={1} label="Total Bookings" value={d.totalBookings} icon={Ticket} color={C.cyan} growth={d.bookingGrowth} series={bookingSeries} />
              <KpiCard index={2} label="Cancellations" value={d.totalCancellations} icon={XCircle} color={C.red} series={cancelSeries} />
              <KpiCard index={3} label="AI Agent Requests" value={d.totalAgentRequests} icon={Bot} color={C.emerald} />
              <KpiCard index={4} label="Cancellation Rate" value={d.cancellationRate} suffix="%" decimals={1} icon={Percent} color={C.amber} />
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <ChartCard title="Revenue Overview" subtitle={`Last ${range === 'all' ? 'all time' : `${range} days`} · dashed line = simple next-day trend estimate`}>
                  <RevenueChart data={filteredRevenue} average={d.avgRevenue} projectedNext={d.projectedNext} />
                </ChartCard>

                <div className="grid sm:grid-cols-2 gap-6">
                  <ChartCard title="Booking Trend" subtitle="Toggle granularity">
                    <BookingTrendChart data={d.dailyBookings} granularity={granularity} setGranularity={setGranularity} />
                  </ChartCard>

                  <ChartCard title="Cancellations" subtitle="Daily cancelled bookings">
                    {d.cancellations.length ? (
                      <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={d.cancellations.map((c) => ({ name: c._id, count: c.count }))}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                          <XAxis dataKey="name" stroke={C.sub} fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis stroke={C.sub} fontSize={11} tickLine={false} axisLine={false} />
                          <Tooltip contentStyle={TooltipStyle} />
                          <Bar dataKey="count" fill={C.red} radius={[8, 8, 0, 0]} maxBarSize={36} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <EmptyState title="No cancellations recorded" />
                    )}
                  </ChartCard>
                </div>

                <ChartCard title="AI Agent Usage" subtitle="Share of total agent requests" action={
                  <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${C.emerald}1A`, color: C.emerald }}>
                    {d.totalAgentRequests} total
                  </span>
                }>
                  {filteredAgentUsage.length ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={filteredAgentUsage} dataKey="count" nameKey="_id" innerRadius={70} outerRadius={110} paddingAngle={2}>
                          {filteredAgentUsage.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />)}
                        </Pie>
                        <Legend wrapperStyle={{ fontSize: 12, color: C.sub }} />
                        <Tooltip contentStyle={TooltipStyle} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyState title="No agent usage data" subtitle="Try clearing your search." />
                  )}
                </ChartCard>

                <ChartCard title="Booking Activity Heatmap" subtitle="Darker = more bookings that day">
                  <HeatmapCalendar data={d.dailyBookings} />
                </ChartCard>
              </div>

              <div className="lg:col-span-1">
                <AIInsightsPanel d={d} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}