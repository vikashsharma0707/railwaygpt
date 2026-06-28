// // client/src/components/admin/AdminDashboard.jsx  (ya pages/admin/)
// import React, { useState, useEffect } from 'react';
// import { trainApi, bookingApi, userApi, paymentApi } from '../../api'; // apna api folder se

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     users: 0,
//     trains: 0,
//     bookings: 0,
//     payments: 0,
//     revenue: 0,
//   });
//   const [popularRoutes, setPopularRoutes] = useState([]);
//   const [recentBookings, setRecentBookings] = useState([]);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       // Stats
//       const [usersRes, trainsRes, bookingsRes, paymentsRes] = await Promise.all([
//         userApi.count?.() || Promise.resolve({ data: { count: 2 } }),
//         trainApi.list(),
//         bookingApi.list?.({ limit: 1 }) || Promise.resolve({ data: [] }),
//         paymentApi.getStats?.() || Promise.resolve({ data: { total: 0 } }),
//       ]);

//       setStats({
//         users: usersRes.data?.count || 2,
//         trains: trainsRes.data?.length || 3,
//         bookings: bookingsRes.data?.length || 0,
//         payments: paymentsRes.data?.total || 0,
//         revenue: paymentsRes.data?.revenue || 0,
//       });

//       // Popular Routes (example — backend se aggregate kar sakte ho)
//       const routesRes = await trainApi.popularRoutes?.() || { data: [] };
//       setPopularRoutes(routesRes.data);

//       // Recent Bookings
//       const recentRes = await bookingApi.recent?.({ limit: 5 }) || { data: [] };
//       setRecentBookings(recentRes.data);
//     } catch (err) {
//       console.error("Dashboard fetch error", err);
//     }
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//         {[
//           { label: "Users", value: stats.users, color: "blue" },
//           { label: "Trains", value: stats.trains, color: "emerald" },
//           { label: "Bookings", value: stats.bookings, color: "amber" },
//           { label: "Paid Payments", value: stats.payments, color: "purple" },
//           { label: "Revenue (₹)", value: stats.revenue, color: "rose" },
//         ].map((stat, i) => (
//           <div key={i} className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6 hover:border-gray-500 transition">
//             <p className="text-gray-400 text-sm">{stat.label}</p>
//             <p className="text-4xl font-semibold mt-2">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Popular Routes */}
//         <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6">
//           <h2 className="text-xl font-semibold mb-4">Popular Routes</h2>
//           {popularRoutes.length > 0 ? (
//             <div className="space-y-3">
//               {popularRoutes.map((route, i) => (
//                 <div key={i} className="flex justify-between items-center bg-gray-800 p-3 rounded-xl">
//                   <div>
//                     <p className="font-medium">{route.from} → {route.to}</p>
//                     <p className="text-sm text-gray-400">{route.count} bookings</p>
//                   </div>
//                   <div className="text-emerald-400">#{i+1}</div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500 py-8 text-center">No popular routes yet</p>
//           )}
//         </div>

//         {/* Recent Bookings */}
//         <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
//           {recentBookings.length > 0 ? (
//             <div className="space-y-3">
//               {recentBookings.map((booking) => (
//                 <div key={booking._id} className="flex justify-between items-center bg-gray-800 p-4 rounded-xl">
//                   <div>
//                     <p className="font-medium">PNR: {booking.pnr}</p>
//                     <p className="text-sm text-gray-400">
//                       {booking.train?.name} • {booking.user?.name}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold">₹{booking.totalAmount}</p>
//                     <p className={`text-xs ${booking.status === 'confirmed' ? 'text-emerald-400' : 'text-amber-400'}`}>
//                       {booking.status}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500 py-8 text-center">No recent bookings</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import AdminTrains from '../../pages/admin/AdminTrains';   // ← Same folder mein hona chahiye
import AdminKnowledge from '../../pages/admin/AdminKnowledge';

const AdminDashboard = () => {
  const [showTrains, setShowTrains] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        
        <button
          onClick={() => setShowTrains(!showTrains)}
          className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-2xl font-medium transition-all"
        >
          {showTrains ? '← Back to Dashboard' : 'Manage Trains'}
        </button>
      </div>

      {/* Normal Dashboard Stats */}
      {!showTrains && (
        <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 text-center">
          <h2 className="text-2xl mb-4">Welcome to Admin Panel</h2>
          <p className="text-gray-400">Click on "Manage Trains" to add/edit trains</p>
          
          {/* Stats Cards (optional - tumhara purana code yahan daal sakte ho) */}
          <div className="grid grid-cols-5 gap-4 mt-10">
            <div className="bg-gray-800 p-6 rounded-2xl">Users: 3hjgjhghg</div>
            <div className="bg-gray-800 p-6 rounded-2xl">Trains: 2</div>
            <div className="bg-gray-800 p-6 rounded-2xl">Bookings: 0</div>
            <div className="bg-gray-800 p-6 rounded-2xl">Payments: 0</div>
            <div className="bg-gray-800 p-6 rounded-2xl">Revenue:uukgyugyujgyg ₹0</div>
          </div>
        </div>
      )}

      {/* Manage Trains Section */}
      {showTrains && (
        <div className="bg-gray-900 border border-gray-700 rounded-3xl overflow-hidden">
          <AdminTrains />
          <AdminKnowledge/>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;