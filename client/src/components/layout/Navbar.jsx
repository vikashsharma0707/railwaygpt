






// // import { Link, NavLink, useNavigate } from 'react-router-dom';
// // import { FiBell, FiLogOut, FiUser, FiMenu } from 'react-icons/fi';
// // import { useState } from 'react';
// // import { useAuth } from '../../context/AuthContext.jsx';

// // const navLinkClass = ({ isActive }) =>
// //   `px-4 py-2 rounded-xl text-sm font-medium transition-all ${
// //     isActive 
// //       ? 'bg-white/10 text-white shadow-sm' 
// //       : 'text-slate-300 hover:text-white hover:bg-white/5'
// //   }`;

// // export default function Navbar() {
// //   const { user, logout } = useAuth();
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     logout();
// //     navigate('/');
// //     setMobileOpen(false);
// //   };

// //   return (
// //     <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/10">
// //       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
// //         {/* Logo */}
// //         <Link to="/" className="flex items-center gap-2 font-bold text-xl">
// //           <span className="inline-block w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500" />
// //           Railway<span className="text-violet-400">GPT</span>
// //         </Link>

// //         {/* Desktop Navigation */}
// //         <nav className="hidden md:flex items-center gap-1 ml-8">
// //           <NavLink to="/trains" className={navLinkClass}>Trains</NavLink>
// //            <NavLink to="/trainsSearch" className={navLinkClass}>TrainsSearch</NavLink>
// //           <NavLink to="/pnr" className={navLinkClass}>PNR</NavLink>
// //           <NavLink to="/assistant" className={navLinkClass}>AI Assistant</NavLink>
          
// //           {user && (
// //             <NavLink to="/tickets" className={navLinkClass}>My Tickets</NavLink>
// //           )}
          
// //           {user?.role === 'admin' && (
// //             <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
// //           )}
// //         </nav>

// //         {/* Right Side */}
// //         <div className="ml-auto flex items-center gap-2">
// //           {user ? (
// //             <>
// //               <Link to="/notifications" className="p-3 hover:bg-white/5 rounded-xl transition">
// //                 <FiBell size={20} />
// //               </Link>
// //               <Link to="/profile" className="p-3 hover:bg-white/5 rounded-xl transition">
// //                 <FiUser size={20} />
// //               </Link>
// //               <button 
// //                 onClick={handleLogout}
// //                 className="p-3 hover:bg-white/5 rounded-xl transition text-red-400 hover:text-red-300"
// //               >
// //                 <FiLogOut size={20} />
// //               </button>
// //             </>
// //           ) : (
// //             <>
// //               <Link to="/login" className="px-5 py-2 text-slate-300 hover:text-white">Login</Link>
// //               <Link to="/register" className="px-5 py-2 bg-violet-600 hover:bg-violet-700 rounded-xl font-medium">Get Started</Link>
// //             </>
// //           )}

// //           {/* Mobile Menu Button */}
// //           <button 
// //             className="md:hidden p-3 hover:bg-white/5 rounded-xl transition"
// //             onClick={() => setMobileOpen(!mobileOpen)}
// //           >
// //             <FiMenu size={22} />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       {mobileOpen && (
// //         <div className="md:hidden border-t border-white/10 bg-slate-950/95 px-4 py-4 flex flex-col gap-2">
// //           <NavLink 
// //             to="/trains" 
// //             className={navLinkClass} 
// //             onClick={() => setMobileOpen(false)}
// //           >
// //             Trains
// //           </NavLink>
          
// //           <NavLink 
// //             to="/pnr" 
// //             className={navLinkClass} 
// //             onClick={() => setMobileOpen(false)}
// //           >
// //             PNR
// //           </NavLink>
          
// //           <NavLink 
// //             to="/assistant" 
// //             className={navLinkClass} 
// //             onClick={() => setMobileOpen(false)}
// //           >
// //             AI Assistant
// //           </NavLink>
          
// //           {user && (
// //             <NavLink 
// //               to="/tickets" 
// //               className={navLinkClass} 
// //               onClick={() => setMobileOpen(false)}
// //             >
// //               My Tickets
// //             </NavLink>
// //           )}
          
