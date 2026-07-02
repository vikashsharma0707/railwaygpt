// // // // import { useForm } from 'react-hook-form';
// // // // import { useState } from 'react';
// // // // import { Link } from 'react-router-dom';
// // // // import { trainApi } from '../../api/endpoints';
// // // // import Spinner from '../../components/ui/Spinner.jsx';
// // // // import EmptyState from '../../components/ui/EmptyState.jsx';
// // // // import Trains from '../Trains.jsx';

// // // // export default function TrainSearch() {
// // // //   const { register, handleSubmit } = useForm({ defaultValues: { date: new Date().toISOString().slice(0,10) } });
// // // //   const [results, setResults] = useState(null);
// // // //   const [loading, setLoading] = useState(false);

// // // //   const onSubmit = async (data) => {
// // // //     setLoading(true);
// // // //     try { const r = await trainApi.search(data); setResults(r.data.data); }
// // // //     finally { setLoading(false); }
// // // //   };

// // // //   return (
// // // //     <div className="max-w-7xl mx-auto px-4 py-10">
// // // //       <h1 className="text-2xl font-bold">Search Trains</h1>
// // // //       <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 grid md:grid-cols-5 gap-3">
// // // //         <div><label className="label">Fromnmm mn  (code)</label><input className="input uppercase" placeholder="NDLS" {...register('from', { required: true })} /></div>
// // // //         <div><label className="label">To (code)</label><input className="input uppercase" placeholder="BCT" {...register('to', { required: true })} /></div>
// // // //         <div><label className="label">Date</label><input type="date" className="input" {...register('date', { required: true })} /></div>
// // // //         <div><label className="label">Class</label>
// // // //           <select className="input" {...register('class')}>
// // // //             <option value="">Any</option><option>SL</option><option>3A</option><option>2A</option><option>1A</option><option>CC</option>
// // // //           </select>
// // // //         </div>
// // // //         <div className="flex items-end"><button className="btn-primary w-full">{loading ? <Spinner size="sm"/> : 'Search'}</button></div>
// // // //       </form>

// // // //       <div className="mt-6 space-y-3">
// // // //         {loading && <div className="text-slate-400">Searching…</div>}
// // // //         {results && results.length === 0 && <EmptyState title="No trains found" subtitle="Try a different date or stations." />}
// // // //         {results?.map((t) => (
// // // //           <div key={t._id} className="card flex flex-wrap items-center gap-4">
// // // //             <div className="flex-1 min-w-[240px]">
// // // //               <div className="text-lg font-semibold">{t.name} <span className="text-slate-400 text-sm">#{t.number}</span></div>
// // // //               <div className="text-sm text-slate-400">{t.fromStop.station} ({t.fromStop.code}) → {t.toStop.station} ({t.toStop.code})</div>
// // // //               <div className="text-sm">{t.fromStop.departureTime} → {t.toStop.arrivalTime}</div>
// // // //             </div>
// // // //             <div className="flex flex-wrap gap-2">
// // // //               {t.availableClasses.map((c) => (
// // // //                 <span key={c.class} className="chip">{c.class} · {c.available} · ₹{c.fare}</span>
// // // //               ))}
// // // //             </div>
            
// // // //             <Link to={`/book/${t._id}?from=${t.fromStop.code}&to=${t.toStop.code}&date=${new Date().toISOString().slice(0,10)}`} className="btn-primary">Book</Link>
// // // //           </div>
// // // //         ))}
// // // //       </div>


// // // //       <Trains/>
// // // //     </div>
// // // //   );
// // // // }








// // // import { useForm } from 'react-hook-form';
// // // import { useState } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { trainApi } from '../../api/endpoints';
// // // import { toast } from 'react-hot-toast';
// // // import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
// // // import Spinner from '../../components/ui/Spinner.jsx';
// // // import EmptyState from '../../components/ui/EmptyState.jsx';

