// import { NavLink } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Users, 
//   Train, 
//   BookOpen, 
//   BarChart3, 
//   UsersRound, 
//   Lightbulb, 
//   Activity,
//   Zap
// } from 'lucide-react';

// const menuItems = [
//   { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
//   { path: '/admin/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
//   { path: '/admin/admintrains', icon: <Train size={20} />, label: 'Trains' },
//   { path: '/admin/bookings', icon: <BookOpen size={20} />, label: 'Bookings' },
//   { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
//   { path: '/admin/agents', icon: <UsersRound size={20} />, label: 'Agents' },
//   { path: '/admin/knowledge', icon: <Lightbulb size={20} />, label: 'Knowledge Base' },
//   { path: '/admin/activity', icon: <Activity size={20} />, label: 'Activity Feed' },
//   { path: '/admin/quick-actions', icon: <Zap size={20} />, label: 'Quick Actions' },
// ];

// const AdminSidebar = () => {
//   return (
//     <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
//       {/* Logo */}
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
//             R
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">RailAdmin</h2>
//             <p className="text-xs text-gray-500">Management</p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//         {menuItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
//                 isActive
//                   ? 'bg-indigo-50 text-indigo-700'
//                   : 'text-gray-600 hover:bg-gray-100'
//               }`
//             }
//           >
//             {item.icon}
//             {item.label}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-gray-200">
//         <button className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 py-3 rounded-xl text-sm font-medium">
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;





import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Train,
  BookOpen,
  BarChart3,
  UsersRound,
  Lightbulb,
  Activity,
  Zap,
  LogOut,
} from 'lucide-react';

const menuItems = [
  { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { path: '/admin/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
  { path: '/admin/admintrains', icon: <Train size={20} />, label: 'Trains' },
  { path: '/admin/bookings', icon: <BookOpen size={20} />, label: 'Bookings' },
  { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
  { path: '/admin/agents', icon: <UsersRound size={20} />, label: 'Agents' },
  { path: '/admin/knowledge', icon: <Lightbulb size={20} />, label: 'Knowledge Base' },
  { path: '/admin/activity', icon: <Activity size={20} />, label: 'Activity Feed' },
  { path: '/admin/quick-actions', icon: <Zap size={20} />, label: 'Quick Actions' },
];

const AdminSidebar = () => {
  return (
    <div
      className="w-64 flex flex-col border-r backdrop-blur-xl"
      style={{ background: 'rgba(15,23,42,0.7)', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', boxShadow: '0 8px 24px -8px #7C3AEDAA' }}
          >
            R
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">RailAdmin</h2>
            <p className="text-xs text-slate-500">Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background: 'rgba(124,58,237,0.15)',
                    border: '1px solid rgba(124,58,237,0.35)',
                    color: '#fff',
                  }
                : {}
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition"
          style={{ color: '#F87171', background: 'rgba(239,68,68,0.08)' }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;