// //           {user?.role === 'admin' && (
// //             <NavLink 
// //               to="/admin" 
// //               className={navLinkClass} 
// //               onClick={() => setMobileOpen(false)}
// //             >
// //               Admin
// //             </NavLink>
// //           )}

// //           {user && (
// //             <button 
// //               onClick={handleLogout}
// //               className="mt-4 text-red-400 hover:text-red-300 text-left px-4 py-3"
// //             >
// //               Logout
// //             </button>
// //           )}
// //         </div>
// //       )}
// //     </header>
// //   );
// // }





// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { FiBell, FiLogOut, FiUser, FiMenu, FiX, FiActivity } from 'react-icons/fi';
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext.jsx';

// // ─── Nav links config ─────────────────────────────────────────────────────────
// const PUBLIC_LINKS = [
//   { to: '/trains',       label: 'Trains'       },
//   { to: '/trainsSearch', label: 'Search'        },
//   { to: '/pnr',          label: 'PNR Status'   },
//   { to: '/assistant',    label: 'AI Assistant' },
// ];

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const desktopLinkClass = ({ isActive }) =>
//   `relative px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
//     isActive ? 'text-white' : 'text-slate-400 hover:text-white'
//   }`;

// const mobileLinkClass = ({ isActive }) =>
//   `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//     isActive
//       ? 'bg-indigo-500/15 text-indigo-300'
//       : 'text-slate-400 hover:text-white hover:bg-white/5'
//   }`;

// // ─── Component ────────────────────────────────────────────────────────────────
// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const [mobileOpen, setMobileOpen]   = useState(false);
//   const [scrolled,   setScrolled]     = useState(false);
//   const navigate = useNavigate();

//   // Close mobile menu on resize
//   useEffect(() => {
//     const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
//     window.addEventListener('resize', onResize);
//     return () => window.removeEventListener('resize', onResize);
//   }, []);

//   // Shadow on scroll
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 8);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     setMobileOpen(false);
//   };

//   const close = () => setMobileOpen(false);

//   return (
//     <>
//       <header
//         className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
//           scrolled
//             ? 'bg-[#0A0B0F]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_24px_rgba(0,0,0,0.5)]'
//             : 'bg-transparent border-b border-transparent'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">

//           {/* ── Logo ─────────────────────────────────────────────────────── */}
//           <Link
//             to="/"
//             className="flex items-center gap-2 shrink-0"
//             onClick={close}
//           >
//             <FiActivity className="text-indigo-400" size={18} />
//             <span className="font-semibold text-[15px] tracking-tight text-white">
//               Railway<span className="text-indigo-400">GPT</span>
//             </span>
//           </Link>

//           {/* ── Desktop nav ───────────────────────────────────────────────── */}
//           <nav className="hidden md:flex items-center gap-0.5 ml-6">
//             {PUBLIC_LINKS.map(({ to, label }) => (
//               <NavLink key={to} to={to} className={desktopLinkClass}>
//                 {({ isActive }) => (
//                   <>
//                     {label}
//                     {/* Underline indicator */}
//                     {isActive && (
//                       <motion.span
//                         layoutId="nav-underline"
//                         className="absolute inset-x-3 -bottom-px h-px bg-indigo-400"
//                       />
//                     )}
//                   </>
//                 )}
//               </NavLink>
//             ))}

//             {user && (
//               <NavLink to="/tickets" className={desktopLinkClass}>
//                 {({ isActive }) => (
//                   <>
//                     My Tickets
//                     {isActive && (
//                       <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-px h-px bg-indigo-400" />
//                     )}
//                   </>
//                 )}
//               </NavLink>
//             )}

//             {user?.role === 'admin' && (
//               <NavLink to="/admin" className={desktopLinkClass}>
//                 {({ isActive }) => (
//                   <>
//                     <span className="text-amber-400">Admin</span>
//                     {isActive && (
//                       <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-px h-px bg-amber-400" />
//                     )}
//                   </>
//                 )}
//               </NavLink>
//             )}
//           </nav>

//           {/* ── Right side ───────────────────────────────────────────────── */}
//           <div className="ml-auto flex items-center gap-1">
//             {user ? (
//               <>
//                 {/* Notifications */}
//                 <Link
//                   to="/notifications"
//                   className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors hidden sm:flex"
//                   title="Notifications"
//                 >
//                   <FiBell size={17} />
//                   {/* Unread dot — remove if not needed */}
//                   <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
//                 </Link>

