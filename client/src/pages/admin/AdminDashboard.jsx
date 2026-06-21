// // import { useEffect, useState } from 'react';
// // import { adminApi } from '../../api/endpoints';

// // export default function AdminDashboard() {
// //   const [d, setD] = useState(null);
// //   useEffect(() => { adminApi.dashboard().then((r) => setD(r.data.data)); }, []);
// //   if (!d) return <div className="p-10">Loading…</div>;
// //   const cards = [
// //     { k: 'Users', v: d.users }, { k: 'Trains', v: d.trains }, { k: 'Bookings', v: d.bookings },
// //     { k: 'Paid Payments', v: d.payments }, { k: 'Revenue (₹)', v: d.revenue.toLocaleString() },
// //   ];
// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-10">
// //       <h1 className="text-2xl font-bold">Admin Dashboard</h1>
// //       <div className="grid md:grid-cols-5 gap-3 mt-6">
// //         {cards.map((c) => (<div key={c.k} className="card"><div className="text-xs text-slate-400">{c.k}</div><div className="text-2xl font-bold">{c.v}</div></div>))}
// //       </div>
// //       <div className="grid md:grid-cols-2 gap-4 mt-6">
// //         <div className="card">
// //           <h2 className="font-semibold">Popular Routes</h2>
// //           <ul className="mt-2 text-sm">
// //             {d.popular.map((p, i) => <li key={i} className="flex justify-between border-t border-white/5 py-1"><span>{p._id.from} → {p._id.to}</span><span>{p.count}</span></li>)}
// //           </ul>
// //         </div>
// //         <div className="card">
// //           <h2 className="font-semibold">Recent Bookings</h2>
// //           <ul className="mt-2 text-sm">
// //             {d.recent.map((b) => <li key={b._id} className="flex justify-between border-t border-white/5 py-1"><span>{b.pnr} · {b.user?.name}</span><span>{b.status}</span></li>)}
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// import { useEffect, useState } from 'react';
// import { adminApi } from '../../api/endpoints';
// import AdminTrains from './AdminTrains';

// export default function AdminDashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         setLoading(true);
//         const res = await adminApi.dashboard();
//         setData(res.data.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load dashboard data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-xl text-slate-400">Loading Dashboard...</div>
//       </div>
//     );
//   }

//   if (error || !data) {
//     return (
//       <div className="p-10 text-red-400 text-center">
//         {error || "Failed to load dashboard"}
//       </div>
//     );
//   }

//   const stats = [
//     { label: 'Users', value: data.users || 0 },
//     { label: 'Trains', value: data.trains || 0 },
//     { label: 'Bookings', value: data.bookings || 0 },
//     { label: 'Paid Payments', value: data.payments || 0 },
//     { label: 'Revenue (₹)', value: (data.revenue || 0).toLocaleString('en-IN') },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
//         <button 
//           onClick={() => window.location.reload()} 
//           className="text-sm px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
//         >
//           Refresh
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//         {stats.map((stat) => (
//           <div 
//             key={stat.label} 
//             className="bg-gray-900 border border-gray-700 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-200"
//           >
//             <div className="text-sm text-slate-400">{stat.label}</div>
//             <div className="text-4xl font-bold mt-3 text-white">{stat.value}</div>
//           </div>
//         ))}
//       </div>

//       <AdminTrains/>

//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Popular Routes */}
//         <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
//           <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//             🔥 Popular Routes
//           </h2>
//           {data.popular?.length > 0 ? (
//             <div className="space-y-3">
//               {data.popular.map((route, i) => (
//                 <div 
//                   key={i} 
//                   className="flex justify-between items-center bg-gray-800/70 hover:bg-gray-800 p-4 rounded-xl transition"
//                 >
//                   <div className="font-medium">
//                     {route._id.from} <span className="text-violet-400">→</span> {route._id.to}
//                   </div>
//                   <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
//                     {route.count} bookings
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-slate-500 py-12 text-center">No popular routes yet</p>
//           )}
//         </div>

