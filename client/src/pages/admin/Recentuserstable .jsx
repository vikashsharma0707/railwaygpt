import { motion } from 'framer-motion';
import { Inbox, UserPlus } from 'lucide-react';
import { useAllUsers } from '../../hooks/useDashboard';

export default function RecentUsersTable() {
  const { users, loading, error } = useAllUsers(8);

  if (error) {
    return (
      <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Recent Users</h2>
        <div className="text-center py-8 text-slate-500">Failed to load users</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (status === 'active') return 'bg-emerald-500/20 text-emerald-400';
    if (status === 'blocked') return 'bg-red-500/20 text-red-400';
    return 'bg-slate-500/20 text-slate-400';
  };

  const getRoleColor = (role) => {
    if (role === 'admin') return 'bg-amber-500/20 text-amber-400';
    if (role === 'user') return 'bg-blue-500/20 text-blue-400';
    return 'bg-slate-500/20 text-slate-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      
      <div className="relative bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl p-6 overflow-hidden">
        <h2 className="text-lg font-bold text-white mb-5">Recent Users</h2>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 bg-slate-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <Inbox size={32} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No users yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((user, idx) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-700/30"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-white">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'User'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status || 'Active'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}