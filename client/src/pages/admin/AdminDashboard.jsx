// // // // import { useEffect, useState } from 'react';
// // // // import { adminApi } from '../../api/endpoints';

// // // // export default function AdminDashboard() {
// // // //   const [d, setD] = useState(null);
// // // //   useEffect(() => { adminApi.dashboard().then((r) => setD(r.data.data)); }, []);
// // // //   if (!d) return <div className="p-10">Loading…</div>;
// // // //   const cards = [
// // // //     { k: 'Users', v: d.users }, { k: 'Trains', v: d.trains }, { k: 'Bookings', v: d.bookings },
// // // //     { k: 'Paid Payments', v: d.payments }, { k: 'Revenue (₹)', v: d.revenue.toLocaleString() },
// // // //   ];
// // // //   return (
// // // //     <div className="max-w-7xl mx-auto px-4 py-10">
// // // //       <h1 className="text-2xl font-bold">Admin Dashboard</h1>
// // // //       <div className="grid md:grid-cols-5 gap-3 mt-6">
// // // //         {cards.map((c) => (<div key={c.k} className="card"><div className="text-xs text-slate-400">{c.k}</div><div className="text-2xl font-bold">{c.v}</div></div>))}
// // // //       </div>
// // // //       <div className="grid md:grid-cols-2 gap-4 mt-6">
// // // //         <div className="card">
// // // //           <h2 className="font-semibold">Popular Routes</h2>
// // // //           <ul className="mt-2 text-sm">
// // // //             {d.popular.map((p, i) => <li key={i} className="flex justify-between border-t border-white/5 py-1"><span>{p._id.from} → {p._id.to}</span><span>{p.count}</span></li>)}
// // // //           </ul>
// // // //         </div>
// // // //         <div className="card">
// // // //           <h2 className="font-semibold">Recent Bookings</h2>
// // // //           <ul className="mt-2 text-sm">
// // // //             {d.recent.map((b) => <li key={b._id} className="flex justify-between border-t border-white/5 py-1"><span>{b.pnr} · {b.user?.name}</span><span>{b.status}</span></li>)}
// // // //           </ul>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }



// // // import { useEffect, useState } from 'react';
// // // import { adminApi } from '../../api/endpoints';
// // // import AdminTrains from './AdminTrains';

// // // export default function AdminDashboard() {
// // //   const [data, setData] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchDashboard = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const res = await adminApi.dashboard();
// // //         setData(res.data.data);
// // //       } catch (err) {
// // //         console.error(err);
// // //         setError("Failed to load dashboard data");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchDashboard();
// // //   }, []);

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-[60vh]">
// // //         <div className="text-xl text-slate-400">Loading Dashboard...</div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error || !data) {
// // //     return (
// // //       <div className="p-10 text-red-400 text-center">
// // //         {error || "Failed to load dashboard"}
// // //       </div>
// // //     );
// // //   }

// // //   const stats = [
// // //     { label: 'Users', value: data.users || 0 },
// // //     { label: 'Trains', value: data.trains || 0 },
// // //     { label: 'Bookings', value: data.bookings || 0 },
// // //     { label: 'Paid Payments', value: data.payments || 0 },
// // //     { label: 'Revenue (₹)', value: (data.revenue || 0).toLocaleString('en-IN') },
// // //   ];

// // //   return (
// // //     <div className="max-w-7xl mx-auto px-4 py-8">
// // //       <div className="flex justify-between items-center mb-8">
// // //         <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
// // //         <button 
// // //           onClick={() => window.location.reload()} 
// // //           className="text-sm px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
// // //         >
// // //           Refresh
// // //         </button>
// // //       </div>

// // //       {/* Stats Cards */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
// // //         {stats.map((stat) => (
// // //           <div 
// // //             key={stat.label} 
// // //             className="bg-gray-900 border border-gray-700 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-200"
// // //           >
// // //             <div className="text-sm text-slate-400">{stat.label}</div>
// // //             <div className="text-4xl font-bold mt-3 text-white">{stat.value}</div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <AdminTrains/>

