import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { knowledgeApi } from '../../api/endpoints';

export default function AdminKnowledge() {
  const [list, setList] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const reload = () => knowledgeApi.list().then((r) => setList(r.data.data));
  useEffect(() => { reload(); }, []);

  const onSubmit = async (d) => {
    try { await knowledgeApi.upload(d); toast.success('Ingested'); reset(); reload(); }
    catch (e) { toast.error(e?.response?.data?.message || 'Failed'); }
  };
  const remove = async (id) => { await knowledgeApi.remove(id); toast.success('Deleted'); reload(); };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Knowledge Base</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 space-y-3">
        <div><label className="label">Title</label><input className="input" {...register('title', { required: true })} /></div>
        <div className="grid md:grid-cols-2 gap-3">
          <div><label className="label">Category</label>
            <select className="input" {...register('category')}><option>faq</option><option>policy</option><option>rule</option><option>document</option><option>manual</option></select>
          </div>
          <div><label className="label">Tags (comma)</label><input className="input" {...register('tags')} /></div>
        </div>
        <div><label className="label">Content</label><textarea rows={6} className="input" {...register('content', { required: true })} /></div>
        <button className="btn-primary">Ingest</button>
      </form>

      <div className="mt-6 space-y-2">
        {list.map((kb) => (
          <div key={kb._id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{kb.title}</div>
              <div className="text-xs text-slate-400">{kb.category} · v{kb.version}</div>
            </div>
            <button className="btn-danger" onClick={() => remove(kb._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
