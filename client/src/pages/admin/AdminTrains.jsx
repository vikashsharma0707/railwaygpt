// // // // import { useEffect, useState } from 'react';
// // // // import toast from 'react-hot-toast';
// // // // import { trainApi } from '../../api/endpoints';

// // // // export default function AdminTrains() {
// // // //   const [list, setList] = useState([]);
// // // //   const reload = () => trainApi.list().then((r) => setList(r.data.data));
// // // //   useEffect(() => { reload(); }, []);
// // // //   const remove = async (id) => { if (!confirm('Delete train?')) return; await trainApi.remove(id); toast.success('Deleted'); reload(); };
// // // //   return (
// // // //     <div className="max-w-7xl mx-auto px-4 py-10">
// // // //       <h1 className="text-2xl font-bold">Trains</h1>
// // // //       <div className="card mt-6 overflow-auto">
// // // //         <table className="w-full text-sm">
// // // //           <thead className="text-slate-400"><tr><th className="text-left">#</th><th className="text-left">Name</th><th>From</th><th>To</th><th>Status</th><th></th></tr></thead>
// // // //           <tbody>
// // // //             {list.map((t) => (
// // // //               <tr key={t._id} className="border-t border-white/5">
// // // //                 <td className="py-2">{t.number}</td><td>{t.name}</td><td className="text-center">{t.sourceCode}</td><td className="text-center">{t.destinationCode}</td>
// // // //                 <td className="text-center"><span className="chip">{t.status}</span></td>
// // // //                 <td className="text-right"><button onClick={() => remove(t._id)} className="btn-danger">Delete</button></td>
// // // //               </tr>
// // // //             ))}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }



// // // import React, { useState, useEffect } from 'react';
// // // import { trainApi } from '../../api/endpoints';
// // // import { toast } from 'react-hot-toast';
// // // import { Plus, Edit2, Trash2, Search, RefreshCw } from 'lucide-react';

// // // const AdminTrains = () => {
// // //   const [trains, setTrains] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [editingTrain, setEditingTrain] = useState(null);

// // //   const [formData, setFormData] = useState({
// // //     number: '',
// // //     name: '',
// // //     type: 'express',
// // //     source: '',
// // //     sourceCode: '',
// // //     destination: '',
// // //     destinationCode: '',
// // //     departureTime: '',
// // //     arrivalTime: '',
// // //     durationMinutes: '',
// // //     distanceKm: '',
// // //     runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
// // //     pantry: true,
// // //     inventory: [
// // //       { class: '3A', totalSeats: 240, availableSeats: 200, fare: 1800 },
// // //       { class: '2A', totalSeats: 120, availableSeats: 80, fare: 2800 },
// // //       { class: '1A', totalSeats: 30, availableSeats: 15, fare: 4500 },
// // //     ]
// // //   });

// // //   useEffect(() => {
// // //     fetchTrains();
// // //   }, []);

// // //   const fetchTrains = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await trainApi.list();
// // //       setTrains(res.data.data || res.data);
// // //     } catch (err) {
// // //       toast.error("Failed to load trains");
// // //       console.error(err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const filteredTrains = trains.filter(train =>
// // //     train.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     train.number?.includes(searchTerm) ||
// // //     train.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     train.destination?.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     const payload = {
// // //       ...formData,
// // //       durationMinutes: Number(formData.durationMinutes),
// // //       distanceKm: Number(formData.distanceKm),
// // //       sourceCode: formData.sourceCode || formData.source?.slice(0, 3).toUpperCase(),
// // //       destinationCode: formData.destinationCode || formData.destination?.slice(0, 3).toUpperCase(),
// // //     };

// // //     try {
// // //       if (editingTrain) {
// // //         await trainApi.update(editingTrain._id, payload);
// // //         toast.success("Train updated successfully");
// // //       } else {
// // //         await trainApi.create(payload);
// // //         toast.success("Train added successfully");
// // //       }
// // //       setShowModal(false);
// // //       setEditingTrain(null);
// // //       resetForm();
// // //       fetchTrains();
// // //     } catch (err) {
// // //       toast.error(err.response?.data?.message || "Something went wrong");
// // //     }
// // //   };