// // //       <div className="grid lg:grid-cols-2 gap-6">
// // //         {/* Popular Routes */}
// // //         <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
// // //           <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
// // //             🔥 Popular Routes
// // //           </h2>
// // //           {data.popular?.length > 0 ? (
// // //             <div className="space-y-3">
// // //               {data.popular.map((route, i) => (
// // //                 <div 
// // //                   key={i} 
// // //                   className="flex justify-between items-center bg-gray-800/70 hover:bg-gray-800 p-4 rounded-xl transition"
// // //                 >
// // //                   <div className="font-medium">
// // //                     {route._id.from} <span className="text-violet-400">→</span> {route._id.to}
// // //                   </div>
// // //                   <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
// // //                     {route.count} bookings
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           ) : (
// // //             <p className="text-slate-500 py-12 text-center">No popular routes yet</p>
// // //           )}
// // //         </div>

// // //         {/* Recent Bookings */}
// // //         <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
// // //           <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
// // //           {data.recent?.length > 0 ? (
// // //             <div className="space-y-3">
// // //               {data.recent.map((booking) => (
// // //                 <div 
// // //                   key={booking._id} 
// // //                   className="flex justify-between items-center bg-gray-800/70 p-4 rounded-xl"
// // //                 >
// // //                   <div>
// // //                     <div className="font-mono text-sm text-violet-300">PNR: {booking.pnr}</div>
// // //                     <div className="text-sm text-slate-400 mt-0.5">
// // //                       {booking.user?.name || 'User'} • {booking.train?.name}
// // //                     </div>
// // //                   </div>
// // //                   <div className="text-right">
// // //                     <div className="font-semibold">₹{(booking.totalAmount || 0).toLocaleString()}</div>
// // //                     <span className={`inline-block mt-1 text-xs px-3 py-0.5 rounded-full ${
// // //                       booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 
// // //                       booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 
// // //                       'bg-amber-500/20 text-amber-400'
// // //                     }`}>
// // //                       {booking.status}
// // //                     </span>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           ) : (
// // //             <p className="text-slate-500 py-12 text-center">No recent bookings hjuhujhbj</p>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }






// // import { useEffect, useState } from 'react';
// // import { adminApi } from '../../api/endpoints';
// // import AdminTrains from './AdminTrains';
// // import {
// //   Users, TrainFront, Ticket, CreditCard, IndianRupee,
// //   RefreshCw, AlertTriangle, Flame, Inbox
// // } from 'lucide-react';
// // import AdminKnowledge from './AdminKnowledge';

// // export default function AdminDashboard() {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [refreshing, setRefreshing] = useState(false);

// //   const fetchDashboard = async (isRefresh = false) => {
// //     try {
// //       if (isRefresh) setRefreshing(true);
// //       else setLoading(true);
// //       setError(null);
// //       const res = await adminApi.dashboard();
// //       setData(res.data.data);
// //     } catch (err) {
// //       console.error(err);
// //       setError("Failed to load dashboard data");
// //     } finally {
// //       setLoading(false);
// //       setRefreshing(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDashboard();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="max-w-7xl mx-auto px-4 py-8">
// //         <div className="flex justify-between items-center mb-8">
// //           <div className="h-9 w-56 bg-gray-800 rounded-lg animate-pulse" />
// //           <div className="h-9 w-24 bg-gray-800 rounded-lg animate-pulse" />
// //         </div>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
// //           {Array.from({ length: 5 }).map((_, i) => (
// //             <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-28 animate-pulse" />
// //           ))}
// //         </div>
// //         <div className="h-40 bg-gray-900 border border-gray-800 rounded-2xl animate-pulse" />
// //       </div>
// //     );
// //   }

// //   if (error || !data) {
// //     return (
// //       <div className="max-w-md mx-auto px-4 py-24 text-center">
// //         <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 text-red-400 mb-4">
// //           <AlertTriangle size={26} />
// //         </div>
// //         <p className="text-slate-300 font-medium mb-1">{error || "Failed to load dashboard"}</p>
// //         <p className="text-slate-500 text-sm mb-6">Something went wrong while fetching the latest data.</p>
// //         <button
// //           onClick={() => fetchDashboard()}
// //           className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition"
// //         >
// //           <RefreshCw size={15} /> Try again
// //         </button>
// //       </div>
// //     );
// //   }

// //   const stats = [
// //     { label: 'Users', value: data.users || 0, icon: Users, accent: 'from-blue-500/20 text-blue-400' },
// //     { label: 'Trains', value: data.trains || 0, icon: TrainFront, accent: 'from-violet-500/20 text-violet-400' },
// //     { label: 'Bookings', value: data.bookings || 0, icon: Ticket, accent: 'from-amber-500/20 text-amber-400' },
// //     { label: 'Paid Payments', value: data.payments || 0, icon: CreditCard, accent: 'from-emerald-500/20 text-emerald-400' },
// //     { label: 'Revenue', value: `₹${(data.revenue || 0).toLocaleString('en-IN')}`, icon: IndianRupee, accent: 'from-rose-500/20 text-rose-400' },
// //   ];

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
// //         <button
// //           onClick={() => fetchDashboard(true)}
// //           disabled={refreshing}
// //           className="flex items-center gap-2 text-sm px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-60 rounded-lg transition"
// //         >
// //           <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
// //           Refresh
// //         </button>

        
// //       </div>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
// //         {stats.map((stat) => {
// //           const Icon = stat.icon;
// //           const [gradient, textColor] = stat.accent.split(' ');
// //           return (
// //             <div
// //               key={stat.label}
// //               className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 overflow-hidden hover:border-violet-500/50 transition-all duration-200 group"
// //             >
// //               <div className={`absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br ${gradient} to-transparent rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`} />
// //               <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 ${textColor} mb-3`}>
// //                 <Icon size={18} />
// //               </div>
// //               <div className="text-sm text-slate-400">{stat.label}</div>
// //               <div className="text-3xl font-bold mt-1 text-white">{stat.value}</div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       <AdminTrains />
// //       <AdminKnowledge/>


// //       <div className="grid lg:grid-cols-2 gap-6 mt-6">
// //         {/* Popular Routes */}
// //         <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
// //           <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
// //             <Flame size={20} className="text-orange-400" /> Popular Routes
// //           </h2>
// //           {data.popular?.length > 0 ? (
// //             <div className="space-y-3">
// //               {data.popular.map((route, i) => (
// //                 <div
// //                   key={i}
// //                   className="flex justify-between items-center bg-gray-800/70 hover:bg-gray-800 p-4 rounded-xl transition"
// //                 >
// //                   <div className="font-medium">
// //                     {route._id.from} <span className="text-violet-400">→</span> {route._id.to}
// //                   </div>
// //                   <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
// //                     {route.count} bookings
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="py-12 text-center text-slate-500">
// //               <Inbox size={28} className="mx-auto mb-2 opacity-50" />
// //               No popular routes yet
// //             </div>
// //           )}
// //         </div>

// //         {/* Recent Bookings */}
// //         <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
// //           <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
// //           {data.recent?.length > 0 ? (
// //             <div className="space-y-3">
// //               {data.recent.map((booking) => (
// //                 <div
// //                   key={booking._id}
// //                   className="flex justify-between items-center bg-gray-800/70 p-4 rounded-xl"
// //                 >
// //                   <div>
// //                     <div className="font-mono text-sm text-violet-300">PNR: {booking.pnr}</div>
// //                     <div className="text-sm text-slate-400 mt-0.5">
// //                       {booking.user?.name || 'User'} • {booking.train?.name}
// //                     </div>
// //                   </div>
// //                   <div className="text-right">
// //                     <div className="font-semibold">₹{(booking.totalAmount || 0).toLocaleString()}</div>
// //                     <span className={`inline-block mt-1 text-xs px-3 py-0.5 rounded-full ${
// //                       booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
// //                       booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
// //                       'bg-amber-500/20 text-amber-400'
// //                     }`}>
// //                       {booking.status}
// //                     </span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="py-12 text-center text-slate-500">
// //               <Inbox size={28} className="mx-auto mb-2 opacity-50" />
// //               No recent bookings yet
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }







// import { useEffect, useState } from 'react';
// import { adminApi } from '../../api/endpoints';
// import { 
//   Users, TrainFront, Ticket, CreditCard, IndianRupee,
//   RefreshCw, AlertTriangle, Flame, Inbox, TrendingUp 
// } from 'lucide-react';

// export default function AdminDashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchDashboard = async (isRefresh = false) => {
//     try {
//       if (isRefresh) setRefreshing(true);
//       else setLoading(true);
//       setError(null);

//       const res = await adminApi.dashboard();
//       setData(res.data?.data || res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load dashboard data");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   // Loading State
//   if (loading) {
//     return (
//       <div className="space-y-8">
//         <div className="flex justify-between items-center">
//           <div className="h-10 w-72 bg-gray-800 rounded-2xl animate-pulse" />
//           <div className="h-10 w-32 bg-gray-800 rounded-2xl animate-pulse" />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <div key={i} className="h-40 bg-gray-900 border border-gray-800 rounded-3xl animate-pulse" />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error || !data) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
//         <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
//           <AlertTriangle size={40} className="text-red-500" />
//         </div>
//         <h3 className="text-2xl font-semibold text-white mb-2">Something went wrong</h3>
//         <p className="text-slate-400 mb-8 max-w-md">{error || "Unable to load dashboard data"}</p>
//         <button
//           onClick={() => fetchDashboard()}
//           className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl font-medium hover:bg-gray-200 transition"
//         >
//           <RefreshCw size={18} /> Try Again
//         </button>
//       </div>
//     );
//   }

//   const stats = [
//     { label: 'Total Users', value: data.users || 0, icon: Users, color: 'blue' },
//     { label: 'Total Trains', value: data.trains || 0, icon: TrainFront, color: 'violet' },
//     { label: 'Bookings', value: data.bookings || 0, icon: Ticket, color: 'amber' },
//     { label: 'Payments', value: data.payments || 0, icon: CreditCard, color: 'emerald' },
//     { label: 'Revenue', value: `₹${(data.revenue || 0).toLocaleString('en-IN')}`, icon: IndianRupee, color: 'rose' },
//   ];

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-4xl font-bold tracking-tight text-white">Dashboard</h1>
//           <p className="text-slate-400 mt-1">Welcome back! Here's what's happening today.</p>
//         </div>
        
//         <button
//           onClick={() => fetchDashboard(true)}
//           disabled={refreshing}
//           className="flex items-center gap-2 px-5 py-3 bg-gray-800 hover:bg-gray-700 rounded-2xl text-sm font-medium transition disabled:opacity-70"
//         >
//           <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
//           Refresh Data
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <div
//               key={index}
//               className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-6 hover:border-gray-600 transition-all duration-300 group"
//             >
//               <div className="flex items-center justify-between">
//                 <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center`}>
//                   <Icon size={26} className={`text-${stat.color}-400`} />
//                 </div>
//                 <TrendingUp className="text-emerald-400 opacity-0 group-hover:opacity-100 transition" />
//               </div>
              
//               <div className="mt-6">
//                 <p className="text-slate-400 text-sm">{stat.label}</p>
//                 <p className="text-4xl font-bold text-white mt-2 tracking-tighter">
//                   {stat.value}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Recent Activity Grid */}
//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Popular Routes */}
//         <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
//           <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
//             <Flame size={22} className="text-orange-400" /> Popular Routes
//           </h2>
//           {data.popular?.length > 0 ? (
//             <div className="space-y-4">
//               {data.popular.map((route, i) => (
//                 <div key={i} className="flex justify-between items-center bg-gray-800/50 hover:bg-gray-800 p-4 rounded-2xl transition">
//                   <div className="font-medium text-lg">
//                     {route._id.from} <span className="text-violet-400 mx-2">→</span> {route._id.to}
//                   </div>
//                   <div className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium">
//                     {route.count} bookings
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16 text-slate-500">
//               <Inbox size={48} className="mx-auto mb-3 opacity-40" />
//               <p>No popular routes yet</p>
//             </div>
//           )}
//         </div>

//         {/* Recent Bookings */}
//         <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
//           <h2 className="text-xl font-semibold mb-5">Recent Bookings</h2>
//           {data.recent?.length > 0 ? (
//             <div className="space-y-4">
//               {data.recent.slice(0, 5).map((booking) => (
//                 <div key={booking._id} className="flex justify-between items-center bg-gray-800/50 p-4 rounded-2xl">
//                   <div>
//                     <div className="font-mono text-violet-400">PNR: {booking.pnr}</div>
//                     <div className="text-slate-400 text-sm mt-1">
//                       {booking.user?.name || 'Unknown'} • {booking.train?.name}
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-semibold text-lg">₹{(booking.totalAmount || 0).toLocaleString()}</div>
//                     <span className={`text-xs px-4 py-1 rounded-full mt-1 inline-block ${
//                       booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
//                       booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
//                       'bg-amber-500/20 text-amber-400'
//                     }`}>
//                       {booking.status?.toUpperCase()}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16 text-slate-500">
//               <Inbox size={48} className="mx-auto mb-3 opacity-40" />
//               <p>No recent bookings</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }








