// // // import React, { useState, useEffect } from 'react';
// // // import { trainApi } from '../api/endpoints';
// // // import { toast } from 'react-hot-toast';
// // // import { Search, Clock, MapPin, Train, Calendar } from 'lucide-react';

// // // const Trains = ({ isAdmin = false }) => {
// // //   const [trains, setTrains] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [filterType, setFilterType] = useState('all');

// // //   useEffect(() => {
// // //     fetchTrains();
// // //   }, []);

// // //   const fetchTrains = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await trainApi.list();
// // //       setTrains(res.data?.data || res.data || []);
// // //     } catch (err) {
// // //       toast.error("Failed to load trains");
// // //       console.error(err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const filteredTrains = trains
// // //     .filter(train => {
// // //       const matchesSearch =
// // //         train.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         train.number?.includes(searchTerm) ||
// // //         train.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         train.destination?.toLowerCase().includes(searchTerm.toLowerCase());

// // //       const matchesType = filterType === 'all' || train.type === filterType;

// // //       return matchesSearch && matchesType;
// // //     });

// // //   return (
// // //     <div className="min-h-screen bg-gray-950 py-8">
// // //       <div className="max-w-7xl mx-auto px-6">
// // //         {/* Header */}
// // //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
// // //           <div>
// // //             <h1 className="text-4xl font-bold text-white flex items-center gap-3">
// // //               <Train className="text-violet-500" size={36} />
// // //               All Trains
// // //             </h1>
// // //             <p className="text-slate-400 mt-1">Find and book your perfect journey</p>
// // //           </div>

// // //           {isAdmin && (
// // //             <button
// // //               onClick={() => window.location.href = '/admin/trains'} // ya modal open kar sakte ho
// // //               className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-medium flex items-center gap-2"
// // //             >
// // //               Manage Trains (Admin)
// // //             </button>
// // //           )}
// // //         </div>

// // //         {/* Filters */}
// // //         <div className="flex flex-col md:flex-row gap-4 mb-6">
// // //           <div className="relative flex-1">
// // //             <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
// // //             <input
// // //               type="text"
// // //               placeholder="Search by train name, number, source or destination..."
// // //               className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:border-violet-500 text-white"
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //             />
// // //           </div>

// // //           <select
// // //             value={filterType}
// // //             onChange={(e) => setFilterType(e.target.value)}
// // //             className="bg-gray-900 border border-gray-700 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-violet-500"
// // //           >
// // //             <option value="all">All Types</option>
// // //             <option value="express">Express</option>
// // //             <option value="superfast">Superfast</option>
// // //             <option value="rajdhani">Rajdhani</option>
// // //             <option value="shatabdi">Shatabdi</option>
// // //             <option value="mail">Mail</option>
// // //           </select>
// // //         </div>

// // //         {/* Trains Display */}
// // //         {loading ? (
// // //           <div className="text-center py-20">
// // //             <div className="animate-spin w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
// // //             <p className="text-slate-400 mt-4">Loading trains...</p>
// // //           </div>
// // //         ) : filteredTrains.length === 0 ? (
// // //           <div className="text-center py-20 text-slate-400">
// // //             No trains found matching your search.
// // //           </div>
// // //         ) : (
// // //           <div className="grid gap-4">
// // //             {filteredTrains.map((train) => (
// // //               <div
// // //                 key={train._id}
// // //                 className="bg-gray-900 border border-gray-700 rounded-3xl p-6 hover:border-violet-500/50 transition-all duration-300"
// // //               >
// // //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// // //                   {/* Train Info */}
// // //                   <div className="flex-1">
// // //                     <div className="flex items-center gap-4">
// // //                       <div className="bg-gray-800 px-4 py-2 rounded-2xl font-mono font-bold text-xl text-violet-400">
// // //                         {train.number}
// // //                       </div>
// // //                       <div>
// // //                         <h3 className="text-xl font-semibold text-white">{train.name}</h3>
// // //                         <p className="text-slate-400 text-sm">
// // //                           {train.type?.charAt(0).toUpperCase() + train.type?.slice(1)}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Route */}
// // //                   <div className="flex-1 text-center">
// // //                     <div className="flex items-center justify-center gap-3 text-lg">
// // //                       <span className="text-emerald-400 font-medium">{train.sourceCode}</span>
// // //                       <div className="flex-1 h-px bg-gradient-to-r from-emerald-400 via-violet-500 to-violet-400"></div>
// // //                       <MapPin className="text-violet-400" size={20} />
// // //                       <div className="flex-1 h-px bg-gradient-to-r from-violet-400 via-violet-500 to-emerald-400"></div>
// // //                       <span className="text-violet-400 font-medium">{train.destinationCode}</span>
// // //                     </div>
// // //                     <p className="text-sm text-slate-400 mt-1">
// // //                       {train.source} → {train.destination}
// // //                     </p>
// // //                   </div>

