// // import { useForm } from 'react-hook-form';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import toast from 'react-hot-toast';
// // import { useAuth } from '../../context/AuthContext.jsx';

// // export default function Login() {
// //   const { register, handleSubmit, formState: { isSubmitting } } = useForm();
// //   const { login } = useAuth();
// //   const nav = useNavigate();
// //   const loc = useLocation();
// //   const onSubmit = async (data) => {
// //     try { await login(data); toast.success('Welcome back'); nav(loc.state?.from?.pathname || '/dashboard'); }
// //     catch (e) { toast.error(e?.response?.data?.message || 'Login failed'); }
// //   };
// //   return (
// //     <div className="max-w-md mx-auto px-4 py-16">
// //       <h1 className="text-2xl font-bold">Login to RailwayGPT</h1>
// //       <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 space-y-4">
// //         <div><label className="label">Email</label><input className="input" {...register('email', { required: true })} /></div>
// //         <div><label className="label">Password</label><input type="password" className="input" {...register('password', { required: true })} /></div>
// //         <button className="btn-primary w-full" disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Sign in'}</button>
// //         <div className="flex justify-between text-sm text-slate-400">
// //           <Link to="/forgot-password" className="hover:text-white">Forgot password?</Link>
// //           <Link to="/register" className="hover:text-white">Create account</Link>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }





// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { motion } from 'framer-motion';
// import { Eye, EyeOff, Mail, Lock, ArrowRight, Train, Zap, CheckCircle } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext.jsx';

// // ── Shared left hero panel ────────────────────────────────────────────────────
// const FEATURES = [
//   '50+ AI Agents', 'Smart Booking', 'Live PNR', 'Waitlist Prediction',
//   'QR Tickets', 'Multi-Agent AI', 'Docker Ready', 'Kubernetes',
// ];

// function HeroPanel() {
//   return (
//     <div className="hidden lg:flex flex-col justify-center px-12 xl:px-16 relative overflow-hidden">
//       {/* Aurora blobs */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-violet-800/25 blur-[130px]" />
//         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-800/20 blur-[120px]" />
//       </div>

//       <div className="relative z-10">
//         {/* Badge */}
//         <motion.div
//           initial={{ opacity: 0, y: -12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8
//                      bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold w-fit"
//         >
//           <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
//           🚄 AI Powered Railway Platform
//         </motion.div>

//         {/* Heading */}
//         <motion.h1
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5 text-white"
//         >
//           Welcome to{' '}
//           <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
//             RailwayGPT AI
//           </span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.15 }}
//           className="text-slate-400 text-base leading-relaxed mb-8 max-w-sm"
//         >
//           India's next-generation intelligent railway platform. Book trains, predict
//           waitlists, check PNR and chat with your AI co-pilot.
//         </motion.p>

//         {/* Feature chips */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.25 }}
//           className="flex flex-wrap gap-2 mb-10"
//         >
//           {FEATURES.map((f, i) => (
//             <motion.span
//               key={f}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.3 + i * 0.05 }}
//               className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
//                          text-slate-300 bg-white/[0.04] border border-white/[0.07]"
//             >
//               <CheckCircle size={10} className="text-emerald-400" /> {f}
//             </motion.span>
//           ))}
//         </motion.div>

//         {/* Floating AI card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.6 }}
//         >
//           <motion.div
//             animate={{ y: [0, -8, 0] }}
//             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//             className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/[0.08]
//                        rounded-2xl p-5 max-w-xs shadow-2xl shadow-black/40"
//           >
//             <div className="flex items-center gap-2.5 mb-4">
//               <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30
//                               flex items-center justify-center">
//                 <Zap size={15} className="text-violet-400" />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-white">RailwayGPT</p>
//                 <div className="flex items-center gap-1">
//                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//                   <span className="text-[10px] text-slate-500">50+ agents online</span>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-violet-600/15 border border-violet-500/20 rounded-xl px-3 py-2 text-xs text-violet-200">
//               "Kal Pune se Delhi ke liye Rajdhani book karo window seat ke saath" ✓
//             </div>
//             <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/[0.06]">
//               {[['50+', 'Agents'], ['RAG', 'Knowledge'], ['∞', 'Queries']].map(([v, l]) => (
//                 <div key={l} className="text-center">
//                   <p className="text-sm font-bold text-white">{v}</p>
//                   <p className="text-[10px] text-slate-500">{l}</p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// // ── Main Login component ──────────────────────────────────────────────────────
// // ALL LOGIC UNCHANGED
// export default function Login() {
//   const { register, handleSubmit, formState: { isSubmitting } } = useForm();
//   const { login } = useAuth();
//   const nav = useNavigate();
//   const loc = useLocation();