// // // export default function TrainSearch() {
// // //   const { register, handleSubmit, formState: { errors } } = useForm({
// // //     defaultValues: { from: '', to: '', date: new Date().toISOString().slice(0,10), class: '' }
// // //   });

// // //   const [results, setResults] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [searched, setSearched] = useState(false);

// // //   const onSubmit = async (data) => {
// // //     setLoading(true);
// // //     setSearched(true);

// // //     try {
// // //       // Make sure we're sending correct query params
// // //       const searchParams = {
// // //         sourceCode: data.from.toUpperCase().trim(),
// // //         destinationCode: data.to.toUpperCase().trim(),
// // //         date: data.date,
// // //         class: data.class
// // //       };

// // //       const response = await trainApi.search(searchParams);
// // //       const trains = response.data?.data || response.data || [];
      
// // //       setResults(trains);
      
// // //       if (trains.length === 0) {
// // //         toast.info("No trains found for this route.");
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       toast.error(err.response?.data?.message || "Server error while searching trains");
// // //       setResults([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="max-w-7xl mx-auto px-4 py-10">
// // //       <div className="text-center mb-10">
// // //         <h1 className="text-4xl font-bold">Find Your Train</h1>
// // //         <p className="text-slate-400 mt-2">Real-time train search across India</p>
// // //       </div>

// // //       <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 border border-gray-700 rounded-3xl p-8">
// // //         <div className="grid md:grid-cols-12 gap-4">
// // //           <div className="md:col-span-3">
// // //             <label className="block text-sm text-slate-400 mb-2">From Station</label>
// // //             <div className="relative">
// // //               <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
// // //               <input
// // //                 {...register('from', { required: true })}
// // //                 className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-12 py-4 uppercase"
// // //                 placeholder="NDLS"
// // //               />
// // //             </div>
// // //           </div>

// // //           <div className="md:col-span-3">
// // //             <label className="block text-sm text-slate-400 mb-2">To Station</label>
// // //             <div className="relative">
// // //               <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
// // //               <input
// // //                 {...register('to', { required: true })}
// // //                 className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-12 py-4 uppercase"
// // //                 placeholder="BCT"
// // //               />
// // //             </div>
// // //           </div>

// // //           <div className="md:col-span-3">
// // //             <label className="block text-sm text-slate-400 mb-2">Date</label>
// // //             <div className="relative">
// // //               <Calendar className="absolute left-4 top-4 text-slate-400" size={20} />
// // //               <input type="date" {...register('date')} className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-12 py-4" />
// // //             </div>
// // //           </div>

// // //           <div className="md:col-span-2">
// // //             <label className="block text-sm text-slate-400 mb-2">Class</label>
// // //             <select {...register('class')} className="w-full bg-gray-800 border border-gray-700 rounded-2xl py-4 px-4">
// // //               <option value="">All</option>
// // //               <option value="3A">3A</option>
// // //               <option value="2A">2A</option>
// // //               <option value="1A">1A</option>
// // //               <option value="SL">SL</option>
// // //             </select>
// // //           </div>

// // //           <div className="md:col-span-1 flex items-end">
// // //             <button
// // //               type="submit"
// // //               disabled={loading}
// // //               className="w-full h-14 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold flex items-center justify-center gap-2"
// // //             >
// // //               {loading ? <Spinner size="sm" /> : <><Search size={20} /> Search</>}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </form>

// // //       {/* Results */}
// // //       {searched && !loading && results.length === 0 && <EmptyState title="No trains found" />}
      
// // //       {results.length > 0 && (
// // //         <div className="mt-10 space-y-4">
// // //           {results.map(train => (
// // //             <div key={train._id} className="bg-gray-900 border border-gray-700 rounded-3xl p-6">
// // //               {/* Train Card UI same as previous version */}
// // //               <div className="flex justify-between items-center">
// // //                 <div>
// // //                   <h3 className="text-xl font-bold">{train.name} • {train.number}</h3>
// // //                   <p>{train.sourceCode} → {train.destinationCode}</p>
// // //                 </div>
// // //                 <Link to={`/book/${train._id}`} className="bg-violet-600 px-8 py-3 rounded-2xl font-semibold">
// // //                   Book Now
// // //                 </Link>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }





// // import { useForm } from 'react-hook-form';
// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { trainApi } from '../../api/endpoints';
// // import { toast } from 'react-hot-toast';
// // import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
// // import Spinner from '../../components/ui/Spinner.jsx';
// // import EmptyState from '../../components/ui/EmptyState.jsx';
// // import SeatCalendarModal from '../../components/SeatCalendarModal.jsx';   // ← Added

// // export default function TrainSearch() {
// //   const { register, handleSubmit, formState: { errors } } = useForm({
// //     defaultValues: { from: '', to: '', date: new Date().toISOString().slice(0,10), class: '' }
// //   });

// //   const [results, setResults] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [searched, setSearched] = useState(false);
// //   const [selectedTrain, setSelectedTrain] = useState(null);   // ← Added for Calendar

// //   const onSubmit = async (data) => {
// //     setLoading(true);
// //     setSearched(true);

// //     try {
// //       const searchParams = {
// //         sourceCode: data.from.toUpperCase().trim(),
// //         destinationCode: data.to.toUpperCase().trim(),
// //         date: data.date,
// //         class: data.class
// //       };

// //       const response = await trainApi.search(searchParams);
// //       const trains = response.data?.data || response.data || [];
      
// //       setResults(trains);
      
// //       if (trains.length === 0) {
// //         toast.info("No trains found for this route.");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       toast.error(err.response?.data?.message || "Server error while searching trains");
// //       setResults([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-10">
// //       <div className="text-center mb-10">
// //         <h1 className="text-4xl font-bold">Find Your Train</h1>
// //         <p className="text-slate-400 mt-2">Real-time train search across India</p>
// //       </div>

// //       <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 border border-gray-700 rounded-3xl p-8">
// //         <div className="grid md:grid-cols-12 gap-4">
// //           <div className="md:col-span-3">
// //             <label className="block text-sm text-slate-400 mb-2">From Station</label>
// //             <div className="relative">
// //               <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
// //               <input
// //                 {...register('from', { required: true })}
// //                 className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-12 py-4 uppercase"
// //                 placeholder="NDLS"
// //               />
// //             </div>
// //           </div>

// //           <div className="md:col-span-3">
// //             <label className="block text-sm text-slate-400 mb-2">To Station</label>
// //             <div className="relative">
// //               <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
// //               <input
// //                 {...register('to', { required: true })}
// //                 className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-12 py-4 uppercase"
// //                 placeholder="BCT"
// //               />
// //             </div>
// //           </div>

// //           <div className="md:col-span-3">
// //             <label className="block text-sm text-slate-400 mb-2">Date</label>
// //             <div className="relative">
// //               <Calendar className="absolute left-4 top-4 text-slate-400" size={20} />
// //               <input type="date" {...register('date')} className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-12 py-4" />
// //             </div>
// //           </div>

// //           <div className="md:col-span-2">
// //             <label className="block text-sm text-slate-400 mb-2">Class</label>
// //             <select {...register('class')} className="w-full bg-gray-800 border border-gray-700 rounded-2xl py-4 px-4">
// //               <option value="">All</option>
// //               <option value="3A">3A</option>
// //               <option value="2A">2A</option>
// //               <option value="1A">1A</option>
// //               <option value="SL">SL</option>
// //             </select>
// //           </div>

// //           <div className="md:col-span-1 flex items-end">
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full h-14 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold flex items-center justify-center gap-2"
// //             >
// //               {loading ? <Spinner size="sm" /> : <><Search size={20} /> Search</>}
// //             </button>
// //           </div>
// //         </div>
// //       </form>