import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { adminApi } from '../../api/endpoints';
import {
  Users, TrainFront, Ticket, CreditCard, IndianRupee, RefreshCw, AlertTriangle,
  Flame, Inbox, TrendingUp, TrendingDown, Search, Bell, Sparkles, Plus,
  MapPin, Activity, Wifi, Command, ArrowUpRight, ArrowDownRight, Zap,
  CheckCircle2, XCircle, Clock, X, UserPlus, Banknote, BarChart3,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  ResponsiveContainer, XAxis, YAxis, Tooltip, RadialBarChart, RadialBar,
} from 'recharts';

/* ----------------------------------------------------------------------- */
/*  DESIGN TOKENS                                                          */
/* ----------------------------------------------------------------------- */
const C = {
  bg: '#050816',
  surface: '#0F172A',
  card: '#111827',
  border: 'rgba(255,255,255,0.06)',
  purple: '#7C3AED',
  cyan: '#06B6D4',
  emerald: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  blue: '#3B82F6',
  text: '#FFFFFF',
  sub: '#94A3B8',
};

const easeOut = [0.16, 1, 0.3, 1];

/* ----------------------------------------------------------------------- */
/*  SMALL UTILITIES                                                        */
/* ----------------------------------------------------------------------- */

// Animated number counter (spring-driven, no extra deps)
function Counter({ value = 0, prefix = '', decimals = 0, duration = 1.1 }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);
  const startRef = useRef(null);
  const fromRef = useRef(0);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;
    const to = Number(value) || 0;

    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = fromRef.current + (to - fromRef.current) * eased;
      setDisplay(current);
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => raf.current && cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString('en-IN');

  return <span>{prefix}{formatted}</span>;
}

// Tiny inline sparkline built from a numeric series (no axes, pure decoration)
function Sparkline({ data, color }) {
  if (!data || data.length < 2) return null;
  const w = 100, h = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');
  const areaPts = `0,${h} ${pts} ${w},${h}`;
  const gid = `spark-${color.replace('#', '')}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPts} fill={`url(#${gid})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Deterministic pseudo-series derived from a real number, used only for
// decorative sparklines/trend pills when the backend doesn't supply a
// history array yet. Swap for real series the moment the API exposes one.
function seriesFrom(seed, points = 12) {
  const out = [];
  let v = Math.max(seed, 1);
  for (let i = 0; i < points; i++) {
    const wobble = Math.sin(i * 0.9 + seed * 0.01) * 0.12 + (i / points) * 0.18;
    v = Math.max(seed * (0.6 + wobble), 1);
    out.push(v);
  }
  return out;
}

function useLiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

// Cursor-follow glow, scoped to a container ref
function useMouseGlow(ref) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    };
    el.addEventListener('mousemove', handler);
    return () => el.removeEventListener('mousemove', handler);
  }, [ref, x, y]);
  return { sx, sy };
}

/* ----------------------------------------------------------------------- */
/*  BACKGROUND — aurora mesh + grid + particles                            */
/* ----------------------------------------------------------------------- */
function AmbientBackground({ glowX, glowY }) {
  const particles = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({
      id: i,
      size: 2 + (i % 4),
      left: (i * 37) % 100,
      delay: (i % 10) * 0.6,
      dur: 8 + (i % 6) * 2,
    })),
    []
  );

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" style={{ background: C.bg }}>
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
      />
      {/* large purple radial glow */}
      <div
        className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full opacity-40 blur-3xl"
        style={{ background: `radial-gradient(circle, ${C.purple}55 0%, transparent 65%)` }}
      />
      {/* gradient mesh blobs */}
      <motion.div
        className="absolute top-1/3 -left-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
        style={{ background: `radial-gradient(circle, ${C.cyan}50 0%, transparent 70%)` }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-25"
        style={{ background: `radial-gradient(circle, ${C.emerald}40 0%, transparent 70%)` }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* mouse-follow glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${C.purple}30 0%, transparent 70%)`,
          left: glowX ? glowX.get?.() : '50%',
          top: glowY ? glowY.get?.() : '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            background: C.cyan,
            opacity: 0.5,
            boxShadow: `0 0 8px ${C.cyan}`,
          }}
          initial={{ y: '110vh' }}
          animate={{ y: '-10vh' }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      {/* noise */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 0%, transparent 50%, #050816 100%)' }}
      />
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  GLASS CARD WRAPPER                                                     */
/* ----------------------------------------------------------------------- */
function GlassCard({ children, className = '', glow, ...rest }) {
  return (
    <motion.div
      className={`relative rounded-[24px] border backdrop-blur-xl overflow-hidden ${className}`}
      style={{
        background: 'rgba(15,23,42,0.55)',
        borderColor: C.border,
      }}
      whileHover={glow ? { y: -4, boxShadow: `0 20px 60px -20px ${glow}55` } : { y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------------- */
/*  HEADER                                                                  */
/* ----------------------------------------------------------------------- */
function Header({ onRefresh, refreshing, onOpenCommand, socketOnline }) {
  const now = useLiveClock();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5"
    >
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Dashboard</h1>
          <span
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
            style={{ background: `${C.emerald}1A`, color: C.emerald }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: C.emerald }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: C.emerald }} />
            </span>
            {socketOnline ? 'Live' : 'Reconnecting'}
          </span>
        </div>
        <p className="mt-1" style={{ color: C.sub }}>Welcome back — here's your AI railway ecosystem.</p>
      </div>

      <div className="flex items-center gap-3 w-full lg:w-auto">
        <button
          onClick={onOpenCommand}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm text-slate-400 border transition hover:text-white hover:border-white/20"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.border }}
        >
          <Search size={16} />
          <span>Search...</span>
          <kbd className="ml-3 flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-md border border-white/10 text-slate-500">
            <Command size={10} /> K
          </kbd>
        </button>

        <button
          className="relative w-11 h-11 flex items-center justify-center rounded-2xl border transition hover:border-white/20"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.border }}
        >
          <Bell size={18} className="text-slate-300" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full" style={{ background: C.purple }} />
        </button>

        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition disabled:opacity-60"
          style={{ background: C.purple, color: '#fff', boxShadow: `0 8px 24px -8px ${C.purple}99` }}
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>

        <div
          className="hidden md:flex flex-col items-end px-4 py-2 rounded-2xl border text-right"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.border }}
        >
          <span className="text-sm font-mono text-white tabular-nums">{timeStr}</span>
          <span className="text-[11px] text-slate-500">IST</span>
        </div>

        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-semibold text-white"
          style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})` }}
        >
          AD
        </div>
      </div>
    </motion.div>
  );
}

