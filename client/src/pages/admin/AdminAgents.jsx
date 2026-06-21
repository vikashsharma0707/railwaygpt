import { useEffect, useState } from 'react';
import { adminApi, aiApi } from '../../api/endpoints';

export default function AdminAgents() {
  const [logs, setLogs] = useState([]);
  const [agents, setAgents] = useState([]);
  useEffect(() => {
    adminApi.agentLogs().then((r) => setLogs(r.data.data));
    aiApi.agents().then((r) => setAgents(r.data.data));
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Agents</h1>
      <div className="card">
        <h2 className="font-semibold mb-3">Catalog ({agents.length})</h2>
        <div className="grid md:grid-cols-3 gap-2">
          {agents.map((a) => (
            <div key={a.key} className="rounded-lg border border-white/10 p-3">
              <div className="font-medium">{a.name}</div>
              <div className="text-xs text-slate-400">{a.category} · {a.key}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card overflow-auto">
        <h2 className="font-semibold mb-3">Recent agent runs</h2>
        <table className="w-full text-sm">
          <thead className="text-slate-400"><tr><th className="text-left">Time</th><th className="text-left">Agent</th><th className="text-left">User</th><th>Latency</th><th>Tools</th></tr></thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l._id} className="border-t border-white/5">
                <td className="py-2">{new Date(l.createdAt).toLocaleTimeString()}</td>
                <td>{l.agent}</td><td>{l.user?.name || 'guest'}</td>
                <td className="text-center">{l.latencyMs} ms</td>
                <td className="text-center">{l.toolCalls?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
