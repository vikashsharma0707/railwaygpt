// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { bookingApi } from '../../api/endpoints';
// import EmptyState from '../../components/ui/EmptyState.jsx';

// export default function MyTickets() {
//   const [list, setList] = useState([]);
//   useEffect(() => { bookingApi.mine().then((r) => setList(r.data.data)); }, []);
//   const cancel = async (id) => {
//     try { await bookingApi.cancel(id); setList((xs) => xs.map(x => x._id === id ? { ...x, status: 'cancelled' } : x)); toast.success('Cancelled'); }
//     catch (e) { toast.error(e?.response?.data?.message || 'Failed'); }
//   };
//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold">My Tickets</h1>
//       <div className="mt-6 space-y-3">
//         {list.length === 0 && <EmptyState title="No tickets yet" subtitle="Start by searching a train." />}
//         {list.map((b) => (
//           <div key={b._id} className="card flex flex-wrap items-center gap-4">
//             <div className="flex-1 min-w-[240px]">
//               <div className="font-semibold">{b.trainName} #{b.trainNumber}</div>
//               <div className="text-sm text-slate-400">{b.fromStation} → {b.toStation} • {new Date(b.journeyDate).toDateString()}</div>
//               <div className="text-xs text-slate-500">PNR: {b.pnr} • {b.class} • {b.passengers.length} pax</div>
//             </div>
//             <span className={`chip ${b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' : b.status === 'cancelled' ? 'bg-rose-500/20 text-rose-300' : ''}`}>{b.status}</span>
//             <a className="btn-ghost" href={bookingApi.ticketUrl(b._id)} target="_blank" rel="noreferrer">PDF</a>
//             {b.status !== 'cancelled' && <button className="btn-danger" onClick={() => cancel(b._id)}>Cancel</button>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { bookingApi } from '../../api/endpoints';
import EmptyState from '../../components/ui/EmptyState.jsx';

export default function MyTickets() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await bookingApi.mine();
      setList(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to load tickets");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this ticket?")) return;
    
    try {
      await bookingApi.cancel(id);
      setList(prev => prev.map(ticket => 
        ticket._id === id ? { ...ticket, status: 'cancelled' } : ticket
      ));
      toast.success('Ticket cancelled successfully');
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Cancellation failed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Tickets</h1>
        <button onClick={fetchTickets} className="text-violet-400 hover:text-violet-300">
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading your tickets...</div>
      ) : list.length === 0 ? (
        <EmptyState 
          title="No tickets yet" 
          subtitle="Start by searching and booking a train." 
        />
      ) : (
        <div className="space-y-4">
          {list.map((b) => (
            <div key={b._id} className="bg-gray-900 border border-gray-700 rounded-3xl p-6 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="font-semibold text-lg">{b.trainName} • #{b.trainNumber}</div>
                <div className="text-slate-400 mt-1">
                  {b.fromStation} → {b.toStation}
                </div>
                <div className="text-sm text-slate-500 mt-1">
                  {new Date(b.journeyDate).toDateString()} • {b.class} Class • {b.passengers?.length || 0} Passengers
                </div>
                <div className="text-xs font-mono text-slate-400 mt-2">PNR: {b.pnr}</div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                  b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                  b.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {b.status?.toUpperCase()}
                </span>

                {/* <a 
                  href={bookingApi.ticketUrl(b._id)} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-ghost px-5 py-2 text-sm"
                >
                  Download PDF
                </a> */}


<a 
  href={bookingApi.ticketUrl(b._id)} 
  target="_blank" 
  rel="noreferrer"
  className="btn-ghost px-5 py-2"
>
  Download PDF
</a>
                {b.status !== 'cancelled' && b.status !== 'completed' && (
                  <button 
                    onClick={() => cancel(b._id)}
                    className="text-red-400 hover:text-red-500 text-sm font-medium"
                  >
                    Cancel Ticket
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}