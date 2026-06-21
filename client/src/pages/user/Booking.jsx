// import { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { trainApi, bookingApi } from '../../api/endpoints';

// export default function Booking() {
//   const { trainId } = useParams();
//   const [params] = useSearchParams();
//   const [train, setTrain] = useState(null);
//   const nav = useNavigate();

//   const { register, control, handleSubmit, watch } = useForm({
//     defaultValues: {
//       class: 'SL',
//       passengers: [{ name: '', age: 30, gender: 'M', berthPreference: 'any' }],
//     },
//   });
//   const { fields, append, remove } = useFieldArray({ control, name: 'passengers' });
//   const klass = watch('class');

//   useEffect(() => { trainApi.get(trainId).then((r) => setTrain(r.data.data)); }, [trainId]);

//   if (!train) return <div className="p-10">Loading…</div>;

//   const inv = train.inventory.find((i) => i.class === klass) || train.inventory[0];
//   const totalPassengers = fields.length;
//   const total = (inv?.fare || 0) * totalPassengers;

//   const onSubmit = async (data) => {
//     try {
//       const r = await bookingApi.create({
//         trainId,
//         journeyDate: params.get('date') || new Date().toISOString().slice(0,10),
//         class: data.class,
//         quota: 'GN',
//         fromCode: params.get('from') || train.sourceCode,
//         toCode: params.get('to') || train.destinationCode,
//         passengers: data.passengers,
//       });
//       toast.success('Booking draft created');
//       nav(`/pay/${r.data.data._id}`);
//     } catch (e) { toast.error(e?.response?.data?.message || 'Booking failed'); }
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold">Book {train.name} #{train.number}</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 space-y-4">
//         <div className="grid md:grid-cols-3 gap-3">
//           <div><label className="label">Class</label>
//             <select className="input" {...register('class')}>
//               {train.inventory.map((i) => (
//                 <option key={i.class} value={i.class}>{i.class} · ₹{i.fare} · {i.availableSeats} avail</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <h2 className="font-semibold">Passengers ({fields.length}/6)</h2>
//             {fields.length < 6 && <button type="button" className="btn-ghost" onClick={() => append({ name:'', age:30, gender:'M', berthPreference:'any' })}>+ Add</button>}
//           </div>
//           {fields.map((f, i) => (
//             <div key={f.id} className="grid md:grid-cols-5 gap-2 items-end">
//               <div><label className="label">Name</label><input className="input" {...register(`passengers.${i}.name`, { required: true })} /></div>
//               <div><label className="label">Age</label><input type="number" className="input" {...register(`passengers.${i}.age`, { required: true, valueAsNumber: true })} /></div>
//               <div><label className="label">Gender</label>
//                 <select className="input" {...register(`passengers.${i}.gender`)}><option>M</option><option>F</option><option>O</option></select>
//               </div>
//               <div><label className="label">Berth</label>
//                 <select className="input" {...register(`passengers.${i}.berthPreference`)}>
//                   <option value="any">Any</option><option value="lower">Lower</option><option value="middle">Middle</option><option value="upper">Upper</option><option value="side-lower">Side Lower</option><option value="side-upper">Side Upper</option>
//                 </select>
//               </div>
//               <div>{fields.length > 1 && <button type="button" className="btn-danger w-full" onClick={() => remove(i)}>Remove</button>}</div>
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center justify-between border-t border-white/10 pt-4">
//           <div className="text-sm text-slate-400">Total fare</div>
//           <div className="text-2xl font-bold">₹{total}</div>
//         </div>
//         <button className="btn-primary w-full">Proceed to payment</button>
//       </form>
//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { trainApi, bookingApi } from '../../api/endpoints';

export default function Booking() {
  const { trainId } = useParams();
  const [searchParams] = useSearchParams();
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      class: '3A',
      passengers: [{ name: '', age: 30, gender: 'M', berthPreference: 'lower' }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'passengers' });
  const selectedClass = watch('class');

  useEffect(() => {
    const fetchTrain = async () => {
      try {
        const res = await trainApi.get(trainId);
        setTrain(res.data?.data || res.data);
      } catch (err) {
        toast.error("Failed to load train details");
      }
    };
    fetchTrain();
  }, [trainId]);

  if (!train) return <div className="p-10 text-center">Loading train details...</div>;

  const inventory = train.inventory?.find(i => i.class === selectedClass) || train.inventory?.[0];
  const total = (inventory?.fare || 0) * fields.length;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        trainId,
        journeyDate: searchParams.get('date') || new Date().toISOString().slice(0, 10),
        class: data.class,
        quota: 'GN',
        fromCode: searchParams.get('from') || train.sourceCode,
        toCode: searchParams.get('to') || train.destinationCode,
        passengers: data.passengers,
      };

      const response = await bookingApi.create(payload);
      
      toast.success('Booking draft created successfully!');
      navigate(`/pay/${response.data.data._id}`);
    } catch (error) {
      console.error(error.response?.data);
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Book {train.name}</h1>
      <p className="text-slate-400">#{train.number} • {train.sourceCode} → {train.destinationCode}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 bg-gray-900 border border-gray-700 rounded-3xl p-8">
        {/* Class Selection */}
        <div className="mb-8">
          <label className="block text-sm text-slate-400 mb-3">Select Class</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {train.inventory?.map((inv) => (
              <label
                key={inv.class}
                className={`border rounded-2xl p-4 cursor-pointer transition-all ${
                  selectedClass === inv.class ? 'border-violet-500 bg-violet-500/10' : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  value={inv.class}
                  {...register('class')}
                  className="hidden"
                />
                <div className="font-semibold">{inv.class}</div>
                <div className="text-xl font-bold">₹{inv.fare}</div>
                <div className="text-sm text-emerald-400">{inv.availableSeats} seats left</div>
              </label>
            ))}
          </div>
        </div>

        {/* Passengers */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Passengers ({fields.length}/6)</h2>
            {fields.length < 6 && (
              <button
                type="button"
                onClick={() => append({ name: '', age: 30, gender: 'M', berthPreference: 'lower' })}
                className="text-violet-400 hover:text-violet-300 text-sm font-medium"
              >
                + Add Passenger
              </button>
            )}
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 p-5 bg-gray-800 rounded-2xl">
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                <input
                  {...register(`passengers.${index}.name`, { required: true })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3"
                  placeholder="Passenger Name"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Age</label>
                <input
                  type="number"
                  {...register(`passengers.${index}.age`, { required: true, valueAsNumber: true })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Gender</label>
                <select {...register(`passengers.${index}.gender`)} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3">
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Berth</label>
                <select {...register(`passengers.${index}.berthPreference`)} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3">
                  <option value="lower">Lower</option>
                  <option value="middle">Middle</option>
                  <option value="upper">Upper</option>
                  <option value="side-lower">Side Lower</option>
                  <option value="side-upper">Side Upper</option>
                </select>
                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(index)} className="text-red-500 text-sm mt-2">Remove</button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-gray-700 pt-6 flex justify-between items-center text-xl">
          <span className="text-slate-400">Total Amount</span>
          <span className="font-bold">₹{total}</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-violet-600 hover:bg-violet-700 py-4 rounded-2xl font-semibold text-lg disabled:opacity-70"
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  );
}