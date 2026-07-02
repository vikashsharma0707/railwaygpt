// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { useAuth } from '../../context/AuthContext.jsx';
// import { authApi } from '../../api/endpoints';

// export default function Profile() {
//   const { user, updateProfile } = useAuth();
//   const { register, handleSubmit } = useForm({ defaultValues: user });
//   const { register: regPw, handleSubmit: hsPw, reset } = useForm();

//   const save = async (d) => {
//     try { await updateProfile(d); toast.success('Updated'); }
//     catch { toast.error('Failed'); }
//   };
//   const changePw = async (d) => {
//     try { await authApi.changePassword(d); toast.success('Password changed'); reset(); }
//     catch (e) { toast.error(e?.response?.data?.message || 'Failed'); }
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold">Profile</h1>
//         <form onSubmit={handleSubmit(save)} className="card mt-4 grid md:grid-cols-2 gap-3">
//           <div><label className="label">Name</label><input className="input" {...register('name')} /></div>
//           <div><label className="label">Phone</label><input className="input" {...register('phone')} /></div>
//           <div><label className="label">Preferred Berth</label>
//             <select className="input" {...register('preferences.berth')}>
//               <option value="any">Any</option><option value="lower">Lower</option><option value="middle">Middle</option><option value="upper">Upper</option><option value="side-lower">Side Lower</option><option value="side-upper">Side Upper</option>
//             </select>
//           </div>
//           <div><label className="label">Preferred Language</label>
//             <select className="input" {...register('preferences.language')}>
//               <option value="en">English</option><option value="hi">Hindi</option><option value="ta">Tamil</option><option value="te">Telugu</option><option value="bn">Bengali</option>
//             </select>
//           </div>
//           <div className="md:col-span-2"><button className="btn-primary">Save</button></div>
//         </form>
//       </div>
//       <div>
//         <h2 className="text-xl font-bold">Change password</h2>
//         <form onSubmit={hsPw(changePw)} className="card mt-4 grid md:grid-cols-2 gap-3">
//           <div><label className="label">Old password</label><input type="password" className="input" {...regPw('oldPassword', { required: true })} /></div>
//           <div><label className="label">New password</label><input type="password" className="input" {...regPw('newPassword', { required: true, minLength: 6 })} /></div>
//           <div className="md:col-span-2"><button className="btn-primary">Update password</button></div>
//         </form>
//       </div>
//     </div>
//   );
// }




import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  User, Phone, Lock, Eye, EyeOff,
  Globe, Armchair, Save, Shield,
  CheckCircle, ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { authApi } from '../../api/endpoints';

// ── Shared field wrapper (UI only) ────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </label>
      {children}
    </div>
  );
}

// ── Shared input style ────────────────────────────────────────────────────────
const inputCls = `w-full h-12 pl-11 pr-4 bg-white/[0.04] border border-white/[0.08]
  rounded-xl text-white text-sm placeholder-slate-600
  focus:outline-none focus:border-violet-500/60
  focus:shadow-[0_0_0_3px_rgba(124,58,237,0.10)]
  transition-all duration-200`;

const selectCls = `w-full h-12 pl-11 pr-4 appearance-none bg-white/[0.04] border border-white/[0.08]
  rounded-xl text-slate-200 text-sm cursor-pointer
  focus:outline-none focus:border-violet-500/60
  focus:shadow-[0_0_0_3px_rgba(124,58,237,0.10)]
  transition-all duration-200`;

