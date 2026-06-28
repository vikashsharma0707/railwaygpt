import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export default function StatsCard({ icon: Icon, label, value, change, color = 'indigo', isLoading, trend = 'up' }) {
  const colorMap = {
    indigo: { gradient: 'from-indigo-500/20 to-indigo-600/10', accent: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    violet: { gradient: 'from-violet-500/20 to-violet-600/10', accent: 'text-violet-400', bg: 'bg-violet-500/10' },
    amber: { gradient: 'from-amber-500/20 to-amber-600/10', accent: 'text-amber-400', bg: 'bg-amber-500/10' },
    emerald: { gradient: 'from-emerald-500/20 to-emerald-600/10', accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    rose: { gradient: 'from-rose-500/20 to-rose-600/10', accent: 'text-rose-400', bg: 'bg-rose-500/10' },
    cyan: { gradient: 'from-cyan-500/20 to-cyan-600/10', accent: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  };

  const colors = colorMap[color] || colorMap.indigo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${colors.gradient} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`} />
      
      <div className="relative bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl p-6 overflow-hidden hover:border-slate-600 transition-all duration-300">
        {/* Background glow */}
        <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${colors.gradient} rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />

        <div className="relative z-10">
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} ${colors.accent} mb-4`}>
            <Icon size={22} />
          </div>

          {/* Label */}
          <div className="text-sm font-medium text-slate-400 mb-2">{label}</div>

          {/* Value */}
          {isLoading ? (
            <div className="h-8 bg-slate-800 rounded-lg animate-pulse mb-3" />
          ) : typeof value === 'number' ? (
            <div className="text-3xl font-bold text-white mb-3">
              <CountUp end={value} duration={2} separator="," />
            </div>
          ) : (
            <div className="text-3xl font-bold text-white mb-3">{value}</div>
          )}

          {/* Change indicator */}
          {change !== undefined && !isLoading && (
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${
              trend === 'up' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              <span className={trend === 'up' ? '↑' : '↓'} />{Math.abs(change)}% from last month
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}