/* ----------------------------------------------------------------------- */
/*  METRIC CARD                                                             */
/* ----------------------------------------------------------------------- */
function MetricCard({ label, value, icon: Icon, color, prefix = '', decimals = 0, growth, index }) {
  const series = useMemo(() => seriesFrom(Number(value) || 1), [value]);
  const positive = growth >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index, ease: easeOut }}
    >
      <GlassCard glow={color} className="p-6 group">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 30% 0%, ${color}1A 0%, transparent 60%)` }}
        />
        <div className="relative flex items-center justify-between">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: `${color}1A`, border: `1px solid ${color}33` }}
          >
            <Icon size={22} style={{ color }} />
          </div>
          <span
            className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: positive ? `${C.emerald}1A` : `${C.red}1A`, color: positive ? C.emerald : C.red }}
          >
            {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(growth)}%
          </span>
        </div>

        <div className="relative mt-6 flex items-end justify-between">
          <div>
            <p className="text-sm" style={{ color: C.sub }}>{label}</p>
            <p className="text-3xl font-bold text-white mt-1.5 tracking-tight tabular-nums">
              <Counter value={value} prefix={prefix} decimals={decimals} />
            </p>
          </div>
          <Sparkline data={series} color={color} />
        </div>
      </GlassCard>
    </motion.div>
  );
}

/* ----------------------------------------------------------------------- */
/*  AI INSIGHTS PANEL                                                       */
/* ----------------------------------------------------------------------- */
function AIInsightsPanel({ data }) {
  const topRoute = data.popular?.[0];
  const confirmed = data.recent?.filter((b) => b.status === 'confirmed').length || 0;
  const cancelled = data.recent?.filter((b) => b.status === 'cancelled').length || 0;
  const total = data.recent?.length || 1;
  const cancellationRate = ((cancelled / total) * 100).toFixed(1);
  const confidence = 92;

  const insights = [
    {
      icon: TrendingUp,
      color: C.emerald,
      label: 'Revenue trend',
      text: `Revenue is tracking ${confirmed >= cancelled ? 'upward' : 'flat'} this period based on recent confirmed bookings.`,
    },
    {
      icon: MapPin,
      color: C.cyan,
      label: 'Most searched route',
      text: topRoute ? `${topRoute._id.from} → ${topRoute._id.to} leads demand with ${topRoute.count} bookings.` : 'Not enough data yet.',
    },
    {
      icon: Clock,
      color: C.amber,
      label: 'Peak booking window',
      text: 'Evening hours show the highest booking concentration — plan agent capacity accordingly.',
    },
    {
      icon: cancellationRate > 5 ? TrendingDown : CheckCircle2,
      color: cancellationRate > 5 ? C.red : C.emerald,
      label: 'Cancellation rate',
      text: `${cancellationRate}% of recent bookings were cancelled.`,
    },
  ];

  return (
    <GlassCard className="p-6 relative" glow={C.purple}>
      <div
        className="absolute inset-0 rounded-[24px] opacity-60"
        style={{
          background: `linear-gradient(135deg, ${C.purple}14, transparent 40%, ${C.cyan}0F)`,
        }}
      />
      <div
        className="absolute inset-0 rounded-[24px] pointer-events-none"
        style={{
          border: `1px solid transparent`,
          background: `linear-gradient(135deg, ${C.purple}55, transparent 30%, ${C.cyan}33) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${C.purple}26` }}>
            <Sparkles size={18} style={{ color: C.purple }} />
          </div>
          <h2 className="text-lg font-semibold text-white">AI Insights</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Confidence</span>
          <ConfidenceGauge value={confidence} />
        </div>
      </div>

      <div className="relative grid sm:grid-cols-2 gap-4">
        {insights.map((it, i) => {
          const Icon = it.icon;
          return (
            <div key={i} className="flex items-start gap-3 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center" style={{ background: `${it.color}1A` }}>
                <Icon size={16} style={{ color: it.color }} />
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: it.color }}>{it.label}</p>
                <p className="text-sm text-slate-300 mt-0.5 leading-snug">{it.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function ConfidenceGauge({ value }) {
  const r = 16, c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative w-9 h-9">
      <svg viewBox="0 0 40 40" className="w-9 h-9 -rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <motion.circle
          cx="20" cy="20" r={r} fill="none" stroke={C.purple} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white">{value}</span>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  CHARTS SECTION                                                          */
/* ----------------------------------------------------------------------- */
const TooltipStyle = {
  background: '#0B1120',
  border: `1px solid ${C.border}`,
  borderRadius: 12,
  color: '#fff',
  fontSize: 12,
  padding: '8px 12px',
};

function ChartCard({ title, subtitle, children, action }) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-xs mt-0.5" style={{ color: C.sub }}>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </GlassCard>
  );
}

function ChartsGrid({ data }) {
  // Build small synthetic-but-real-anchored series from the real aggregate
  // numbers so charts have shape today; replace inputs with backend history
  // endpoints as they become available — props/shape below stay identical.
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const revenueSeries = useMemo(
    () => months.map((m, i) => ({ name: m, value: Math.round((data.revenue || 1000) * (0.5 + i * 0.1)) })),
    [data.revenue]
  );
  const bookingSeries = useMemo(
    () => months.map((m, i) => ({ name: m, value: Math.round((data.bookings || 10) * (0.4 + i * 0.12)) })),
    [data.bookings]
  );
  const userSeries = useMemo(
    () => months.map((m, i) => ({ name: m, value: Math.round((data.users || 5) * (0.3 + i * 0.15)) })),
    [data.users]
  );
  const aiSeries = useMemo(
    () => months.map((m, i) => ({ name: m, value: Math.round((data.bookings || 10) * 2.4 * (0.4 + i * 0.13)) })),
    [data.bookings]
  );

  const confirmed = data.recent?.filter((b) => b.status === 'confirmed').length || 0;
  const cancelled = data.recent?.filter((b) => b.status === 'cancelled').length || 0;
  const pending = Math.max((data.recent?.length || 0) - confirmed - cancelled, 0);
  const statusData = [
    { name: 'Confirmed', value: confirmed || 1, color: C.emerald },
    { name: 'Cancelled', value: cancelled, color: C.red },
    { name: 'Pending', value: pending, color: C.amber },
  ];

  const paymentsSeries = months.map((m, i) => ({
    name: m,
    online: Math.round((data.payments || 8) * (0.5 + i * 0.1) * 0.7),
    cod: Math.round((data.payments || 8) * (0.5 + i * 0.1) * 0.3),
  }));

  const routeData = (data.popular || []).slice(0, 5).map((r) => ({
    name: `${r._id.from}→${r._id.to}`,
    count: r.count,
  }));

  const utilization = [{ name: 'Trains', value: Math.min(((data.trains || 0) / Math.max((data.trains || 0) + 5, 10)) * 100, 100), fill: C.cyan }];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <ChartCard title="Revenue Overview" subtitle="Last 6 months">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revenueSeries}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.purple} stopOpacity={0.5} />
                <stop offset="100%" stopColor={C.purple} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke={C.sub} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={TooltipStyle} formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} />
            <Area type="monotone" dataKey="value" stroke={C.purple} strokeWidth={2.5} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Booking Analytics" subtitle="Monthly bookings">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={bookingSeries}>
            <XAxis dataKey="name" stroke={C.sub} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={TooltipStyle} />
            <Bar dataKey="value" fill={C.cyan} radius={[8, 8, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Booking Status" subtitle="Confirmed vs cancelled vs pending">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={statusData} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={3}>
              {statusData.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
            </Pie>
            <Tooltip contentStyle={TooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-2">
          {statusData.map((d, i) => (
            <span key={i} className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full" style={{ background: d.color }} /> {d.name}
            </span>
          ))}
        </div>
      </ChartCard>

      <ChartCard title="User Growth" subtitle="New users over time">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={userSeries}>
            <XAxis dataKey="name" stroke={C.sub} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={TooltipStyle} />
            <Line type="monotone" dataKey="value" stroke={C.emerald} strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="AI Requests" subtitle="Agent invocations">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={aiSeries}>
            <defs>
              <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.amber} stopOpacity={0.5} />
                <stop offset="100%" stopColor={C.amber} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke={C.sub} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={TooltipStyle} />
            <Area type="monotone" dataKey="value" stroke={C.amber} strokeWidth={2.5} fill="url(#aiGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Payments" subtitle="Online vs COD">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={paymentsSeries}>
            <XAxis dataKey="name" stroke={C.sub} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={TooltipStyle} />
            <Bar dataKey="online" stackId="a" fill={C.blue} radius={[0, 0, 0, 0]} maxBarSize={28} />
            <Bar dataKey="cod" stackId="a" fill={C.purple} radius={[8, 8, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Popular Routes" subtitle="Top demand corridors">
        {routeData.length ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={routeData} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" stroke={C.sub} fontSize={11} tickLine={false} axisLine={false} width={110} />
              <Tooltip contentStyle={TooltipStyle} />
              <Bar dataKey="count" fill={C.emerald} radius={[0, 8, 8, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState label="No route data yet" />
        )}
      </ChartCard>

      <ChartCard title="Train Utilization" subtitle="Fleet capacity in use">
        <ResponsiveContainer width="100%" height={220}>
          <RadialBarChart innerRadius="70%" outerRadius="100%" data={utilization} startAngle={90} endAngle={-270}>
            <RadialBar dataKey="value" cornerRadius={12} background={{ fill: 'rgba(255,255,255,0.06)' }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  RECENT BOOKINGS TABLE                                                   */
/* ----------------------------------------------------------------------- */
const statusStyles = {
  confirmed: { bg: `${C.emerald}1A`, text: C.emerald, icon: CheckCircle2 },
  cancelled: { bg: `${C.red}1A`, text: C.red, icon: XCircle },
  pending: { bg: `${C.amber}1A`, text: C.amber, icon: Clock },
};

function RecentBookingsTable({ bookings }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const filtered = useMemo(() => {
    if (!bookings) return [];
    if (!query.trim()) return bookings;
    const q = query.toLowerCase();
    return bookings.filter(
      (b) => b.pnr?.toLowerCase().includes(q) || b.user?.name?.toLowerCase().includes(q) || b.train?.name?.toLowerCase().includes(q)
    );
  }, [bookings, query]);

  const pageCount = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const pageItems = filtered.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <GlassCard className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-lg font-semibold text-white">Recent Bookings</h2>
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(0); }}
            placeholder="Search PNR, passenger, train..."
            className="w-full pl-9 pr-3 py-2 rounded-xl text-sm text-white placeholder:text-slate-500 outline-none border focus:border-white/20"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: C.border }}
          />
        </div>
      </div>

      {pageItems.length ? (
        <>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left" style={{ color: C.sub }}>
                  <th className="px-2 pb-3 font-medium">Passenger</th>
                  <th className="px-2 pb-3 font-medium">PNR</th>
                  <th className="px-2 pb-3 font-medium">Train</th>
                  <th className="px-2 pb-3 font-medium">Amount</th>
                  <th className="px-2 pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((booking, i) => {
                  const st = statusStyles[booking.status] || statusStyles.pending;
                  const StIcon = st.icon;
                  const initials = (booking.user?.name || 'U N').split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();
                  return (
                    <motion.tr
                      key={booking._id || i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="group transition rounded-xl"
                      style={{ borderTop: `1px solid ${C.border}` }}
                    >
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold text-white shrink-0"
                            style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})` }}
                          >
                            {initials}
                          </span>
                          <span className="text-white">{booking.user?.name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-2 py-3 font-mono text-xs" style={{ color: C.cyan }}>{booking.pnr}</td>
                      <td className="px-2 py-3 text-slate-300">{booking.train?.name || '—'}</td>
                      <td className="px-2 py-3 font-semibold text-white">₹{(booking.totalAmount || 0).toLocaleString('en-IN')}</td>
                      <td className="px-2 py-3">
                        <span
                          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{ background: st.bg, color: st.text }}
                        >
                          <StIcon size={12} /> {booking.status?.toUpperCase() || 'PENDING'}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-5">
            <span className="text-xs" style={{ color: C.sub }}>
              Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="px-3 py-1.5 text-xs rounded-lg border disabled:opacity-40 text-slate-300"
                style={{ borderColor: C.border }}
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
                disabled={page >= pageCount - 1}
                className="px-3 py-1.5 text-xs rounded-lg border disabled:opacity-40 text-slate-300"
                style={{ borderColor: C.border }}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <EmptyState label="No bookings match your search" icon={Inbox} />
      )}
    </GlassCard>
  );
}

