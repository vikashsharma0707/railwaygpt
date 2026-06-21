import { useState } from 'react';
import { bookingApi } from '../../api/endpoints';

export default function PNRStatus() {
  const [pnr, setPnr] = useState('');
  const [b, setB] = useState(null);
  const [err, setErr] = useState('');
  const lookup = async () => {
    setErr(''); setB(null);
    try { const r = await bookingApi.byPNR(pnr); setB(r.data.data); if (!r.data.data) setErr('Not found'); }
    catch (e) { setErr(e?.response?.data?.message || 'Failed'); }
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">PNR Status</h1>
      <div className="card mt-6 flex gap-2">
        <input className="input" value={pnr} onChange={(e) => setPnr(e.target.value)} placeholder="Enter 10-digit PNR" />
        <button className="btn-primary" onClick={lookup}>Check</button>
      </div>
      {err && <p className="text-rose-400 mt-3">{err}</p>}
      {b && (
        <div className="card mt-4">
          <div className="font-semibold">{b.trainName} #{b.trainNumber}</div>
          <div className="text-sm text-slate-400">{b.fromStation} → {b.toStation} • {new Date(b.journeyDate).toDateString()}</div>
          <div className="mt-3 space-y-1 text-sm">
            {b.passengers.map((p, i) => (
              <div key={i}>{i+1}. {p.name} ({p.age}/{p.gender}) — {p.coach} / {p.seatNumber} — <b>{p.status}</b></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