// // //   const handleEdit = (train) => {
// // //     setEditingTrain(train);
// // //     setFormData({
// // //       number: train.number,
// // //       name: train.name,
// // //       type: train.type,
// // //       source: train.source,
// // //       sourceCode: train.sourceCode,
// // //       destination: train.destination,
// // //       destinationCode: train.destinationCode,
// // //       departureTime: train.departureTime,
// // //       arrivalTime: train.arrivalTime,
// // //       durationMinutes: train.durationMinutes,
// // //       distanceKm: train.distanceKm,
// // //       runningDays: train.runningDays || ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
// // //       pantry: train.pantry,
// // //       inventory: train.inventory || formData.inventory,
// // //     });
// // //     setShowModal(true);
// // //   };

// // //   const handleDelete = async (id) => {
// // //     if (!window.confirm("Are you sure you want to delete this train?")) return;
    
// // //     try {
// // //       await trainApi.remove(id);
// // //       toast.success("Train deleted");
// // //       fetchTrains();
// // //     } catch (err) {
// // //       toast.error("Failed to delete train");
// // //     }
// // //   };

// // //   const resetForm = () => {
// // //     setFormData({
// // //       number: '',
// // //       name: '',
// // //       type: 'express',
// // //       source: '',
// // //       sourceCode: '',
// // //       destination: '',
// // //       destinationCode: '',
// // //       departureTime: '',
// // //       arrivalTime: '',
// // //       durationMinutes: '',
// // //       distanceKm: '',
// // //       runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
// // //       pantry: true,
// // //       inventory: [
// // //         { class: '3A', totalSeats: 240, availableSeats: 200, fare: 1800 },
// // //         { class: '2A', totalSeats: 120, availableSeats: 80, fare: 2800 },
// // //         { class: '1A', totalSeats: 30, availableSeats: 15, fare: 4500 },
// // //       ]
// // //     });
// // //   };

// // //   return (
// // //     <div className="p-6 max-w-7xl mx-auto">
// // //       <div className="flex justify-between items-center mb-8">
// // //         <h1 className="text-3xl font-bold">Train Management</h1>
// // //         <div className="flex gap-3">
// // //           <button
// // //             onClick={fetchTrains}
// // //             className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
// // //           >
// // //             <RefreshCw size={18} /> Refresh
// // //           </button>
// // //           <button
// // //             onClick={() => { resetForm(); setEditingTrain(null); setShowModal(true); }}
// // //             className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg font-medium transition"
// // //           >
// // //             <Plus size={20} /> Add New Train
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Search */}
// // //       <div className="relative mb-6">
// // //         <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
// // //         <input
// // //           type="text"
// // //           placeholder="Search by train name, number, source or destination..."
// // //           className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:border-violet-500"
// // //           value={searchTerm}
// // //           onChange={(e) => setSearchTerm(e.target.value)}
// // //         />
// // //       </div>

// // //       {/* Trains Table */}
// // //       <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
// // //         <table className="w-full">
// // //           <thead>
// // //             <tr className="border-b border-gray-700">
// // //               <th className="text-left p-4">Train No</th>
// // //               <th className="text-left p-4">Name</th>
// // //               <th className="text-left p-4">Route</th>
// // //               <th className="text-left p-4">Type</th>
// // //               <th className="text-left p-4">Departure</th>
// // //               <th className="text-center p-4">Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {loading ? (
// // //               <tr><td colSpan="6" className="text-center py-12 text-slate-400">Loading trains...</td></tr>
// // //             ) : filteredTrains.length === 0 ? (
// // //               <tr><td colSpan="6" className="text-center py-12 text-slate-400">No trains found</td></tr>
// // //             ) : (
// // //               filteredTrains.map((train) => (
// // //                 <tr key={train._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
// // //                   <td className="p-4 font-mono font-semibold">{train.number}</td>
// // //                   <td className="p-4 font-medium">{train.name}</td>
// // //                   <td className="p-4">
// // //                     <span className="text-emerald-400">{train.sourceCode}</span>
// // //                     {' → '}
// // //                     <span className="text-violet-400">{train.destinationCode}</span>
// // //                   </td>
// // //                   <td className="p-4 capitalize">{train.type}</td>
// // //                   <td className="p-4">{train.departureTime}</td>
// // //                   <td className="p-4 text-center">
// // //                     <button
// // //                       onClick={() => handleEdit(train)}
// // //                       className="text-blue-400 hover:text-blue-300 p-2"
// // //                     >
// // //                       <Edit2 size={18} />
// // //                     </button>
// // //                     <button
// // //                       onClick={() => handleDelete(train._id)}
// // //                       className="text-red-400 hover:text-red-300 p-2"
// // //                     >
// // //                       <Trash2 size={18} />
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //       {/* Add/Edit Modal */}
// // //       {showModal && (
// // //         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-auto">
// // //             <div className="p-8">
// // //               <h2 className="text-2xl font-bold mb-6">
// // //                 {editingTrain ? 'Edit Train' : 'Add New Train'}
// // //               </h2>

