// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext.jsx';

// export default function Dashboard() {
//   const { user } = useAuth();
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
//       <p className="text-slate-400 mt-1">What would you like to do today?</p>
//       <div className="grid md:grid-cols-3 gap-4 mt-8">
//         <Link to="/trains" className="card hover:border-brand-500/50"><div className="text-3xl">🔎</div><div className="mt-2 font-semibold">Search Trains</div><div className="text-sm text-slate-400">Find trains across India.</div></Link>
//         <Link to="/assistant" className="card hover:border-brand-500/50"><div className="text-3xl">🤖</div><div className="mt-2 font-semibold">AI Assistant</div><div className="text-sm text-slate-400">Talk to RailwayGPT.</div></Link>
//         <Link to="/tickets" className="card hover:border-brand-500/50"><div className="text-3xl">🎫</div><div className="mt-2 font-semibold">My Tickets</div><div className="text-sm text-slate-400">View and download tickets.</div></Link>
//         <Link to="/pnr" className="card hover:border-brand-500/50"><div className="text-3xl">📍</div><div className="mt-2 font-semibold">PNR Status</div><div className="text-sm text-slate-400">Check any PNR.</div></Link>
//         <Link to="/trip-planner" className="card hover:border-brand-500/50"><div className="text-3xl">🧭</div><div className="mt-2 font-semibold">Trip Planner</div><div className="text-sm text-slate-400">Plan a journey with AI.</div></Link>
//         <Link to="/profile" className="card hover:border-brand-500/50"><div className="text-3xl">⚙️</div><div className="mt-2 font-semibold">Preferences</div><div className="text-sm text-slate-400">Berth, language, defaults.</div></Link>
//       </div>
//     </div>
//   );
// }










import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { motion } from 'framer-motion';
import {
  Search, Bot, Ticket, MapPin, Map, Settings,
  BarChart3, Train, ArrowRight, Zap, Brain,
  FileText, Shield, Database, Cpu, GitBranch,
  ChevronRight, Layers, Globe,
} from 'lucide-react';

// ── Stagger helper ────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: 'easeOut' },
});

// ── Quick action cards (same routes as original) ──────────────────────────────
const ACTIONS = [
  { to: '/trains',       icon: Search,   label: 'Search Trains',  desc: 'Find trains across India',         accent: 'from-violet-600/20 to-violet-900/5',   ring: 'group-hover:border-violet-500/50', iconBg: 'bg-violet-500/15 text-violet-400' },
  { to: '/assistant',    icon: Bot,      label: 'AI Assistant',   desc: 'Talk to RailwayGPT',               accent: 'from-indigo-600/20 to-indigo-900/5',   ring: 'group-hover:border-indigo-500/50', iconBg: 'bg-indigo-500/15 text-indigo-400' },
  { to: '/tickets',      icon: Ticket,   label: 'My Tickets',     desc: 'View and download tickets',        accent: 'from-emerald-600/20 to-emerald-900/5', ring: 'group-hover:border-emerald-500/50',iconBg: 'bg-emerald-500/15 text-emerald-400' },
  { to: '/pnr',          icon: MapPin,   label: 'PNR Status',     desc: 'Check any PNR instantly',          accent: 'from-sky-600/20 to-sky-900/5',         ring: 'group-hover:border-sky-500/50',    iconBg: 'bg-sky-500/15 text-sky-400' },
  { to: '/trip-planner', icon: Map,      label: 'Trip Planner',   desc: 'AI-powered journey planning',      accent: 'from-amber-600/20 to-amber-900/5',     ring: 'group-hover:border-amber-500/50',  iconBg: 'bg-amber-500/15 text-amber-400' },
  { to: '/profile',      icon: Settings, label: 'Preferences',    desc: 'Berth, language & defaults',       accent: 'from-slate-600/20 to-slate-900/5',     ring: 'group-hover:border-slate-500/50',  iconBg: 'bg-slate-500/15 text-slate-400' },
];

// ── Smart features (UI only — no logic) ──────────────────────────────────────
const FEATURES = [
  { icon: Brain,    label: 'Multi-Agent AI',      desc: '50+ specialized agents orchestrated by Master AI', badge: 'Active' },
  { icon: Database, label: 'Hybrid RAG',           desc: 'MongoDB Atlas Vector Search + policy knowledge base', badge: 'Active' },
  { icon: Zap,      label: 'Waitlist Prediction',  desc: 'ML-powered WL confirmation probability scoring', badge: 'Active' },
  { icon: FileText, label: 'PDF + QR Tickets',     desc: 'Auto-generated downloadable tickets with QR codes', badge: 'Active' },
  { icon: Globe,    label: 'Live Train Status',    desc: 'Real-time updates via Socket.IO event streaming', badge: 'Live' },
  { icon: Shield,   label: 'JWT + RBAC',           desc: 'Role-based access control with refresh tokens', badge: 'Secure' },
  { icon: Cpu,      label: 'OpenRouter + Gemini',  desc: 'Function calling via LLM tool orchestration', badge: 'Active' },
  { icon: GitBranch,label: 'Docker + Kubernetes',  desc: 'Containerized and K8s-ready for production deploy', badge: 'Ready' },
];