//         {/* Recent Bookings */}
//         <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
//           {data.recent?.length > 0 ? (
//             <div className="space-y-3">
//               {data.recent.map((booking) => (
//                 <div 
//                   key={booking._id} 
//                   className="flex justify-between items-center bg-gray-800/70 p-4 rounded-xl"
//                 >
//                   <div>
//                     <div className="font-mono text-sm text-violet-300">PNR: {booking.pnr}</div>
//                     <div className="text-sm text-slate-400 mt-0.5">
//                       {booking.user?.name || 'User'} • {booking.train?.name}
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-semibold">₹{(booking.totalAmount || 0).toLocaleString()}</div>
//                     <span className={`inline-block mt-1 text-xs px-3 py-0.5 rounded-full ${
//                       booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 
//                       booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 
//                       'bg-amber-500/20 text-amber-400'
//                     }`}>
//                       {booking.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-slate-500 py-12 text-center">No recent bookings hjuhujhbj</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






import { useEffect, useState } from 'react';
import { adminApi } from '../../api/endpoints';
import AdminTrains from './AdminTrains';
import {
  Users, TrainFront, Ticket, CreditCard, IndianRupee,
  RefreshCw, AlertTriangle, Flame, Inbox
} from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);
      const res = await adminApi.dashboard();
      setData(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="h-9 w-56 bg-gray-800 rounded-lg animate-pulse" />
          <div className="h-9 w-24 bg-gray-800 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-28 animate-pulse" />
          ))}
        </div>
        <div className="h-40 bg-gray-900 border border-gray-800 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 text-red-400 mb-4">
          <AlertTriangle size={26} />
        </div>
        <p className="text-slate-300 font-medium mb-1">{error || "Failed to load dashboard"}</p>
        <p className="text-slate-500 text-sm mb-6">Something went wrong while fetching the latest data.</p>
        <button
          onClick={() => fetchDashboard()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition"
        >
          <RefreshCw size={15} /> Try again
        </button>
      </div>
    );
  }

  const stats = [
    { label: 'Users', value: data.users || 0, icon: Users, accent: 'from-blue-500/20 text-blue-400' },
    { label: 'Trains', value: data.trains || 0, icon: TrainFront, accent: 'from-violet-500/20 text-violet-400' },
    { label: 'Bookings', value: data.bookings || 0, icon: Ticket, accent: 'from-amber-500/20 text-amber-400' },
    { label: 'Paid Payments', value: data.payments || 0, icon: CreditCard, accent: 'from-emerald-500/20 text-emerald-400' },
    { label: 'Revenue', value: `₹${(data.revenue || 0).toLocaleString('en-IN')}`, icon: IndianRupee, accent: 'from-rose-500/20 text-rose-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <button
          onClick={() => fetchDashboard(true)}
          disabled={refreshing}
          className="flex items-center gap-2 text-sm px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-60 rounded-lg transition"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const [gradient, textColor] = stat.accent.split(' ');
          return (
            <div
              key={stat.label}
              className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 overflow-hidden hover:border-violet-500/50 transition-all duration-200 group"
            >
              <div className={`absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br ${gradient} to-transparent rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 ${textColor} mb-3`}>
                <Icon size={18} />
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
              <div className="text-3xl font-bold mt-1 text-white">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <AdminTrains />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Popular Routes */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Flame size={20} className="text-orange-400" /> Popular Routes
          </h2>
          {data.popular?.length > 0 ? (
            <div className="space-y-3">
              {data.popular.map((route, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-gray-800/70 hover:bg-gray-800 p-4 rounded-xl transition"
                >
                  <div className="font-medium">
                    {route._id.from} <span className="text-violet-400">→</span> {route._id.to}
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                    {route.count} bookings
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500">
              <Inbox size={28} className="mx-auto mb-2 opacity-50" />
              No popular routes yet
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          {data.recent?.length > 0 ? (
            <div className="space-y-3">
              {data.recent.map((booking) => (
                <div
                  key={booking._id}
                  className="flex justify-between items-center bg-gray-800/70 p-4 rounded-xl"
                >
                  <div>
                    <div className="font-mono text-sm text-violet-300">PNR: {booking.pnr}</div>
                    <div className="text-sm text-slate-400 mt-0.5">
                      {booking.user?.name || 'User'} • {booking.train?.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{(booking.totalAmount || 0).toLocaleString()}</div>
                    <span className={`inline-block mt-1 text-xs px-3 py-0.5 rounded-full ${
                      booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                      booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500">
              <Inbox size={28} className="mx-auto mb-2 opacity-50" />
              No recent bookings yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}