// // //                   {/* Time & Duration */}
// // //                   <div className="flex-1 flex flex-col md:items-end gap-2">
// // //                     <div className="flex items-center gap-6 text-sm">
// // //                       <div>
// // //                         <p className="text-slate-400">Departs</p>
// // //                         <p className="font-semibold text-white">{train.departureTime}</p>
// // //                       </div>
// // //                       <div>
// // //                         <p className="text-slate-400">Arrives</p>
// // //                         <p className="font-semibold text-white">{train.arrivalTime}</p>
// // //                       </div>
// // //                     </div>

// // //                     <div className="flex items-center gap-2 text-emerald-400">
// // //                       <Clock size={18} />
// // //                       <span>{train.durationMinutes} mins • {train.distanceKm} km</span>
// // //                     </div>
// // //                   </div>

// // //                   {/* Actions */}
// // //                   <div className="flex flex-col md:flex-row gap-3 md:items-center">
// // //                     {isAdmin ? (
// // //                       <>
// // //                         <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium">
// // //                           Edit
// // //                         </button>
// // //                         <button className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-medium">
// // //                           Delete
// // //                         </button>
// // //                       </>
// // //                     ) : (
// // //                       <button className="px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold transition">
// // //                         Book Now
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Trains;






// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { trainApi } from '../api/endpoints';
// // // import { toast } from 'react-hot-toast';
// // // import { Search, Clock, MapPin, Train, Calendar } from 'lucide-react';

// // // const Trains = ({ isAdmin = false }) => {
// // //   const [trains, setTrains] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [filterType, setFilterType] = useState('all');

// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     fetchTrains();
// // //   }, []);

// // //   const fetchTrains = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await trainApi.list();
// // //       setTrains(res.data?.data || res.data || []);
// // //     } catch (err) {
// // //       toast.error("Failed to load trains");
// // //       console.error(err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const filteredTrains = trains.filter(train => {
// // //     const matchesSearch =
// // //       train.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       train.number?.includes(searchTerm) ||
// // //       train.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       train.destination?.toLowerCase().includes(searchTerm.toLowerCase());

// // //     const matchesType = filterType === 'all' || train.type === filterType;

// // //     return matchesSearch && matchesType;
// // //   });

// // //   const handleBookNow = (train) => {
// // //     const today = new Date().toISOString().slice(0, 10);
// // //     navigate(`/book/${train._id}?from=${train.sourceCode}&to=${train.destinationCode}&date=${today}`);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-950 py-8">
// // //       <div className="max-w-7xl mx-auto px-6">
// // //         {/* Header */}
// // //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
// // //           <div>
// // //             <h1 className="text-4xl font-bold text-white flex items-center gap-3">
// // //               <Train className="text-violet-500" size={36} />
// // //               All Trains
// // //             </h1>
// // //             <p className="text-slate-400 mt-1">Find and book your perfect journey</p>
// // //           </div>

// // //           {isAdmin && (
// // //             <button
// // //               onClick={() => navigate('/admin/trains')}
// // //               className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-medium flex items-center gap-2"
// // //             >
// // //               Manage Trains (Admin)
// // //             </button>
// // //           )}
// // //         </div>

// // //         {/* Filters */}
// // //         <div className="flex flex-col md:flex-row gap-4 mb-6">
// // //           <div className="relative flex-1">
// // //             <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
// // //             <input
// // //               type="text"
// // //               placeholder="Search by train name, number, source or destination..."
// // //               className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:border-violet-500 text-white"
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //             />
// // //           </div>

