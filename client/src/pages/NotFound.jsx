import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-24">
      <div className="text-6xl">🛤️</div>
      <h1 className="text-3xl font-bold mt-4">404 — Off the tracks</h1>
      <p className="text-slate-400 mt-2">We couldn't find that page.</p>
      <Link to="/" className="btn-primary mt-6">Back home</Link>
    </div>
  );
}