// ═══════════════════════════════════════════════════════════════
// ALL LOGIC, API CALLS, HOOKS — COMPLETELY UNCHANGED
// ═══════════════════════════════════════════════════════════════
export default function Profile() {
  const { user, updateProfile } = useAuth();

  const { register, handleSubmit }              = useForm({ defaultValues: user });
  const { register: regPw, handleSubmit: hsPw, reset } = useForm();

  // UI only
  const [showOld,  setShowOld]  = useState(false);
  const [showNew,  setShowNew]  = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPw,      setSavingPw]      = useState(false);

  // ── LOGIC UNCHANGED ────────────────────────────────────────────────────────
  const save = async (d) => {
    setSavingProfile(true);
    try { await updateProfile(d); toast.success('Updated'); }
    catch { toast.error('Failed'); }
    finally { setSavingProfile(false); }
  };

  const changePw = async (d) => {
    setSavingPw(true);
    try { await authApi.changePassword(d); toast.success('Password changed'); reset(); }
    catch (e) { toast.error(e?.response?.data?.message || 'Failed'); }
    finally { setSavingPw(false); }
  };

  // ── Avatar initials ─────────────────────────────────────────────────────
  const initials = user?.name
    ?.split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

  // ── UI ─────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#020617] text-white py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ── Page header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-2"
        >
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600
                          flex items-center justify-center text-xl font-extrabold text-white
                          shadow-lg shadow-violet-900/40 flex-shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{user?.name || 'Profile'}</h1>
            <p className="text-slate-500 text-sm mt-0.5">{user?.email}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <CheckCircle size={11} className="text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-medium capitalize">
                {user?.role || 'user'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Profile info card ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/[0.07]
                     rounded-2xl p-6 shadow-xl shadow-black/30"
        >
          <div className="flex items-center gap-2 mb-6">
            <User size={16} className="text-violet-400" />
            <h2 className="text-base font-bold text-white">Personal Information</h2>
          </div>

          {/* Form — LOGIC UNCHANGED */}
          <form onSubmit={handleSubmit(save)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">

              {/* Name */}
              <Field label="Full Name">
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <input
                    placeholder="Your full name"
                    className={inputCls}
                    {...register('name')}
                  />
                </div>
              </Field>

              {/* Phone */}
              <Field label="Phone">
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <input
                    placeholder="+91 98765 43210"
                    className={inputCls}
                    {...register('phone')}
                  />
                </div>
              </Field>

              {/* Berth */}
              <Field label="Preferred Berth">
                <div className="relative">
                  <Armchair size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10" />
                  <select className={selectCls} {...register('preferences.berth')}>
                    <option value="any">Any</option>
                    <option value="lower">Lower</option>
                    <option value="middle">Middle</option>
                    <option value="upper">Upper</option>
                    <option value="side-lower">Side Lower</option>
                    <option value="side-upper">Side Upper</option>
                  </select>
                  <ArrowRight size={13} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-500 pointer-events-none" />
                </div>
              </Field>

              {/* Language */}
              <Field label="Preferred Language">
                <div className="relative">
                  <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10" />
                  <select className={selectCls} {...register('preferences.language')}>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                    <option value="te">Telugu</option>
                    <option value="bn">Bengali</option>
                  </select>
                  <ArrowRight size={13} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-500 pointer-events-none" />
                </div>
              </Field>
            </div>

            {/* Save */}
            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={savingProfile}
                whileHover={{ y: savingProfile ? 0 : -1 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                           bg-gradient-to-r from-violet-600 to-indigo-600 text-white
                           hover:from-violet-500 hover:to-indigo-500
                           disabled:opacity-50 disabled:cursor-not-allowed
                           shadow-md shadow-violet-900/30 transition-all"
              >
                {savingProfile
                  ? <><span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Saving…</>
                  : <><Save size={15} /> Save Changes</>}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* ── Change password card ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/[0.07]
                     rounded-2xl p-6 shadow-xl shadow-black/30"
        >
          <div className="flex items-center gap-2 mb-6">
            <Shield size={16} className="text-violet-400" />
            <h2 className="text-base font-bold text-white">Change Password</h2>
          </div>

          {/* Form — LOGIC UNCHANGED */}
          <form onSubmit={hsPw(changePw)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">

              {/* Old password */}
              <Field label="Current Password">
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <input
                    type={showOld ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={`${inputCls} pr-11`}
                    {...regPw('oldPassword', { required: true })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500
                               hover:text-slate-300 transition-colors p-1"
                  >
                    {showOld ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </Field>

              {/* New password */}
              <Field label="New Password">
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <input
                    type={showNew ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    className={`${inputCls} pr-11`}
                    {...regPw('newPassword', { required: true, minLength: 6 })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500
                               hover:text-slate-300 transition-colors p-1"
                  >
                    {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </Field>
            </div>

            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={savingPw}
                whileHover={{ y: savingPw ? 0 : -1 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                           bg-white/[0.06] border border-white/[0.10] text-white
                           hover:bg-white/[0.10] disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all"
              >
                {savingPw
                  ? <><span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Updating…</>
                  : <><Shield size={15} /> Update Password</>}
              </motion.button>
            </div>
          </form>
        </motion.div>

      </div>
    </div>
  );
}