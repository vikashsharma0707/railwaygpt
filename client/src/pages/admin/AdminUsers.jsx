import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/endpoints';

export default function AdminUsers() {
  const [list, setList] = useState([]);
  const reload = () => adminApi.users().then((r) => setList(r.data.data));
  useEffect(() => { reload(); }, []);
  const block = async (u) => { await (u.isBlocked ? adminApi.unblock(u._id) : adminApi.block(u._id)); toast.success('Updated'); reload(); };
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="card mt-6 overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-400"><tr><th className="text-left">Name</th><th className="text-left">Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {list.map((u) => (
              <tr key={u._id} className="border-t border-white/5">
                <td className="py-2">{u.name}</td><td>{u.email}</td>
                <td className="text-center"><span className="chip">{u.role}</span></td>
                <td className="text-center">{u.isBlocked ? <span className="chip bg-rose-500/20 text-rose-300">blocked</span> : <span className="chip bg-emerald-500/20 text-emerald-300">active</span>}</td>
                <td className="text-right"><button onClick={() => block(u)} className="btn-ghost">{u.isBlocked ? 'Unblock' : 'Block'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
