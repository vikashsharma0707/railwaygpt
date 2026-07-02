// // // import { NavLink } from 'react-router-dom';
// // // import { 
// // //   LayoutDashboard, 
// // //   Users, 
// // //   Train, 
// // //   BookOpen, 
// // //   BarChart3, 
// // //   UsersRound, 
// // //   Lightbulb, 
// // //   Activity,
// // //   Zap
// // // } from 'lucide-react';

// // // const menuItems = [
// // //   { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
// // //   { path: '/admin/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
// // //   { path: '/admin/admintrains', icon: <Train size={20} />, label: 'Trains' },
// // //   { path: '/admin/bookings', icon: <BookOpen size={20} />, label: 'Bookings' },
// // //   { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
// // //   { path: '/admin/agents', icon: <UsersRound size={20} />, label: 'Agents' },
// // //   { path: '/admin/knowledge', icon: <Lightbulb size={20} />, label: 'Knowledge Base' },
// // //   { path: '/admin/activity', icon: <Activity size={20} />, label: 'Activity Feed' },
// // //   { path: '/admin/quick-actions', icon: <Zap size={20} />, label: 'Quick Actions' },
// // // ];

// // // const AdminSidebar = () => {
// // //   return (
// // //     <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
// // //       {/* Logo */}
// // //       <div className="p-6 border-b border-gray-200">
// // //         <div className="flex items-center gap-3">
// // //           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
// // //             R
// // //           </div>
// // //           <div>
// // //             <h2 className="text-2xl font-bold text-gray-900">RailAdmin</h2>
// // //             <p className="text-xs text-gray-500">Management</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Navigation */}
// // //       <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
// // //         {menuItems.map((item) => (
// // //           <NavLink
// // //             key={item.path}
// // //             to={item.path}
// // //             className={({ isActive }) =>
// // //               `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
// // //                 isActive
// // //                   ? 'bg-indigo-50 text-indigo-700'
// // //                   : 'text-gray-600 hover:bg-gray-100'
// // //               }`
// // //             }
// // //           >
// // //             {item.icon}
// // //             {item.label}
// // //           </NavLink>
// // //         ))}
// // //       </nav>

// // //       {/* Footer */}
// // //       <div className="p-4 border-t border-gray-200">
// // //         <button className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 py-3 rounded-xl text-sm font-medium">
// // //           Logout
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdminSidebar;





// // import { NavLink } from 'react-router-dom';
// // import {
// //   LayoutDashboard,
// //   Users,
// //   Train,
// //   BookOpen,
// //   BarChart3,
// //   UsersRound,
// //   Lightbulb,
// //   Activity,
// //   Zap,
// //   LogOut,
// // } from 'lucide-react';

// // const menuItems = [
// //   { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
// //   { path: '/admin/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
// //   { path: '/admin/admintrains', icon: <Train size={20} />, label: 'Trains' },
// //   { path: '/admin/bookings', icon: <BookOpen size={20} />, label: 'Bookings' },
// //   { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
// //   { path: '/admin/agents', icon: <UsersRound size={20} />, label: 'Agents' },
// //   { path: '/admin/knowledge', icon: <Lightbulb size={20} />, label: 'Knowledge Base' },
// //   { path: '/admin/activity', icon: <Activity size={20} />, label: 'Activity Feed' },
// //   { path: '/admin/quick-actions', icon: <Zap size={20} />, label: 'Quick Actions' },
// // ];

// // const AdminSidebar = () => {
// //   return (
// //     <div
// //       className="w-64 flex flex-col border-r backdrop-blur-xl"
// //       style={{ background: 'rgba(15,23,42,0.7)', borderColor: 'rgba(255,255,255,0.06)' }}
// //     >
// //       {/* Logo */}
// //       <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
// //         <div className="flex items-center gap-3">
// //           <div
// //             className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
// //             style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', boxShadow: '0 8px 24px -8px #7C3AEDAA' }}
// //           >
// //             R
// //           </div>
// //           <div>
// //             <h2 className="text-xl font-bold text-white tracking-tight">RailAdmin</h2>
// //             <p className="text-xs text-slate-500">Management</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Navigation */}
// //       <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
// //         {menuItems.map((item) => (
// //           <NavLink
// //             key={item.path}
// //             to={item.path}
// //             className={({ isActive }) =>
// //               `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
// //                 isActive
// //                   ? 'text-white'
// //                   : 'text-slate-400 hover:text-white hover:bg-white/5'
// //               }`
// //             }
// //             style={({ isActive }) =>
// //               isActive
// //                 ? {
// //                     background: 'rgba(124,58,237,0.15)',
// //                     border: '1px solid rgba(124,58,237,0.35)',
// //                     color: '#fff',
// //                   }
// //                 : {}
// //             }
// //           >
// //             {item.icon}
// //             {item.label}
// //           </NavLink>
// //         ))}
// //       </nav>

