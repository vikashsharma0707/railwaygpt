// import { useEffect, useState } from 'react';
// import { bookingApi } from '../../api/endpoints';

// export default function AdminBookings() {
//   const [list, setList] = useState([]);
//   useEffect(() => { bookingApi.listAll().then((r) => setList(r.data.data)); }, []);
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold">All Bookings</h1>
//       <div className="card mt-6 overflow-auto">
//         <table className="w-full text-sm">
//           <thead className="text-slate-400"><tr><th className="text-left">PNR</th><th className="text-left">User</th><th>Train</th><th>From → To</th><th>Date</th><th>Status</th><th>Amount</th></tr></thead>
//           <tbody>
//             {list.map((b) => (
//               <tr key={b._id} className="border-t border-white/5">
//                 <td className="py-2">{b.pnr}</td><td>{b.user?.name}</td><td>{b.trainNumber}</td>
//                 <td className="text-center">{b.fromCode} → {b.toCode}</td>
//                 <td className="text-center">{new Date(b.journeyDate).toLocaleDateString()}</td>
//                 <td className="text-center"><span className="chip">{b.status}</span></td>
//                 <td className="text-right">₹{b.totalAmount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState, useMemo } from 'react';
import { bookingApi } from '../../api/endpoints';
import {
  Search, Filter, X, ChevronDown, Inbox, RefreshCw, ArrowRight,
  Ticket, CheckCircle2, XCircle, Clock, IndianRupee, ChevronLeft, ChevronRight,
} from 'lucide-react';

const STATUS_STYLES = {
  confirmed: { bg: 'rgba(16,185,129,0.15)', text: '#34D399', icon: CheckCircle2 },
  cancelled: { bg: 'rgba(239,68,68,0.15)', text: '#F87171', icon: XCircle },
  pending: { bg: 'rgba(245,158,11,0.15)', text: '#FBBF24', icon: Clock },
};

const inputCls =
  'w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-violet-500/60 transition';