//   // UI only state
//   const [showPass, setShowPass] = useState(false);

//   // ── LOGIC UNCHANGED ────────────────────────────────────────────────────────
//   const onSubmit = async (data) => {
//     try {
//       await login(data);
//       toast.success('Welcome back');
//       nav(loc.state?.from?.pathname || '/dashboard');
//     } catch (e) {
//       toast.error(e?.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-white flex overflow-hidden">

//       {/* Left hero */}
//       <div className="flex-1">
//         <HeroPanel />
//       </div>

//       {/* Right — auth card */}
//       <div className="w-full lg:w-[480px] flex-shrink-0 flex items-center justify-center
//                       px-6 py-12 relative">
//         {/* Blob behind card */}
//         <div className="absolute inset-0 pointer-events-none lg:hidden">
//           <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-800/15 blur-[120px]" />
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-[420px] bg-[#0F172A]/80 backdrop-blur-xl
//                      border border-white/[0.08] rounded-[28px] p-8 shadow-2xl shadow-black/50"
//         >
//           {/* Card header */}
//           <div className="mb-8">
//             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4
//                             bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[11px] font-semibold">
//               <Train size={11} /> Welcome Back
//             </div>
//             <h2 className="text-2xl font-extrabold text-white tracking-tight">
//               Sign in to RailwayGPT
//             </h2>
//             <p className="text-slate-400 text-sm mt-1.5">
//               Continue your AI-powered railway journey.
//             </p>
//           </div>

//           {/* Form — LOGIC UNCHANGED */}
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//             {/* Email */}
//             <div>
//               <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
//                 Email
//               </label>
//               <div className="relative">
//                 <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
//                 <input
//                   type="email"
//                   {...register('email', { required: true })}
//                   placeholder="you@example.com"
//                   className="w-full h-14 pl-11 pr-4 bg-white/[0.04] border border-white/[0.08]
//                              rounded-2xl text-white text-sm placeholder-slate-600
//                              focus:outline-none focus:border-violet-500/60
//                              focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]
//                              transition-all duration-200"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
//                 <input
//                   type={showPass ? 'text' : 'password'}
//                   {...register('password', { required: true })}
//                   placeholder="••••••••"
//                   className="w-full h-14 pl-11 pr-12 bg-white/[0.04] border border-white/[0.08]
//                              rounded-2xl text-white text-sm placeholder-slate-600
//                              focus:outline-none focus:border-violet-500/60
//                              focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]
//                              transition-all duration-200"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPass(v => !v)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500
//                              hover:text-slate-300 transition-colors p-1"
//                 >
//                   {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//             </div>

//             {/* Forgot */}
//             <div className="flex justify-end">
//               <Link
//                 to="/forgot-password"
//                 className="text-xs text-slate-500 hover:text-violet-400 transition-colors"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             {/* Submit */}
//             <motion.button
//               type="submit"
//               disabled={isSubmitting}
//               whileHover={{ y: isSubmitting ? 0 : -1, scale: isSubmitting ? 1 : 1.01 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full h-14 rounded-2xl font-bold text-sm text-white
//                          bg-gradient-to-r from-violet-600 to-indigo-600
//                          hover:from-violet-500 hover:to-indigo-500
//                          disabled:opacity-50 disabled:cursor-not-allowed
//                          flex items-center justify-center gap-2
//                          shadow-lg shadow-violet-900/30 transition-all duration-200"
//             >
//               {isSubmitting
//                 ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Signing in…</>
//                 : <>Sign in <ArrowRight size={16} /></>}
//             </motion.button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center gap-3 my-6">
//             <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
//             <span className="text-[11px] text-slate-600 font-medium">OR</span>
//             <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
//           </div>

//           {/* Register link */}
//           <p className="text-center text-sm text-slate-500">
//             Don't have an account?{' '}
//             <Link to="/register"
//               className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
//               Create account
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }





