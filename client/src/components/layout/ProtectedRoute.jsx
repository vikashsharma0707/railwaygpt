// import { Outlet, Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext.jsx';

// export default function ProtectedRoute({ role }) {
//   const { user, loading } = useAuth();
//   const loc = useLocation();
//   if (loading) return <div className="p-10 text-slate-300">Loading…</div>;
//   if (!user) return <Navigate to="/login" state={{ from: loc }} replace />;
//   if (role && user.role !== role) return <Navigate to="/" replace />;
//   return <Outlet />;
// }


import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProtectedRoute({ role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-slate-300 text-lg">Loading...</div>
      </div>
    );
  }

  // Not logged in → Login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based protection
  if (role) {
    if (role === 'admin' && user.role !== 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
    // Agar future mein aur roles add karne hain toh yahan extend kar sakte hain
  }

  return <Outlet />;
}