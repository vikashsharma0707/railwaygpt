// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { knowledgeApi } from '../../api/endpoints';

// export default function AdminKnowledge() {
//   const [list, setList] = useState([]);
//   const { register, handleSubmit, reset } = useForm();
//   const reload = () => knowledgeApi.list().then((r) => setList(r.data.data));
//   useEffect(() => { reload(); }, []);

//   const onSubmit = async (d) => {
//     try { await knowledgeApi.upload(d); toast.success('Ingested'); reset(); reload(); }
//     catch (e) { toast.error(e?.response?.data?.message || 'Failed'); }
//   };
//   const remove = async (id) => { await knowledgeApi.remove(id); toast.success('Deleted'); reload(); };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold">Knowledge Base</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 space-y-3">
//         <div><label className="label">Title</label><input className="input" {...register('title', { required: true })} /></div>
//         <div className="grid md:grid-cols-2 gap-3">
//           <div><label className="label">Category</label>
//             <select className="input" {...register('category')}><option>faq</option><option>policy</option><option>rule</option><option>document</option><option>manual</option></select>
//           </div>
//           <div><label className="label">Tags (comma)</label><input className="input" {...register('tags')} /></div>
//         </div>
//         <div><label className="label">Content</label><textarea rows={6} className="input" {...register('content', { required: true })} /></div>
//         <button className="btn-primary">Ingest</button>
//       </form>

//       <div className="mt-6 space-y-2">
//         {list.map((kb) => (
//           <div key={kb._id} className="card flex items-center justify-between">
//             <div>
//               <div className="font-semibold">{kb.title}</div>
//               <div className="text-xs text-slate-400">{kb.category} · v{kb.version}</div>
//             </div>
//             <button className="btn-danger" onClick={() => remove(kb._id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


