import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { bookingApi } from '../../api/endpoints';
import EmptyState from '../../components/ui/EmptyState.jsx';

export default function MyTickets() {
  const [list, setList] = useState([]);
  useEffect(() => { bookingApi.mine().then((r) => setList(r.data.data)); }, []);
  const cancel = async (id) => {
    try { await bookingApi.cancel(id); setList((xs) => xs.map(x => x._id === id ? { ...x, status: 'cancelled' } : x)); toast.success('Cancelled'); }
    catch (e) { toast.error(e?.response?.data?.message || 'Failed'); }
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">My Tickets</h1>
      <div className="mt-6 space-y-3">
        {list.length === 0 && <EmptyState title="No tickets yet" subtitle="Start by searching a train." />}
        {list.map((b) => (
          <div key={b._id} className="card flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[240px]">
              <div className="font-semibold">{b.trainName} #{b.trainNumber}</div>
              <div className="text-sm text-slate-400">{b.fromStation} → {b.toStation} • {new Date(b.journeyDate).toDateString()}</div>
              <div className="text-xs text-slate-500">PNR: {b.pnr} • {b.class} • {b.passengers.length} pax</div>
            </div>
            <span className={`chip ${b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' : b.status === 'cancelled' ? 'bg-rose-500/20 text-rose-300' : ''}`}>{b.status}</span>
            <a className="btn-ghost" href={bookingApi.ticketUrl(b._id)} target="_blank" rel="noreferrer">PDF</a>
            {b.status !== 'cancelled' && <button className="btn-danger" onClick={() => cancel(b._id)}>Cancel</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
