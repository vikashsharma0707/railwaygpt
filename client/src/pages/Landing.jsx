// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { FiSearch, FiCpu, FiShield, FiZap } from 'react-icons/fi';

// // const features = [
// //   { icon: <FiCpu />, title: '50+ AI Agents', desc: 'Master, booking, RAG, prediction, payment, admin — coordinated by a multi-agent orchestrator.' },
// //   { icon: <FiZap />, title: 'Autonomous Booking', desc: '"Kal Mumbai jana hai." We search, draft, allocate seats and create payment in one chat.' },
// //   { icon: <FiShield />, title: 'Bank-grade Security', desc: 'JWT rotation, Helmet, rate limits, sanitisation, Razorpay signature & webhook verification.' },
// //   { icon: <FiSearch />, title: 'RAG Knowledge', desc: 'Hybrid + semantic search over railway rules, policies and FAQs with source citations.' },
// // ];

// // export default function Landing() {
// //   return (
// //     <div>
// //       <section className="relative max-w-7xl mx-auto px-4 pt-20 pb-24">
// //         <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
// //           className="text-4xl md:text-6xl font-bold tracking-tight">
// //           The Agentic <span className="bg-gradient-to-r from-brand-500 to-fuchsia-500 bg-clip-text text-transparent">Railway OS</span>
// //         </motion.h1>
// //         <p className="mt-6 max-w-2xl text-slate-300 text-lg">
// //           RailwayGPT is a multi-agent AI platform that searches trains, books tickets, predicts delays
// //           and answers railway questions — all from a single conversation.
// //         </p>
// //         <div className="mt-8 flex flex-wrap gap-3">
// //           <Link to="/assistant" className="btn-primary">Talk to RailwayGPT</Link>
// //           <Link to="/trains" className="btn-ghost">Search Trains</Link>
// //         </div>
// //         <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
// //           {features.map((f) => (
// //             <div key={f.title} className="card hover:border-brand-500/50 transition">
// //               <div className="text-brand-400 text-xl">{f.icon}</div>
// //               <h3 className="mt-2 font-semibold">{f.title}</h3>
// //               <p className="text-sm text-slate-400 mt-1">{f.desc}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }






// import { Link } from 'react-router-dom';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';
// import {
//   FiCpu, FiZap, FiShield, FiSearch,
//   FiArrowRight, FiTerminal, FiActivity,
// } from 'react-icons/fi';

// // ─── Design tokens ────────────────────────────────────────────────────────────
// // Palette: near-black (#0A0B0F) base, cold slate surfaces, electric indigo
// // (#4F46E5) primary, amber (#F59E0B) as a single warm rail signal accent.
// // Signature element: an animated "track" line that runs down the left rail of
// // the hero — a literal railway track motif used as structural chrome.

// const FEATURES = [
//   {
//     icon: FiCpu,
//     tag: 'ORCHESTRATION',
//     title: '50+ coordinated agents',
//     desc: 'Master, booking, RAG, prediction, payment — each a specialist. One orchestrator that never drops a handoff.',
//   },
//   {
//     icon: FiZap,
//     tag: 'AUTONOMY',
//     title: 'One sentence to a booked seat',
//     desc: '"Kal Mumbai jana hai." We search, allocate, draft the booking, and raise a payment — before you type again.',
//   },
//   {
//     icon: FiSearch,
//     tag: 'KNOWLEDGE',
//     title: 'RAG over railway rules',
//     desc: 'Hybrid + semantic search across policies, FAQs and timetables. Every answer cites its source.',
//   },
//   {
//     icon: FiShield,
//     tag: 'SECURITY',
//     title: 'Bank-grade by default',
//     desc: 'JWT rotation, Helmet headers, rate limits, input sanitisation, Razorpay webhook verification.',
//   },
// ];

// const STATS = [
//   { value: '50+', label: 'AI agents' },
//   { value: '<1s', label: 'avg. response' },
//   { value: '99.9%', label: 'uptime SLA' },
//   { value: '0', label: 'clicks to book' },
// ];

// // ─── Sub-components ────────────────────────────────────────────────────────────

// function TrackLine() {
//   // The signature element: a vertical animated rail on the left of the hero.
//   return (
//     <div className="absolute left-0 top-0 h-full w-px hidden lg:block overflow-hidden">
//       <motion.div
//         className="w-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
//         initial={{ height: 0, opacity: 0 }}
//         animate={{ height: '100%', opacity: 1 }}
//         transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
//         style={{ minHeight: '100%' }}
//       />
//       {/* Sleeper dashes */}
//       {[...Array(8)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute left-0 h-px bg-indigo-500/40"
//           style={{ top: `${10 + i * 12}%`, width: 10, transform: 'translateX(-50%)' }}
//           initial={{ opacity: 0, x: -4 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.6 + i * 0.08 }}
//         />
//       ))}
//     </div>
//   );
// }

// function FeatureCard({ icon: Icon, tag, title, desc, index }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       whileHover={{ y: -4, transition: { duration: 0.2 } }}
//       className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm overflow-hidden"
//     >
//       {/* Hover glow */}
//       <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//         style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.12) 0%, transparent 70%)' }} />

//       <span className="inline-block text-[10px] font-mono font-semibold tracking-[0.2em] text-indigo-400 mb-4">
//         {tag}
//       </span>
//       <div className="flex items-start gap-3">
//         <div className="mt-0.5 flex-shrink-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-2">
//           <Icon className="text-indigo-400" size={16} />
//         </div>
//         <div>
//           <h3 className="font-semibold text-white text-[15px] leading-snug mb-1.5">{title}</h3>
//           <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function TerminalBadge() {
//   // Simulated agent log — gives the hero visual texture without being a video
//   const lines = [
//     { t: 0.8,  color: 'text-slate-500', text: '→ master_agent  received "Kal Mumbai jana hai"' },
//     { t: 1.2,  color: 'text-indigo-400', text: '→ search_agent  BCT → NDLS  [3 trains found]' },
//     { t: 1.6,  color: 'text-slate-400', text: '→ rag_agent     tatkal quota rules fetched' },
//     { t: 2.0,  color: 'text-amber-400',  text: '→ booking_agent seat 54 / SL allocated ✓' },
//     { t: 2.4,  color: 'text-emerald-400',text: '→ payment_agent Razorpay order #ORD_0831 ✓' },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.9, duration: 0.6 }}
//       className="mt-12 rounded-xl border border-white/[0.07] bg-black/60 backdrop-blur-md p-5 font-mono text-xs max-w-xl"
//     >
//       <div className="flex items-center gap-1.5 mb-4">
//         <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
//         <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
//         <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
//         <span className="ml-2 text-slate-600 text-[10px]">railwaygpt — agent trace</span>
//       </div>
//       {lines.map((l, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, x: -8 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: l.t, duration: 0.3 }}
//           className={`${l.color} mb-1`}
//         >
//           {l.text}
//         </motion.div>
//       ))}
//       <motion.span
//         animate={{ opacity: [1, 0, 1] }}
//         transition={{ repeat: Infinity, duration: 1 }}
//         className="text-indigo-400"
//       >▋</motion.span>
//     </motion.div>
//   );
// }