// //       {/* Results */}
// //       {searched && !loading && results.length === 0 && <EmptyState title="No trains found" />}
      
// //       {results.length > 0 && (
// //         <div className="mt-10 space-y-4">
// //           {results.map(train => (
// //             <div key={train._id} className="bg-gray-900 border border-gray-700 rounded-3xl p-6 hover:border-violet-500/50 transition">
// //               <div className="flex flex-col lg:flex-row justify-between gap-6">
// //                 <div className="flex-1">
// //                   <h3 className="text-xl font-bold">{train.name} • {train.number}</h3>
// //                   <p className="text-slate-400">{train.source} → {train.destination}</p>
// //                   <p className="text-sm">{train.departureTime} - {train.arrivalTime} • {train.durationMinutes} min</p>
// //                 </div>

// //                 <div className="flex flex-col sm:flex-row gap-3 items-end">
// //                   <button
// //                     onClick={() => setSelectedTrain(train)}
// //                     className="px-5 py-3 border border-violet-500 text-violet-400 hover:bg-violet-500/10 rounded-2xl text-sm font-medium flex items-center gap-2"
// //                   >
// //                     <Calendar size={18} /> View Seats
// //                   </button>

// //                   <Link 
// //                     to={`/book/${train._id}?from=${train.sourceCode}&to=${train.destinationCode}&date=${new Date().toISOString().slice(0,10)}`}
// //                     className="bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-2xl font-semibold"
// //                   >
// //                     Book Now
// //                   </Link>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Seat Calendar Modal */}
// //       <SeatCalendarModal 
// //         train={selectedTrain} 
// //         isOpen={!!selectedTrain} 
// //         onClose={() => setSelectedTrain(null)} 
// //       />
// //     </div>
// //   );
// // }






// import { useForm } from 'react-hook-form';
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { trainApi } from '../../api/endpoints';
// import { toast } from 'react-hot-toast';
// import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
// import Spinner from '../../components/ui/Spinner.jsx';
// import EmptyState from '../../components/ui/EmptyState.jsx';
// import SeatCalendarModal from '../../components/SeatCalendarModal.jsx';

// export default function TrainSearch() {
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: { from: '', to: '', date: new Date().toISOString().slice(0,10), class: '' }
//   });

//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [selectedTrain, setSelectedTrain] = useState(null);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setSearched(true);

//     try {
//       const searchParams = {
//         sourceCode: data.from.toUpperCase().trim(),
//         destinationCode: data.to.toUpperCase().trim(),
//         date: data.date,
//         class: data.class
//       };

//       const response = await trainApi.search(searchParams);
//       const trains = response.data?.data || response.data || [];
      
//       setResults(trains);
      
//       if (trains.length === 0) {
//         toast.info("No trains found for this route.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Server error while searching trains");
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTatkalBook = (train) => {
//     navigate(`/tatkal/${train._id}`, {
//       state: {
//         class: '3A',
//         date: new Date().toISOString().slice(0,10),
//         fromCode: train.sourceCode,
//         toCode: train.destinationCode,
//       }
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-bold">Find Your Train</h1>
//         <p className="text-slate-400 mt-2">Real-time train search across India</p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 border border-gray-700 rounded-3xl p-8">
//         <div className="grid md:grid-cols-12 gap-4">
//           <div className="md:col-span-3">
//             <label className="block text-sm text-slate-400 mb-2">From Station</label>
//             <div className="relative">
//               <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
//               <input
//                 {...register('from', { required: true })}
//                 className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-12 py-4 uppercase"
//                 placeholder="NDLS"
//               />
//             </div>
//           </div>

//           <div className="md:col-span-3">
//             <label className="block text-sm text-slate-400 mb-2">To Station</label>
//             <div className="relative">
//               <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
//               <input
//                 {...register('to', { required: true })}
//                 className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-12 py-4 uppercase"
//                 placeholder="BCT"
//               />
//             </div>
//           </div>

//           <div className="md:col-span-3">
//             <label className="block text-sm text-slate-400 mb-2">Date</label>
//             <div className="relative">
//               <Calendar className="absolute left-4 top-4 text-slate-400" size={20} />
//               <input type="date" {...register('date')} className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-12 py-4" />
//             </div>
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm text-slate-400 mb-2">Class</label>
//             <select {...register('class')} className="w-full bg-gray-800 border border-gray-700 rounded-2xl py-4 px-4">
//               <option value="">All</option>
//               <option value="3A">3A</option>
//               <option value="2A">2A</option>
//               <option value="1A">1A</option>
//               <option value="SL">SL</option>
//             </select>
//           </div>

//           <div className="md:col-span-1 flex items-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full h-14 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold flex items-center justify-center gap-2"
//             >
//               {loading ? <Spinner size="sm" /> : <><Search size={20} /> Search</>}
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* Results */}
//       {searched && !loading && results.length === 0 && <EmptyState title="No trains found" />}
      