// //       {/* Footer */}
// //       <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
// //         <button
// //           className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition"
// //           style={{ color: '#F87171', background: 'rgba(239,68,68,0.08)' }}
// //         >
// //           <LogOut size={16} />
// //           Logout
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminSidebar;







// import { NavLink, useNavigate } from 'react-router-dom';
// import {
//   LayoutDashboard, Users, Train, BookOpen,
//   BarChart3, UsersRound, Lightbulb, Activity,
//   Zap, LogOut,
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext.jsx';

// const menuItems = [
//   { path: '/admin',               icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
//   { path: '/admin/analytics',     icon: <BarChart3 size={20} />,       label: 'Analytics' },
//   { path: '/admin/trains',        icon: <Train size={20} />,           label: 'Trains' },
//   { path: '/admin/bookings',      icon: <BookOpen size={20} />,        label: 'Bookings' },
//   { path: '/admin/users',         icon: <Users size={20} />,           label: 'Users' },
//   { path: '/admin/agents',        icon: <UsersRound size={20} />,      label: 'Agents' },
//   { path: '/admin/knowledge',     icon: <Lightbulb size={20} />,       label: 'Knowledge Base' },
//   { path: '/admin/activity',      icon: <Activity size={20} />,        label: 'Activity Feed' },
//   { path: '/admin/quick-actions', icon: <Zap size={20} />,             label: 'Quick Actions' },
// ];

// const AdminSidebar = () => {
//   // ✅ FIX: logout + navigate add kiya
//   const { logout } = useAuth();
//   const navigate   = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login', { replace: true });
//   };

//   return (
//     <div
//       className="w-64 flex flex-col border-r backdrop-blur-xl"
//       style={{ background: 'rgba(15,23,42,0.7)', borderColor: 'rgba(255,255,255,0.06)' }}
//     >
//       {/* Logo */}
//       <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
//         <div className="flex items-center gap-3">
//           <div
//             className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
//             style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', boxShadow: '0 8px 24px -8px #7C3AEDAA' }}
//           >
//             R
//           </div>
//           <div>
//             <h2 className="text-xl font-bold text-white tracking-tight">RailAdmin</h2>
//             <p className="text-xs text-slate-500">Management</p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation — UNCHANGED */}
//       <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//         {menuItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             end={item.path === '/admin'}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
//                 isActive
//                   ? 'text-white'
//                   : 'text-slate-400 hover:text-white hover:bg-white/5'
//               }`
//             }
//             style={({ isActive }) =>
//               isActive
//                 ? { background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)', color: '#fff' }
//                 : {}
//             }
//           >
//             {item.icon}
//             {item.label}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Footer — ✅ onClick added */}
//       <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition hover:opacity-90 active:scale-[0.98]"
//           style={{ color: '#F87171', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
//         >
//           <LogOut size={16} />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;










import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Train, BookOpen,
  BarChart3, UsersRound, Lightbulb, Activity,
  Zap, LogOut, ChevronRight, Menu, X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

// ── Nav sections (routes/icons UNCHANGED) ─────────────────────────────────────
const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { path: '/admin',           icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/admin/analytics', icon: BarChart3,       label: 'Analytics' },
      { path: '/admin/users',     icon: Users,           label: 'Users' },
      { path: '/admin/bookings',  icon: BookOpen,        label: 'Bookings' },
    ],
  },
  {
    label: 'Trains & AI',
    items: [
      { path: '/admin/trains',    icon: Train,           label: 'Trains' },
      { path: '/admin/knowledge', icon: Lightbulb,       label: 'Knowledge Base' },
      { path: '/admin/agents',    icon: UsersRound,      label: 'Agents' },
    ],
  },
  {
    label: 'System',
    items: [
      { path: '/admin/activity',      icon: Activity, label: 'Activity Feed' },
      { path: '/admin/quick-actions', icon: Zap,      label: 'Quick Actions' },
    ],
  },
];

// ── Single nav item ───────────────────────────────────────────────────────────
function NavItem({ path, icon: Icon, label, collapsed, onClick }) {
  return (
    <NavLink
      to={path}
      end={path === '/admin'}
      onClick={onClick}
      className="block"
    >
      {({ isActive }) => (
        <motion.div
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          className={`relative flex items-center gap-3.5 px-4 py-3 rounded-[14px]
                      text-sm font-medium transition-all duration-200 cursor-pointer
                      ${isActive
                        ? 'text-white shadow-lg shadow-violet-900/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                      } ${collapsed ? 'justify-center px-2' : ''}`}
          style={isActive ? {
            background: 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(99,102,241,0.15) 100%)',
            border: '1px solid rgba(124,58,237,0.35)',
          } : { border: '1px solid transparent' }}
        >
          {/* Active left bar */}
          {isActive && (
            <motion.div
              layoutId="active-bar"
              className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full
                         bg-gradient-to-b from-violet-400 to-indigo-500
                         shadow-[0_0_8px_rgba(139,92,246,0.8)]"
            />
          )}

          <Icon
            size={18}
            className={`flex-shrink-0 transition-colors duration-200
                        ${isActive ? 'text-violet-300' : 'text-slate-500 group-hover:text-slate-300'}`}
          />

          {!collapsed && (
            <span className="flex-1 truncate">{label}</span>
          )}

          {!collapsed && isActive && (
            <ChevronRight size={13} className="text-violet-400/60 flex-shrink-0" />
          )}
        </motion.div>
      )}
    </NavLink>
  );
}

