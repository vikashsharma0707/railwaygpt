import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { adminApi } from '../../api/endpoints';

const COLORS = ['#2563eb','#10b981','#f59e0b','#ef4444','#a855f7','#06b6d4','#84cc16','#ec4899'];

export default function AdminAnalytics() {
  const [a, setA] = useState(null);
  useEffect(() => { adminApi.analytics().then((r) => setA(r.data.data)); }, []);
  if (!a) return <div className="p-10">Loading…</div>;
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="card">
        <h2 className="font-semibold mb-2">Daily Revenue</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={a.dailyRevenue}>
            <XAxis dataKey="_id" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip />
            <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-semibold mb-2">Daily Bookings</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={a.dailyBookings}>
              <XAxis dataKey="_id" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">Cancellations</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={a.cancellations}>
              <XAxis dataKey="_id" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip />
              <Bar dataKey="count" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-2">Agent Usage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={a.agentUsage} dataKey="count" nameKey="_id" outerRadius={110}>
              {a.agentUsage.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Legend /><Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
