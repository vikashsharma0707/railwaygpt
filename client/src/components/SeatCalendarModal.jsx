// import { useState, useEffect } from 'react';
// import { X, Calendar } from 'lucide-react';
// import { trainApi } from '../api/endpoints';

// export default function SeatCalendarModal({ train, isOpen, onClose }) {
//   const [availability, setAvailability] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (isOpen && train?._id) {
//       fetchAvailability();
//     }
//   }, [isOpen, train]);

//   const fetchAvailability = async () => {
//     setLoading(true);
//     try {
//       // Backend endpoint ready hone tak mock data use kar rahe hain
//       const mockData = generateMockSeatData(train);
//       setAvailability(mockData);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (available, total) => {
//     const percentage = (available / total) * 100;
//     if (percentage > 60) return 'bg-emerald-500 text-white';
//     if (percentage > 25) return 'bg-amber-500 text-white';
//     return 'bg-red-500 text-white';
//   };

//   if (!isOpen || !train) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//       <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-700 flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold">{train.name} • #{train.number}</h2>
//             <p className="text-slate-400">{train.sourceCode} → {train.destinationCode}</p>
//           </div>
//           <button onClick={onClose} className="text-slate-400 hover:text-white">
//             <X size={28} />
//           </button>
//         </div>

//         {/* Calendar Grid */}
//         <div className="p-6 overflow-auto max-h-[calc(92vh-140px)]">
//           {loading ? (
//             <div className="text-center py-20">
//               <div className="animate-spin w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
//               <p className="mt-4 text-slate-400">Loading seat availability...</p>
//             </div>
//           ) : (
//             <div>
//               <div className="grid grid-cols-7 gap-3 text-center mb-4">
//                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
//                   <div key={d} className="text-xs font-medium text-slate-400 py-2">{d}</div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-7 gap-3">
//                 {availability.map((day, index) => (
//                   <div key={index} className="border border-gray-700 rounded-2xl p-3 hover:border-violet-500 transition-all bg-gray-950">
//                     <div className="text-sm font-semibold mb-3">
//                       {new Date(day.date).getDate()} {new Date(day.date).toLocaleString('default', { month: 'short' })}
//                     </div>

//                     <div className="space-y-2">
//                       {day.classes.map((cls, i) => (
//                         <div key={i} className={`text-xs px-3 py-2 rounded-xl font-medium ${getStatusColor(cls.available, cls.total)}`}>
//                           {cls.class} • {cls.available}/{cls.total}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Legend */}
//         <div className="p-6 border-t border-gray-700 flex flex-wrap gap-6 text-sm">
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-emerald-500 rounded"></div>
//             <span>High Availability</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-amber-500 rounded"></div>
//             <span>Moderate</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-red-500 rounded"></div>
//             <span>Low / Waiting List</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Mock Data (Backend ready hone tak)
// const generateMockSeatData = (train) => {
//   const data = [];
//   const today = new Date();

//   for (let i = 0; i < 35; i++) {
//     const date = new Date(today);
//     date.setDate(date.getDate() + i);

//     data.push({
//       date: date.toISOString().split('T')[0],
//       classes: train.inventory?.map(inv => ({
//         class: inv.class,
//         available: Math.floor(Math.random() * (inv.totalSeats - 20)) + 10,
//         total: inv.totalSeats
//       })) || []
//     });
//   }
//   return data;
// };




import { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';

export default function SeatCalendarModal({ train, isOpen, onClose }) {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && train) {
      generateRealAvailability();
    }
  }, [isOpen, train]);

  const generateRealAvailability = () => {
    setLoading(true);
    const data = [];
    const today = new Date();

    for (let i = 0; i < 35; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      const dayName = date.toLocaleString('en-US', { weekday: 'short' });

      // Check if train runs on this day
      const runsToday = train.runningDays?.includes(dayName) ?? true;

      const dayData = {
        date: date.toISOString().split('T')[0],
        runsToday,
        classes: train.inventory?.map(inv => ({
          class: inv.class,
          available: inv.availableSeats || 0,
          total: inv.totalSeats || 0,
          fare: inv.fare || 0
        })) || []
      };

      data.push(dayData);
    }

    setAvailability(data);
    setLoading(false);
  };

  const getStatusColor = (available, total) => {
    if (!total) return 'bg-gray-500';
    const percentage = (available / total) * 100;
    if (percentage > 60) return 'bg-emerald-500 text-white';
    if (percentage > 25) return 'bg-amber-500 text-white';
    return 'bg-red-500 text-white';
  };

  if (!isOpen || !train) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{train.name} • #{train.number}</h2>
            <p className="text-slate-400">{train.sourceCode} → {train.destinationCode}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={28} />
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(92vh-140px)]">
          {loading ? (
            <div className="text-center py-20">Loading seat availability...</div>
          ) : (
            <div>
              <div className="grid grid-cols-7 gap-2 text-center mb-4 text-xs text-slate-400">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-3">
                {availability.map((day, index) => (
                  <div key={index} className="border border-gray-700 rounded-2xl p-3 hover:border-violet-500 transition-all">
                    <div className="text-sm font-semibold mb-3">
                      {new Date(day.date).getDate()} {new Date(day.date).toLocaleString('default', { month: 'short' })}
                    </div>

                    {!day.runsToday ? (
                      <div className="text-red-400 text-xs py-6">Train does not run</div>
                    ) : (
                      <div className="space-y-2">
                        {day.classes.map((cls, i) => (
                          <div key={i} className={`text-xs px-3 py-2 rounded-xl font-medium ${getStatusColor(cls.available, cls.total)}`}>
                            {cls.class} • {cls.available}/{cls.total}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="p-6 border-t border-gray-700 flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-500 rounded"></div> High Availability
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 rounded"></div> Moderate
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div> Low / Waiting List
          </div>
        </div>
      </div>
    </div>
  );
}