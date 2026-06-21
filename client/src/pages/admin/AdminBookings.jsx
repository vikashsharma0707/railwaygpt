import { useEffect, useState } from 'react';
import { bookingApi } from '../../api/endpoints';

export default function AdminBookings() {
  const [list, setList] = useState([]);
  useEffect(() => { bookingApi.listAll().then((r) => setList(r.data.data)); }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">All Bookings</h1>
      <div className="card mt-6 overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-400"><tr><th className="text-left">PNR</th><th className="text-left">User</th><th>Train</th><th>From → To</th><th>Date</th><th>Status</th><th>Amount</th></tr></thead>
          <tbody>
            {list.map((b) => (
              <tr key={b._id} className="border-t border-white/5">
                <td className="py-2">{b.pnr}</td><td>{b.user?.name}</td><td>{b.trainNumber}</td>
                <td className="text-center">{b.fromCode} → {b.toCode}</td>
                <td className="text-center">{new Date(b.journeyDate).toLocaleDateString()}</td>
                <td className="text-center"><span className="chip">{b.status}</span></td>
                <td className="text-right">₹{b.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