// // ─── Main component ────────────────────────────────────────────────────────────

// export default function Landing() {
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
//   const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

//   return (
//     <div className="min-h-screen bg-[#0A0B0F] text-white antialiased overflow-x-hidden">

//       {/* ── Nav ──────────────────────────────────────────────────────────────── */}
//       <motion.nav
//         initial={{ opacity: 0, y: -12 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.05] bg-[#0A0B0F]/80 backdrop-blur-xl"
//       >
//         <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <FiActivity className="text-indigo-400" size={18} />
//             <span className="font-semibold text-sm tracking-tight">RailwayGPT</span>
//           </div>
//           <div className="flex items-center gap-6 text-sm text-slate-400">
//             <Link to="/trains" className="hover:text-white transition-colors hidden sm:block">Trains</Link>
//             <Link to="/assistant" className="hover:text-white transition-colors hidden sm:block">Assistant</Link>
//             <Link
//               to="/assistant"
//               className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-[13px] font-medium px-4 py-1.5"
//             >
//               Get started <FiArrowRight size={13} />
//             </Link>
//           </div>
//         </div>
//       </motion.nav>

//       {/* ── Hero ─────────────────────────────────────────────────────────────── */}
//       <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center pt-14">
//         {/* Background radial glow */}
//         <div
//           className="pointer-events-none absolute inset-0"
//           style={{
//             background:
//               'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,70,229,0.18) 0%, transparent 70%)',
//           }}
//         />

//         <motion.div style={{ y: heroY }} className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
//           {/* Track line — the signature element */}
//           <TrackLine />

//           <div className="lg:pl-10">
//             {/* Eyebrow */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 mb-8"
//             >
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//               <span className="text-[11px] font-mono text-indigo-300 tracking-wide">
//                 Multi-agent AI · Now in beta
//               </span>
//             </motion.div>

//             {/* Headline */}
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.65, delay: 0.35 }}
//               className="text-5xl md:text-7xl font-bold tracking-[-0.03em] leading-[1.05] max-w-3xl"
//             >
//               The OS that{' '}
//               <span
//                 className="inline-block"
//                 style={{
//                   backgroundImage: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 40%, #F59E0B 100%)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                 }}
//               >
//                 runs
//               </span>{' '}
//               Indian Railways.
//             </motion.h1>

//             {/* Subhead */}
//             <motion.p
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//               className="mt-6 max-w-xl text-[17px] text-slate-400 leading-relaxed"
//             >
//               RailwayGPT is a multi-agent AI platform that searches trains, books tickets,
//               predicts delays and answers policy questions — from a single conversation.
//             </motion.p>

//             {/* CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.65 }}
//               className="mt-8 flex flex-wrap items-center gap-3"
//             >
//               <Link
//                 to="/assistant"
//                 className="group flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all text-white font-medium px-5 py-2.5 text-sm shadow-lg shadow-indigo-500/20"
//               >
//                 <FiTerminal size={14} />
//                 Talk to RailwayGPT
//                 <FiArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
//               </Link>
//               <Link
//                 to="/trains"
//                 className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] transition-all text-slate-300 font-medium px-5 py-2.5 text-sm"
//               >
//                 <FiSearch size={13} />
//                 Search Trains
//               </Link>
//             </motion.div>

//             {/* Terminal */}
//             <TerminalBadge />
//           </div>
//         </motion.div>
//       </section>

//       {/* ── Stats bar ────────────────────────────────────────────────────────── */}
//       <section className="border-y border-white/[0.05] bg-white/[0.02]">
//         <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
//           {STATS.map((s, i) => (
//             <motion.div
//               key={s.label}
//               initial={{ opacity: 0, y: 12 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.08 }}
//               className="text-center"
//             >
//               <div className="text-3xl font-bold tracking-tight text-white">{s.value}</div>
//               <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{s.label}</div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ── Features ─────────────────────────────────────────────────────────── */}
//       <section className="max-w-7xl mx-auto px-6 py-28">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-14"
//         >
//           <p className="text-[11px] font-mono text-indigo-400 tracking-[0.2em] mb-4">PLATFORM</p>
//           <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-lg leading-snug">
//             Every layer of the booking stack — handled.
//           </h2>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {FEATURES.map((f, i) => (
//             <FeatureCard key={f.title} {...f} index={i} />
//           ))}
//         </div>
//       </section>

//       {/* ── CTA band ─────────────────────────────────────────────────────────── */}
//       <section className="px-6 pb-28">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="max-w-3xl mx-auto rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent p-12 text-center relative overflow-hidden"
//         >
//           <div
//             className="pointer-events-none absolute inset-0"
//             style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(79,70,229,0.15) 0%, transparent 70%)' }}
//           />
//           <p className="text-[11px] font-mono text-indigo-400 tracking-[0.2em] mb-4">READY WHEN YOU ARE</p>
//           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
//             Your next train, one message away.
//           </h2>
//           <p className="text-slate-400 mb-8 max-w-sm mx-auto text-[15px] leading-relaxed">
//             No forms. No filters. Just tell RailwayGPT where you need to go.
//           </p>
//           <Link
//             to="/assistant"
//             className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all text-white font-medium px-6 py-3 text-sm shadow-lg shadow-indigo-500/25"
//           >
//             <FiTerminal size={14} />
//             Start a conversation
//             <FiArrowRight size={13} />
//           </Link>
//         </motion.div>
//       </section>

