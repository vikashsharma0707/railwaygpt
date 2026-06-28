import { motion } from 'framer-motion';
import { Inbox, ActivitySquare } from 'lucide-react';
import { useAuditLogs } from '../../hooks/useDashboard';

const activityIcons = {
  'booking': '🎫',
  'payment': '💳',
  'user': '👤',
  'train': '🚆',
  'login': '🔑',
  'refund': '💰',
  'admin': '⚙️',
  'default': '📋',
};

export default function ActivityFeed() {
  const { logs, loading, error } = useAuditLogs(10);

  const getActivityIcon = (action) => {
    const key = action?.toLowerCase().split('_')[0];
    return activityIcons[key] || activityIcons.default;
  };

  const getActivityColor = (action) => {
    if (action?.includes('created')) return 'bg-emerald-500/20 text-emerald-400';
    if (action?.includes('deleted')) return 'bg-red-500/20 text-red-400';
    if (action?.includes('updated')) return 'bg-amber-500/20 text-amber-400';
    if (action?.includes('cancelled')) return 'bg-red-500/20 text-red-400';
    if (action?.includes('completed')) return 'bg-emerald-500/20 text-emerald-400';
    return 'bg-indigo-500/20 text-indigo-400';
  };

  const formatAction = (action) => {
    return action
      ?.replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || 'Activity';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.35 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      
      <div className="relative bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl p-6 overflow-hidden">
        <div className="flex items-center gap-2 mb-5">
          <ActivitySquare size={20} className="text-rose-400" />
          <h2 className="text-lg font-bold text-white">Live Activity</h2>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-slate-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : error || logs.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <Inbox size={32} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No activity yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log, idx) => (
              <motion.div
                key={log._id || idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors border border-slate-700/30"
              >
                <div className={`w-8 h-8 rounded-lg ${getActivityColor(log.action)} flex items-center justify-center shrink-0 text-sm`}>
                  {getActivityIcon(log.action)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {formatAction(log.action) || 'Activity'}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {log.user?.name || 'System'} • {log.resource || 'Unknown'}
                  </p>
                </div>

                <div className="text-xs text-slate-500 shrink-0">
                  {log.createdAt ? new Date(log.createdAt).toLocaleTimeString() : 'Just now'}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}