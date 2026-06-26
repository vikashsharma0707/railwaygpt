import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function WaitlistPredictor() {
  const [wlNumber, setWlNumber] = useState('');
  const [trainClass, setTrainClass] = useState('3A');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    if (!wlNumber) return toast.error("Please enter WL number");

    setLoading(true);
    try {
      // Call backend
      const res = await fetch('/api/prediction/waitlist-predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wlNumber: parseInt(wlNumber), trainClass })
      });

      const data = await res.json();
      setResult(data.data || data);
    } catch (err) {
      toast.error("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6">
      <h3 className="text-xl font-semibold mb-4">Waitlist Confirmation Predictor</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-slate-400 mb-1">WL Number</label>
          <input
            type="number"
            value={wlNumber}
            onChange={(e) => setWlNumber(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3"
            placeholder="42"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Class</label>
          <select
            value={trainClass}
            onChange={(e) => setTrainClass(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3"
          >
            <option value="SL">SL</option>
            <option value="3A">3A</option>
            <option value="2A">2A</option>
            <option value="1A">1A</option>
          </select>
        </div>
      </div>

      <button
        onClick={predict}
        disabled={loading || !wlNumber}
        className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-2xl font-semibold disabled:opacity-70"
      >
        {loading ? 'Predicting...' : 'Check Confirmation Probability'}
      </button>

      {result && (
        <div className="mt-6 p-5 bg-gray-800 rounded-2xl">
          <div className="text-4xl font-bold text-center mb-2">
            {result.predictedProbability}%
          </div>
          <div className={`text-center font-semibold text-lg mb-3 ${result.predictedProbability > 65 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {result.status}
          </div>
          <p className="text-slate-300 text-center">{result.recommendation}</p>
        </div>
      )}
    </div>
  );
}