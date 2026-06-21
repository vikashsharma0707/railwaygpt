import { Link, useSearchParams } from 'react-router-dom';
export default function PaymentSuccess() {
  const [params] = useSearchParams();
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="text-5xl">✅</div>
      <h1 className="text-2xl font-bold mt-3">Booking confirmed</h1>
      <p className="text-slate-400 mt-2">PNR: <b>{params.get('pnr')}</b></p>
      <Link to="/tickets" className="btn-primary mt-6 inline-flex">View tickets</Link>
    </div>
  );
}