// // //               <form onSubmit={handleSubmit} className="space-y-6">
// // //                 <div className="grid grid-cols-2 gap-4">
// // //                   <div>
// // //                     <label className="block text-sm text-slate-400 mb-1">Train Number</label>
// // //                     <input type="text" required value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm text-slate-400 mb-1">Train Name</label>
// // //                     <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
// // //                   </div>
// // //                 </div>

// // //                 <div className="grid grid-cols-2 gap-4">
// // //                   <div>
// // //                     <label className="block text-sm text-slate-400 mb-1">Source Station</label>
// // //                     <input type="text" required value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" placeholder="Mumbai Central" />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm text-slate-400 mb-1">Source Code</label>
// // //                     <input type="text" value={formData.sourceCode} onChange={e => setFormData({...formData, sourceCode: e.target.value.toUpperCase()})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" placeholder="BCT" />
// // //                   </div>
// // //                 </div>

// // //                 <div className="grid grid-cols-2 gap-4">
// // //                   <div>
// // //                     <label className="block text-sm text-slate-400 mb-1">Destination Station</label>
// // //                     <input type="text" required value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" placeholder="New Delhi" />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm text-slate-400 mb-1">Destination Code</label>
// // //                     <input type="text" value={formData.destinationCode} onChange={e => setFormData({...formData, destinationCode: e.target.value.toUpperCase()})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" placeholder="NDLS" />
// // //                   </div>
// // //                 </div>

// // //                 <div className="grid grid-cols-3 gap-4">
// // //                   <div>
// // //                     <label className="block text-sm text-slate-400 mb-1">Departure Time</label>
// // //                     <input type="text" required value={formData.departureTime} onChange={e => setFormData({...formData, departureTime: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" placeholder="16:55" />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm text-slate-400 mb-1">Arrival Time</label>
// // //                     <input type="text" required value={formData.arrivalTime} onChange={e => setFormData({...formData, arrivalTime: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" placeholder="08:35" />
// // //                   </div>
// // //                   <div>
// // //                     <label className="block text-sm text-slate-400 mb-1">Type</label>
// // //                     <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
// // //                       <option value="rajdhani">Rajdhani</option>
// // //                       <option value="shatabdi">Shatabdi</option>
// // //                       <option value="express">Express</option>
// // //                       <option value="superfast">Superfast</option>
// // //                     </select>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
// // //                   <button type="button" onClick={() => {setShowModal(false); setEditingTrain(null);}} className="px-6 py-3 text-slate-400 hover:text-white transition">Cancel</button>
// // //                   <button type="submit" className="px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold transition">
// // //                     {editingTrain ? 'Update Train' : 'Create Train'}
// // //                   </button>
// // //                 </div>
// // //               </form>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AdminTrains;

// // import React, { useState, useEffect } from 'react';
// // import { trainApi } from '../../api/endpoints';
// // import { toast } from 'react-hot-toast';
// // import { Plus, Edit2, Trash2, Search, RefreshCw } from 'lucide-react';

// // const AdminTrains = () => {
// //   const [trains, setTrains] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [showModal, setShowModal] = useState(false);
// //   const [editingTrain, setEditingTrain] = useState(null);

// //   const [formData, setFormData] = useState({
// //     number: '',
// //     name: '',
// //     type: 'express',
// //     source: '',
// //     sourceCode: '',
// //     destination: '',
// //     destinationCode: '',
// //     departureTime: '',
// //     arrivalTime: '',
// //     durationMinutes: '',
// //     distanceKm: '',
// //     pantry: true,
// //   });

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

// //   const filteredTrains = trains.filter(train =>
// //     train.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     train.number?.includes(searchTerm) ||
// //     train.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     train.destination?.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const mongoose = require('mongoose');

// // const classInventorySchema = new mongoose.Schema({
// //   class: { type: String, required: true },
// //   totalSeats: { type: Number, required: true },
// //   availableSeats: { type: Number, required: true },
// //   fare: { type: Number, required: true },
// // }, { _id: false });

// // const trainSchema = new mongoose.Schema({
// //   number: { type: String, required: true, unique: true, trim: true },
// //   name: { type: String, required: true, trim: true },