import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Train, Zap, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const FEATURES = [
  '50+ AI Agents', 'Smart Booking', 'Live PNR', 'Waitlist Prediction',
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
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8 bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          🚄 AI Powered Railway Platform
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5 text-white">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            RailwayGPT AI
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-400 text-base leading-relaxed mb-8 max-w-sm">
          India's next-generation intelligent railway platform. Book trains, predict waitlists, check PNR and chat with your AI co-pilot.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex flex-wrap gap-2 mb-10">
          {FEATURES.map((f, i) => (
            <motion.span key={f} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.05 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/[0.07]">
              <CheckCircle size={10} className="text-emerald-400" /> {f}
            </motion.span>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 max-w-xs shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                <Zap size={15} className="text-violet-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">RailwayGPT</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-slate-500">50+ agents online</span>
                </div>
              </div>
            </div>
            <div className="bg-violet-600/15 border border-violet-500/20 rounded-xl px-3 py-2 text-xs text-violet-200">
              "Kal Pune se Delhi ke liye Rajdhani book karo window seat ke saath" ✓
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/[0.06]">
              {[['50+', 'Agents'], ['RAG', 'Knowledge'], ['∞', 'Queries']].map(([v, l]) => (
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

// ── MAIN LOGIN COMPONENT ──────────────────────────────────────────────────────
export default function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [showPass, setShowPass] = useState(false);

  // ── KEY FIX: admin → /admin  |  user → /dashboard ────────────────────────
  const onSubmit = async (data) => {
    try {
      const result = await login(data);

      toast.success('Welcome back');

      // login() se jo bhi user return ho uska role check karo
      const loggedInUser =
        result?.user ??
        result?.data?.user ??
        result?.data ??
        result;

      if (loggedInUser?.role === 'admin') {
        nav('/admin', { replace: true });
      } else {
        nav(loc.state?.from?.pathname || '/dashboard', { replace: true });
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex overflow-hidden">
      <div className="flex-1"><HeroPanel /></div>

      <div className="w-full lg:w-[480px] flex-shrink-0 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 pointer-events-none lg:hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-800/15 blur-[120px]" />
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-[420px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/[0.08] rounded-[28px] p-8 shadow-2xl shadow-black/50">

          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4
                            bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[11px] font-semibold">
              <Train size={11} /> Welcome Back
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Sign in to RailwayGPT</h2>
            <p className="text-slate-400 text-sm mt-1.5">Continue your AI-powered railway journey.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input type="email" {...register('email', { required: true })} placeholder="you@example.com"
                  className="w-full h-14 pl-11 pr-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-violet-500/60 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)] transition-all duration-200" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input type={showPass ? 'text' : 'password'} {...register('password', { required: true })} placeholder="••••••••"
                  className="w-full h-14 pl-11 pr-12 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-violet-500/60 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)] transition-all duration-200" />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-slate-500 hover:text-violet-400 transition-colors">
                Forgot password?
              </Link>
            </div>

            <motion.button type="submit" disabled={isSubmitting}
              whileHover={{ y: isSubmitting ? 0 : -1, scale: isSubmitting ? 1 : 1.01 }} whileTap={{ scale: 0.98 }}
              className="w-full h-14 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-violet-900/30 transition-all duration-200">
              {isSubmitting
                ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Signing in…</>
                : <>Sign in <ArrowRight size={16} /></>}
            </motion.button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            <span className="text-[11px] text-slate-600 font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          </div>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
              Create account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}