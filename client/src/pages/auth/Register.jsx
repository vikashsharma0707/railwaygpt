// import { useForm } from 'react-hook-form';
// import { useNavigate, Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useAuth } from '../../context/AuthContext.jsx';

// export default function Register() {
//   const { register, handleSubmit, formState: { isSubmitting } } = useForm();
//   const { register: signup } = useAuth();
//   const nav = useNavigate();
//   const onSubmit = async (data) => {
//     try { await signup(data); toast.success('Account created'); nav('/dashboard'); }
//     catch (e) { toast.error(e?.response?.data?.message || 'Registration failed'); }
//   };
//   return (
//     <div className="max-w-md mx-auto px-4 py-16">
//       <h1 className="text-2xl font-bold">Create your RailwayGPT account</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 space-y-4">
//         <div><label className="label">Name</label><input className="input" {...register('name', { required: true })} /></div>
//         <div><label className="label">Email</label><input className="input" {...register('email', { required: true })} /></div>
//         <div><label className="label">Phone</label><input className="input" {...register('phone')} /></div>
//         <div><label className="label">Password</label><input type="password" className="input" {...register('password', { required: true, minLength: 6 })} /></div>
//         <button className="btn-primary w-full" disabled={isSubmitting}>{isSubmitting ? 'Creating…' : 'Create account'}</button>
//         <p className="text-sm text-slate-400">Already have an account? <Link to="/login" className="text-brand-400">Sign in</Link></p>
//       </form>
//     </div>
//   );
// }






import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Eye, EyeOff, Mail, Lock, User, Phone,
  ArrowRight, Train, CheckCircle, Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

// ── Password strength (UI only) ───────────────────────────────────────────────
function PasswordStrength({ password = '' }) {
  const score =
    password.length === 0 ? 0 :
    password.length < 6   ? 1 :
    password.length < 10 && /[A-Z]/.test(password) ? 2 :
    /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password) ? 4 : 3;

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', 'bg-rose-500', 'bg-amber-500', 'bg-sky-500', 'bg-emerald-500'];
  const textColors = ['', 'text-rose-400', 'text-amber-400', 'text-sky-400', 'text-emerald-400'];

  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i}
            className={`flex-1 h-1 rounded-full transition-all duration-300
                        ${i <= score ? colors[score] : 'bg-white/[0.08]'}`} />
        ))}
      </div>
      <p className={`text-[10px] font-medium ${textColors[score]}`}>
        {labels[score]}
      </p>
    </div>
  );
}

// ── Shared feature list for hero ──────────────────────────────────────────────
const FEATURES = [
  'AI Assistant', 'Smart Booking', 'Live PNR', 'Waitlist Prediction',
  'QR Tickets', 'Multi-Agent AI', 'Docker Ready', 'Kubernetes',
];

function HeroPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-center px-12 xl:px-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-violet-800/25 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-800/20 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8
                     bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold w-fit"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          🚄 AI Powered Railway Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5 text-white"
        >
          Join{' '}
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            RailwayGPT AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-400 text-base leading-relaxed mb-8 max-w-sm"
        >
          Create your account and experience intelligent railway booking powered
          by 50+ AI agents, RAG knowledge base and real-time data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FEATURES.map((f, i) => (
            <motion.span
              key={f}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                         text-slate-300 bg-white/[0.04] border border-white/[0.07]"
            >
              <CheckCircle size={10} className="text-emerald-400" /> {f}
            </motion.span>
          ))}
        </motion.div>

        {/* Floating card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/[0.08]
                       rounded-2xl p-5 max-w-xs shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30
                              flex items-center justify-center">
                <Zap size={15} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Free to Join</p>
                <p className="text-[10px] text-slate-500">No credit card required</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-1 pt-3 border-t border-white/[0.06]">
              {[['50+', 'AI Agents'], ['RAG', 'Knowledge'], ['Free', 'Forever']].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="text-sm font-bold text-white">{v}</p>
                  <p className="text-[10px] text-slate-500">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Main Register component ───────────────────────────────────────────────────
// ALL LOGIC UNCHANGED
export default function Register() {
  const { register: formRegister, handleSubmit, watch, formState: { isSubmitting } } = useForm();
  const { register: signup } = useAuth();
  const nav = useNavigate();

  // UI only
  const [showPass, setShowPass] = useState(false);
  const password = watch('password', '');

  // ── LOGIC UNCHANGED ────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    try {
      await signup(data);
      toast.success('Account created');
      nav('/dashboard');
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex overflow-hidden">

      {/* Left hero */}
      <div className="flex-1">
        <HeroPanel />
      </div>

      {/* Right — auth card */}
      <div className="w-full lg:w-[500px] flex-shrink-0 flex items-center justify-center
                      px-6 py-12 relative">
        <div className="absolute inset-0 pointer-events-none lg:hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-800/15 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px] bg-[#0F172A]/80 backdrop-blur-xl
                     border border-white/[0.08] rounded-[28px] p-8 shadow-2xl shadow-black/50"
        >
          {/* Card header */}
          <div className="mb-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4
                            bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
              <Train size={11} /> Create Account
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Join RailwayGPT AI
            </h2>
            <p className="text-slate-400 text-sm mt-1.5">
              Create your account and experience intelligent railway booking.
            </p>
          </div>

          {/* Form — LOGIC UNCHANGED */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  {...formRegister('name', { required: true })}
                  placeholder="Vikash Sharma"
                  className="w-full h-13 py-3.5 pl-11 pr-4 bg-white/[0.04] border border-white/[0.08]
                             rounded-2xl text-white text-sm placeholder-slate-600
                             focus:outline-none focus:border-violet-500/60
                             focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]
                             transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type="email"
                  {...formRegister('email', { required: true })}
                  placeholder="you@example.com"
                  className="w-full h-13 py-3.5 pl-11 pr-4 bg-white/[0.04] border border-white/[0.08]
                             rounded-2xl text-white text-sm placeholder-slate-600
                             focus:outline-none focus:border-violet-500/60
                             focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]
                             transition-all duration-200"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Phone <span className="text-slate-600 normal-case font-normal">(optional)</span>
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type="tel"
                  {...formRegister('phone')}
                  placeholder="+91 98765 43210"
                  className="w-full h-13 py-3.5 pl-11 pr-4 bg-white/[0.04] border border-white/[0.08]
                             rounded-2xl text-white text-sm placeholder-slate-600
                             focus:outline-none focus:border-violet-500/60
                             focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]
                             transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type={showPass ? 'text' : 'password'}
                  {...formRegister('password', { required: true, minLength: 6 })}
                  placeholder="Min. 6 characters"
                  className="w-full h-13 py-3.5 pl-11 pr-12 bg-white/[0.04] border border-white/[0.08]
                             rounded-2xl text-white text-sm placeholder-slate-600
                             focus:outline-none focus:border-violet-500/60
                             focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]
                             transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500
                             hover:text-slate-300 transition-colors p-1"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ y: isSubmitting ? 0 : -1, scale: isSubmitting ? 1 : 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-14 rounded-2xl font-bold text-sm text-white
                         bg-gradient-to-r from-violet-600 to-indigo-600
                         hover:from-violet-500 hover:to-indigo-500
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 mt-2
                         shadow-lg shadow-violet-900/30 transition-all duration-200"
            >
              {isSubmitting
                ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Creating…</>
                : <>Create Account <ArrowRight size={16} /></>}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            <span className="text-[11px] text-slate-600 font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          </div>

          {/* Sign in link */}
          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login"
              className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}