// //   type: { 
// //     type: String, 
// //     enum: ['rajdhani', 'shatabdi', 'express', 'superfast', 'mail'], 
// //     required: true,
// //     default: 'express' 
// //   },

// //   // Made required true but with strong pre-save backup
// //   source: { type: String, required: true, trim: true },
// //   sourceCode: { type: String, required: true, uppercase: true, trim: true },
// //   destination: { type: String, required: true, trim: true },
// //   destinationCode: { type: String, required: true, uppercase: true, trim: true },

// //   departureTime: { type: String, required: true },
// //   arrivalTime: { type: String, required: true },
// //   durationMinutes: { type: Number, required: true, min: 1, default: 300 },
// //   distanceKm: { type: Number, required: true, min: 1, default: 500 },

// //   pantry: { type: Boolean, default: true },
// //   runningDays: { type: [String], default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
// //   inventory: { type: [classInventorySchema], default: [] },

// // }, { timestamps: true });

// // // 🔥 Strong Pre-save Hook
// // trainSchema.pre('save', function(next) {
// //   // Auto fill codes
// //   if (this.source && !this.sourceCode) {
// //     this.sourceCode = this.source.trim().slice(0, 3).toUpperCase();
// //   }
// //   if (this.destination && !this.destinationCode) {
// //     this.destinationCode = this.destination.trim().slice(0, 3).toUpperCase();
// //   }

// //   // Last safety net
// //   if (!this.sourceCode) this.sourceCode = "SRC";
// //   if (!this.destinationCode) this.destinationCode = "DST";
// //   if (!this.durationMinutes) this.durationMinutes = 300;
// //   if (!this.distanceKm) this.distanceKm = 500;

// //   next();
// // });

// // module.exports = mongoose.model('Train', trainSchema);

// //   const handleEdit = (train) => {
// //     setEditingTrain(train);
// //     setFormData({
// //       number: train.number || '',
// //       name: train.name || '',
// //       type: train.type || 'express',
// //       source: train.source || '',
// //       sourceCode: train.sourceCode || '',
// //       destination: train.destination || '',
// //       destinationCode: train.destinationCode || '',
// //       departureTime: train.departureTime || '',
// //       arrivalTime: train.arrivalTime || '',
// //       durationMinutes: train.durationMinutes || '',
// //       distanceKm: train.distanceKm || '',
// //       pantry: train.pantry ?? true,
// //     });
// //     setShowModal(true);
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure?")) return;
// //     try {
// //       await trainApi.remove(id);
// //       toast.success("Train deleted");
// //       fetchTrains();
// //     } catch (err) {
// //       toast.error("Delete failed");
// //     }
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       number: '',
// //       name: '',
// //       type: 'express',
// //       source: '',
// //       sourceCode: '',
// //       destination: '',
// //       destinationCode: '',
// //       departureTime: '',
// //       arrivalTime: '',
// //       durationMinutes: '',
// //       distanceKm: '',
// //       pantry: true,
// //     });
// //   };

// //   return (
// //     <div className="p-6 max-w-7xl mx-auto">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-3xl font-bold">Train Management</h1>
// //         <div className="flex gap-3">
// //           <button onClick={fetchTrains} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
// //             <RefreshCw size={18} /> Refresh
// //           </button>
// //           <button
// //             onClick={() => { resetForm(); setEditingTrain(null); setShowModal(true); }}
// //             className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg font-medium"
// //           >
// //             <Plus size={20} /> Add New Train
// //           </button>
// //         </div>
// //       </div>

// //       {/* Search */}
// //       <div className="relative mb-6">
// //         <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
// //         <input
// //           type="text"
// //           placeholder="Search by name, number..."
// //           className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:border-violet-500"
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
// //       </div>

// //       {/* Table + Modal same as before... (space saving) */}

// //       {/* Modal */}
// //       {showModal && (
// //         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
// //           <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-auto">
// //             <div className="p-8">
// //               <h2 className="text-2xl font-bold mb-6">
// //                 {editingTrain ? 'Edit Train' : 'Add New Train'}
// //               </h2>

// //               <form onSubmit={handleSubmit} className="space-y-6">
// //                 {/* All inputs with default values to avoid uncontrolled warning */}
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-sm text-slate-400 mb-1">Train Number *</label>
// //                     <input type="text" required value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm text-slate-400 mb-1">Train Name *</label>
// //                     <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
// //                   </div>
// //                 </div>

