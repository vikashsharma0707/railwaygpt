import { useEffect, useState } from 'react';
import { notifApi } from '../../api/endpoints';
import { useSocket } from '../../context/SocketContext.jsx';

export default function Notifications() {
  const [list, setList] = useState([]);
  const socket = useSocket();
  useEffect(() => { notifApi.list().then((r) => setList(r.data.data)); }, []);
  useEffect(() => {
    if (!socket) return;
    const onN = (n) => setList((xs) => [n, ...xs]);
    socket.on('notification', onN);
    return () => socket.off('notification', onN);
  }, [socket]);
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="space-y-2 mt-4">
        {list.length === 0 && <p className="text-slate-400">No notifications.</p>}
        {list.map((n) => (
          <div key={n._id} className="card">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{n.title}</div>
              <span className="chip">{n.type}</span>
            </div>
            <p className="text-sm text-slate-300 mt-1">{n.message}</p>
            <div className="text-xs text-slate-500 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
