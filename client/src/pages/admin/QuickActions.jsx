import { motion } from 'framer-motion';
import { Plus, Users, Ticket, BarChart3, Upload, FileDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { id: 1, label: 'Add Train', icon: Plus, color: 'indigo', action: '/admin/trains/new' },
  { id: 2, label: 'Manage Users', icon: Users, color: 'violet', action: '/admin/users' },
  { id: 3, label: 'Manage Bookings', icon: Ticket, color: 'amber', action: '/admin/bookings' },
  { id: 4, label: 'Analytics', icon: BarChart3, color: 'cyan', action: '/admin/analytics' },
  { id: 5, label: 'Import Trains', icon: Upload, color: 'rose', action: '#' },
  { id: 6, label: 'Export Report', icon: FileDown, color: 'emerald', action: '#' },
];

const colorMap = {
  indigo: 'from-indigo-500/20 to-indigo-600/10 text-indigo-400',
  violet: 'from-violet-500/20 to-violet-600/10 text-violet-400',
  amber: 'from-amber-500/20 to-amber-600/10 text-amber-400',
  cyan: 'from-cyan-500/20 to-cyan-600/10 text-cyan-400',
  rose: 'from-rose-500/20 to-rose-600/10 text-rose-400',
  emerald: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400',
};

export default function QuickActions() {
  const navigate = useNavigate();

  const handleAction = (action) => {
    if (action && action !== '#') {
      navigate(action);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      
      <div className="relative bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl p-6 overflow-hidden">
        <h2 className="text-lg font-bold text-white mb-5">Quick Actions</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action, idx) => {
            const Icon = action.icon;
            const [gradient, ...rest] = colorMap[action.color].split(' ');

            return (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAction(action.action)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br ${colorMap[action.color]} border border-white/10 hover:border-white/20 transition-all group/btn`}
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover/btn:bg-white/10 transition-colors">
                  <Icon size={18} />
                </div>
                <span className="text-xs font-semibold text-center leading-tight">{action.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}