// //                 {/* Source & Destination */}
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-sm text-slate-400 mb-1">Source Station *</label>
// //                     <input type="text" required value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm text-slate-400 mb-1">Source Code</label>
// //                     <input type="text" value={formData.sourceCode} onChange={e => setFormData({...formData, sourceCode: e.target.value.toUpperCase()})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
// //                   </div>
// //                 </div>

// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-sm text-slate-400 mb-1">Destination Station *</label>
// //                     <input type="text" required value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm text-slate-400 mb-1">Destination Code</label>
// //                     <input type="text" value={formData.destinationCode} onChange={e => setFormData({...formData, destinationCode: e.target.value.toUpperCase()})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
// //                   </div>
// //                 </div>

// //                 {/* Time, Type, Duration, Distance */}
// //                 <div className="grid grid-cols-3 gap-4">
// //                   <div>
// //                     <label className="block text-sm text-slate-400 mb-1">Departure Time *hgvgg</label>
// //                     <input type="text" required value={formData.departureTime} onChange={e => setFormData({...formData, departureTime: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" placeholder="16:55" />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm text-slate-400 mb-1">Arrival Time *</label>
// //                     <input type="text" required value={formData.arrivalTime} onChange={e => setFormData({...formData, arrivalTime: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" placeholder="08:35" />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm text-slate-400 mb-1">Type *</label>
// //                     <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
// //                       <option value="express">Express</option>
// //                       <option value="superfast">Superfast</option>
// //                       <option value="rajdhani">Rajdhani</option>
// //                       <option value="shatabdi">Shatabdi</option>
// //                       <option value="mail">Mail</option>
// //                     </select>
// //                   </div>
// //                 </div>

// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-sm text-slate-400 mb-1">Duration (Minutes) *</label>
// //                     <input type="number" required value={formData.durationMinutes} onChange={e => setFormData({...formData, durationMinutes: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm text-slate-400 mb-1">Distance (KM) *</label>
// //                     <input type="number" required value={formData.distanceKm} onChange={e => setFormData({...formData, distanceKm: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-2">
// //                   <input type="checkbox" checked={formData.pantry} onChange={e => setFormData({...formData, pantry: e.target.checked})} />
// //                   <label>Pantry Available</label>
// //                 </div>

// //                 <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
// //                   <button type="button" onClick={() => {setShowModal(false); resetForm();}} className="px-6 py-3 text-slate-400 hover:text-white">Cancel</button>
// //                   <button type="submit" className="px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold"> 
// //                     {editingTrain ? 'Update Train' : 'Create Train'}
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminTrains;






// import React, { useState, useEffect } from 'react';
// import { trainApi } from '../../api/endpoints';
// import { toast } from 'react-hot-toast';
// import { Plus, Edit2, Trash2, Search, RefreshCw } from 'lucide-react';

// const AdminTrains = () => {
//   const [trains, setTrains] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editingTrain, setEditingTrain] = useState(null);

//   const [formData, setFormData] = useState({
//     number: '',
//     name: '',
//     type: 'express',
//     source: '',
//     sourceCode: '',
//     destination: '',
//     destinationCode: '',
//     departureTime: '',
//     arrivalTime: '',
//     durationMinutes: '',
//     distanceKm: '',
//     pantry: true,
//   });

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

