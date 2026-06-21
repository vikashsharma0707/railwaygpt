import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiCpu, FiShield, FiZap } from 'react-icons/fi';

const features = [
  { icon: <FiCpu />, title: '50+ AI Agents', desc: 'Master, booking, RAG, prediction, payment, admin — coordinated by a multi-agent orchestrator.' },
  { icon: <FiZap />, title: 'Autonomous Booking', desc: '"Kal Mumbai jana hai." We search, draft, allocate seats and create payment in one chat.' },
  { icon: <FiShield />, title: 'Bank-grade Security', desc: 'JWT rotation, Helmet, rate limits, sanitisation, Razorpay signature & webhook verification.' },
  { icon: <FiSearch />, title: 'RAG Knowledge', desc: 'Hybrid + semantic search over railway rules, policies and FAQs with source citations.' },
];

export default function Landing() {
  return (
    <div>
      <section className="relative max-w-7xl mx-auto px-4 pt-20 pb-24">
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold tracking-tight">
          The Agentic <span className="bg-gradient-to-r from-brand-500 to-fuchsia-500 bg-clip-text text-transparent">Railway OS</span>
        </motion.h1>
        <p className="mt-6 max-w-2xl text-slate-300 text-lg">
          RailwayGPT is a multi-agent AI platform that searches trains, books tickets, predicts delays
          and answers railway questions — all from a single conversation.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/assistant" className="btn-primary">Talk to RailwayGPT</Link>
          <Link to="/trains" className="btn-ghost">Search Trains</Link>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="card hover:border-brand-500/50 transition">
              <div className="text-brand-400 text-xl">{f.icon}</div>
              <h3 className="mt-2 font-semibold">{f.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