//       {/* ── Footer ───────────────────────────────────────────────────────────── */}
//       <footer className="border-t border-white/[0.05] px-6 py-8">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
//           <div className="flex items-center gap-2">
//             <FiActivity size={12} className="text-indigo-500" />
//             <span>RailwayGPT</span>
//           </div>
//           <span>Built on multi-agent AI · Powered by Indian Railways data</span>
//         </div>
//       </footer>
//     </div>
//   );
// }




// import { Link } from 'react-router-dom';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';
// import {
//   FiCpu, FiZap, FiShield, FiSearch,
//   FiArrowRight, FiTerminal,
// } from 'react-icons/fi';

// // ─── Design tokens ────────────────────────────────────────────────────────────
// // Palette: near-black (#0A0B0F) base, cold slate surfaces, electric indigo
// // (#4F46E5) primary, amber (#F59E0B) as a single warm rail signal accent.
// // Signature element: an animated "track" line that runs down the left rail of
// // the hero — a literal railway track motif used as structural chrome.
// //
// // NOTE: This page no longer renders its own <nav>/<footer>. The outer app
// // layout (App.jsx or similar) already wraps every route with a shared
// // <Navbar /> and <Footer />. Landing.jsx previously rendered a second nav
// // and footer on top of those — same dark bg, so they silently overlapped
// // the real ones and looked "missing". Removed here; padding-top added below
// // so content still clears the fixed navbar height.

// const FEATURES = [
//   {
//     icon: FiCpu,
//     tag: 'ORCHESTRATION',
//     title: '50+ coordinated agents',
//     desc: 'Master, booking, RAG, prediction, payment — each a specialist. One orchestrator that never drops a handoff.',
//   },
//   {
//     icon: FiZap,
//     tag: 'AUTONOMY',
//     title: 'One sentence to a booked seat',
//     desc: '"Kal Mumbai jana hai." We search, allocate, draft the booking, and raise a payment — before you type again.',
//   },
//   {
//     icon: FiSearch,
//     tag: 'KNOWLEDGE',
//     title: 'RAG over railway rules',
//     desc: 'Hybrid + semantic search across policies, FAQs and timetables. Every answer cites its source.',
//   },
//   {
//     icon: FiShield,
//     tag: 'SECURITY',
//     title: 'Bank-grade by default',
//     desc: 'JWT rotation, Helmet headers, rate limits, input sanitisation, Razorpay webhook verification.',
//   },
// ];

// const STATS = [
//   { value: '50+', label: 'AI agents' },
//   { value: '<1s', label: 'avg. response' },
//   { value: '99.9%', label: 'uptime SLA' },
//   { value: '0', label: 'clicks to book' },
// ];

// // ─── Sub-components ────────────────────────────────────────────────────────────

// function TrackLine() {
//   // The signature element: a vertical animated rail on the left of the hero.
//   return (
//     <div className="absolute left-0 top-0 h-full w-px hidden lg:block overflow-hidden">
//       <motion.div
//         className="w-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
//         initial={{ height: 0, opacity: 0 }}
//         animate={{ height: '100%', opacity: 1 }}
//         transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
//         style={{ minHeight: '100%' }}
//       />
//       {/* Sleeper dashes */}
//       {[...Array(8)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute left-0 h-px bg-indigo-500/40"
//           style={{ top: `${10 + i * 12}%`, width: 10, transform: 'translateX(-50%)' }}
//           initial={{ opacity: 0, x: -4 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.6 + i * 0.08 }}
//         />
//       ))}
//     </div>
//   );
// }

// function FeatureCard({ icon: Icon, tag, title, desc, index }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       whileHover={{ y: -4, transition: { duration: 0.2 } }}
//       className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm overflow-hidden"
//     >
//       {/* Hover glow */}
//       <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//         style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.12) 0%, transparent 70%)' }} />

//       <span className="inline-block text-[10px] font-mono font-semibold tracking-[0.2em] text-indigo-400 mb-4">
//         {tag}
//       </span>
//       <div className="flex items-start gap-3">
//         <div className="mt-0.5 flex-shrink-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-2">
//           <Icon className="text-indigo-400" size={16} />
//         </div>
//         <div>
//           <h3 className="font-semibold text-white text-[15px] leading-snug mb-1.5">{title}</h3>
//           <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function TerminalBadge() {
//   // Simulated agent log — gives the hero visual texture without being a video
//   const lines = [
//     { t: 0.8,  color: 'text-slate-500', text: '→ master_agent  received "Kal Mumbai jana hai"' },
//     { t: 1.2,  color: 'text-indigo-400', text: '→ search_agent  BCT → NDLS  [3 trains found]' },
//     { t: 1.6,  color: 'text-slate-400', text: '→ rag_agent     tatkal quota rules fetched' },
//     { t: 2.0,  color: 'text-amber-400',  text: '→ booking_agent seat 54 / SL allocated ✓' },
//     { t: 2.4,  color: 'text-emerald-400',text: '→ payment_agent Razorpay order #ORD_0831 ✓' },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.9, duration: 0.6 }}
//       className="mt-12 rounded-xl border border-white/[0.07] bg-black/60 backdrop-blur-md p-5 font-mono text-xs max-w-xl"
//     >
//       <div className="flex items-center gap-1.5 mb-4">
//         <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
//         <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
//         <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
//         <span className="ml-2 text-slate-600 text-[10px]">railwaygpt — agent trace</span>
//       </div>
//       {lines.map((l, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, x: -8 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: l.t, duration: 0.3 }}
//           className={`${l.color} mb-1`}
//         >
//           {l.text}
//         </motion.div>
//       ))}
//       <motion.span
//         animate={{ opacity: [1, 0, 1] }}
//         transition={{ repeat: Infinity, duration: 1 }}
//         className="text-indigo-400"
//       >▋</motion.span>
//     </motion.div>
//   );
// }

// // ─── Main component ────────────────────────────────────────────────────────────

// export default function Landing() {
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
//   const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

//   return (
//     <div className="min-h-screen bg-[#0A0B0F] text-white antialiased overflow-x-hidden">