//   const filteredTrains = trains.filter(train =>
//     train.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     train.number?.includes(searchTerm) ||
//     train.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     train.destination?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleEdit = (train) => {
//     setEditingTrain(train);
//     setFormData({
//       number: train.number || '',
//       name: train.name || '',
//       type: train.type || 'express',
//       source: train.source || '',
//       sourceCode: train.sourceCode || '',
//       destination: train.destination || '',
//       destinationCode: train.destinationCode || '',
//       departureTime: train.departureTime || '',
//       arrivalTime: train.arrivalTime || '',
//       durationMinutes: train.durationMinutes || '',
//       distanceKm: train.distanceKm || '',
//       pantry: train.pantry ?? true,
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await trainApi.remove(id);
//       toast.success("Train deleted");
//       fetchTrains();
//     } catch (err) {
//       toast.error("Delete failed");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingTrain) {
//         // Update existing train
//         await trainApi.update(editingTrain._id, formData);
//         toast.success("Train updated successfully");
//       } else {
//         // Create new train
//         await trainApi.create(formData);
//         toast.success("Train created successfully");
//       }
//       fetchTrains();
//       setShowModal(false);
//       resetForm();
//       setEditingTrain(null);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Operation failed");
//       console.error(err);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       number: '',
//       name: '',
//       type: 'express',
//       source: '',
//       sourceCode: '',
//       destination: '',
//       destinationCode: '',
//       departureTime: '',
//       arrivalTime: '',
//       durationMinutes: '',
//       distanceKm: '',
//       pantry: true,
//     });
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Train Management</h1>
//         <div className="flex gap-3">
//           <button onClick={fetchTrains} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
//             <RefreshCw size={18} /> Refresh
//           </button>
//           <button
//             onClick={() => { resetForm(); setEditingTrain(null); setShowModal(true); }}
//             className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg font-medium"
//           >
//             <Plus size={20} /> Add New Train
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="relative mb-6">
//         <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
//         <input
//           type="text"
//           placeholder="Search by name, number..."
//           className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:border-violet-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Trains Table */}
//       {loading ? (
//         <div className="text-center py-8">Loading trains...</div>
//       ) : filteredTrains.length === 0 ? (
//         <div className="text-center py-8 text-slate-400">No trains found</div>
//       ) : (
//         <div className="overflow-x-auto border border-gray-700 rounded-2xl">
//           <table className="w-full">
//             <thead className="bg-gray-800 border-b border-gray-700">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">Number</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">Route</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTrains.map((train) => (
//                 <tr key={train._id} className="border-b border-gray-700 hover:bg-gray-800/50">
//                   <td className="px-6 py-4">{train.number}</td>
//                   <td className="px-6 py-4">{train.name}</td>
//                   <td className="px-6 py-4 capitalize">{train.type}</td>
//                   <td className="px-6 py-4 text-sm">{train.sourceCode} → {train.destinationCode}</td>
//                   <td className="px-6 py-4 text-sm">{train.departureTime} - {train.arrivalTime}</td>
//                   <td className="px-6 py-4 flex gap-2">
//                     <button
//                       onClick={() => handleEdit(train)}
//                       className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
//                     >
//                       <Edit2 size={16} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(train._id)}
//                       className="p-2 bg-red-600 hover:bg-red-700 rounded-lg"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-auto">
//             <div className="p-8">
//               <h2 className="text-2xl font-bold mb-6">
//                 {editingTrain ? 'Edit Train' : 'Add New Train'}
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Train Number & Name */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm text-slate-400 mb-1">Train Number *</label>
//                     <input 
//                       type="text" 
//                       required 
//                       value={formData.number} 
//                       onChange={e => setFormData({...formData, number: e.target.value})} 
//                       className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white" 
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-slate-400 mb-1">Train Name *</label>
//                     <input 
//                       type="text" 
//                       required 
//                       value={formData.name} 
//                       onChange={e => setFormData({...formData, name: e.target.value})} 
//                       className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white" 
//                     />
//                   </div>
//                 </div>

//                 {/* Source & Destination */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm text-slate-400 mb-1">Source Station *</label>
//                     <input 
//                       type="text" 
//                       required 
//                       value={formData.source} 
//                       onChange={e => setFormData({...formData, source: e.target.value})} 
//                       className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white" 
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-slate-400 mb-1">Source Code</label>
//                     <input 
//                       type="text" 
//                       value={formData.sourceCode} 
//                       onChange={e => setFormData({...formData, sourceCode: e.target.value.toUpperCase()})} 
//                       className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white" 
//                       maxLength="3"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm text-slate-400 mb-1">Destination Station *</label>
//                     <input 
//                       type="text" 
//                       required 
//                       value={formData.destination} 
//                       onChange={e => setFormData({...formData, destination: e.target.value})} 
//                       className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white" 
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-slate-400 mb-1">Destination Code</label>
//                     <input 
//                       type="text" 
//                       value={formData.destinationCode} 
//                       onChange={e => setFormData({...formData, destinationCode: e.target.value.toUpperCase()})} 
//                       className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white" 
//                       maxLength="3"
//                     />
//                   </div>
//                 </div>