//       {results.length > 0 && (
//         <div className="mt-10 space-y-4">
//           {results.map(train => (
//             <div key={train._id} className="bg-gray-900 border border-gray-700 rounded-3xl p-6 hover:border-violet-500/50 transition">
//               <div className="flex flex-col lg:flex-row justify-between gap-6">
//                 <div className="flex-1">
//                   <h3 className="text-xl font-bold">{train.name} • {train.number}</h3>
//                   <p className="text-slate-400">{train.source} → {train.destination}</p>
//                   <p className="text-sm">{train.departureTime} - {train.arrivalTime} • {train.durationMinutes} min</p>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 items-end">
//                   <button
//                     onClick={() => setSelectedTrain(train)}
//                     className="px-5 py-3 border border-violet-500 text-violet-400 hover:bg-violet-500/10 rounded-2xl text-sm font-medium flex items-center gap-2"
//                   >
//                     <Calendar size={18} /> View Seats
//                   </button>

//                   {/* Tatkal Button */}
//                   <button
//                     onClick={() => navigate(`/tatkal/${train._id}`)}
//                     className="px-5 py-3 bg-amber-600 hover:bg-amber-500 rounded-2xl text-sm font-semibold flex items-center gap-2"
//                   >
//                     ⚡ Tatkal
//                   </button>

//                   <Link 
//                     to={`/book/${train._id}?from=${train.sourceCode}&to=${train.destinationCode}&date=${new Date().toISOString().slice(0,10)}`}
//                     className="bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-2xl font-semibold"
//                   >
//                     Book Now
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Seat Calendar Modal */}
//       <SeatCalendarModal 
//         train={selectedTrain} 
//         isOpen={!!selectedTrain} 
//         onClose={() => setSelectedTrain(null)} 
//       />
//     </div>
//   );
// }