const labelCls = 'block text-xs font-medium text-slate-400 mb-1.5';

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}1A` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-xl font-bold text-white mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function AdminBookings() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [sortBy, setSortBy] = useState('date_desc');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 8;

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await bookingApi.listAll();
      setList(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const statuses = useMemo(
    () => ['all', ...new Set(list.map((b) => b.status).filter(Boolean))],
    [list]
  );

  const filtered = useMemo(() => {
    let rows = list.filter((b) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        b.pnr?.toLowerCase().includes(q) ||
        b.user?.name?.toLowerCase().includes(q) ||
        b.trainNumber?.toLowerCase?.().includes(q) ||
        b.fromCode?.toLowerCase().includes(q) ||
        b.toCode?.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

      const journeyTime = b.journeyDate ? new Date(b.journeyDate).getTime() : null;
      const matchesFrom = !dateFrom || (journeyTime && journeyTime >= new Date(dateFrom).getTime());
      const matchesTo = !dateTo || (journeyTime && journeyTime <= new Date(dateTo).getTime() + 86399999);

      const amount = b.totalAmount || 0;
      const matchesMin = !minAmount || amount >= Number(minAmount);
      const matchesMax = !maxAmount || amount <= Number(maxAmount);

      return matchesSearch && matchesStatus && matchesFrom && matchesTo && matchesMin && matchesMax;
    });

    rows = [...rows].sort((a, b) => {
      if (sortBy === 'date_desc') return new Date(b.journeyDate || 0) - new Date(a.journeyDate || 0);
      if (sortBy === 'date_asc') return new Date(a.journeyDate || 0) - new Date(b.journeyDate || 0);
      if (sortBy === 'amount_desc') return (b.totalAmount || 0) - (a.totalAmount || 0);
      if (sortBy === 'amount_asc') return (a.totalAmount || 0) - (b.totalAmount || 0);
      return 0;
    });

    return rows;
  }, [list, searchTerm, statusFilter, dateFrom, dateTo, minAmount, maxAmount, sortBy]);

  const stats = useMemo(() => {
    const confirmed = list.filter((b) => b.status === 'confirmed').length;
    const cancelled = list.filter((b) => b.status === 'cancelled').length;
    const revenue = list.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    return { total: list.length, confirmed, cancelled, revenue };
  }, [list]);

  const activeFilterCount = [
    statusFilter !== 'all',
    !!dateFrom,
    !!dateTo,
    !!minAmount,
    !!maxAmount,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setStatusFilter('all');
    setDateFrom('');
    setDateTo('');
    setMinAmount('');
    setMaxAmount('');
    setSortBy('date_desc');
  };

  const pageCount = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const pageItems = filtered.slice(page * pageSize, page * pageSize + pageSize);

  useEffect(() => { setPage(0); }, [searchTerm, statusFilter, dateFrom, dateTo, minAmount, maxAmount, sortBy]);

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 max-w-7xl mx-auto" style={{ color: '#fff' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Bookings</h1>
          <p className="text-sm text-slate-400 mt-1">{list.length} total bookings</p>
        </div>
        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition self-start sm:self-auto"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Bookings" value={stats.total} icon={Ticket} color="#06B6D4" />
        <StatCard label="Confirmed" value={stats.confirmed} icon={CheckCircle2} color="#10B981" />
        <StatCard label="Cancelled" value={stats.cancelled} icon={XCircle} color="#EF4444" />
        <StatCard label="Total Revenue" value={`₹${stats.revenue.toLocaleString('en-IN')}`} icon={IndianRupee} color="#7C3AED" />
      </div>

      {/* Search + filter toggle */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search PNR, passenger, train, or route..."
            className={`${inputCls} pl-11`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`${inputCls} sm:w-52`}>
          <option value="date_desc">Newest journey first</option>
          <option value="date_asc">Oldest journey first</option>
          <option value="amount_desc">Amount: High to Low</option>
          <option value="amount_asc">Amount: Low to High</option>
        </select>
        <button
          onClick={() => setFiltersOpen((o) => !o)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border transition"
          style={{
            borderColor: activeFilterCount ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)',
            background: activeFilterCount ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.03)',
          }}
        >
          <Filter size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full text-[11px] flex items-center justify-center bg-violet-600 text-white">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown size={14} className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {filtersOpen && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 mb-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className={labelCls}>Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={inputCls}>
              {statuses.map((s) => (
                <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Journey From</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Journey To</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Min Amount ₹</label>
            <input type="number" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} className={inputCls} placeholder="0" />
          </div>
          <div>
            <label className={labelCls}>Max Amount ₹</label>
            <input type="number" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} className={inputCls} placeholder="10000" />
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="sm:col-span-2 lg:col-span-5 flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white py-2"
            >
              <X size={14} /> Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 mb-6 text-red-300 text-sm flex items-center justify-between">
          {error}
          <button onClick={fetchBookings} className="underline">Retry</button>
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-slate-400">
              <th className="p-4 font-medium">PNR</th>
              <th className="p-4 font-medium">Passenger</th>
              <th className="p-4 font-medium">Train</th>
              <th className="p-4 font-medium">Route</th>
              <th className="p-4 font-medium">Journey Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td colSpan={7} className="p-4">
                    <div className="h-5 rounded-lg bg-white/5 animate-pulse" />
                  </td>
                </tr>
              ))
            ) : pageItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16 text-slate-500">
                  <Inbox size={36} className="mx-auto mb-3 opacity-30" />
                  No bookings match your filters
                </td>
              </tr>
            ) : (
              pageItems.map((b) => {
                const st = STATUS_STYLES[b.status] || STATUS_STYLES.pending;
                const StIcon = st.icon;
                const initials = (b.user?.name || 'U N').split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();
                return (
                  <tr key={b._id} className="border-b border-white/5 hover:bg-white/[0.03] transition">
                    <td className="p-4 font-mono text-cyan-400">{b.pnr}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold text-white shrink-0"
                          style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
                        >
                          {initials}
                        </span>
                        {b.user?.name || 'Unknown'}
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">{b.trainNumber || '—'}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        {b.fromCode} <ArrowRight size={13} className="text-violet-400" /> {b.toCode}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{b.journeyDate ? new Date(b.journeyDate).toLocaleDateString('en-IN') : '—'}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: st.bg, color: st.text }}>
                        <StIcon size={12} /> {b.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </td>
                    <td className="p-4 text-right font-semibold">₹{(b.totalAmount || 0).toLocaleString('en-IN')}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />)
        ) : pageItems.length === 0 ? (
          <div className="text-center py-16 text-slate-500 rounded-2xl border border-white/10">
            <Inbox size={36} className="mx-auto mb-3 opacity-30" />
            No bookings match your filters
          </div>
        ) : (
          pageItems.map((b) => {
            const st = STATUS_STYLES[b.status] || STATUS_STYLES.pending;
            const StIcon = st.icon;
            return (
              <div key={b._id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-mono text-cyan-400 text-sm">{b.pnr}</p>
                    <p className="font-medium mt-0.5">{b.user?.name || 'Unknown'}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: st.bg, color: st.text }}>
                    <StIcon size={12} /> {b.status?.toUpperCase() || 'PENDING'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
                  <span className="flex items-center gap-1.5">
                    {b.fromCode} <ArrowRight size={13} className="text-violet-400" /> {b.toCode}
                  </span>
                  <span>{b.journeyDate ? new Date(b.journeyDate).toLocaleDateString('en-IN') : '—'}</span>
                </div>
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/5">
                  <span className="text-xs text-slate-500">Train {b.trainNumber || '—'}</span>
                  <span className="font-semibold">₹{(b.totalAmount || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {!loading && filtered.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <span className="text-xs text-slate-500">
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-white/10 disabled:opacity-40 text-slate-300"
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
              disabled={page >= pageCount - 1}
              className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-white/10 disabled:opacity-40 text-slate-300"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}