// // //           <select
// // //             value={filterType}
// // //             onChange={(e) => setFilterType(e.target.value)}
// // //             className="bg-gray-900 border border-gray-700 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-violet-500"
// // //           >
// // //             <option value="all">All Types</option>
// // //             <option value="express">Express</option>
// // //             <option value="superfast">Superfast</option>
// // //             <option value="rajdhani">Rajdhani</option>
// // //             <option value="shatabdi">Shatabdi</option>
// // //             <option value="mail">Mail</option>
// // //           </select>
// // //         </div>

// // //         {/* Trains List */}
// // //         {loading ? (
// // //           <div className="text-center py-20">
// // //             <div className="animate-spin w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
// // //             <p className="text-slate-400 mt-4">Loading trains...</p>
// // //           </div>
// // //         ) : filteredTrains.length === 0 ? (
// // //           <div className="text-center py-20 text-slate-400">
// // //             No trains found matching your search.
// // //           </div>
// // //         ) : (
// // //           <div className="grid gap-4">
// // //             {filteredTrains.map((train) => (
// // //               <div
// // //                 key={train._id}
// // //                 className="bg-gray-900 border border-gray-700 rounded-3xl p-6 hover:border-violet-500/50 transition-all duration-300"
// // //               >
// // //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// // //                   {/* Train Info */}
// // //                   <div className="flex-1">
// // //                     <div className="flex items-center gap-4">
// // //                       <div className="bg-gray-800 px-4 py-2 rounded-2xl font-mono font-bold text-xl text-violet-400">
// // //                         {train.number}
// // //                       </div>
// // //                       <div>
// // //                         <h3 className="text-xl font-semibold text-white">{train.name}</h3>
// // //                         <p className="text-slate-400 text-sm capitalize">
// // //                           {train.type}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Route */}
// // //                   <div className="flex-1 text-center">
// // //                     <div className="flex items-center justify-center gap-3 text-lg">
// // //                       <span className="text-emerald-400 font-medium">{train.sourceCode}</span>
// // //                       <div className="flex-1 h-px bg-gradient-to-r from-emerald-400 via-violet-500 to-violet-400"></div>
// // //                       <MapPin className="text-violet-400" size={20} />
// // //                       <div className="flex-1 h-px bg-gradient-to-r from-violet-400 via-violet-500 to-emerald-400"></div>
// // //                       <span className="text-violet-400 font-medium">{train.destinationCode}</span>
// // //                     </div>
// // //                     <p className="text-sm text-slate-400 mt-1">
// // //                       {train.source} → {train.destination}
// // //                     </p>
// // //                   </div>

// // //                   {/* Time & Duration */}
// // //                   <div className="flex-1 flex flex-col md:items-end gap-2">
// // //                     <div className="flex items-center gap-6 text-sm">
// // //                       <div>
// // //                         <p className="text-slate-400">Departs</p>
// // //                         <p className="font-semibold text-white">{train.departureTime}</p>
// // //                       </div>
// // //                       <div>
// // //                         <p className="text-slate-400">Arrives</p>
// // //                         <p className="font-semibold text-white">{train.arrivalTime}</p>
// // //                       </div>
// // //                     </div>

// // //                     <div className="flex items-center gap-2 text-emerald-400">
// // //                       <Clock size={18} />
// // //                       <span>{train.durationMinutes} mins • {train.distanceKm} km</span>
// // //                     </div>
// // //                   </div>

// // //                   {/* Book Button */}
// // //                   <div>
// // //                     <button
// // //                       onClick={() => handleBookNow(train)}
// // //                       className="px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold transition-all active:scale-95"
// // //                     >
// // //                       Book Now
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Trains;






// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { trainApi } from '../api/endpoints';
// // import { toast } from 'react-hot-toast';
// // import { Search, Clock, MapPin, Train, Calendar } from 'lucide-react';
// // import SeatCalendarModal from '../components/SeatCalendarModal.jsx';

// // const Trains = ({ isAdmin = false }) => {
// //   const [trains, setTrains] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterType, setFilterType] = useState('all');
// //   const [selectedTrain, setSelectedTrain] = useState(null);   // For Seat Calendar

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchTrains();
// //   }, []);