import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { trainApi } from '../../api/endpoints';
import { toast } from 'react-hot-toast';
import {
  Search, MapPin, Calendar, ArrowRight,
  ArrowLeftRight, Zap, Train, Clock,
  ChevronRight, RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from '../../components/ui/Spinner.jsx';
import SeatCalendarModal from '../../components/SeatCalendarModal.jsx';

// ── Popular routes (UI only — clicking fills form) ────────────────────────────
const POPULAR_ROUTES = [
  { from: 'NDLS', to: 'BCT', label: 'Delhi → Mumbai' },
  { from: 'NDLS', to: 'HWH', label: 'Delhi → Kolkata' },
  { from: 'MAS',  to: 'SBC', label: 'Chennai → Bengaluru' },
  { from: 'CSMT', to: 'PUNE',label: 'Mumbai → Pune' },
  { from: 'NDLS', to: 'ADI', label: 'Delhi → Ahmedabad' },
];

// ── Skeleton card ──────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 animate-pulse">
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-6 w-48 bg-white/[0.07] rounded-lg" />
          <div className="h-5 w-20 bg-white/[0.05] rounded-full" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-5 w-16 bg-white/[0.07] rounded" />
          <div className="flex-1 h-px bg-white/[0.05]" />
          <div className="h-5 w-16 bg-white/[0.07] rounded" />
        </div>
        <div className="h-4 w-36 bg-white/[0.04] rounded" />
      </div>
      <div className="flex gap-2">
        <div className="w-28 h-11 bg-white/[0.05] rounded-2xl" />
        <div className="w-20 h-11 bg-white/[0.05] rounded-2xl" />
        <div className="w-28 h-11 bg-white/[0.05] rounded-2xl" />
      </div>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
export default function TrainSearch() {
  // ══ ALL LOGIC UNCHANGED ════════════════════════════════════════════════════
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      from: '', to: '',
      date: new Date().toISOString().slice(0, 10),
      class: ''
    }
  });

  const [results,       setResults]       = useState([]);
  const [loading,       setLoading]       = useState(false);
  const [searched,      setSearched]      = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);

  // swap animation state (UI only)
  const [swapped, setSwapped] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setSearched(true);
    try {
      const searchParams = {
        sourceCode:      data.from.toUpperCase().trim(),
        destinationCode: data.to.toUpperCase().trim(),
        date:            data.date,
        class:           data.class,
      };
      const response = await trainApi.search(searchParams);
      const trains   = response.data?.data || response.data || [];
      setResults(trains);
      if (trains.length === 0) toast.info('No trains found for this route.');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Server error while searching trains');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // swap from ↔ to (logic unchanged)
  const handleSwap = () => {
    const from = getValues('from');
    const to   = getValues('to');
    setValue('from', to);
    setValue('to',   from);
    setSwapped(v => !v);
  };

  // fill popular route (UI → form)
  const fillRoute = (route) => {
    setValue('from', route.from);
    setValue('to',   route.to);
  };

  // ── UI ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-[62vh] flex flex-col items-center justify-center px-4 pb-32 overflow-hidden">

        {/* Aurora blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%]  w-[500px] h-[500px] rounded-full
                          bg-violet-700/20 blur-[120px]" />
          <div className="absolute top-[10%]  right-[-10%] w-[600px] h-[600px] rounded-full
                          bg-indigo-700/15 blur-[140px]" />
          <div className="absolute bottom-0  left-[30%]   w-[400px] h-[300px] rounded-full
                          bg-violet-900/25 blur-[100px]" />
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
        </div>

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y:  0  }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative text-center z-10 mb-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7
                          bg-white/[0.06] border border-white/[0.10] backdrop-blur-sm text-sm text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Availability &nbsp;·&nbsp; Tatkal &nbsp;·&nbsp; Instant Confirmation
          </div>

          <h1 className="text-[42px] sm:text-6xl font-extrabold tracking-tight leading-none mb-5">
            Find Your Next<br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400
                             bg-clip-text text-transparent">
              Journey
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Search trains across India with real-time seat availability,
            Tatkal booking and instant confirmation.
          </p>
        </motion.div>

        {/* ══ FLOATING SEARCH CARD ════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y:  0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-5xl"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/[0.08]
                       rounded-[28px] p-6 sm:p-8 shadow-2xl shadow-black/50"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">

              {/* FROM */}
              <div className="lg:col-span-3 flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 px-1">
                  From
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 pointer-events-none" />
                  <input
                    {...register('from', { required: true })}
                    placeholder="NDLS"
                    className="w-full h-14 pl-10 pr-4 bg-white/[0.05] border border-white/[0.08]
                               rounded-2xl text-white uppercase font-semibold text-base tracking-widest
                               placeholder-slate-600 focus:outline-none focus:border-violet-500/60
                               focus:bg-violet-500/[0.04] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]
                               transition-all duration-200"
                  />
                  {errors.from && (
                    <span className="absolute -bottom-5 left-1 text-rose-400 text-[10px]">Required</span>
                  )}
                </div>
              </div>

              {/* SWAP */}
              <div className="hidden lg:flex lg:col-span-1 items-end justify-center pb-1">
                <motion.button
                  type="button"
                  onClick={handleSwap}
                  animate={{ rotate: swapped ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600
                             flex items-center justify-center shadow-lg shadow-violet-900/40
                             hover:shadow-violet-900/60 hover:scale-110 transition-all"
                >
                  <ArrowLeftRight size={16} className="text-white" />
                </motion.button>
              </div>

              {/* TO */}
              <div className="lg:col-span-3 flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 px-1">
                  To
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
                  <input
                    {...register('to', { required: true })}
                    placeholder="BCT"
                    className="w-full h-14 pl-10 pr-4 bg-white/[0.05] border border-white/[0.08]
                               rounded-2xl text-white uppercase font-semibold text-base tracking-widest
                               placeholder-slate-600 focus:outline-none focus:border-violet-500/60
                               focus:bg-violet-500/[0.04] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]
                               transition-all duration-200"
                  />
                  {errors.to && (
                    <span className="absolute -bottom-5 left-1 text-rose-400 text-[10px]">Required</span>
                  )}
                </div>
              </div>

              {/* DATE */}
              <div className="lg:col-span-2 flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 px-1">
                  Date
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    {...register('date')}
                    className="w-full h-14 pl-10 pr-3 bg-white/[0.05] border border-white/[0.08]
                               rounded-2xl text-slate-200 text-sm
                               focus:outline-none focus:border-violet-500/60
                               focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]
                               transition-all duration-200 [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* CLASS */}
              <div className="lg:col-span-2 flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 px-1">
                  Class
                </label>
                <div className="relative">
                  <Train size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                  <select
                    {...register('class')}
                    className="w-full h-14 pl-10 pr-4 appearance-none bg-white/[0.05] border border-white/[0.08]
                               rounded-2xl text-slate-200 text-sm cursor-pointer
                               focus:outline-none focus:border-violet-500/60
                               focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]
                               transition-all duration-200"
                  >
                    <option value="">All Classes</option>
                    <option value="3A">3A — AC 3 Tier</option>
                    <option value="2A">2A — AC 2 Tier</option>
                    <option value="1A">1A — AC First</option>
                    <option value="SL">SL — Sleeper</option>
                  </select>
                  <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* SEARCH BTN */}
              <div className="lg:col-span-1 flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-transparent px-1 select-none">
                  Go
                </label>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.03, y: loading ? 0 : -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-14 w-full rounded-2xl font-bold text-sm
                             bg-gradient-to-r from-violet-600 to-indigo-600
                             hover:from-violet-500 hover:to-indigo-500
                             text-white shadow-lg shadow-violet-900/40
                             disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2 transition-all"
                >
                  {loading
                    ? <><Spinner size="sm" /> <span className="hidden sm:inline">Searching</span></>
                    : <><Search size={16} /> <span className="hidden sm:inline">Search</span></>}
                </motion.button>
              </div>
            </div>

            {/* Popular routes */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-600 font-medium uppercase tracking-wider">Popular:</span>
              {POPULAR_ROUTES.map((r) => (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => fillRoute(r)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-400
                             bg-white/[0.04] border border-white/[0.07]
                             hover:border-violet-500/40 hover:text-violet-300 hover:bg-violet-500/[0.06]
                             transition-all duration-200"
                >
                  {r.label}
                </button>
              ))}
            </div>
          </form>
        </motion.div>
      </div>

      {/* ══ RESULTS ════════════════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-4 pb-20 -mt-10">

        {/* Skeleton */}
        {loading && (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty */}
        {searched && !loading && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-white/[0.04] border border-white/[0.06]
                            flex items-center justify-center mb-5">
              <Train size={32} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No trains found</h3>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed mb-6">
              No trains available for this route and date. Try a different route or date.
            </p>
            <button
              onClick={() => setSearched(false)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                         bg-violet-600/15 text-violet-400 border border-violet-500/25
                         text-sm font-medium hover:bg-violet-600/25 transition-colors"
            >
              <RotateCcw size={14} /> Try Again
            </button>
          </motion.div>
        )}

        {/* Train cards */}
        {!loading && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <p className="text-sm text-slate-500 mb-2 px-1">
              {results.length} train{results.length > 1 ? 's' : ''} found
            </p>

            {results.map((train, idx) => (
              <motion.div
                key={train._id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ duration: 0.25, delay: idx * 0.06 }}
                whileHover={{ y: -2 }}
                className="group bg-white/[0.03] border border-white/[0.07] rounded-3xl p-6
                           hover:border-violet-500/30 hover:bg-white/[0.05]
                           hover:shadow-xl hover:shadow-violet-900/10
                           transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-5 lg:items-center">

                  {/* Left — train info */}
                  <div className="flex-1 space-y-3">
                    {/* Name + number */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-base font-bold text-white">{train.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold
                                       bg-violet-500/15 text-violet-300 border border-violet-500/25">
                        #{train.number}
                      </span>
                      {train.tatkal && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]
                                         font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25">
                          <Zap size={9} /> Tatkal
                        </span>
                      )}
                    </div>

                    {/* Route timeline */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-white font-bold text-lg leading-none">{train.departureTime}</p>
                        <p className="text-emerald-400 text-sm font-semibold mt-0.5">{train.sourceCode}</p>
                      </div>

                      <div className="flex-1 flex items-center gap-2 min-w-0">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                        <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 via-violet-500/40 to-violet-500/50" />
                        <div className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full
                                        bg-white/[0.05] border border-white/[0.08] text-slate-400 text-[11px] font-medium">
                          <Clock size={10} />
                          {train.durationMinutes}m
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-violet-500/50 via-violet-500/40 to-violet-500/50" />
                        <div className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                      </div>

                      <div className="text-left">
                        <p className="text-white font-bold text-lg leading-none">{train.arrivalTime}</p>
                        <p className="text-violet-400 text-sm font-semibold mt-0.5">{train.destinationCode}</p>
                      </div>
                    </div>

                    {/* Route full names */}
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span>{train.source}</span>
                      <ArrowRight size={10} className="text-slate-600" />
                      <span>{train.destination}</span>
                    </p>
                  </div>

                  {/* Right — actions */}
                  <div className="flex flex-wrap gap-2 lg:flex-shrink-0">
                    {/* View Seats */}
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedTrain(train)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium
                                 border border-violet-500/30 text-violet-400
                                 hover:bg-violet-500/10 hover:border-violet-500/50 transition-all"
                    >
                      <Calendar size={14} /> Seats
                    </motion.button>

                    {/* Tatkal */}
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => navigate(`/tatkal/${train._id}`)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold
                                 bg-gradient-to-r from-amber-600 to-orange-500
                                 hover:from-amber-500 hover:to-orange-400 text-white
                                 shadow-md shadow-amber-900/30 transition-all"
                    >
                      <Zap size={14} /> Tatkal
                    </motion.button>

                    {/* Book Now */}
                    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
                      <Link
                        to={`/book/${train._id}?from=${train.sourceCode}&to=${train.destinationCode}&date=${new Date().toISOString().slice(0, 10)}`}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold
                                   bg-gradient-to-r from-violet-600 to-indigo-600
                                   hover:from-violet-500 hover:to-indigo-500 text-white
                                   shadow-md shadow-violet-900/30 transition-all"
                      >
                        Book Now <ArrowRight size={14} />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Seat Calendar Modal — LOGIC UNCHANGED */}
      <SeatCalendarModal
        train={selectedTrain}
        isOpen={!!selectedTrain}
        onClose={() => setSelectedTrain(null)}
      />
    </div>
  );
}