// ── Tech stack (UI only) ──────────────────────────────────────────────────────
const STACK = [
  'React 19', 'Node.js', 'Express', 'MongoDB',
  'OpenRouter', 'Gemini', 'Socket.IO', 'Razorpay',
  'Docker', 'Kubernetes', 'Tailwind CSS', 'JWT',
];

// ── Badge component ───────────────────────────────────────────────────────────
const Badge = ({ text }) => {
  const color =
    text === 'Live'   ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' :
    text === 'Secure' ? 'bg-sky-500/15     text-sky-400     border-sky-500/25'     :
    text === 'Ready'  ? 'bg-amber-500/15   text-amber-400   border-amber-500/25'   :
                        'bg-violet-500/15  text-violet-400  border-violet-500/25';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                      text-[10px] font-semibold border ${color}`}>
      <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
      {text}
    </span>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Dashboard() {
  // ── LOGIC UNCHANGED ────────────────────────────────────────────────────────
  const { user } = useAuth();

  // ── UI ─────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden">
        {/* Aurora blobs */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute -top-32 -left-20   w-[600px] h-[600px] rounded-full bg-violet-800/20 blur-[140px]" />
          <div className="absolute top-0    right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-800/15 blur-[130px]" />
          <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[300px] rounded-full bg-violet-900/20 blur-[100px]" />
          {/* Noise */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12">

            {/* Left */}
            <div className="flex-1 max-w-2xl">
              {/* Platform badge */}
              <motion.div {...fadeUp(0)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6
                           bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                🚄 AI-Powered Railway Platform
              </motion.div>

              {/* Greeting */}
              <motion.p {...fadeUp(0.05)} className="text-slate-400 text-sm mb-2 font-medium">
                Welcome back, {user?.name?.split(' ')[0] || 'Traveller'} 👋
              </motion.p>

              {/* Headline */}
              <motion.h1 {...fadeUp(0.1)}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-5">
                Build{' '}
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400
                                 bg-clip-text text-transparent">
                  Smarter
                </span>
                {' '}Railway<br />Journeys
              </motion.h1>

              <motion.p {...fadeUp(0.15)}
                className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
                Search trains, book tickets, predict waitlists, check PNR,
                generate QR tickets and interact with your AI railway assistant.
              </motion.p>

              {/* CTA row */}
              <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-3">
                <Link to="/trainsSearch"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                             bg-gradient-to-r from-violet-600 to-indigo-600 text-white
                             hover:from-violet-500 hover:to-indigo-500
                             shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50 transition-all">
                  <Search size={15} /> Search Trains
                </Link>
                <Link to="/assistant"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                             bg-white/[0.06] border border-white/[0.10] text-white
                             hover:bg-white/[0.10] transition-colors">
                  <Bot size={15} /> Talk with AI
                </Link>
                <Link to="/tickets"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                             text-slate-400 hover:text-white transition-colors">
                  My Tickets <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>

            {/* Right — floating AI card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex-shrink-0 w-full max-w-sm mx-auto lg:mx-0"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/[0.08]
                           rounded-3xl p-6 shadow-2xl shadow-black/40"
              >
                {/* Mini chat */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30
                                  flex items-center justify-center">
                    <Bot size={16} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">RailwayGPT</p>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-slate-500">50+ agents online</span>
                    </div>
                  </div>
                </div>

                {/* Simulated messages (static) */}
                <div className="space-y-3 mb-4">
                  <div className="bg-white/[0.04] rounded-2xl rounded-tl-md px-4 py-2.5 text-xs text-slate-300 leading-relaxed">
                    Mumbai se Delhi kal ke liye Rajdhani suggest karo
                  </div>
                  <div className="bg-violet-600/20 border border-violet-500/20 rounded-2xl rounded-tr-md px-4 py-2.5 text-xs text-violet-200 leading-relaxed">
                    <p className="font-medium mb-1">Found 3 trains:</p>
                    <p>🚄 12951 Mumbai Rajdhani — 16h 35m</p>
                    <p>🚄 12953 August Kranti — 17h 05m</p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.06]">
                  {[
                    { val: '50+', lbl: 'Agents' },
                    { val: 'RAG', lbl: 'Knowledge' },
                    { val: '∞',   lbl: 'Queries' },
                  ].map(({ val, lbl }) => (
                    <div key={lbl} className="text-center">
                      <p className="text-sm font-bold text-white">{val}</p>
                      <p className="text-[10px] text-slate-500">{lbl}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20 pb-24">

        {/* ══ QUICK ACTIONS ═══════════════════════════════════════════════ */}
        <motion.section {...fadeUp(0.1)}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Quick Access</h2>
              <p className="text-slate-500 text-sm mt-0.5">Everything you need, one click away</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACTIONS.map(({ to, icon: Icon, label, desc, accent, ring, iconBg }, idx) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.35 }}
                whileHover={{ y: -3 }}
              >
                <Link
                  to={to}
                  className={`group flex items-start gap-4 p-5 rounded-2xl
                              bg-gradient-to-br ${accent}
                              border border-white/[0.06] ${ring}
                              hover:shadow-xl hover:shadow-black/30
                              transition-all duration-300 block`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-white text-[15px]">{label}</p>
                      <ChevronRight size={15} className="text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ══ SMART FEATURES ══════════════════════════════════════════════ */}
        <motion.section {...fadeUp(0.1)}>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Platform Capabilities</h2>
            <p className="text-slate-500 text-sm mt-0.5">What powers RailwayGPT AI under the hood</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FEATURES.map(({ icon: Icon, label, desc, badge }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * idx }}
                whileHover={{ y: -2 }}
                className="p-4 rounded-2xl bg-[#0F172A]/60 border border-white/[0.06]
                           hover:border-violet-500/25 hover:bg-violet-500/[0.03]
                           transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20
                                  flex items-center justify-center">
                    <Icon size={16} className="text-violet-400" />
                  </div>
                  <Badge text={badge} />
                </div>
                <p className="text-sm font-semibold text-white mb-1">{label}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ══ AI PROMPT SECTION ═══════════════════════════════════════════ */}
        <motion.section {...fadeUp(0.1)}>
          <div className="relative overflow-hidden rounded-3xl
                          bg-gradient-to-br from-[#0F172A]/90 to-[#0B1120]/80
                          border border-white/[0.07] p-8 sm:p-10">
            {/* Blob */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full
                            bg-violet-700/10 blur-[80px] pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Bot size={18} className="text-violet-400" />
                  <span className="text-sm font-semibold text-violet-400">Ask RailwayGPT</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Your AI Railway<br />
                  <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    Co-pilot
                  </span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Ask anything about trains, routes, PNR, waitlist prediction, fare,
                  refunds or trip planning — in Hindi or English.
                </p>
              </div>

              <div className="flex-1 w-full">
                {/* Example prompts */}
                <div className="space-y-2 mb-4">
                  {[
                    'Kal Pune se Delhi ke liye AC train suggest karo',
                    'WL 42 confirm hoga kya?',
                    'Mera PNR 1234567890 check karo',
                    'Agra 2 din trip plan karo ₹8000 budget mein',
                  ].map((q) => (
                    <Link to="/assistant" key={q}
                      className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-xl
                                 bg-white/[0.04] border border-white/[0.07] text-left
                                 hover:border-violet-500/40 hover:bg-violet-500/[0.04]
                                 transition-all group">
                      <span className="text-slate-300 text-sm truncate">{q}</span>
                      <ArrowRight size={14} className="text-slate-600 group-hover:text-violet-400 flex-shrink-0 transition-colors" />
                    </Link>
                  ))}
                </div>
                <Link to="/assistant"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                             bg-gradient-to-r from-violet-600 to-indigo-600 text-white
                             text-sm font-semibold hover:from-violet-500 hover:to-indigo-500
                             transition-all shadow-lg shadow-violet-900/30">
                  <Bot size={16} /> Open AI Assistant
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══ TECH STACK ══════════════════════════════════════════════════ */}
        <motion.section {...fadeUp(0.1)}>
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-white">Built With</h2>
            <p className="text-slate-500 text-sm mt-1">Production-grade stack powering RailwayGPT AI</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {STACK.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -2, scale: 1.04 }}
                className="px-4 py-2 rounded-xl text-sm font-medium
                           text-slate-400 bg-white/[0.04] border border-white/[0.07]
                           hover:border-violet-500/40 hover:text-violet-300
                           hover:bg-violet-500/[0.06] transition-all cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ══ FOOTER / CREDITS ════════════════════════════════════════════ */}
        <motion.section {...fadeUp(0.1)}>
          <div className="relative overflow-hidden rounded-3xl
                          bg-gradient-to-br from-[#0F172A]/80 to-[#071126]/80
                          border border-white/[0.06] p-8 text-center">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32
                              rounded-full bg-violet-700/15 blur-[60px]" />
            </div>
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/15 border border-violet-500/25
                              flex items-center justify-center mx-auto mb-4">
                <Layers size={22} className="text-violet-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Built by Vikash Sharma</h3>
              <p className="text-slate-400 text-sm mb-4">
                Full Stack Developer · AI Engineer · DevOps Enthusiast
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {[
                  { label: 'GitHub',    href: 'https://github.com' },
                  { label: 'LinkedIn',  href: 'https://linkedin.com' },
                  { label: 'Portfolio', href: '#' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400
                               bg-white/[0.04] border border-white/[0.07]
                               hover:border-violet-500/40 hover:text-violet-300 transition-all">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}