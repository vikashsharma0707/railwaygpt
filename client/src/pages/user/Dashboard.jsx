import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <p className="text-slate-400 mt-1">What would you like to do today?</p>
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link to="/trains" className="card hover:border-brand-500/50"><div className="text-3xl">🔎</div><div className="mt-2 font-semibold">Search Trains</div><div className="text-sm text-slate-400">Find trains across India.</div></Link>
        <Link to="/assistant" className="card hover:border-brand-500/50"><div className="text-3xl">🤖</div><div className="mt-2 font-semibold">AI Assistant</div><div className="text-sm text-slate-400">Talk to RailwayGPT.</div></Link>
        <Link to="/tickets" className="card hover:border-brand-500/50"><div className="text-3xl">🎫</div><div className="mt-2 font-semibold">My Tickets</div><div className="text-sm text-slate-400">View and download tickets.</div></Link>
        <Link to="/pnr" className="card hover:border-brand-500/50"><div className="text-3xl">📍</div><div className="mt-2 font-semibold">PNR Status</div><div className="text-sm text-slate-400">Check any PNR.</div></Link>
        <Link to="/trip-planner" className="card hover:border-brand-500/50"><div className="text-3xl">🧭</div><div className="mt-2 font-semibold">Trip Planner</div><div className="text-sm text-slate-400">Plan a journey with AI.</div></Link>
        <Link to="/profile" className="card hover:border-brand-500/50"><div className="text-3xl">⚙️</div><div className="mt-2 font-semibold">Preferences</div><div className="text-sm text-slate-400">Berth, language, defaults.</div></Link>
      </div>
    </div>
  );
}
