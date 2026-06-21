import { useState } from 'react';
import toast from 'react-hot-toast';
import { aiApi } from '../../api/endpoints';

export default function TripPlanner() {
  const [destination, setDest] = useState('');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(10000);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const plan = async () => {
    setLoading(true); setReply('');
    try {
      const r = await aiApi.chat({
        agent: 'trip-planner',
        message: `Plan a ${days}-day train trip to ${destination} within INR ${budget}. Suggest trains, attractions, and return journey.`,
      });
      setReply(r.data.data.reply);
    } catch (e) { toast.error(e?.response?.data?.message || 'Planner failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">AI Trip Planner</h1>
      <div className="card mt-6 grid md:grid-cols-3 gap-3">
        <div><label className="label">Destination</label><input className="input" value={destination} onChange={(e)=>setDest(e.target.value)} placeholder="Agra" /></div>
        <div><label className="label">Days</label><input type="number" className="input" value={days} onChange={(e)=>setDays(+e.target.value)} /></div>
        <div><label className="label">Budget (₹)</label><input type="number" className="input" value={budget} onChange={(e)=>setBudget(+e.target.value)} /></div>
        <div className="md:col-span-3"><button onClick={plan} className="btn-primary w-full" disabled={!destination || loading}>{loading ? 'Planning…' : 'Plan with AI'}</button></div>
      </div>
      {reply && <div className="card mt-4 whitespace-pre-wrap">{reply}</div>}
    </div>
  );
}
