import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { trainApi } from '../../api/endpoints';

export default function TrainDetails() {
  const { id } = useParams();
  const [t, setT] = useState(null);
  useEffect(() => { trainApi.get(id).then((r) => setT(r.data.data)); }, [id]);
  if (!t) return <div className="p-10">Loading…</div>;
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">{t.name} <span className="text-slate-400 text-base">#{t.number}</span></h1>
      <p className="text-slate-400">{t.source} → {t.destination} • {t.distanceKm} km</p>
      <div className="card mt-6">
        <h2 className="font-semibold mb-3">Stops</h2>
        <table className="w-full text-sm">
          <thead className="text-slate-400"><tr><th className="text-left">Station</th><th>Arr</th><th>Dep</th><th>Day</th><th>Platform</th></tr></thead>
          <tbody>
            {t.stops.map((s) => (
              <tr key={s.code} className="border-t border-white/5"><td className="py-2">{s.station} ({s.code})</td><td className="text-center">{s.arrivalTime || '-'}</td><td className="text-center">{s.departureTime || '-'}</td><td className="text-center">{s.day}</td><td className="text-center">{s.platform || '-'}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
