import { motion } from 'framer-motion';
import { Inbox, CreditCard } from 'lucide-react';
import { useRecentPayments } from '../../hooks/useDashboard';

export default function RecentPaymentsTable() {
  const { payments, loading, error } = useRecentPayments(8);

  if (error) {
    return (
      <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Recent Payments</h2>
        <div className="text-center py-8 text-slate-500">Failed to load payments</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      case 'pending':
        return 'bg-amber-500/20 text-amber-400';
      case 'refunded':
        return 'bg-violet-500/20 text-violet-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getMethodIcon = (method) => {
    const icons = {
      'card': '💳',
      'upi': '📱',
      'netbanking': '🏦',
      'wallet': '👛',
      'paypal': '🅿️',
    };
    return icons[method?.toLowerCase()] || '💰';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/20 to-rose-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      
      <div className="relative bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl p-6 overflow-hidden">
        <h2 className="text-lg font-bold text-white mb-5">Recent Payments</h2>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 bg-slate-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : payments.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <Inbox size={32} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No payments yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400">Method</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400">Amount</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, idx) => (
                  <motion.tr
                    key={payment._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs text-slate-400">{payment._id?.slice(-8) || 'N/A'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm flex items-center gap-1.5">
                        <span>{getMethodIcon(payment.method)}</span>
                        {payment.method || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-semibold text-white">₹{(payment.amount || 0).toLocaleString('en-IN')}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                        {payment.status || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs text-slate-400">{new Date(payment.createdAt).toLocaleDateString()}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}