//       {/* ── Hero ─────────────────────────────────────────────────────────────── */}
//       {/* pt-14 keeps content clear of the fixed app Navbar's height */}
//       <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center pt-14">
//         {/* Background radial glow */}
//         <div
//           className="pointer-events-none absolute inset-0"
//           style={{
//             background:
//               'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,70,229,0.18) 0%, transparent 70%)',
//           }}
//         />

//         <motion.div style={{ y: heroY }} className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
//           {/* Track line — the signature element */}
//           <TrackLine />

//           <div className="lg:pl-10">
//             {/* Eyebrow */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 mb-8"
//             >
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//               <span className="text-[11px] font-mono text-indigo-300 tracking-wide">
//                 Multi-agent AI · Now in beta
//               </span>
//             </motion.div>

//             {/* Headline */}
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.65, delay: 0.35 }}
//               className="text-5xl md:text-7xl font-bold tracking-[-0.03em] leading-[1.05] max-w-3xl"
//             >
//               The OS that{' '}
//               <span
//                 className="inline-block"
//                 style={{
//                   backgroundImage: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 40%, #F59E0B 100%)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                 }}
//               >
//                 runs
//               </span>{' '}
//               Indian Railways.
//             </motion.h1>

//             {/* Subhead */}
//             <motion.p
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//               className="mt-6 max-w-xl text-[17px] text-slate-400 leading-relaxed"
//             >
//               RailwayGPT is a multi-agent AI platform that searches trains, books tickets,
//               predicts delays and answers policy questions — from a single conversation.
//             </motion.p>

//             {/* CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.65 }}
//               className="mt-8 flex flex-wrap items-center gap-3"
//             >
//               <Link
//                 to="/assistant"
//                 className="group flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all text-white font-medium px-5 py-2.5 text-sm shadow-lg shadow-indigo-500/20"
//               >
//                 <FiTerminal size={14} />
//                 Talk to RailwayGPT
//                 <FiArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
//               </Link>
//               <Link
//                 to="/trains"
//                 className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] transition-all text-slate-300 font-medium px-5 py-2.5 text-sm"
//               >
//                 <FiSearch size={13} />
//                 Search Trains
//               </Link>
//             </motion.div>

//             {/* Terminal */}
//             <TerminalBadge />
//           </div>
//         </motion.div>
//       </section>

//       {/* ── Stats bar ────────────────────────────────────────────────────────── */}
//       <section className="border-y border-white/[0.05] bg-white/[0.02]">
//         <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
//           {STATS.map((s, i) => (
//             <motion.div
//               key={s.label}
//               initial={{ opacity: 0, y: 12 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.08 }}
//               className="text-center"
//             >
//               <div className="text-3xl font-bold tracking-tight text-white">{s.value}</div>
//               <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{s.label}</div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ── Features ─────────────────────────────────────────────────────────── */}
//       <section className="max-w-7xl mx-auto px-6 py-28">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-14"
//         >
//           <p className="text-[11px] font-mono text-indigo-400 tracking-[0.2em] mb-4">PLATFORM</p>
//           <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-lg leading-snug">
//             Every layer of the booking stack — handled.
//           </h2>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {FEATURES.map((f, i) => (
//             <FeatureCard key={f.title} {...f} index={i} />
//           ))}
//         </div>
//       </section>

//       {/* ── CTA band ─────────────────────────────────────────────────────────── */}
//       <section className="px-6 pb-28">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="max-w-3xl mx-auto rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent p-12 text-center relative overflow-hidden"
//         >
//           <div
//             className="pointer-events-none absolute inset-0"
//             style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(79,70,229,0.15) 0%, transparent 70%)' }}
//           />
//           <p className="text-[11px] font-mono text-indigo-400 tracking-[0.2em] mb-4">READY WHEN YOU ARE</p>
//           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
//             Your next train, one message away.
//           </h2>
//           <p className="text-slate-400 mb-8 max-w-sm mx-auto text-[15px] leading-relaxed">
//             No forms. No filters. Just tell RailwayGPT where you need to go.
//           </p>
//           <Link
//             to="/assistant"
//             className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all text-white font-medium px-6 py-3 text-sm shadow-lg shadow-indigo-500/25"
//           >
//             <FiTerminal size={14} />
//             Start a conversation
//             <FiArrowRight size={13} />
//           </Link>
//         </motion.div>
//       </section>
//     </div>
//   );
// }







import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  FiSearch, FiZap, FiShield, FiCpu, FiArrowRight,
  FiTerminal, FiActivity, FiMapPin, FiClock, FiCheck,
  FiTrendingUp, FiMessageSquare, FiRefreshCw, FiStar,
  FiLock, FiDatabase,
} from 'react-icons/fi';

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// Base:    #060810  deep navy-black (has blue undertone, not pure black)
// Surface: #0A0F1E  raised panels
// Primary: #4338CA  indigo
// Accent:  #06B6D4  cyan (electric rail signal)
// Warm:    #F59E0B  amber (station lamp)
// ─────────────────────────────────────────────────────────────────────────────

