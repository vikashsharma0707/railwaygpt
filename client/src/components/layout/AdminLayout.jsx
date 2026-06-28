// import { Outlet } from 'react-router-dom';
// import AdminSidebar from './AdminSidebar.jsx';

// const AdminLayout = () => {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <AdminSidebar />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Navbar */}
//         <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
//           </div>
          
//           <div className="flex items-center gap-6">
//             <div className="text-sm text-gray-600">Welcome, Admin</div>
//             <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium">
//               A
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-auto p-6 bg-gray-50">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;




import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar.jsx';

const AdminLayout = () => {
  return (
    <div className="flex h-screen relative overflow-hidden" style={{ background: '#050816' }}>
      {/* ambient glow, purely decorative */}
      <div
        className="absolute -top-1/3 left-1/3 w-[900px] h-[900px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED55 0%, transparent 65%)' }}
      />

      {/* Sidebar */}
      <div className="relative z-10">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header
          className="border-b px-6 py-4 flex items-center justify-between backdrop-blur-xl"
          style={{ background: 'rgba(15,23,42,0.6)', borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-white tracking-tight">Admin Panel</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-sm text-slate-400">Welcome, Admin</div>
            <div
              className="w-9 h-9 text-white rounded-full flex items-center justify-center font-medium text-sm"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;