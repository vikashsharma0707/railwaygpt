import { Link } from 'react-router-dom';
export default function PaymentFailure() {
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="text-5xl">❌</div>
      <h1 className="text-2xl font-bold mt-3">Payment failed</h1>
      <Link to="/dashboard" className="btn-ghost mt-6 inline-flex">Back to dashboard</Link>
    </div>
  );
}
