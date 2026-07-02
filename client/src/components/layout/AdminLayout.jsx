// // import { Outlet } from 'react-router-dom';
// // import AdminSidebar from './AdminSidebar.jsx';

// // const AdminLayout = () => {
// //   return (
// //     <div className="flex h-screen bg-gray-50">
// //       {/* Sidebar */}
// //       <AdminSidebar />

// //       {/* Main Content Area */}
// //       <div className="flex-1 flex flex-col overflow-hidden">
// //         {/* Top Navbar */}
// //         <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
// //           <div className="flex items-center gap-4">
// //             <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
// //           </div>
          
// //           <div className="flex items-center gap-6">
// //             <div className="text-sm text-gray-600">Welcome, Admin</div>
// //             <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium">
// //               A
// //             </div>
// //           </div>
// //         </header>

// //         {/* Page Content */}
// //         <main className="flex-1 overflow-auto p-6 bg-gray-50">
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminLayout;




// import { Outlet } from 'react-router-dom';
// import AdminSidebar from './AdminSidebar.jsx';

// const AdminLayout = () => {
//   return (
//     <div className="flex h-screen relative overflow-hidden" style={{ background: '#050816' }}>
//       {/* ambient glow, purely decorative */}
//       <div
//         className="absolute -top-1/3 left-1/3 w-[900px] h-[900px] rounded-full blur-3xl opacity-30 pointer-events-none"
//         style={{ background: 'radial-gradient(circle, #7C3AED55 0%, transparent 65%)' }}
//       />

//       {/* Sidebar */}
//       <div className="relative z-10">
//         <AdminSidebar />
//       </div>

//       {/* Main Content Area */}
//       <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
//         {/* Top Navbar */}
//         <header
//           className="border-b px-6 py-4 flex items-center justify-between backdrop-blur-xl"
//           style={{ background: 'rgba(15,23,42,0.6)', borderColor: 'rgba(255,255,255,0.06)' }}
//         >
//           <div className="flex items-center gap-4">
//             <h1 className="text-2xl font-semibold text-white tracking-tight">Admin Panel</h1>
//           </div>

//           <div className="flex items-center gap-6">
//             <div className="text-sm text-slate-400">Welcome, Admin</div>
//             <div
//               className="w-9 h-9 text-white rounded-full flex items-center justify-center font-medium text-sm"
//               style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
//             >
//               A
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;






import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

// ── Route → page title map ────────────────────────────────────────────────────
const PAGE_TITLES = {
  '/admin':           { title: 'Dashboard',      sub: 'Overview of RailwayGPT operations' },
  '/admin/analytics': { title: 'Analytics',      sub: 'Revenue, bookings and user trends' },
  '/admin/trains':    { title: 'Trains',         sub: 'Manage train fleet and schedules' },
  '/admin/users':     { title: 'Users',          sub: 'Manage registered users' },
  '/admin/bookings':  { title: 'Bookings',       sub: 'All booking records' },
  '/admin/knowledge': { title: 'Knowledge Base', sub: 'RAG documents and policies' },
  '/admin/agents':    { title: 'AI Agents',      sub: 'Manage and monitor AI agents' },
};

const AdminLayout = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const page = PAGE_TITLES[pathname] ?? { title: 'Admin', sub: '' };

  // Avatar initials
  const initials = user?.name
    ?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'A';

  return (
    <div className="flex h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* ── Ambient glow (decorative) ──────────────────────────────── */}
      <div className="absolute -top-1/3 left-1/3 w-[900px] h-[900px] rounded-full
                      blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED55 0%, transparent 65%)' }}
      />

      {/* ── Sidebar ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* ── Main content ───────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top header */}
        <header className="flex-shrink-0 flex items-center justify-between
                           px-6 py-4 border-b border-white/[0.06]
                           bg-[#0F172A]/60 backdrop-blur-xl">
          {/* Page title */}
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight leading-none">
              {page.title}
            </h1>
            {page.sub && (
              <p className="text-xs text-slate-500 mt-0.5">{page.sub}</p>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Live indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full
                            bg-emerald-500/10 border border-emerald-500/20
                            text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>

            {/* Admin info */}
            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-medium text-slate-200 leading-none">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">Administrator</p>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center
                              font-bold text-sm text-white flex-shrink-0
                              bg-gradient-to-br from-violet-600 to-indigo-600
                              shadow-lg shadow-violet-900/30">
                {initials}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;