//                 {/* Profile */}
//                 <Link
//                   to="/profile"
//                   className="flex items-center gap-2 ml-1 rounded-lg px-2.5 py-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
//                   title="Profile"
//                 >
//                   <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
//                     <FiUser size={11} className="text-indigo-300" />
//                   </div>
//                   <span className="text-[13px] font-medium text-white hidden lg:block">
//                     {user.name?.split(' ')[0] || 'Profile'}
//                   </span>
//                 </Link>

//                 {/* Logout */}
//                 <button
//                   onClick={handleLogout}
//                   className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/[0.08] transition-colors hidden sm:flex"
//                   title="Logout"
//                 >
//                   <FiLogOut size={16} />
//                 </button>
//               </>
//             ) : (
//               <div className="hidden sm:flex items-center gap-2">
//                 <Link
//                   to="/login"
//                   className="px-3.5 py-1.5 text-[13px] font-medium text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]"
//                 >
//                   Log in
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-[0.97] transition-all text-white text-[13px] font-medium"
//                 >
//                   Get started
//                 </Link>
//               </div>
//             )}

//             {/* Mobile toggle */}
//             <button
//               className="md:hidden ml-1 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
//               onClick={() => setMobileOpen((v) => !v)}
//               aria-label="Toggle menu"
//             >
//               <AnimatePresence mode="wait" initial={false}>
//                 <motion.span
//                   key={mobileOpen ? 'close' : 'open'}
//                   initial={{ rotate: -90, opacity: 0 }}
//                   animate={{ rotate: 0, opacity: 1 }}
//                   exit={{ rotate: 90, opacity: 0 }}
//                   transition={{ duration: 0.15 }}
//                   className="flex"
//                 >
//                   {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
//                 </motion.span>
//               </AnimatePresence>
//             </button>
//           </div>
//         </div>

//         {/* ── Mobile menu ──────────────────────────────────────────────────── */}
//         <AnimatePresence>
//           {mobileOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.22, ease: 'easeInOut' }}
//               className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#0A0B0F]/98 backdrop-blur-xl"
//             >
//               <div className="px-4 py-4 flex flex-col gap-1">
//                 {PUBLIC_LINKS.map(({ to, label }) => (
//                   <NavLink key={to} to={to} className={mobileLinkClass} onClick={close}>
//                     {label}
//                   </NavLink>
//                 ))}

//                 {user && (
//                   <NavLink to="/tickets" className={mobileLinkClass} onClick={close}>
//                     My Tickets
//                   </NavLink>
//                 )}

//                 {user?.role === 'admin' && (
//                   <NavLink to="/admin" className={mobileLinkClass} onClick={close}>
//                     <span className="text-amber-400">Admin</span>
//                   </NavLink>
//                 )}

//                 {/* Mobile auth actions */}
//                 <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-col gap-2">
//                   {user ? (
//                     <>
//                       <Link
//                         to="/profile"
//                         onClick={close}
//                         className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/[0.05] transition-colors"
//                       >
//                         <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
//                           <FiUser size={13} className="text-indigo-300" />
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium text-white">{user.name || 'Profile'}</div>
//                           <div className="text-[11px] text-slate-500">{user.email}</div>
//                         </div>
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/[0.08] transition-colors text-sm font-medium"
//                       >
//                         <FiLogOut size={15} />
//                         Log out
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <Link
//                         to="/login"
//                         onClick={close}
//                         className="px-4 py-2.5 rounded-lg text-center text-sm font-medium text-slate-300 hover:bg-white/[0.05] border border-white/[0.08] transition-colors"
//                       >
//                         Log in
//                       </Link>
//                       <Link
//                         to="/register"
//                         onClick={close}
//                         className="px-4 py-2.5 rounded-lg text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
//                       >
//                         Get started
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>

//       {/* Spacer so page content doesn't hide under fixed navbar */}
//       <div className="h-14" />
//     </>
//   );
// }




import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiBell, FiLogOut, FiUser, FiMenu, FiX, FiActivity, FiSettings } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';

