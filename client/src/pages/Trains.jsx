// import React, { useState, useEffect } from 'react';
// import { trainApi } from '../api/endpoints';
// import { toast } from 'react-hot-toast';
// import { Search, Clock, MapPin, Train, Calendar } from 'lucide-react';

// const Trains = ({ isAdmin = false }) => {
//   const [trains, setTrains] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');

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

//   const filteredTrains = trains
//     .filter(train => {
//       const matchesSearch =
//         train.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         train.number?.includes(searchTerm) ||
//         train.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         train.destination?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesType = filterType === 'all' || train.type === filterType;

//       return matchesSearch && matchesType;
//     });

//   return (
//     <div className="min-h-screen bg-gray-950 py-8">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Header */}
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
//               onClick={() => window.location.href = '/admin/trains'} // ya modal open kar sakte ho
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

//         {/* Trains Display */}
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
//                   {/* Train Info */}
//                   <div className="flex-1">
//                     <div className="flex items-center gap-4">
//                       <div className="bg-gray-800 px-4 py-2 rounded-2xl font-mono font-bold text-xl text-violet-400">
//                         {train.number}
//                       </div>
//                       <div>
//                         <h3 className="text-xl font-semibold text-white">{train.name}</h3>
//                         <p className="text-slate-400 text-sm">
//                           {train.type?.charAt(0).toUpperCase() + train.type?.slice(1)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Route */}
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

//                   {/* Time & Duration */}
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

//                   {/* Actions */}
//                   <div className="flex flex-col md:flex-row gap-3 md:items-center">
//                     {isAdmin ? (
//                       <>
//                         <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium">
//                           Edit
//                         </button>
//                         <button className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-medium">
//                           Delete
//                         </button>
//                       </>
//                     ) : (
//                       <button className="px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold transition">
//                         Book Now
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Trains;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { trainApi } from '../api/endpoints';
// import { toast } from 'react-hot-toast';
// import { Search, Clock, MapPin, Train, Calendar } from 'lucide-react';

// const Trains = ({ isAdmin = false }) => {
//   const [trains, setTrains] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');

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

//   return (
//     <div className="min-h-screen bg-gray-950 py-8">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Header */}
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
//                   {/* Train Info */}
//                   <div className="flex-1">
//                     <div className="flex items-center gap-4">
//                       <div className="bg-gray-800 px-4 py-2 rounded-2xl font-mono font-bold text-xl text-violet-400">
//                         {train.number}
//                       </div>
//                       <div>
//                         <h3 className="text-xl font-semibold text-white">{train.name}</h3>
//                         <p className="text-slate-400 text-sm capitalize">
//                           {train.type}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Route */}
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

//                   {/* Time & Duration */}
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

//                   {/* Book Button */}
//                   <div>
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
//     </div>
//   );
// };

// export default Trains;






import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trainApi } from '../api/endpoints';
import { toast } from 'react-hot-toast';
import { Search, Clock, MapPin, Train, Calendar } from 'lucide-react';
import SeatCalendarModal from '../components/SeatCalendarModal.jsx';

const Trains = ({ isAdmin = false }) => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedTrain, setSelectedTrain] = useState(null);   // For Seat Calendar

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrains();
  }, []);

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

  const handleViewSeats = (train) => {
    setSelectedTrain(train);
  };

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <Train className="text-violet-500" size={36} />
              All Trains
            </h1>
            <p className="text-slate-400 mt-1">Find and book your perfect journey</p>
          </div>

          {isAdmin && (
            <button
              onClick={() => navigate('/admin/trains')}
              className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-medium flex items-center gap-2"
            >
              Manage Trains (Admin)
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by train name, number, source or destination..."
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:border-violet-500 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-violet-500"
          >
            <option value="all">All Types</option>
            <option value="express">Express</option>
            <option value="superfast">Superfast</option>
            <option value="rajdhani">Rajdhani</option>
            <option value="shatabdi">Shatabdi</option>
            <option value="mail">Mail</option>
          </select>
        </div>

        {/* Trains List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-slate-400 mt-4">Loading trains...</p>
          </div>
        ) : filteredTrains.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            No trains found matching your search.
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredTrains.map((train) => (
              <div
                key={train._id}
                className="bg-gray-900 border border-gray-700 rounded-3xl p-6 hover:border-violet-500/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  {/* Train Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-800 px-4 py-2 rounded-2xl font-mono font-bold text-xl text-violet-400">
                        {train.number}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{train.name}</h3>
                        <p className="text-slate-400 text-sm capitalize">
                          {train.type}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex-1 text-center">
                    <div className="flex items-center justify-center gap-3 text-lg">
                      <span className="text-emerald-400 font-medium">{train.sourceCode}</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-emerald-400 via-violet-500 to-violet-400"></div>
                      <MapPin className="text-violet-400" size={20} />
                      <div className="flex-1 h-px bg-gradient-to-r from-violet-400 via-violet-500 to-emerald-400"></div>
                      <span className="text-violet-400 font-medium">{train.destinationCode}</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">
                      {train.source} → {train.destination}
                    </p>
                  </div>

                  {/* Time & Duration */}
                  <div className="flex-1 flex flex-col md:items-end gap-2">
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <p className="text-slate-400">Departs</p>
                        <p className="font-semibold text-white">{train.departureTime}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Arrives</p>
                        <p className="font-semibold text-white">{train.arrivalTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-emerald-400">
                      <Clock size={18} />
                      <span>{train.durationMinutes} mins • {train.distanceKm} km</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleViewSeats(train)}
                      className="px-6 py-3 border border-violet-500 text-violet-400 hover:bg-violet-500/10 rounded-2xl text-sm font-medium flex items-center gap-2 transition"
                    >
                      <Calendar size={18} /> View Seats
                    </button>

                    <button
                      onClick={() => handleBookNow(train)}
                      className="px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold transition-all active:scale-95"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seat Calendar Modal */}
      <SeatCalendarModal 
        train={selectedTrain} 
        isOpen={!!selectedTrain} 
        onClose={() => setSelectedTrain(null)} 
      />
    </div>
  );
};

export default Trains;