/**
 * AdminKnowledge.jsx
 * Route: /admin/knowledge  (already in your App.jsx)
 * 
 * Admin kar sakta hai:
 * 1. Policy text se add/edit/delete
 * 2. FAQ add/edit/delete
 * 3. PDF/DOCX upload (auto-extracted)
 * 4. One-click seed (pre-loaded railway policies)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FiPlus, FiEdit2, FiTrash2, FiUploadCloud,
  FiToggleLeft, FiToggleRight, FiX, FiCheck,
  FiFile, FiMessageSquare, FiBook,
  FiLoader, FiAlertCircle, FiCheckCircle,
} from 'react-icons/fi';
import { policyApi } from '../../api/endpoints';

const POLICY_CATS = ['refund','tatkal','concession','pnr','booking','general'];
const FAQ_CATS    = ['booking','payment','cancellation','pnr','tatkal','general'];

// ─── Status badge for uploaded docs ──────────────────────────────────────────
function DocStatus({ status }) {
  const cfg = {
    processing: { Icon: FiLoader,       cls: 'text-amber-400  bg-amber-400/10  border-amber-400/20',  label: 'Processing', spin: true  },
    ready:      { Icon: FiCheckCircle,  cls: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', label: 'Ready',   spin: false },
    failed:     { Icon: FiAlertCircle,  cls: 'text-rose-400   bg-rose-400/10   border-rose-400/20',   label: 'Failed',     spin: false },
  };
  const c = cfg[status] || cfg.processing;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${c.cls}`}>
      <c.Icon size={9} className={c.spin ? 'animate-spin' : ''}/>
      {c.label}
    </span>
  );
}

// ─── Policy Form Modal ────────────────────────────────────────────────────────
function PolicyModal({ item, onClose, onSave }) {
  const [form,   setForm]   = useState(item || { title: '', category: 'general', content: '', tags: '' });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!form.title?.trim() || !form.content?.trim()) {
      return toast.error('Title aur content required hai');
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: typeof form.tags === 'string'
          ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
          : form.tags,
      };
      if (item?._id) await policyApi.updatePolicy(item._id, payload);
      else           await policyApi.createPolicy(payload);
      toast.success(item ? 'Policy updated' : 'Policy added');
      onSave();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(6,8,16,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
        className="w-full max-w-2xl rounded-2xl border border-white/[0.08] p-6 max-h-[90vh] overflow-y-auto"
        style={{ background: '#0A0F1E' }} onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg">{item ? 'Edit Policy' : 'Add Policy'}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 transition-colors">
            <FiX size={18}/>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Tatkal Cancellation Policy"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"/>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0A0F1E] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50">
              {POLICY_CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Policy Content *</label>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
              rows={10} placeholder="Complete policy text yahan likho..."
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 resize-none font-mono text-xs leading-relaxed"/>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Tags (comma separated)</label>
            <input value={typeof form.tags === 'string' ? form.tags : form.tags?.join(', ')}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              placeholder="cancel, refund, tatkal"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"/>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 rounded-xl border border-white/[0.1] py-2.5 text-sm text-slate-300 hover:bg-white/[0.05] transition-colors">
            Cancel
          </button>
          <button onClick={save} disabled={saving}
            className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg,#4338CA,#06B6D4)' }}>
            {saving ? <><FiLoader size={13} className="animate-spin"/> Saving...</> : <><FiCheck size={13}/> Save Policy</>}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── FAQ Form Modal ───────────────────────────────────────────────────────────
function FAQModal({ item, onClose, onSave }) {
  const [form,   setForm]   = useState(item || { question: '', answer: '', category: 'general', tags: '' });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!form.question?.trim() || !form.answer?.trim()) {
      return toast.error('Question aur answer required hai');
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: typeof form.tags === 'string'
          ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
          : form.tags,
      };
      if (item?._id) await policyApi.updateFAQ(item._id, payload);
      else           await policyApi.createFAQ(payload);
      toast.success(item ? 'FAQ updated' : 'FAQ added');
      onSave();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(6,8,16,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
        className="w-full max-w-xl rounded-2xl border border-white/[0.08] p-6"
        style={{ background: '#0A0F1E' }} onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg">{item ? 'Edit FAQ' : 'Add FAQ'}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400"><FiX size={18}/></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Question *</label>
            <input value={form.question} onChange={e => setForm({ ...form, question: e.target.value })}
              placeholder="User kya poochh sakta hai?"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"/>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Answer *</label>
            <textarea value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })}
              rows={5} placeholder="Complete answer..."
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 resize-none"/>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0A0F1E] px-4 py-2.5 text-sm text-white focus:outline-none">
              {FAQ_CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block">Tags</label>
            <input value={typeof form.tags === 'string' ? form.tags : form.tags?.join(', ')}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              placeholder="refund, cancel, time"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"/>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 rounded-xl border border-white/[0.1] py-2.5 text-sm text-slate-300 hover:bg-white/[0.05]">Cancel</button>
          <button onClick={save} disabled={saving}
            className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg,#4338CA,#06B6D4)' }}>
            {saving ? <><FiLoader size={13} className="animate-spin"/> Saving...</> : 'Save FAQ'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminKnowledge() {
  const [tab,       setTab]       = useState('policies');
  const [policies,  setPolicies]  = useState([]);
  const [faqs,      setFaqs]      = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [modal,     setModal]     = useState(null);   // null | 'policy' | 'faq'
  const [editItem,  setEditItem]  = useState(null);
  const [seeding,   setSeeding]   = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [p, f, d] = await Promise.all([
        policyApi.listPolicies(),
        policyApi.listFAQs(),
        policyApi.listDocuments(),
      ]);
      setPolicies(p.data.data ?? []);
      setFaqs(f.data.data ?? []);
      setDocuments(d.data.data ?? []);
    } catch (e) {
      toast.error('Load failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // Poll for processing docs
    const interval = setInterval(() => {
      setDocuments(prev => {
        if (prev.some(d => d.status === 'processing')) load();
        return prev;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await policyApi.seed();
      if (res.data.data?.skipped) {
        toast('Policies already seeded', { icon: 'ℹ️' });
      } else {
        toast.success(`Seeded: ${res.data.data.policies} policies + ${res.data.data.faqs} FAQs`);
      }
      load();
    } catch (e) {
      toast.error('Seed failed');
    } finally {
      setSeeding(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('category', 'general');
      await policyApi.uploadDocument(form);
      toast.success(`${file.name} uploaded — processing...`);
      load();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const deletePolicy = async (id) => {
    if (!confirm('Delete karna chahte ho?')) return;
    await policyApi.deletePolicy(id);
    toast.success('Policy deleted');
    load();
  };

  const deleteFAQ = async (id) => {
    if (!confirm('Delete karna chahte ho?')) return;
    await policyApi.deleteFAQ(id);
    toast.success('FAQ deleted');
    load();
  };

  const deleteDocument = async (id) => {
    if (!confirm('Document delete hoga?')) return;
    await policyApi.deleteDocument(id);
    toast.success('Document deleted');
    load();
  };

  const togglePolicy = async (p) => {
    await policyApi.updatePolicy(p._id, { ...p, isActive: !p.isActive });
    load();
  };

  const toggleFAQ = async (f) => {
    await policyApi.updateFAQ(f._id, { ...f, isActive: !f.isActive });
    load();
  };

  const TABS = [
    { key: 'policies',  label: `Policies (${policies.length})`,   Icon: FiBook           },
    { key: 'faqs',      label: `FAQs (${faqs.length})`,           Icon: FiMessageSquare  },
    { key: 'documents', label: `PDFs (${documents.length})`,      Icon: FiFile           },
  ];

  return (
    <div className="min-h-screen text-white p-6"
      style={{ background: 'linear-gradient(160deg,#060810 0%,#080D1A 60%,#060810 100%)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-[11px] font-mono text-indigo-400 tracking-[0.2em] mb-1">ADMIN</p>
          <h1 className="text-3xl font-bold">Knowledge Base</h1>
          <p className="text-slate-400 text-sm mt-1">
            Railway policies aur FAQs manage karo — RAG ka source yahi hai
          </p>
        </motion.div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Seed button */}
          <button onClick={handleSeed} disabled={seeding}
            className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10
              hover:bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-2 transition-all disabled:opacity-50">
            {seeding ? <FiLoader size={13} className="animate-spin"/> : '🌱'}
            {seeding ? 'Seeding...' : 'Seed Railway Policies'}
          </button>

          {/* PDF upload */}
          <label className={`flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10
            hover:bg-cyan-500/20 text-cyan-400 text-sm font-medium px-4 py-2 transition-all cursor-pointer
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {uploading ? <FiLoader size={13} className="animate-spin"/> : <FiUploadCloud size={13}/>}
            {uploading ? 'Uploading...' : 'Upload PDF / DOCX'}
            <input type="file" accept=".pdf,.docx,.txt" className="hidden"
              onChange={handleUpload} disabled={uploading}/>
          </label>

          {/* Add policy/FAQ */}
          <button
            onClick={() => { setEditItem(null); setModal(tab === 'policies' ? 'policy' : 'faq'); }}
            className="ml-auto flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg,#4338CA,#06B6D4)' }}>
            <FiPlus size={14}/>
            Add {tab === 'policies' ? 'Policy' : tab === 'faqs' ? 'FAQ' : 'Document'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === t.key
                  ? 'bg-indigo-600 text-white'
                  : 'border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}>
              <t.Icon size={13}/>{t.label}
            </button>
          ))}
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-20 rounded-2xl animate-pulse" style={{ background: 'rgba(10,15,30,0.5)' }}/>
            ))}
          </div>
        )}

        {/* ── Policies Tab ──────────────────────────────────────────────── */}
        {!loading && tab === 'policies' && (
          <div className="space-y-3">
            {policies.length === 0 && (
              <div className="text-center py-16 text-slate-500">
                <FiBook size={32} className="mx-auto mb-3 opacity-30"/>
                <p>Koi policy nahi hai. "Seed Railway Policies" click karo ya manually add karo.</p>
              </div>
            )}
            {policies.map(p => (
              <motion.div key={p._id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/[0.07] p-5 transition-opacity"
                style={{ background: 'rgba(10,15,30,0.7)', opacity: p.isActive ? 1 : 0.5 }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-white text-sm">{p.title}</span>
                      <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                        {p.category}
                      </span>
                      {!p.isActive && (
                        <span className="text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md">inactive</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{p.content.slice(0, 140)}...</p>
                    {p.tags?.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {p.tags.map(t => (
                          <span key={t} className="text-[9px] font-mono text-slate-500 bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => togglePolicy(p)}
                      className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors" title="Toggle active">
                      {p.isActive
                        ? <FiToggleRight size={18} className="text-emerald-400"/>
                        : <FiToggleLeft  size={18} className="text-slate-500"/>}
                    </button>
                    <button onClick={() => { setEditItem(p); setModal('policy'); }}
                      className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors">
                      <FiEdit2 size={14}/>
                    </button>
                    <button onClick={() => deletePolicy(p._id)}
                      className="p-2 rounded-lg hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-colors">
                      <FiTrash2 size={14}/>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── FAQs Tab ──────────────────────────────────────────────────── */}
        {!loading && tab === 'faqs' && (
          <div className="space-y-3">
            {faqs.length === 0 && (
              <div className="text-center py-16 text-slate-500">
                <FiMessageSquare size={32} className="mx-auto mb-3 opacity-30"/>
                <p>Koi FAQ nahi hai. "Seed Railway Policies" se auto-add ho jayenge.</p>
              </div>
            )}
            {faqs.map(f => (
              <motion.div key={f._id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/[0.07] p-5"
                style={{ background: 'rgba(10,15,30,0.7)', opacity: f.isActive ? 1 : 0.5 }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-white text-sm">{f.question}</span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                        {f.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{f.answer}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => toggleFAQ(f)} className="p-2 rounded-lg hover:bg-white/[0.06]">
                      {f.isActive
                        ? <FiToggleRight size={18} className="text-emerald-400"/>
                        : <FiToggleLeft  size={18} className="text-slate-500"/>}
                    </button>
                    <button onClick={() => { setEditItem(f); setModal('faq'); }}
                      className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 hover:text-white">
                      <FiEdit2 size={14}/>
                    </button>
                    <button onClick={() => deleteFAQ(f._id)}
                      className="p-2 rounded-lg hover:bg-rose-500/10 text-slate-500 hover:text-rose-400">
                      <FiTrash2 size={14}/>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Documents Tab ─────────────────────────────────────────────── */}
        {!loading && tab === 'documents' && (
          <div className="space-y-3">
            {documents.length === 0 && (
              <div className="text-center py-16 text-slate-500">
                <FiFile size={32} className="mx-auto mb-3 opacity-30"/>
                <p>Koi document upload nahi hua. "Upload PDF / DOCX" click karo.</p>
                <p className="text-xs mt-2">System automatically text extract karega aur RAG mein index karega.</p>
              </div>
            )}
            {documents.map(d => (
              <motion.div key={d._id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/[0.07] p-5 flex items-center gap-4"
                style={{ background: 'rgba(10,15,30,0.7)' }}>
                <span className="text-2xl flex-shrink-0">
                  {d.mimeType?.includes('pdf') ? '📄' : d.mimeType?.includes('word') ? '📝' : '📃'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white text-sm truncate">{d.originalName}</span>
                    <DocStatus status={d.status}/>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono flex gap-3">
                    <span>{(d.size / 1024).toFixed(1)} KB</span>
                    {d.status === 'ready' && <><span>{d.chunkCount} chunks</span><span>{d.pageCount} pages</span></>}
                    {d.status === 'failed' && <span className="text-rose-400">{d.errorMessage}</span>}
                  </div>
                </div>
                <button onClick={() => deleteDocument(d._id)}
                  className="p-2 rounded-lg hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 flex-shrink-0">
                  <FiTrash2 size={15}/>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modal === 'policy' && (
          <PolicyModal item={editItem}
            onClose={() => { setModal(null); setEditItem(null); }}
            onSave={() => { setModal(null); setEditItem(null); load(); }}/>
        )}
        {modal === 'faq' && (
          <FAQModal item={editItem}
            onClose={() => { setModal(null); setEditItem(null); }}
            onSave={() => { setModal(null); setEditItem(null); load(); }}/>
        )}
      </AnimatePresence>
    </div>
  );
}