// ─── Config ───────────────────────────────────────────────────────────────
const PUBLIC_LINKS = [
  { to: '/trains', label: 'Trains', icon: '🚆' },
  { to: '/trainsSearch', label: 'Search', icon: '🔍' },
  { to: '/pnr', label: 'PNR Status', icon: '📋' },
  { to: '/assistant', label: 'AI Assistant', icon: '✨' },
];

// ─── Styles ───────────────────────────────────────────────────────────────
const desktopLinkClass = ({ isActive }) =>
  `relative px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-indigo-500/15 text-indigo-300'
      : 'text-slate-400 hover:text-white hover:bg-white/5'
  }`;

// ─── Component ────────────────────────────────────────────────────────────
export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0B0F]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl'
            : 'bg-[#0A0B0F]/50 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 group"
            onClick={closeMobile}
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center overflow-hidden">
              <FiActivity className="text-white relative z-10" size={18} />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-white">
              Railway<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">GPT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5 ml-6">
            {PUBLIC_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} className={desktopLinkClass}>
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-indigo-400 to-violet-400"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {user && (
              <NavLink to="/tickets" className={desktopLinkClass}>
                {({ isActive }) => (
                  <>
                    My Tickets
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-px h-px bg-indigo-400"
                      />
                    )}
                  </>
                )}
              </NavLink>
            )}

            {user?.role === 'admin' && (
              <NavLink to="/admin" className={desktopLinkClass}>
                {({ isActive }) => (
                  <>
                    <span className="text-amber-400 font-semibold">Admin</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-px h-px bg-amber-400"
                      />
                    )}
                  </>
                )}
              </NavLink>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="ml-auto flex items-center gap-1">
            {user ? (
              <>
                {/* Notifications */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/notifications"
                    className="relative p-2.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all hidden sm:flex"
                    title="Notifications"
                  >
                    <FiBell size={17} />
                    <motion.span
                      className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Link>
                </motion.div>

                {/* Settings */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/settings"
                    className="p-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all hidden sm:flex"
                    title="Settings"
                  >
                    <FiSettings size={17} />
                  </Link>
                </motion.div>

                {/* Profile */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 ml-1 rounded-lg px-3 py-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all group"
                    title="Profile"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 border border-indigo-500/40 flex items-center justify-center overflow-hidden group-hover:border-indigo-400/60 transition-all">
                      <FiUser size={12} className="text-white" />
                    </div>
                    <span className="text-[13px] font-medium text-white hidden lg:block">
                      {user.name?.split(' ')[0] || 'Profile'}
                    </span>
                  </Link>
                </motion.div>

                {/* Logout */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={handleLogout}
                    className="p-2.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/[0.08] transition-all hidden sm:flex"
                    title="Logout"
                  >
                    <FiLogOut size={17} />
                  </button>
                </motion.div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-[13px] font-medium text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]"
                >
                  Log in
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all text-white text-[13px] font-semibold shadow-lg shadow-indigo-500/20"
                  >
                    Get started
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden ml-1 p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#0A0B0F]/98 backdrop-blur-xl"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {PUBLIC_LINKS.map(({ to, label, icon }) => (
                  <NavLink key={to} to={to} className={mobileLinkClass} onClick={closeMobile}>
                    <span className="mr-2">{icon}</span> {label}
                  </NavLink>
                ))}

                {user && (
                  <NavLink to="/tickets" className={mobileLinkClass} onClick={closeMobile}>
                    🎫 My Tickets
                  </NavLink>
                )}

                {user?.role === 'admin' && (
                  <NavLink
                    to="/admin"
                    className={`${mobileLinkClass({ isActive: false })} text-amber-400 font-semibold`}
                    onClick={closeMobile}
                  >
                    ⚙️ Admin Dashboard
                  </NavLink>
                )}

                <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-col gap-2">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={closeMobile}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/[0.05] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                          <FiUser size={14} className="text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{user.name || 'Profile'}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/[0.08] transition-colors text-sm font-medium"
                      >
                        <FiLogOut size={16} />
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={closeMobile}
                        className="px-4 py-2.5 rounded-lg text-center text-sm font-medium text-slate-300 hover:bg-white/[0.05] border border-white/[0.08] transition-colors"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/register"
                        onClick={closeMobile}
                        className="px-4 py-2.5 rounded-lg text-center text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all"
                      >
                        Get started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Navbar Spacer */}
      <div className="h-16" />
    </>
  );
}