// //   const fetchTrains = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await trainApi.list();
// //       setTrains(res.data?.data || res.data || []);
// //     } catch (err) {
// //       toast.error("Failed to load trains");
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filteredTrains = trains.filter(train => {
// //     const matchesSearch =
// //       train.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       train.number?.includes(searchTerm) ||
// //       train.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       train.destination?.toLowerCase().includes(searchTerm.toLowerCase());

// //     const matchesType = filterType === 'all' || train.type === filterType;

// //     return matchesSearch && matchesType;
// //   });

// //   const handleBookNow = (train) => {
// //     const today = new Date().toISOString().slice(0, 10);
// //     navigate(`/book/${train._id}?from=${train.sourceCode}&to=${train.destinationCode}&date=${today}`);
// //   };

// //   const handleViewSeats = (train) => {
// //     setSelectedTrain(train);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-950 py-8">
// //       <div className="max-w-7xl mx-auto px-6">
// //         {/* Header */}
// //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
// //           <div>
// //             <h1 className="text-4xl font-bold text-white flex items-center gap-3">
// //               <Train className="text-violet-500" size={36} />
// //               All Trains
// //             </h1>
// //             <p className="text-slate-400 mt-1">Find and book your perfect journey</p>
// //           </div>

// //           {isAdmin && (
// //             <button
// //               onClick={() => navigate('/admin/trains')}
// //               className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-medium flex items-center gap-2"
// //             >
// //               Manage Trains (Admin)
// //             </button>
// //           )}
// //         </div>

// //         {/* Filters */}
// //         <div className="flex flex-col md:flex-row gap-4 mb-6">
// //           <div className="relative flex-1">
// //             <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
// //             <input
// //               type="text"
// //               placeholder="Search by train name, number, source or destination..."
// //               className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:border-violet-500 text-white"
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //             />
// //           </div>

// //           <select
// //             value={filterType}
// //             onChange={(e) => setFilterType(e.target.value)}
// //             className="bg-gray-900 border border-gray-700 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-violet-500"
// //           >
// //             <option value="all">All Types</option>
// //             <option value="express">Express</option>
// //             <option value="superfast">Superfast</option>
// //             <option value="rajdhani">Rajdhani</option>
// //             <option value="shatabdi">Shatabdi</option>
// //             <option value="mail">Mail</option>
// //           </select>
// //         </div>

// //         {/* Trains List */}
// //         {loading ? (
// //           <div className="text-center py-20">
// //             <div className="animate-spin w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
// //             <p className="text-slate-400 mt-4">Loading trains...</p>
// //           </div>
// //         ) : filteredTrains.length === 0 ? (
// //           <div className="text-center py-20 text-slate-400">
// //             No trains found matching your search.
// //           </div>
// //         ) : (
// //           <div className="grid gap-4">
// //             {filteredTrains.map((train) => (
// //               <div
// //                 key={train._id}
// //                 className="bg-gray-900 border border-gray-700 rounded-3xl p-6 hover:border-violet-500/50 transition-all duration-300"
// //               >
// //                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// //                   {/* Train Info */}
// //                   <div className="flex-1">
// //                     <div className="flex items-center gap-4">
// //                       <div className="bg-gray-800 px-4 py-2 rounded-2xl font-mono font-bold text-xl text-violet-400">
// //                         {train.number}
// //                       </div>
// //                       <div>
// //                         <h3 className="text-xl font-semibold text-white">{train.name}</h3>
// //                         <p className="text-slate-400 text-sm capitalize">
// //                           {train.type}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Route */}
// //                   <div className="flex-1 text-center">
// //                     <div className="flex items-center justify-center gap-3 text-lg">
// //                       <span className="text-emerald-400 font-medium">{train.sourceCode}</span>
// //                       <div className="flex-1 h-px bg-gradient-to-r from-emerald-400 via-violet-500 to-violet-400"></div>
// //                       <MapPin className="text-violet-400" size={20} />
// //                       <div className="flex-1 h-px bg-gradient-to-r from-violet-400 via-violet-500 to-emerald-400"></div>
// //                       <span className="text-violet-400 font-medium">{train.destinationCode}</span>
// //                     </div>
// //                     <p className="text-sm text-slate-400 mt-1">
// //                       {train.source} → {train.destination}
// //                     </p>
// //                   </div>

// //                   {/* Time & Duration */}
// //                   <div className="flex-1 flex flex-col md:items-end gap-2">
// //                     <div className="flex items-center gap-6 text-sm">
// //                       <div>
// //                         <p className="text-slate-400">Departs</p>
// //                         <p className="font-semibold text-white">{train.departureTime}</p>
// //                       </div>
// //                       <div>
// //                         <p className="text-slate-400">Arrives</p>
// //                         <p className="font-semibold text-white">{train.arrivalTime}</p>
// //                       </div>
// //                     </div>

// //                     <div className="flex items-center gap-2 text-emerald-400">
// //                       <Clock size={18} />
// //                       <span>{train.durationMinutes} mins • {train.distanceKm} km</span>
// //                     </div>
// //                   </div>

// //                   {/* Actions */}
// //                   <div className="flex flex-col sm:flex-row gap-3">
// //                     <button
// //                       onClick={() => handleViewSeats(train)}
// //                       className="px-6 py-3 border border-violet-500 text-violet-400 hover:bg-violet-500/10 rounded-2xl text-sm font-medium flex items-center gap-2 transition"
// //                     >
// //                       <Calendar size={18} /> View Seats
// //                     </button>

// //                     <button
// //                       onClick={() => handleBookNow(train)}
// //                       className="px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold transition-all active:scale-95"
// //                     >
// //                       Book Now
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {/* Seat Calendar Modal */}
// //       <SeatCalendarModal 
// //         train={selectedTrain} 
// //         isOpen={!!selectedTrain} 
// //         onClose={() => setSelectedTrain(null)} 
// //       />
// //     </div>
// //   );
// // };

// // export default Trains;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { trainApi } from '../api/endpoints';
// import { toast } from 'react-hot-toast';
// import { Search, Clock, MapPin, Train, Calendar } from 'lucide-react';
// import SeatCalendarModal from '../components/SeatCalendarModal.jsx';

// const Trains = ({ isAdmin = false }) => {
//   const [trains, setTrains] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [selectedTrain, setSelectedTrain] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTrains();
//   }, []);

//   const fetchTrains = async () => {
//     try {
//       setLoading(true);
//       const res = await trainApi.list();
//       setTrains(res.data?.data || res.data || []);
//     } catch (err) {
//       toast.error("Failed to load trains");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredTrains = trains.filter(train => {
//     const matchesSearch =
//       train.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       train.number?.includes(searchTerm) ||
//       train.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       train.destination?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesType = filterType === 'all' || train.type === filterType;

//     return matchesSearch && matchesType;
//   });

//   const handleBookNow = (train) => {
//     const today = new Date().toISOString().slice(0, 10);
//     navigate(`/book/${train._id}?from=${train.sourceCode}&to=${train.destinationCode}&date=${today}`);
//   };

//   const handleViewSeats = (train) => {
//     setSelectedTrain(train);
//   };

//   const handleTatkal = (train) => {
//     navigate(`/tatkal/${train._id}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 py-8">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//           <div>
//             <h1 className="text-4xl font-bold text-white flex items-center gap-3">
//               <Train className="text-violet-500" size={36} />
//               All Trains
//             </h1>
//             <p className="text-slate-400 mt-1">Find and book your perfect journey</p>
//           </div>

//           {isAdmin && (
//             <button
//               onClick={() => navigate('/admin/trains')}
//               className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-medium flex items-center gap-2"
//             >
//               Manage Trains (Admin)
//             </button>
//           )}
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="relative flex-1">
//             <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search by train name, number, source or destination..."
//               className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:border-violet-500 text-white"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="bg-gray-900 border border-gray-700 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-violet-500"
//           >
//             <option value="all">All Types</option>
//             <option value="express">Express</option>
//             <option value="superfast">Superfast</option>
//             <option value="rajdhani">Rajdhani</option>
//             <option value="shatabdi">Shatabdi</option>
//             <option value="mail">Mail</option>
//           </select>
//         </div>

//         {/* Trains List */}
//         {loading ? (
//           <div className="text-center py-20">
//             <div className="animate-spin w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
//             <p className="text-slate-400 mt-4">Loading trains...</p>
//           </div>
//         ) : filteredTrains.length === 0 ? (
//           <div className="text-center py-20 text-slate-400">
//             No trains found matching your search.
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {filteredTrains.map((train) => (
//               <div
//                 key={train._id}
//                 className="bg-gray-900 border border-gray-700 rounded-3xl p-6 hover:border-violet-500/50 transition-all duration-300"
//               >
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-4">
//                       <div className="bg-gray-800 px-4 py-2 rounded-2xl font-mono font-bold text-xl text-violet-400">
//                         {train.number}
//                       </div>
//                       <div>
//                         <h3 className="text-xl font-semibold text-white">{train.name}</h3>
//                         <p className="text-slate-400 text-sm capitalize">{train.type}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex-1 text-center">
//                     <div className="flex items-center justify-center gap-3 text-lg">
//                       <span className="text-emerald-400 font-medium">{train.sourceCode}</span>
//                       <div className="flex-1 h-px bg-gradient-to-r from-emerald-400 via-violet-500 to-violet-400"></div>
//                       <MapPin className="text-violet-400" size={20} />
//                       <div className="flex-1 h-px bg-gradient-to-r from-violet-400 via-violet-500 to-emerald-400"></div>
//                       <span className="text-violet-400 font-medium">{train.destinationCode}</span>
//                     </div>
//                     <p className="text-sm text-slate-400 mt-1">
//                       {train.source} → {train.destination}
//                     </p>
//                   </div>

//                   <div className="flex-1 flex flex-col md:items-end gap-2">
//                     <div className="flex items-center gap-6 text-sm">
//                       <div>
//                         <p className="text-slate-400">Departs</p>
//                         <p className="font-semibold text-white">{train.departureTime}</p>
//                       </div>
//                       <div>
//                         <p className="text-slate-400">Arrives</p>
//                         <p className="font-semibold text-white">{train.arrivalTime}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2 text-emerald-400">
//                       <Clock size={18} />
//                       <span>{train.durationMinutes} mins • {train.distanceKm} km</span>
//                     </div>
//                   </div>

//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <button
//                       onClick={() => handleViewSeats(train)}
//                       className="px-6 py-3 border border-violet-500 text-violet-400 hover:bg-violet-500/10 rounded-2xl text-sm font-medium flex items-center gap-2 transition"
//                     >
//                       <Calendar size={18} /> View Seats
//                     </button>

//                     <button
//                       onClick={() => handleTatkal(train)}
//                       className="px-5 py-3 bg-amber-600 hover:bg-amber-500 rounded-2xl text-sm font-semibold flex items-center gap-2"
//                     >
//                       ⚡ Tatkal
//                     </button>

//                     <button
//                       onClick={() => handleBookNow(train)}
//                       className="px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold transition-all active:scale-95"
//                     >
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <SeatCalendarModal 
//         train={selectedTrain} 
//         isOpen={!!selectedTrain} 
//         onClose={() => setSelectedTrain(null)} 
//       />
//     </div>
//   );
// };

// export default Trains;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trainApi } from '../api/endpoints';
import { toast } from 'react-hot-toast';
import { Search, Clock, MapPin, Train, Calendar, Zap, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SeatCalendarModal from '../components/SeatCalendarModal.jsx';

// ─── Train type badge colors (UI only) ───────────────────────────────────────
const TYPE_STYLES = {
  rajdhani:   'bg-amber-500/15  text-amber-400  border-amber-500/25',
  shatabdi:   'bg-sky-500/15    text-sky-400    border-sky-500/25',
  superfast:  'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  express:    'bg-violet-500/15 text-violet-400  border-violet-500/25',
  mail:       'bg-slate-500/15  text-slate-400  border-slate-500/25',
};
const typeStyle = (t) => TYPE_STYLES[t?.toLowerCase()] ?? TYPE_STYLES.express;

// ─── Skeleton card (UI only) ──────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-[#151D2D] border border-white/[0.06] rounded-3xl p-6 animate-pulse">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-10 bg-white/[0.06] rounded-xl" />
        <div className="space-y-2">
          <div className="h-5 w-36 bg-white/[0.06] rounded-lg" />
          <div className="h-3 w-20 bg-white/[0.04] rounded-lg" />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-4">
        <div className="h-4 w-12 bg-white/[0.06] rounded" />
        <div className="flex-1 h-px bg-white/[0.06]" />
        <div className="h-4 w-12 bg-white/[0.06] rounded" />
      </div>
      <div className="flex gap-4 items-center">
        <div className="w-16 h-10 bg-white/[0.06] rounded-xl" />
        <div className="w-16 h-10 bg-white/[0.06] rounded-xl" />
      </div>
      <div className="flex gap-2 ml-auto">
        <div className="w-28 h-10 bg-white/[0.06] rounded-2xl" />
        <div className="w-20 h-10 bg-white/[0.06] rounded-2xl" />
        <div className="w-28 h-10 bg-white/[0.06] rounded-2xl" />
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
// ALL STATE, HOOKS, FUNCTIONS, API CALLS — COMPLETELY UNCHANGED
const Trains = ({ isAdmin = false }) => {
  const [trains, setTrains]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const [searchTerm, setSearchTerm]     = useState('');
  const [filterType, setFilterType]     = useState('all');
  const [selectedTrain, setSelectedTrain] = useState(null);

  const navigate = useNavigate();

  useEffect(() => { fetchTrains(); }, []);

  // ── ALL LOGIC UNCHANGED ────────────────────────────────────────────────────
  const fetchTrains = async () => {
    try {
      setLoading(true);
      const res = await trainApi.list();
      setTrains(res.data?.data || res.data || []);
    } catch (err) {
      toast.error("Failed to load trains");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrains = trains.filter(train => {
    const matchesSearch =
      train.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      train.number?.includes(searchTerm) ||
      train.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      train.destination?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || train.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleBookNow = (train) => {
    const today = new Date().toISOString().slice(0, 10);
    navigate(`/book/${train._id}?from=${train.sourceCode}&to=${train.destinationCode}&date=${today}`);
  };

  const handleViewSeats  = (train) => setSelectedTrain(train);
  const handleTatkal     = (train) => navigate(`/tatkal/${train._id}`);

  // ─── UI ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0B1120] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-11 h-11 rounded-2xl bg-violet-500/15 border border-violet-500/25
                              flex items-center justify-center">
                <Train className="text-violet-400" size={22} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                All Trains
              </h1>
            </div>
            <p className="text-slate-400 text-sm ml-14">
              Find and book your perfect journey
            </p>
            {/* Stat chips — UI-only, no backend */}
            <div className="flex flex-wrap gap-2 mt-4 ml-1">
              {[
                { label: 'Total', val: trains.length, color: 'violet' },
              ].map(({ label, val, color }) => (
                <span key={label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                    bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>
                  <span className={`w-1.5 h-1.5 rounded-full bg-${color}-400`} />
                  {val} {label}
                </span>
              ))}
            </div>
          </div>

          {isAdmin && (
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/admin/trains')}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500
                         px-5 py-2.5 rounded-xl font-medium text-sm transition-colors
                         shadow-lg shadow-violet-900/30"
            >
              Manage Trains <ChevronRight size={16} />
            </motion.button>
          )}
        </motion.div>

        {/* ── Search & Filter Panel ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-8 p-3
                     bg-[#151D2D]/80 backdrop-blur-sm border border-white/[0.06]
                     rounded-2xl shadow-xl shadow-black/20"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={17} />
            <input
              type="text"
              placeholder="Train name, number, source or destination..."
              className="w-full pl-11 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.06]
                         rounded-xl focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/[0.03]
                         text-white text-sm placeholder-slate-500 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter select — styled with CSS, logic unchanged */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none bg-white/[0.04] border border-white/[0.06] rounded-xl
                         pl-4 pr-10 py-2.5 text-sm text-slate-200 focus:outline-none
                         focus:border-violet-500/50 transition-all duration-200 min-w-[160px] cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="express">Express</option>
              <option value="superfast">Superfast</option>
              <option value="rajdhani">Rajdhani</option>
              <option value="shatabdi">Shatabdi</option>
              <option value="mail">Mail</option>
            </select>
            <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
          </div>
        </motion.div>

        {/* ── States ───────────────────────────────────────────────────────── */}
        {loading ? (
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredTrains.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-white/[0.04] border border-white/[0.06]
                            flex items-center justify-center mb-5">
              <Train size={32} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No trains found</h3>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              No trains match your search. Try a different name, number, or route.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setFilterType('all'); }}
              className="mt-6 px-5 py-2.5 rounded-xl bg-violet-600/20 text-violet-400
                         border border-violet-500/25 text-sm font-medium hover:bg-violet-600/30 transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          /* ── Train cards ──────────────────────────────────────────────── */
          <div className="grid gap-4">
            <AnimatePresence>
              {filteredTrains.map((train, idx) => (
                <motion.div
                  key={train._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  whileHover={{ y: -2 }}
                  className="group bg-[#151D2D] border border-white/[0.06] rounded-3xl p-6
                             hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-900/10
                             transition-all duration-300 cursor-default"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">

                    {/* Train number + name */}
                    <div className="flex items-center gap-4 min-w-0 lg:w-56">
                      <div className="bg-gradient-to-br from-violet-600/20 to-violet-900/20
                                      border border-violet-500/25 px-3.5 py-2 rounded-xl
                                      font-mono font-bold text-violet-300 text-base tracking-wider flex-shrink-0">
                        {train.number}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[15px] font-semibold text-white truncate leading-tight">
                          {train.name}
                        </h3>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px]
                                          font-semibold border capitalize ${typeStyle(train.type)}`}>
                          {train.type}
                        </span>
                      </div>
                    </div>

                    {/* Route visualization */}
                    <div className="flex-1 flex flex-col items-center text-center px-2 w-full lg:w-auto">
                      <div className="flex items-center gap-2 w-full max-w-xs">
                        {/* Source */}
                        <div className="text-right min-w-[48px]">
                          <p className="text-emerald-400 font-bold text-base tracking-wide">{train.sourceCode}</p>
                        </div>

                        {/* Route line */}
                        <div className="flex-1 flex items-center gap-1">
                          <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/60 to-violet-500/30" />
                          <div className="relative flex-shrink-0">
                            <div className="w-6 h-6 rounded-full bg-[#0B1120] border border-violet-500/50
                                            flex items-center justify-center">
                              <MapPin size={11} className="text-violet-400" />
                            </div>
                          </div>
                          <div className="flex-1 h-px bg-gradient-to-r from-violet-500/30 to-violet-500/60" />
                        </div>

                        {/* Destination */}
                        <div className="text-left min-w-[48px]">
                          <p className="text-violet-400 font-bold text-base tracking-wide">{train.destinationCode}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                        <span>{train.source}</span>
                        <ArrowRight size={9} className="text-slate-600" />
                        <span>{train.destination}</span>
                      </p>
                    </div>

                    {/* Timings */}
                    <div className="flex items-center gap-5 lg:w-52 flex-shrink-0">
                      <div className="text-center">
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mb-0.5">Departs</p>
                        <p className="text-white font-semibold text-base">{train.departureTime}</p>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <Clock size={12} className="text-emerald-400" />
                        <p className="text-[10px] text-emerald-400 font-medium whitespace-nowrap">
                          {train.durationMinutes}m
                        </p>
                        <p className="text-[10px] text-slate-500">{train.distanceKm}km</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mb-0.5">Arrives</p>
                        <p className="text-white font-semibold text-base">{train.arrivalTime}</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap sm:flex-nowrap gap-2 lg:flex-shrink-0 w-full lg:w-auto">
                      {/* View Seats */}
                      <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleViewSeats(train)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2
                                   px-4 py-2.5 rounded-xl text-sm font-medium
                                   border border-violet-500/30 text-violet-400
                                   hover:bg-violet-500/10 hover:border-violet-500/50 transition-all"
                      >
                        <Calendar size={15} /> Seats
                      </motion.button>

                      {/* Tatkal */}
                      <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleTatkal(train)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2
                                   px-4 py-2.5 rounded-xl text-sm font-semibold
                                   bg-gradient-to-r from-amber-600 to-orange-500
                                   hover:from-amber-500 hover:to-orange-400
                                   text-white shadow-md shadow-amber-900/30 transition-all"
                      >
                        <Zap size={14} /> Tatkal
                      </motion.button>

                      {/* Book Now */}
                      <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleBookNow(train)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2
                                   px-5 py-2.5 rounded-xl text-sm font-semibold
                                   bg-gradient-to-r from-violet-600 to-violet-500
                                   hover:from-violet-500 hover:to-violet-400
                                   text-white shadow-md shadow-violet-900/30 transition-all"
                      >
                        Book Now <ArrowRight size={14} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
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
};

export default Trains;