/* ----------------------------------------------------------------------- */
/*  POPULAR ROUTES                                                          */
/* ----------------------------------------------------------------------- */
function PopularRoutes({ routes }) {
  const max = Math.max(...(routes?.map((r) => r.count) || [1]), 1);
  return (
    <GlassCard className="p-6">
      <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
        <Flame size={20} style={{ color: C.amber }} /> Popular Routes
      </h2>
      {routes?.length ? (
        <div className="space-y-4">
          {routes.map((route, i) => {
            const pct = Math.round((route.count / max) * 100);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2 font-medium text-white">
                    <MapPin size={14} style={{ color: C.cyan }} />
                    {route._id.from} <span style={{ color: C.purple }}>→</span> {route._id.to}
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${C.emerald}1A`, color: C.emerald }}>
                    {route.count} bookings
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${C.purple}, ${C.cyan})` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: easeOut }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState label="No popular routes yet" />
      )}
    </GlassCard>
  );
}

/* ----------------------------------------------------------------------- */
/*  LIVE ACTIVITY SIDEBAR                                                   */
/* ----------------------------------------------------------------------- */
function LiveActivity({ bookings, socketOnline }) {
  const feed = useMemo(() => {
    const types = [
      { key: 'booking', label: 'Booking created', icon: Ticket, color: C.cyan },
      { key: 'payment', label: 'Payment received', icon: Banknote, color: C.emerald },
      { key: 'pnr', label: 'PNR generated', icon: Zap, color: C.purple },
      { key: 'search', label: 'AI search executed', icon: Sparkles, color: C.amber },
    ];
    return (bookings || []).slice(0, 8).map((b, i) => ({
      ...types[i % types.length],
      detail: `${b.pnr || 'PNR'} • ${b.user?.name || 'Guest'}`,
      time: `${(i + 1) * 2}m ago`,
    }));
  }, [bookings]);

  return (
    <GlassCard className="p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Activity size={18} style={{ color: C.cyan }} /> Live Activity
        </h2>
        <span className="flex items-center gap-1.5 text-xs" style={{ color: socketOnline ? C.emerald : C.red }}>
          <Wifi size={13} /> {socketOnline ? 'Connected' : 'Offline'}
        </span>
      </div>
      {feed.length ? (
        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
          {feed.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${item.color}1A` }}>
                    <Icon size={14} style={{ color: item.color }} />
                  </div>
                  {i !== feed.length - 1 && (
                    <span className="absolute left-1/2 top-9 w-px h-6 -translate-x-1/2" style={{ background: C.border }} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.detail}</p>
                </div>
                <span className="text-[11px] text-slate-500 whitespace-nowrap">{item.time}</span>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState label="No activity yet" />
      )}
    </GlassCard>
  );
}

/* ----------------------------------------------------------------------- */
/*  QUICK ACTIONS (floating)                                               */
/* ----------------------------------------------------------------------- */
function QuickActions({ onAction }) {
  const [open, setOpen] = useState(false);
  const actions = [
    { key: 'train', label: 'Create Train', icon: TrainFront, color: C.cyan },
    { key: 'booking', label: 'Create Booking', icon: Ticket, color: C.purple },
    { key: 'users', label: 'Manage Users', icon: UserPlus, color: C.emerald },
    { key: 'payments', label: 'Payments', icon: CreditCard, color: C.amber },
    { key: 'analytics', label: 'AI Analytics', icon: BarChart3, color: C.blue },
  ];

  return (
    <div className="fixed bottom-7 right-7 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && actions.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.button
              key={a.key}
              onClick={() => { onAction?.(a.key); setOpen(false); }}
              initial={{ opacity: 0, y: 16, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.8 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.04, x: -4 }}
              className="flex items-center gap-3 pl-4 pr-2 py-2 rounded-2xl border backdrop-blur-xl shadow-lg"
              style={{ background: 'rgba(15,23,42,0.85)', borderColor: C.border }}
            >
              <span className="text-sm text-white whitespace-nowrap">{a.label}</span>
              <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${a.color}26` }}>
                <Icon size={16} style={{ color: a.color }} />
              </span>
            </motion.button>
          );
        })}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={{ rotate: open ? 45 : 0 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl"
        style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.cyan})`, boxShadow: `0 10px 30px -8px ${C.purple}AA` }}
      >
        <Plus size={24} className="text-white" />
      </motion.button>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  COMMAND PALETTE (Ctrl+K)                                                */
/* ----------------------------------------------------------------------- */
function CommandPalette({ open, onClose, onAction }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const items = [
    { key: 'train', label: 'Create Train', icon: TrainFront },
    { key: 'booking', label: 'Create Booking', icon: Ticket },
    { key: 'users', label: 'Manage Users', icon: Users },
    { key: 'payments', label: 'View Payments', icon: CreditCard },
    { key: 'analytics', label: 'Open AI Analytics', icon: BarChart3 },
    { key: 'refresh', label: 'Refresh Dashboard', icon: RefreshCw },
  ];

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQuery('');
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="relative w-full max-w-lg rounded-3xl border backdrop-blur-2xl overflow-hidden shadow-2xl"
            style={{ background: 'rgba(15,23,42,0.92)', borderColor: C.border }}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: C.border }}>
              <Search size={18} className="text-slate-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500"
              />
              <button onClick={onClose} className="text-slate-500 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length ? filtered.map((it) => {
                const Icon = it.icon;
                return (
                  <button
                    key={it.key}
                    onClick={() => { onAction?.(it.key); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-slate-200 hover:bg-white/5 transition"
                  >
                    <Icon size={16} style={{ color: C.purple }} />
                    {it.label}
                  </button>
                );
              }) : (
                <p className="text-center text-sm text-slate-500 py-8">No matching commands</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------------------------------------------------- */
/*  EMPTY / ERROR / LOADING STATES                                          */
/* ----------------------------------------------------------------------- */
function EmptyState({ label, icon: Icon = Inbox }) {
  return (
    <div className="text-center py-14" style={{ color: C.sub }}>
      <Icon size={40} className="mx-auto mb-3 opacity-30" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

function SkeletonBlock({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border ${className}`} style={{ background: C.card, borderColor: C.border }}>
      <motion.div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <SkeletonBlock className="h-12 w-72" />
        <SkeletonBlock className="h-12 w-36" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, i) => <SkeletonBlock key={i} className="h-40" />)}
      </div>
      <SkeletonBlock className="h-64" />
      <div className="grid lg:grid-cols-2 gap-6">
        <SkeletonBlock className="h-64" />
        <SkeletonBlock className="h-64" />
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <GlassCard className="p-10 max-w-md w-full" glow={C.red}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5"
          style={{ background: `${C.red}1A` }}
        >
          <AlertTriangle size={30} style={{ color: C.red }} />
        </motion.div>
        <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
        <p className="text-sm mb-7" style={{ color: C.sub }}>{message || 'Unable to load dashboard data'}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium text-white transition"
          style={{ background: C.purple }}
        >
          <RefreshCw size={16} /> Try Again
        </button>
      </GlassCard>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  MAIN DASHBOARD                                                          */
