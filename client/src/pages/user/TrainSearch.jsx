// import { useForm } from 'react-hook-form';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { trainApi } from '../../api/endpoints';
// import Spinner from '../../components/ui/Spinner.jsx';
// import EmptyState from '../../components/ui/EmptyState.jsx';
// import Trains from '../Trains.jsx';

// export default function TrainSearch() {
//   const { register, handleSubmit } = useForm({ defaultValues: { date: new Date().toISOString().slice(0,10) } });
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try { const r = await trainApi.search(data); setResults(r.data.data); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold">Search Trains</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 grid md:grid-cols-5 gap-3">
//         <div><label className="label">Fromnmm mn  (code)</label><input className="input uppercase" placeholder="NDLS" {...register('from', { required: true })} /></div>
//         <div><label className="label">To (code)</label><input className="input uppercase" placeholder="BCT" {...register('to', { required: true })} /></div>
//         <div><label className="label">Date</label><input type="date" className="input" {...register('date', { required: true })} /></div>
//         <div><label className="label">Class</label>
//           <select className="input" {...register('class')}>
//             <option value="">Any</option><option>SL</option><option>3A</option><option>2A</option><option>1A</option><option>CC</option>
//           </select>
//         </div>
//         <div className="flex items-end"><button className="btn-primary w-full">{loading ? <Spinner size="sm"/> : 'Search'}</button></div>
//       </form>

//       <div className="mt-6 space-y-3">
//         {loading && <div className="text-slate-400">Searching…</div>}
//         {results && results.length === 0 && <EmptyState title="No trains found" subtitle="Try a different date or stations." />}
//         {results?.map((t) => (
//           <div key={t._id} className="card flex flex-wrap items-center gap-4">
//             <div className="flex-1 min-w-[240px]">
//               <div className="text-lg font-semibold">{t.name} <span className="text-slate-400 text-sm">#{t.number}</span></div>
//               <div className="text-sm text-slate-400">{t.fromStop.station} ({t.fromStop.code}) → {t.toStop.station} ({t.toStop.code})</div>
//               <div className="text-sm">{t.fromStop.departureTime} → {t.toStop.arrivalTime}</div>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {t.availableClasses.map((c) => (
//                 <span key={c.class} className="chip">{c.class} · {c.available} · ₹{c.fare}</span>
//               ))}
//             </div>
            
//             <Link to={`/book/${t._id}?from=${t.fromStop.code}&to=${t.toStop.code}&date=${new Date().toISOString().slice(0,10)}`} className="btn-primary">Book</Link>
//           </div>
//         ))}
//       </div>


//       <Trains/>
//     </div>
//   );
// }








import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trainApi } from '../../api/endpoints';
import { toast } from 'react-hot-toast';
import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Spinner from '../../components/ui/Spinner.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';

export default function TrainSearch() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { from: '', to: '', date: new Date().toISOString().slice(0,10), class: '' }
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setSearched(true);

    try {
      // Make sure we're sending correct query params
      const searchParams = {
        sourceCode: data.from.toUpperCase().trim(),
        destinationCode: data.to.toUpperCase().trim(),
        date: data.date,
        class: data.class
      };

      const response = await trainApi.search(searchParams);
      const trains = response.data?.data || response.data || [];
      
      setResults(trains);
      
      if (trains.length === 0) {
        toast.info("No trains found for this route.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error while searching trains");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Find Your Train</h1>
        <p className="text-slate-400 mt-2">Real-time train search across India</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 border border-gray-700 rounded-3xl p-8">
        <div className="grid md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <label className="block text-sm text-slate-400 mb-2">From Station</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
              <input
                {...register('from', { required: true })}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-12 py-4 uppercase"
                placeholder="NDLS"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm text-slate-400 mb-2">To Station</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
              <input
                {...register('to', { required: true })}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-12 py-4 uppercase"
                placeholder="BCT"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm text-slate-400 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-4 text-slate-400" size={20} />
              <input type="date" {...register('date')} className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-12 py-4" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-400 mb-2">Class</label>
            <select {...register('class')} className="w-full bg-gray-800 border border-gray-700 rounded-2xl py-4 px-4">
              <option value="">All</option>
              <option value="3A">3A</option>
              <option value="2A">2A</option>
              <option value="1A">1A</option>
              <option value="SL">SL</option>
            </select>
          </div>

          <div className="md:col-span-1 flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold flex items-center justify-center gap-2"
            >
              {loading ? <Spinner size="sm" /> : <><Search size={20} /> Search</>}
            </button>
          </div>
        </div>
      </form>

      {/* Results */}
      {searched && !loading && results.length === 0 && <EmptyState title="No trains found" />}
      
      {results.length > 0 && (
        <div className="mt-10 space-y-4">
          {results.map(train => (
            <div key={train._id} className="bg-gray-900 border border-gray-700 rounded-3xl p-6">
              {/* Train Card UI same as previous version */}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{train.name} • {train.number}</h3>
                  <p>{train.sourceCode} → {train.destinationCode}</p>
                </div>
                <Link to={`/book/${train._id}`} className="bg-violet-600 px-8 py-3 rounded-2xl font-semibold">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}