/* ── Animated SVG Railway Network (signature element) ──────────────────────── */
function RailwayNetwork() {
  const nodes = [
    { id:'DEL', x:340, y:120 }, { id:'MUM', x:180, y:300 },
    { id:'BLR', x:280, y:420 }, { id:'CHN', x:380, y:440 },
    { id:'KOL', x:520, y:160 }, { id:'HYD', x:320, y:340 },
    { id:'AHM', x:160, y:200 }, { id:'JNP', x:250, y:150 },
  ];
  const edges = [
    ['DEL','JNP'],['DEL','KOL'],['DEL','AHM'],['JNP','AHM'],
    ['AHM','MUM'],['MUM','BLR'],['BLR','CHN'],['BLR','HYD'],
    ['HYD','CHN'],['KOL','HYD'],['DEL','HYD'],
  ];
  return (
    <svg viewBox="0 0 700 560" className="absolute inset-0 w-full h-full opacity-[0.18]">
      <defs>
        <linearGradient id="eg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4338CA" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.5"/>
        </linearGradient>
        <filter id="gw"><feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {edges.map(([a,b],i)=>{
        const na=nodes.find(n=>n.id===a), nb=nodes.find(n=>n.id===b);
        return (
          <g key={i}>
            <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="url(#eg)" strokeWidth="1.5" strokeDasharray="4 3"/>
            <circle r="3.5" fill="#06B6D4" filter="url(#gw)">
              <animateMotion dur={`${3.5+i*0.6}s`} repeatCount="indefinite"
                path={`M${na.x},${na.y} L${nb.x},${nb.y}`}/>
            </circle>
          </g>
        );
      })}
      {nodes.map(n=>(
        <g key={n.id} filter="url(#gw)">
          <circle cx={n.x} cy={n.y} r="7" fill="#060810" stroke="#4338CA" strokeWidth="1.5"/>
          <circle cx={n.x} cy={n.y} r="3" fill="#06B6D4">
            <animate attributeName="opacity" values="1;0.3;1" dur={`${1.8+Math.random()}s`} repeatCount="indefinite"/>
          </circle>
          <text x={n.x} y={n.y-13} textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">{n.id}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── Live Chat Widget ──────────────────────────────────────────────────────── */
function LiveChatWidget() {
  const msgs = [
    { u:true,  t:'Mumbai se Delhi kal subah ka train chahiye' },
    { u:false, t:'Found 3 trains: Rajdhani 06:00 · Shatabdi 07:15 · Duronto 08:30. Rajdhani fastest — 16h. Book?' },
    { u:true,  t:'Rajdhani mein 2A kitne?' },
    { u:false, t:'2A: ₹2,450 · 14 seats left · Tatkal ₹3,200 also available. Confirm?' },
  ];
  const [count, setCount] = useState(0);
  useEffect(()=>{
    const id = setInterval(()=>{
      setCount(c => {
        if (c >= msgs.length) { setTimeout(()=>setCount(0), 2500); return c; }
        return c+1;
      });
    }, 1300);
    return ()=>clearInterval(id);
  },[]);
  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden" style={{background:'rgba(10,15,30,0.85)',backdropFilter:'blur(20px)'}}>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]" style={{background:'rgba(255,255,255,0.02)'}}>
        <motion.div className="w-2 h-2 rounded-full bg-emerald-400"
          animate={{scale:[1,1.4,1],opacity:[1,0.5,1]}} transition={{duration:2,repeat:Infinity}}/>
        <span className="text-xs font-mono text-slate-300">RailwayGPT Assistant</span>
        <span className="ml-auto text-[10px] text-slate-500 font-mono">50 agents · online</span>
      </div>
      <div className="p-4 space-y-3 min-h-[196px]">
        <AnimatePresence>
          {msgs.slice(0,count).map((m,i)=>(
            <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
              className={`flex ${m.u?'justify-end':''}`}>
              <div className={`max-w-[88%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                m.u ? 'bg-indigo-600/80 text-white' : 'bg-white/[0.06] text-slate-300 border border-white/[0.06]'
              }`}>{m.t}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="px-4 py-3 border-t border-white/[0.06] flex gap-2">
        <div className="flex-1 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2 text-xs text-slate-500 font-mono">
          Ask anything about your journey...
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{background:'linear-gradient(135deg,#4338CA,#06B6D4)'}}>
          <FiArrowRight size={13} className="text-white"/>
        </div>
      </div>
    </div>
  );
}

/* ── Mini stat row under chat ──────────────────────────────────────────────── */
function MiniStats() {
  return (
    <div className="grid grid-cols-3 gap-2 mt-3">
      {[
        {val:'2,847',label:'Trains Found',  c:'text-emerald-400'},
        {val:'1,204',label:'Booked Today',  c:'text-cyan-400'   },
        {val:'50/50',label:'Agents Active', c:'text-indigo-400' },
      ].map(s=>(
        <div key={s.label} className="rounded-xl border border-white/[0.07] p-3 text-center" style={{background:'rgba(10,15,30,0.6)'}}>
          <div className={`text-sm font-bold font-mono ${s.c}`}>{s.val}</div>
          <div className="text-[9px] text-slate-500 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── PNR Status mini card ──────────────────────────────────────────────────── */
function PNRCard() {
  return (
    <div className="rounded-2xl border border-white/[0.08] p-4 mt-3" style={{background:'rgba(10,15,30,0.8)'}}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">PNR · 8302941827</span>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">CONFIRMED</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="text-sm font-bold text-white font-mono">BCT</div>
          <div className="text-[10px] text-slate-500">16:55</div>
        </div>
        <div className="flex-1 relative">
          <div className="h-px" style={{background:'linear-gradient(90deg,#4338CA,#06B6D4)'}}/>
          <motion.div className="absolute -top-[3px] w-2 h-2 rounded-full bg-cyan-400"
            animate={{left:['0%','95%']}} transition={{duration:4,repeat:Infinity,ease:'linear'}}/>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-white font-mono">NDLS</div>
          <div className="text-[10px] text-slate-500">08:35+1</div>
        </div>
      </div>
      <div className="mt-3 flex gap-1.5 flex-wrap">
        {['Coach S4','Seat 42','SL · Window'].map(t=>(
          <span key={t} className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Agent cards ───────────────────────────────────────────────────────────── */
const AGENTS = [
  {name:'Train Search', acc:'99.8%', ms:'210ms', Icon:FiSearch,     color:'#4338CA'},
  {name:'PNR Tracker',  acc:'99.9%', ms:'180ms', Icon:FiActivity,   color:'#06B6D4'},
  {name:'Booking',      acc:'99.7%', ms:'340ms', Icon:FiCheck,      color:'#10B981'},
  {name:'Refund',       acc:'98.9%', ms:'290ms', Icon:FiRefreshCw,  color:'#F59E0B'},
  {name:'Policy RAG',   acc:'99.5%', ms:'420ms', Icon:FiDatabase,   color:'#8B5CF6'},
  {name:'Analytics',    acc:'99.9%', ms:'150ms', Icon:FiTrendingUp, color:'#EC4899'},
];

/* ── Bento feature data ────────────────────────────────────────────────────── */
const BENTO = [
  {
    title:'Conversational Booking', color:'#4338CA', Icon:FiMessageSquare, span:true,
    desc:'Type naturally. One sentence books your seat end-to-end — search, allocate, pay, PDF.',
    visual:(
      <div className="mt-4 space-y-2">
        {[
          {u:true, t:'"Mumbai to Goa this Friday, AC class"'},
          {u:false,t:'Tejas Express · Fri 11:00 · ₹1,895 · 4 seats · Book?'},
          {u:true, t:'Yes'},
          {u:false,t:'✅ Booked · PNR 8302941827 · PDF sent'},
        ].map((m,i)=>(
          <div key={i} className={`flex ${m.u?'justify-end':''}`}>
            <span className={`text-[10px] font-mono px-2.5 py-1.5 rounded-lg ${
              m.u?'bg-indigo-600/70 text-white':'bg-white/[0.06] text-slate-300'}`}>{m.t}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title:'Live Train Tracking', color:'#06B6D4', Icon:FiMapPin, span:false,
    desc:'Real-time position, predicted delay, and platform — all in one line.',
    visual:(
      <div className="mt-4 space-y-1.5">
        {[
          {l:'Current',val:'Igatpuri',active:true},
          {l:'Next Stop',val:'Nashik · 34 min',active:false},
          {l:'Delay',val:'+8 min',active:false},
          {l:'Platform',val:'#3 (predicted)',active:false},
        ].map(r=>(
          <div key={r.l} className={`flex justify-between text-[10px] py-1 border-b border-white/[0.04] ${r.active?'text-cyan-400':'text-slate-400'}`}>
            <span className="font-mono text-slate-500">{r.l}</span>
            <span className="font-semibold">{r.val}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title:'Delay Prediction', color:'#F59E0B', Icon:FiClock, span:false,
    desc:'ML model predicts delays up to 2h ahead with 91% accuracy.',
    visual:(
      <div className="mt-4">
        <div className="flex items-end gap-1 h-12">
          {[30,55,70,45,85,60,91,78,50,88].map((v,i)=>(
            <motion.div key={i} className="flex-1 rounded-sm"
              style={{background:`rgba(245,158,11,${0.25+v/180})`}}
              initial={{height:0}} whileInView={{height:`${v}%`}}
              viewport={{once:true}} transition={{delay:i*0.06,duration:0.45}}/>
          ))}
        </div>
        <div className="mt-2 text-[10px] font-mono text-amber-400">91% accuracy · updated every 15 min</div>
      </div>
    ),
  },
  {
    title:'Smart Refunds', color:'#10B981', Icon:FiRefreshCw, span:false,
    desc:'Auto-detects eligibility, files the request, tracks to bank.',
    visual:(
      <div className="mt-4 space-y-2">
        {[
          {n:'01',t:'Eligibility checked',done:true},
          {n:'02',t:'Refund filed via API',done:true},
          {n:'03',t:'Bank transfer pending',done:false},
        ].map(s=>(
          <div key={s.n} className="flex items-center gap-2.5">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono flex-shrink-0 ${
              s.done?'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30':'bg-white/[0.04] text-slate-500 border border-white/[0.08]'}`}>
              {s.done?'✓':s.n}
            </div>
            <span className={`text-[10px] ${s.done?'text-slate-300':'text-slate-500'}`}>{s.t}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title:'RAG Policy Engine', color:'#8B5CF6', Icon:FiDatabase, span:false,
    desc:'Answers any railway rule or quota question with cited sources.',
    visual:(
      <div className="mt-4 space-y-2">
        {[
          {q:'Tatkal refund rule?',a:'No refund if cancelled <24h before departure...'},
          {q:'Senior citizen discount?',a:'50% on SL/2A/3A for men 60+...'},
        ].map((item,i)=>(
          <div key={i} className="rounded-lg bg-white/[0.04] p-2.5">
            <div className="text-[10px] text-violet-400 font-mono mb-1">Q: {item.q}</div>
            <div className="text-[10px] text-slate-400 leading-relaxed">{item.a}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title:'Razorpay Payments', color:'#EC4899', Icon:FiLock, span:false,
    desc:'Webhook-verified, signature-validated, full audit trail.',
    visual:(
      <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
        <div className="text-[10px] font-mono text-slate-500 mb-1">Latest Transaction</div>
        <div className="text-lg font-bold text-white font-mono">₹2,450</div>
        <div className="flex items-center gap-1.5 mt-1 mb-2">
          <span className="text-[10px] font-mono text-emerald-400">✓ Signature valid</span>
          <span className="text-[10px] text-slate-600">·</span>
          <span className="text-[10px] font-mono text-pink-400">Razorpay</span>
        </div>
        <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full"
            style={{background:'linear-gradient(90deg,#EC4899,#4338CA)'}}
            initial={{width:0}} whileInView={{width:'100%'}}
            viewport={{once:true}} transition={{duration:1.2}}/>
        </div>
      </div>
    ),
  },
];

/* ── Animated counter ──────────────────────────────────────────────────────── */
function Counter({ target, suffix='' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9','start 0.4'] });
  useEffect(()=>{
    return scrollYProgress.on('change', v => {
      if (v > 0) setVal(Math.round(v * parseFloat(target)));
    });
  },[target, scrollYProgress]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Testimonials ──────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {name:'Priya Sharma',   role:'Frequent Traveler',  stars:5, text:'Booked 3 tickets in one conversation. No IRCTC captcha hell — just asked and it was done.'},
  {name:'Rahul Mehta',    role:'Railway Consultant',  stars:5, text:'The policy RAG cites actual rule numbers. I use it for client queries daily. Extraordinary.'},
  {name:'TravelEase India',role:'Travel Agency',      stars:5, text:'40% fewer support tickets since we integrated RailwayGPT. Our agents love it.'},
  {name:'Neha Kapoor',    role:'Enterprise Client',   stars:5, text:'Admin dashboard and audit logs are exactly what our compliance team needed. Rock solid.'},
];

/* ── Security items ────────────────────────────────────────────────────────── */
const SECURITY = [
  {Icon:FiLock,    title:'JWT Rotation',       desc:'Tokens rotate on every request with configurable TTL and blacklist support.'},
  {Icon:FiShield,  title:'Encrypted Payments', desc:'Razorpay signature verification + webhook auth on every transaction.'},
  {Icon:FiCpu,     title:'Role-Based Access',  desc:'Admin, operator, passenger — granular permission layers out of the box.'},
  {Icon:FiDatabase,title:'Audit Logs',         desc:'Every action timestamped, tagged, and immutably stored for compliance.'},
  {Icon:FiZap,     title:'Rate Limiting',      desc:'Per-IP and per-user limits with exponential backoff on abuse.'},
  {Icon:FiActivity,title:'Secure APIs',        desc:'Helmet headers, strict CORS, input sanitisation on every endpoint.'},
];

/* ── How it works ──────────────────────────────────────────────────────────── */
const HOW = [
  {n:'01',title:'You Ask',           color:'#4338CA', desc:'Type naturally. "Delhi to Agra Sunday, window seat, veg meal." No commands, no forms.'},
  {n:'02',title:'Agents Collaborate',color:'#06B6D4', desc:'Master agent routes to 50+ specialists simultaneously — search, policy, pricing — in parallel.'},
  {n:'03',title:'Action Taken',      color:'#10B981', desc:'Ticket booked. PNR sent. PDF generated. Payment confirmed. You get the result.'},
];

// ═════════════════════════════════════════════════════════════════════════════
// MAIN
// ═════════════════════════════════════════════════════════════════════════════
export default function Landing() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start','end start'] });
  const heroY = useTransform(scrollYProgress, [0,1], ['0%','28%']);

  return (
    <div className="min-h-screen text-white antialiased overflow-x-hidden"
      style={{background:'linear-gradient(160deg,#060810 0%,#080D1A 50%,#060810 100%)'}}>

      {/* ════ HERO ════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{paddingTop:'56px'}}>
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <RailwayNetwork/>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{background:'radial-gradient(circle,rgba(67,56,202,0.12) 0%,transparent 70%)',filter:'blur(60px)'}}/>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full"
            style={{background:'radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%)',filter:'blur(50px)'}}/>
          <div className="absolute inset-0 opacity-[0.025]"
            style={{backgroundImage:'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',backgroundSize:'64px 64px'}}/>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full py-24">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">

            {/* Left copy */}
            <motion.div style={{y:heroY}}>
              <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 px-3 py-1 mb-8"
                style={{background:'rgba(6,182,212,0.07)'}}>
                <motion.span className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  animate={{scale:[1,1.5,1],opacity:[1,0.4,1]}} transition={{duration:2,repeat:Infinity}}/>
                <span className="text-[11px] font-mono text-cyan-300 tracking-wide">
                  50 agents live · <span className="text-emerald-400">99.9% uptime</span>
                </span>
              </motion.div>

              <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.1}}
                className="font-bold tracking-[-0.03em] leading-[1.02]"
                style={{fontSize:'clamp(2.4rem,5.5vw,4.2rem)'}}>
                The AI Operating System{' '}
                <span style={{
                  backgroundImage:'linear-gradient(135deg,#6366F1 0%,#06B6D4 55%,#10B981 100%)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
                  for Indian Railways
                </span>
              </motion.h1>

              <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.25}}
                className="mt-6 space-y-1.5">
                {['Search trains.','Book tickets.','Track delays.','Manage refunds.','Answer railway policies.'].map((line,i)=>(
                  <motion.div key={line} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}}
                    transition={{delay:0.35+i*0.1}} className="flex items-center gap-2 text-slate-300 text-[15px]">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0"/>
                    {line}
                  </motion.div>
                ))}
                <motion.div initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:0.95}}
                  className="text-[13px] font-mono text-indigo-400 pt-1">
                  Powered by 50+ specialized AI agents.
                </motion.div>
              </motion.div>

              <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.7}}
                className="mt-8 flex flex-wrap gap-3">
                <Link to="/assistant"
                  className="group relative flex items-center gap-2 rounded-xl text-white font-semibold px-6 py-3 text-sm overflow-hidden"
                  style={{background:'linear-gradient(135deg,#4338CA,#06B6D4)',boxShadow:'0 0 32px rgba(67,56,202,0.35)'}}>
                  <FiTerminal size={14}/>
                  <span>Start Using RailwayGPT</span>
                  <FiArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform"/>
                </Link>
                <Link to="/trains"
                  className="flex items-center gap-2 rounded-xl border border-white/[0.12] text-slate-200 font-medium px-6 py-3 text-sm transition-all hover:bg-white/[0.07]"
                  style={{background:'rgba(255,255,255,0.04)'}}>
                  <FiSearch size={13}/>
                  Watch Live Demo
                </Link>
              </motion.div>

              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.1}}
                className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[['P','#4338CA'],['R','#06B6D4'],['A','#10B981'],['N','#F59E0B'],['S','#8B5CF6']].map(([l,c],i)=>(
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-[#060810] flex items-center justify-center text-[10px] font-bold text-white"
                      style={{background:c}}>{l}</div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">{[...Array(5)].map((_,i)=>(
                    <FiStar key={i} size={11} className="text-amber-400 fill-amber-400"/>))}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Trusted by <span className="text-white font-semibold">100,000+</span> railway travelers
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: live dashboard */}
            <motion.div initial={{opacity:0,x:28}} animate={{opacity:1,x:0}}
              transition={{duration:0.8,delay:0.3}} className="hidden lg:block">
              <LiveChatWidget/>
              <MiniStats/>
              <PNRCard/>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ STATS ═══════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.06]" style={{background:'#0A0F1E'}}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          {[
            {val:'50',   suf:'+',  label:'AI Agents',     c:'text-indigo-400' },
            {val:'1',    suf:'M+', label:'Queries',        c:'text-cyan-400'   },
            {val:'100',  suf:'K+', label:'Bookings',       c:'text-emerald-400'},
            {val:'99.99',suf:'%',  label:'Uptime',         c:'text-amber-400'  },
            {val:'1',    suf:'s',  label:'Response Time',  c:'text-pink-400'   },
          ].map((s,i)=>(
            <motion.div key={s.label} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:i*0.08}} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold font-mono tracking-tight ${s.c}`}>
                <Counter target={s.val} suffix={s.suf}/>
              </div>
              <div className="text-xs text-slate-500 mt-1.5 uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════ AGENT NETWORK ═══════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="text-center mb-14">
          <p className="text-[11px] font-mono text-cyan-400 tracking-[0.25em] mb-3">INFRASTRUCTURE</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4">Every agent, always online.</h2>
          <p className="text-slate-400 max-w-lg mx-auto text-[15px] leading-relaxed">
            50+ AI specialists run in parallel. Each owns a domain, reports its own health, and hands off without dropping context.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AGENTS.map((a,i)=>(
            <motion.div key={a.name}
              initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{delay:i*0.08}} whileHover={{y:-3,transition:{duration:0.15}}}
              className="group relative rounded-2xl border border-white/[0.07] p-5 overflow-hidden"
              style={{background:'rgba(10,15,30,0.6)',backdropFilter:'blur(12px)'}}>
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{background:`radial-gradient(ellipse at 50% 0%,${a.color}18 0%,transparent 70%)`}}/>
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{background:`${a.color}15`,border:`1px solid ${a.color}30`}}>
                  <a.Icon size={16} style={{color:a.color}}/>
                </div>
                <div className="flex items-center gap-1.5">
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{scale:[1,1.4,1],opacity:[1,0.5,1]}}
                    transition={{duration:2,repeat:Infinity,delay:i*0.3}}/>
                  <span className="text-[10px] text-emerald-400 font-mono">Online</span>
                </div>
              </div>
              <div className="font-semibold text-white text-sm mb-3">{a.name} Agent</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono">Accuracy</div>
                  <div className="text-xs font-bold text-emerald-400 font-mono">{a.acc}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-mono">Response</div>
                  <div className="text-xs font-bold text-cyan-400 font-mono">{a.ms}</div>
                </div>
              </div>
              <div className="mt-3 h-px bg-white/[0.05] overflow-hidden rounded-full">
                <motion.div className="h-full rounded-full"
                  style={{background:`linear-gradient(90deg,transparent,${a.color},transparent)`}}
                  animate={{x:['-100%','200%']}}
                  transition={{duration:2.5,repeat:Infinity,delay:i*0.4,ease:'easeInOut'}}/>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════ BENTO FEATURES ══════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-14">
          <p className="text-[11px] font-mono text-indigo-400 tracking-[0.25em] mb-3">FEATURES</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] max-w-xl">Every layer of the journey, covered.</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENTO.map((f,i)=>(
            <motion.div key={f.title}
              initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{delay:i*0.07}} whileHover={{y:-4,transition:{duration:0.15}}}
              className={`group relative rounded-2xl border border-white/[0.07] p-6 overflow-hidden ${f.span?'lg:col-span-2':''}`}
              style={{background:'rgba(10,15,30,0.7)',backdropFilter:'blur(12px)'}}>
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{background:`radial-gradient(ellipse at 50% 0%,${f.color}14 0%,transparent 65%)`}}/>
              <div className="flex items-start gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{background:`${f.color}18`,border:`1px solid ${f.color}30`}}>
                  <f.Icon size={15} style={{color:f.color}}/>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-[15px]">{f.title}</h3>
                  <p className="text-[12px] text-slate-400 leading-relaxed mt-0.5">{f.desc}</p>
                </div>
              </div>
              {f.visual}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════ HOW IT WORKS ════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.06] py-28" style={{background:'#0A0F1E'}}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="text-center mb-16">
            <p className="text-[11px] font-mono text-emerald-400 tracking-[0.25em] mb-3">PROCESS</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em]">From question to ticket in seconds.</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[17%] right-[17%] h-px"
              style={{background:'linear-gradient(90deg,#4338CA,#06B6D4,#10B981)'}}/>
            {HOW.map((h,i)=>(
              <motion.div key={h.n} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.15}} className="relative text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold font-mono"
                  style={{background:`${h.color}12`,border:`1px solid ${h.color}28`,color:h.color}}>
                  {h.n}
                </div>
                <h3 className="text-xl font-bold mb-3">{h.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ TESTIMONIALS ════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="text-center mb-14">
          <p className="text-[11px] font-mono text-amber-400 tracking-[0.25em] mb-3">SOCIAL PROOF</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">Travelers, consultants, agencies — all in.</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t,i)=>(
            <motion.div key={t.name} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:i*0.1}}
              className="rounded-2xl border border-white/[0.07] p-6"
              style={{background:'rgba(10,15,30,0.6)'}}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_,j)=>(
                  <FiStar key={j} size={12} className="text-amber-400 fill-amber-400"/>))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">"{t.text}"</p>
              <div>
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════ SECURITY ════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.06] py-28" style={{background:'#0A0F1E'}}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="text-center mb-14">
            <p className="text-[11px] font-mono text-indigo-400 tracking-[0.25em] mb-3">TRUST & SECURITY</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em]">Enterprise-grade by default.</h2>
            <p className="text-slate-400 mt-4 max-w-md mx-auto text-[15px]">
              Built for scale, compliance, and zero-tolerance failure.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECURITY.map((s,i)=>(
              <motion.div key={s.title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.08}}
                className="flex items-start gap-4 rounded-2xl border border-white/[0.07] p-5"
                style={{background:'rgba(15,22,41,0.5)'}}>
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <s.Icon size={16} className="text-indigo-400"/>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm mb-1">{s.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FINAL CTA ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="relative rounded-3xl overflow-hidden text-center p-16"
          style={{background:'linear-gradient(135deg,rgba(67,56,202,0.18) 0%,rgba(6,182,212,0.08) 100%)',border:'1px solid rgba(67,56,202,0.22)'}}>
          <div className="absolute inset-0 pointer-events-none"
            style={{background:'radial-gradient(ellipse 70% 70% at 50% 110%,rgba(67,56,202,0.22) 0%,transparent 70%)'}}/>
          <div className="relative">
            <p className="text-[11px] font-mono text-cyan-400 tracking-[0.25em] mb-4">GET STARTED FREE</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-4">
              Your next train,<br/>one message away.
            </h2>
            <p className="text-slate-400 mb-8 text-[15px] max-w-md mx-auto leading-relaxed">
              No forms. No filters. No captcha. Just tell RailwayGPT where you need to go.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/assistant"
                className="group flex items-center gap-2 rounded-xl text-white font-semibold px-8 py-3.5 text-sm"
                style={{background:'linear-gradient(135deg,#4338CA,#06B6D4)',boxShadow:'0 0 48px rgba(67,56,202,0.4)'}}>
                <FiTerminal size={15}/>
                Start Using RailwayGPT — Free
                <FiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform"/>
              </Link>
              <Link to="/trains"
                className="flex items-center gap-2 rounded-xl border border-white/[0.12] text-slate-200 font-medium px-6 py-3.5 text-sm transition-all hover:bg-white/[0.07]"
                style={{background:'rgba(255,255,255,0.04)'}}>
                <FiSearch size={13}/>
                Search Trains
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}