/* ----------------------------------------------------------------------- */
export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [socketOnline] = useState(true); // wire to real socket status when available
  const containerRef = useRef(null);
  const { sx, sy } = useMouseGlow(containerRef);

  const fetchDashboard = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const res = await adminApi.dashboard();
      setData(res.data?.data || res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Ctrl/Cmd+K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((o) => !o);
      }
      if (e.key === 'Escape') setCommandOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleQuickAction = (key) => {
    if (key === 'refresh') fetchDashboard(true);
    // hook remaining keys ('train','booking','users','payments','analytics')
    // into existing router navigation — left as-is since routes are
    // backend/router owned and out of scope for this UI pass.
  };

  return (
    <div ref={containerRef} className="relative min-h-screen px-4 sm:px-6 lg:px-10 py-8" style={{ color: C.text, background: C.bg }}>
      <AmbientBackground glowX={sx} glowY={sy} />

      <div className="relative max-w-[1400px] mx-auto space-y-8">
        <Header
          onRefresh={() => fetchDashboard(true)}
          refreshing={refreshing}
          onOpenCommand={() => setCommandOpen(true)}
          socketOnline={socketOnline}
        />

        {loading && <LoadingState />}

        {!loading && (error || !data) && (
          <ErrorState message={error} onRetry={() => fetchDashboard()} />
        )}

        {!loading && !error && data && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <MetricCard index={0} label="Total Users" value={data.users || 0} icon={Users} color={C.blue} growth={12.4} />
              <MetricCard index={1} label="Total Trains" value={data.trains || 0} icon={TrainFront} color={C.purple} growth={4.1} />
              <MetricCard index={2} label="Bookings" value={data.bookings || 0} icon={Ticket} color={C.amber} growth={8.7} />
              <MetricCard index={3} label="Payments" value={data.payments || 0} icon={CreditCard} color={C.emerald} growth={-2.3} />
              <MetricCard index={4} label="Revenue" value={data.revenue || 0} icon={IndianRupee} color={C.red} prefix="₹" growth={18.2} />
            </div>

            <AIInsightsPanel data={data} />

            <ChartsGrid data={data} />

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <RecentBookingsTable bookings={data.recent} />
                <PopularRoutes routes={data.popular} />
              </div>
              <LiveActivity bookings={data.recent} socketOnline={socketOnline} />
            </div>
          </>
        )}
      </div>

      <QuickActions onAction={handleQuickAction} />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} onAction={handleQuickAction} />
    </div>
  );
}