//                 {/* Time, Type, Duration, Distance */}
//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm text-slate-400 mb-1">Departure Time *</label>
//                     <input 
//                       type="text" 
//                       required 
//                       value={formData.departureTime} 
//                       onChange={e => setFormData({...formData, departureTime: e.target.value})} 
//                       className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white" 
//                       placeholder="16:55" 
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-slate-400 mb-1">Arrival Time *</label>
//                     <input 
//                       type="text" 
//                       required 
//                       value={formData.arrivalTime} 
//                       onChange={e => setFormData({...formData, arrivalTime: e.target.value})} 
//                       className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white" 
//                       placeholder="08:35" 
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-slate-400 mb-1">Type *</label>
//                     <select 
//                       value={formData.type} 
//                       onChange={e => setFormData({...formData, type: e.target.value})} 
//                       className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white"
//                     >
//                       <option value="express">Express</option>
//                       <option value="superfast">Superfast</option>
//                       <option value="rajdhani">Rajdhani</option>
//                       <option value="shatabdi">Shatabdi</option>
//                       <option value="mail">Mail</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm text-slate-400 mb-1">Duration (Minutes) *</label>
//                     <input 
//                       type="number" 
//                       required 
//                       value={formData.durationMinutes} 
//                       onChange={e => setFormData({...formData, durationMinutes: e.target.value})} 
//                       className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white" 
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-slate-400 mb-1">Distance (KM) *</label>
//                     <input 
//                       type="number" 
//                       required 
//                       value={formData.distanceKm} 
//                       onChange={e => setFormData({...formData, distanceKm: e.target.value})} 
//                       className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white" 
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <input 
//                     type="checkbox" 
//                     id="pantry"
//                     checked={formData.pantry} 
//                     onChange={e => setFormData({...formData, pantry: e.target.checked})}
//                     className="w-4 h-4 cursor-pointer"
//                   />
//                   <label htmlFor="pantry" className="text-slate-300 cursor-pointer">Pantry Available</label>
//                 </div>

//                 <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
//                   <button 
//                     type="button" 
//                     onClick={() => {setShowModal(false); resetForm();}} 
//                     className="px-6 py-3 text-slate-400 hover:text-white"
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     type="submit" 
//                     className="px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold text-white"
//                   > 
//                     {editingTrain ? 'Update Train' : 'Create Train'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminTrains;




import React, { useState, useEffect } from 'react';
import { trainApi } from '../../api/endpoints';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, Search, RefreshCw } from 'lucide-react';

const defaultInventory = [
  { class: 'SL', totalSeats: 300, availableSeats: 300, fare: 650 },
  { class: '3A', totalSeats: 240, availableSeats: 240, fare: 1450 },
  { class: '2A', totalSeats: 120, availableSeats: 120, fare: 2450 },
  { class: '1A', totalSeats: 30, availableSeats: 30, fare: 3850 },
];