// ── Sidebar inner content ─────────────────────────────────────────────────────
function SidebarContent({ collapsed = false, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  // ── LOGOUT — LOGIC UNCHANGED ─────────────────────────────────────────────
  const handleLogout = async () => {
    setLoggingOut(true);
    logout();
    navigate('/login', { replace: true });
  };

  const initials = user?.name
    ?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'A';

  return (
    <div className="flex flex-col h-full">

      {/* ── Logo ─────────────────────────────────────────────────────── */}
      <div className={`flex-shrink-0 border-b border-white/[0.06]
                       ${collapsed ? 'p-4 items-center' : 'px-5 py-5'}`}>
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          {/* Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center
                            font-bold text-white text-lg shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
                boxShadow: '0 0 20px rgba(124,58,237,0.4)',
              }}
            >
              R
            </div>
            {/* Online dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full
                             bg-emerald-400 border-2 border-[#071126] animate-pulse" />
          </div>

          {!collapsed && (
            <div>
              <p className="text-[14px] font-bold text-white leading-none tracking-tight">
                RailwayGPT <span className="text-violet-400">AI</span>
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Admin Console</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-5
                      scrollbar-thin scrollbar-thumb-white/[0.08] scrollbar-track-transparent
                      hover:scrollbar-thumb-white/[0.15]">
        {NAV_SECTIONS.map(({ label, items }, si) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.07 }}
          >
            {/* Section label */}
            {!collapsed && (
              <p className="text-[10px] font-bold uppercase tracking-[0.12em]
                            text-slate-600 px-4 mb-1.5">
                {label}
              </p>
            )}

            <div className="space-y-0.5">
              {items.map(({ path, icon, label: itemLabel }) => (
                <NavItem
                  key={path}
                  path={path}
                  icon={icon}
                  label={itemLabel}
                  collapsed={collapsed}
                  onClick={onClose}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </nav>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 mt-auto border-t border-white/[0.06] p-3 space-y-2">

        {/* Profile row */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-[14px]
                          bg-white/[0.03] border border-white/[0.05]">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center
                            text-xs font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #6366F1)' }}
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate leading-none">
                {user?.name || 'Admin'}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                {user?.email || 'Administrator'}
              </p>
            </div>
          </div>
        )}

        {/* Logout button */}
        <motion.button
          onClick={handleLogout}
          disabled={loggingOut}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center gap-2.5 py-3 rounded-[14px]
                      text-sm font-semibold transition-all duration-200
                      border border-rose-500/20 text-rose-400
                      hover:bg-rose-500/15 hover:text-rose-300 hover:border-rose-500/40
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${collapsed ? 'justify-center px-2' : 'justify-center px-4'}`}
          style={{ background: 'rgba(239,68,68,0.06)' }}
        >
          {loggingOut
            ? <span className="w-4 h-4 rounded-full border-2 border-rose-400/30 border-t-rose-400 animate-spin" />
            : <LogOut size={16} />
          }
          {!collapsed && (
            <span>{loggingOut ? 'Signing out…' : 'Sign Out'}</span>
          )}
        </motion.button>
      </div>
    </div>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
const AdminSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sidebar bg style
  const sidebarStyle = {
    background: 'linear-gradient(180deg, #071126 0%, #050816 100%)',
    borderRight: '1px solid rgba(255,255,255,0.06)',
  };

  return (
    <>
      {/* ── MOBILE toggle button ─────────────────────────────────────── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-xl
                   bg-[#0F172A] border border-white/[0.10]
                   flex items-center justify-center text-slate-400
                   hover:text-white transition-colors shadow-lg"
      >
        <Menu size={18} />
      </button>

      {/* ── DESKTOP sidebar ──────────────────────────────────────────── */}
      <div
        className="hidden md:flex flex-col w-64 h-screen sticky top-0 flex-shrink-0"
        style={sidebarStyle}
      >
        <SidebarContent />
      </div>

      {/* ── MOBILE drawer ────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              className="md:hidden fixed left-0 top-0 bottom-0 z-50 w-64 flex flex-col"
              style={sidebarStyle}
            >
              {/* Close btn */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-lg
                           flex items-center justify-center
                           text-slate-500 hover:text-white hover:bg-white/[0.07]
                           transition-colors"
              >
                <X size={15} />
              </button>

              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;