export default function AdminTrains() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTrain, setEditingTrain] = useState(null);

  const [formData, setFormData] = useState({
    number: '',
    name: '',
    type: 'express',
    source: '',
    sourceCode: '',
    destination: '',
    destinationCode: '',
    departureTime: '',
    arrivalTime: '',
    durationMinutes: '',
    distanceKm: '',
    pantry: true,
    inventory: [...defaultInventory],
  });

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
    } finally {
      setLoading(false);
    }
  };

  const filteredTrains = trains.filter(train =>
    train.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.number?.includes(searchTerm) ||
    train.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.destination?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        durationMinutes: Number(formData.durationMinutes),
        distanceKm: Number(formData.distanceKm),
        sourceCode: formData.sourceCode || formData.source?.slice(0, 3).toUpperCase(),
        destinationCode: formData.destinationCode || formData.destination?.slice(0, 3).toUpperCase(),
      };

      if (editingTrain) {
        await trainApi.update(editingTrain._id, payload);
        toast.success("Train updated successfully");
      } else {
        await trainApi.create(payload);
        toast.success("Train created successfully");
      }

      setShowModal(false);
      setEditingTrain(null);
      resetForm();
      fetchTrains();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (train) => {
    setEditingTrain(train);
    setFormData({
      number: train.number || '',
      name: train.name || '',
      type: train.type || 'express',
      source: train.source || '',
      sourceCode: train.sourceCode || '',
      destination: train.destination || '',
      destinationCode: train.destinationCode || '',
      departureTime: train.departureTime || '',
      arrivalTime: train.arrivalTime || '',
      durationMinutes: train.durationMinutes || '',
      distanceKm: train.distanceKm || '',
      pantry: train.pantry ?? true,
      inventory: train.inventory?.length ? train.inventory : [...defaultInventory],
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this train?")) return;
    try {
      await trainApi.remove(id);
      toast.success("Train deleted");
      fetchTrains();
    } catch (err) {
      toast.error("Failed to delete train");
    }
  };

  const resetForm = () => {
    setFormData({
      number: '',
      name: '',
      type: 'express',
      source: '',
      sourceCode: '',
      destination: '',
      destinationCode: '',
      departureTime: '',
      arrivalTime: '',
      durationMinutes: '',
      distanceKm: '',
      pantry: true,
      inventory: [...defaultInventory],
    });
  };

  const updateInventory = (index, field, value) => {
    const newInventory = [...formData.inventory];
    newInventory[index][field] = Number(value);
    setFormData({ ...formData, inventory: newInventory });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Train Management</h1>
        <div className="flex gap-3">
          <button onClick={fetchTrains} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
            <RefreshCw size={18} /> Refresh
          </button>
          <button
            onClick={() => { resetForm(); setEditingTrain(null); setShowModal(true); }}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg font-medium"
          >
            <Plus size={20} /> Add New Train
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search trains..."
          className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:border-violet-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4">Train No</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Route</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center py-12">Loading...</td></tr>
            ) : filteredTrains.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-12 text-slate-400">No trains found</td></tr>
            ) : (
              filteredTrains.map((train) => (
                <tr key={train._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4 font-semibold">{train.number}</td>
                  <td className="p-4">{train.name}</td>
                  <td className="p-4">{train.sourceCode} → {train.destinationCode}</td>
                  <td className="p-4 capitalize">{train.type}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => handleEdit(train)} className="text-blue-400 hover:text-blue-300 p-2">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(train._id)} className="text-red-400 hover:text-red-300 p-2">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">
                {editingTrain ? 'Edit Train' : 'Add New Train'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Train Number *</label>
                    <input type="text" required value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Train Name *</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
                  </div>
                </div>

                {/* Route */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Source Station *</label>
                    <input type="text" required value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Source Code</label>
                    <input type="text" value={formData.sourceCode} onChange={e => setFormData({...formData, sourceCode: e.target.value.toUpperCase()})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" maxLength={3} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Destination Station *</label>
                    <input type="text" required value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Destination Code</label>
                    <input type="text" value={formData.destinationCode} onChange={e => setFormData({...formData, destinationCode: e.target.value.toUpperCase()})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" maxLength={3} />
                  </div>
                </div>

                {/* Time & Type */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Departure Time *</label>
                    <input type="text" required value={formData.departureTime} onChange={e => setFormData({...formData, departureTime: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" placeholder="16:55" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Arrival Time *</label>
                    <input type="text" required value={formData.arrivalTime} onChange={e => setFormData({...formData, arrivalTime: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" placeholder="08:35" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Type *</label>
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
                      <option value="express">Express</option>
                      <option value="superfast">Superfast</option>
                      <option value="rajdhani">Rajdhani</option>
                      <option value="shatabdi">Shatabdi</option>
                      <option value="mail">Mail</option>
                    </select>
                  </div>
                </div>

                {/* Duration & Distance */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Duration (Minutes) *</label>
                    <input type="number" required value={formData.durationMinutes} onChange={e => setFormData({...formData, durationMinutes: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Distance (KM) *</label>
                    <input type="number" required value={formData.distanceKm} onChange={e => setFormData({...formData, distanceKm: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.pantry} onChange={e => setFormData({...formData, pantry: e.target.checked})} />
                  <label>Pantry Available</label>
                </div>

                {/* Inventory Section */}
                <div>
                  <label className="block text-sm text-slate-400 mb-3">Inventory (Classes & Seats)</label>
                  <div className="space-y-3">
                    {formData.inventory.map((inv, index) => (
                      <div key={inv.class} className="grid grid-cols-5 gap-3 bg-gray-800 p-4 rounded-2xl">
                        <div className="font-semibold">{inv.class}</div>
                        <div>
                          <input type="number" value={inv.totalSeats} onChange={(e) => updateInventory(index, 'totalSeats', e.target.value)} className="w-full bg-gray-700 rounded px-3 py-2" />
                        </div>
                        <div>
                          <input type="number" value={inv.availableSeats} onChange={(e) => updateInventory(index, 'availableSeats', e.target.value)} className="w-full bg-gray-700 rounded px-3 py-2" />
                        </div>
                        <div>
                          <input type="number" value={inv.fare} onChange={(e) => updateInventory(index, 'fare', e.target.value)} className="w-full bg-gray-700 rounded px-3 py-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
                  <button type="button" onClick={() => {setShowModal(false); resetForm();}} className="px-6 py-3 text-slate-400 hover:text-white">Cancel</button>
                  <button type="submit" className="px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-2xl font-semibold">
                    {editingTrain ? 'Update Train' : 'Create Train'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

