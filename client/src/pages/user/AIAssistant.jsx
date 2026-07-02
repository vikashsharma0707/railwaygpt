// // // // // import { useEffect, useRef, useState } from 'react';
// // // // // import { FiSend, FiPlus, FiTrash2 } from 'react-icons/fi';
// // // // // import toast from 'react-hot-toast';
// // // // // import { aiApi } from '../../api/endpoints';

// // // // // const SUGGESTED = [
// // // // //   'Kal Mumbai jana hai',
// // // // //   'Mera PNR 1234567890 check karo',
// // // // //   'Tatkal ticket Delhi to Lucknow kal ke liye',
// // // // //   'WL 42 confirm hoga kya?',
// // // // //   'Agra trip plan kar do, 2 din, 8000 ka budget',
// // // // // ];

// // // // // export default function AIAssistant() {
// // // // //   const [agents, setAgents] = useState([]);
// // // // //   const [agent, setAgent] = useState('railway-master');
// // // // //   const [conversations, setConvos] = useState([]);
// // // // //   const [active, setActive] = useState(null);
// // // // //   const [messages, setMessages] = useState([]);
// // // // //   const [input, setInput] = useState('');
// // // // //   const [busy, setBusy] = useState(false);
// // // // //   const endRef = useRef(null);

// // // // //   useEffect(() => { aiApi.agents().then((r) => setAgents(r.data.data)).catch(()=>{}); reloadConvos(); }, []);
// // // // //   useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

// // // // //   const reloadConvos = async () => {
// // // // //     try { const r = await aiApi.conversations(); setConvos(r.data.data); } catch {}
// // // // //   };
// // // // //   const openConvo = async (id) => {
// // // // //     setActive(id);
// // // // //     const r = await aiApi.conversation(id);
// // // // //     setMessages(r.data.data.messages || []);
// // // // //   };
// // // // //   const newChat = () => { setActive(null); setMessages([]); };

// // // // //   const send = async () => {
// // // // //     if (!input.trim() || busy) return;
// // // // //     const userMsg = { role: 'user', content: input };
// // // // //     setMessages((m) => [...m, userMsg]);
// // // // //     setBusy(true); const text = input; setInput('');
// // // // //     try {
// // // // //       const r = await aiApi.chat({ conversationId: active, message: text, agent });
// // // // //       setActive(r.data.data.conversationId);
// // // // //       setMessages(r.data.data.messages);
// // // // //       reloadConvos();
// // // // //     } catch (e) {
// // // // //       toast.error(e?.response?.data?.message || 'AI request failed');
// // // // //       setMessages((m) => [...m, { role: 'assistant', content: '⚠️ Failed to reach the AI service.' }]);
// // // // //     } finally { setBusy(false); }
// // // // //   };

// // // // //   const remove = async (id) => {
// // // // //     await aiApi.remove(id); reloadConvos(); if (active === id) newChat();
// // // // //   };

// // // // //   return (
// // // // //     <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-64px-72px)]">
// // // // //       <aside className="card flex flex-col min-h-0">
// // // // //         <button onClick={newChat} className="btn-primary"><FiPlus className="mr-1"/> New chat</button>
// // // // //         <div className="mt-3">
// // // // //           <label className="label">Agent</label>
// // // // //           <select className="input" value={agent} onChange={(e) => setAgent(e.target.value)}>
// // // // //             {agents.map((a) => <option key={a.key} value={a.key}>{a.name}</option>)}
// // // // //           </select>
// // // // //         </div>
// // // // //         <div className="mt-4 text-xs uppercase text-slate-400">History</div>
// // // // //         <div className="mt-2 flex-1 overflow-auto scroll-thin space-y-1">
// // // // //           {conversations.map((c) => (
// // // // //             <div key={c._id} className={`group flex items-center gap-2 px-2 py-2 rounded cursor-pointer ${active === c._id ? 'bg-white/10' : 'hover:bg-white/5'}`} onClick={() => openConvo(c._id)}>
// // // // //               <div className="flex-1 truncate text-sm">{c.title}</div>
// // // // //               <button onClick={(e) => { e.stopPropagation(); remove(c._id); }} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-400"><FiTrash2 /></button>
// // // // //             </div>
// // // // //           ))}
// // // // //           {conversations.length === 0 && <div className="text-xs text-slate-500 px-2">No conversations yet.</div>}
// // // // //         </div>
// // // // //       </aside>

// // // // //       <section className="card flex flex-col min-h-0">
// // // // //         <div className="flex-1 overflow-auto scroll-thin space-y-3 pr-2">
// // // // //           {messages.length === 0 && (
// // // // //             <div className="text-center py-10">
// // // // //               <div className="text-4xl">🤖</div>
// // // // //               <h2 className="text-xl font-semibold mt-2">How can RailwayGPT help?</h2>
// // // // //               <div className="mt-4 flex flex-wrap gap-2 justify-center">
// // // // //                 {SUGGESTED.map((s) => (
// // // // //                   <button key={s} className="chip hover:bg-white/20" onClick={() => setInput(s)}>{s}</button>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>
// // // // //           )}
// // // // //           {messages.filter(m => m.role !== 'tool').map((m, i) => (
// // // // //             <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
// // // // //               <div className={`max-w-[80%] rounded-2xl px-4 py-2 whitespace-pre-wrap ${m.role === 'user' ? 'bg-brand-600 text-white' : 'bg-white/5 border border-white/10'}`}>
// // // // //                 {m.content || (m.toolCalls ? `🔧 Calling ${m.toolCalls.map(t => t.function?.name).join(', ')}…` : '')}
// // // // //               </div>
// // // // //             </div>
// // // // //           ))}
// // // // //           {busy && <div className="text-slate-400 text-sm">RailwayGPT is thinking…</div>}
// // // // //           <div ref={endRef} />
// // // // //         </div>
// // // // //         <div className="mt-3 flex gap-2">
// // // // //           <textarea
// // // // //             value={input}
// // // // //             onChange={(e) => setInput(e.target.value)}
// // // // //             onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
// // // // //             placeholder="Ask anything about trains, PNR, refunds, planning…"
// // // // //             rows={1}
// // // // //             className="input resize-none"
// // // // //           />
// // // // //           <button className="btn-primary" onClick={send} disabled={busy}><FiSend /></button>
// // // // //         </div>
// // // // //       </section>
// // // // //     </div>
// // // // //   );
// // // // // }








// // // // import { useEffect, useRef, useState } from 'react';
// // // // import { FiSend, FiPlus, FiTrash2 } from 'react-icons/fi';
// // // // import toast from 'react-hot-toast';
// // // // import { aiApi } from '../../api/endpoints';

// // // // const SUGGESTED = [
// // // //   'Kal Mumbai jana hai',
// // // //   'Mera PNR 1234567890 check karo',
// // // //   'Tatkal ticket Delhi to Lucknow kal ke liye',
// // // //   'WL 42 confirm hoga kya?',
// // // //   'Agra trip plan kar do, 2 din, 8000 ka budget',
// // // // ];

// // // // export default function AIAssistant() {
// // // //   const [agents, setAgents] = useState([]);
// // // //   const [selectedAgent, setSelectedAgent] = useState('railway-master');
// // // //   const [conversations, setConvos] = useState([]);
// // // //   const [activeConversation, setActiveConversation] = useState(null);
// // // //   const [messages, setMessages] = useState([]);
// // // //   const [input, setInput] = useState('');
// // // //   const [busy, setBusy] = useState(false);
// // // //   const endRef = useRef(null);

// // // //   useEffect(() => {
// // // //     loadAgents();
// // // //     reloadConvos();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     endRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // //   }, [messages]);

// // // //   const loadAgents = async () => {
// // // //     try {
// // // //       const res = await aiApi.agents();
// // // //       setAgents(res.data?.data || []);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //     }
// // // //   };

// // // //   const reloadConvos = async () => {
// // // //     try {
// // // //       const res = await aiApi.conversations();
// // // //       setConvos(res.data?.data || []);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //     }
// // // //   };

// // // //   const openConvo = async (id) => {
// // // //     setActiveConversation(id);
// // // //     try {
// // // //       const res = await aiApi.conversation(id);
// // // //       setMessages(res.data?.data?.messages || []);
// // // //     } catch (err) {
// // // //       toast.error("Failed to load conversation");
// // // //     }
// // // //   };

// // // //   const newChat = () => {
// // // //     setActiveConversation(null);
// // // //     setMessages([]);
// // // //   };

// // // //   const send = async () => {
// // // //     if (!input.trim() || busy) return;

// // // //     const userMessage = { role: 'user', content: input };
// // // //     setMessages(prev => [...prev, userMessage]);
// // // //     const currentInput = input;
// // // //     setInput('');
// // // //     setBusy(true);

// // // //     try {
// // // //       const payload = {
// // // //         message: currentInput,
// // // //         agent: selectedAgent,
// // // //         ...(activeConversation && { conversationId: activeConversation }), // Only send if exists
// // // //       };

// // // //       console.log("Sending to AI:", payload);

// // // //       const res = await aiApi.chat(payload);

// // // //       // Update conversation ID if new chat
// // // //       if (res.data?.data?.conversationId) {
// // // //         setActiveConversation(res.data.data.conversationId);
// // // //       }

// // // //       setMessages(res.data?.data?.messages || []);
// // // //       reloadConvos();
// // // //     } catch (err) {
// // // //       console.error("AI Chat Error:", err.response?.data || err);
// // // //       toast.error(err.response?.data?.message || "AI service failed");

// // // //       setMessages(prev => [...prev, {
// // // //         role: 'assistant',
// // // //         content: "⚠️ Sorry, I'm having trouble responding right now. Please try again."
// // // //       }]);
// // // //     } finally {
// // // //       setBusy(false);
// // // //     }
// // // //   };

// // // //   const removeConversation = async (id) => {
// // // //     try {
// // // //       await aiApi.remove(id);
// // // //       reloadConvos();
// // // //       if (activeConversation === id) newChat();
// // // //     } catch (err) {
// // // //       toast.error("Failed to delete conversation");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-64px-72px)]">
// // // //       {/* Sidebar */}
// // // //       <aside className="bg-gray-900 border border-gray-700 rounded-3xl p-4 flex flex-col min-h-0">
// // // //         <button 
// // // //           onClick={newChat} 
// // // //           className="btn-primary flex items-center justify-center gap-2 py-3 mb-4"
// // // //         >
// // // //           <FiPlus /> New Chat
// // // //         </button>

// // // //         <div className="mb-4">
// // // //           <label className="block text-sm text-slate-400 mb-2">Select Agent</label>
// // // //           <select 
// // // //             className="input w-full" 
// // // //             value={selectedAgent} 
// // // //             onChange={(e) => setSelectedAgent(e.target.value)}
// // // //           >
// // // //             {agents.map((a) => (
// // // //               <option key={a.key} value={a.key}>{a.name}</option>
// // // //             ))}
// // // //           </select>
// // // //         </div>

// // // //         <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">Recent</div>
        
// // // //         <div className="flex-1 overflow-auto space-y-1 pr-2 scroll-thin">
// // // //           {conversations.map((conv) => (
// // // //             <div 
// // // //               key={conv._id} 
// // // //               className={`group flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
// // // //                 activeConversation === conv._id ? 'bg-violet-600 text-white' : 'hover:bg-gray-800'
// // // //               }`}
// // // //               onClick={() => openConvo(conv._id)}
// // // //             >
// // // //               <div className="flex-1 truncate text-sm">{conv.title || "New Conversation"}</div>
// // // //               <button 
// // // //                 onClick={(e) => { e.stopPropagation(); removeConversation(conv._id); }}
// // // //                 className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 p-1"
// // // //               >
// // // //                 <FiTrash2 size={16} />
// // // //               </button>
// // // //             </div>
// // // //           ))}
// // // //           {conversations.length === 0 && (
// // // //             <div className="text-slate-500 text-sm px-3 py-8 text-center">No conversations yet</div>
// // // //           )}
// // // //         </div>
// // // //       </aside>

// // // //       {/* Chat Area */}
// // // //       <section className="bg-gray-900 border border-gray-700 rounded-3xl flex flex-col min-h-0 overflow-hidden">
// // // //         <div className="flex-1 overflow-auto p-6 space-y-6 scroll-thin">
// // // //           {messages.length === 0 && (
// // // //             <div className="text-center py-20">
// // // //               <div className="text-6xl mb-4">🚄</div>
// // // //               <h2 className="text-2xl font-semibold">How can I help you today?</h2>
// // // //               <div className="mt-6 flex flex-wrap gap-2 justify-center">
// // // //                 {SUGGESTED.map((suggestion) => (
// // // //                   <button
// // // //                     key={suggestion}
// // // //                     onClick={() => setInput(suggestion)}
// // // //                     className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-violet-500 px-5 py-2.5 rounded-2xl text-sm transition"
// // // //                   >
// // // //                     {suggestion}
// // // //                   </button>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {messages.map((msg, i) => (
// // // //             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
// // // //               <div className={`max-w-[85%] px-5 py-3 rounded-3xl ${
// // // //                 msg.role === 'user' 
// // // //                   ? 'bg-violet-600 text-white' 
// // // //                   : 'bg-gray-800 border border-gray-700'
// // // //               }`}>
// // // //                 {msg.content}
// // // //               </div>
// // // //             </div>
// // // //           ))}

// // // //           {busy && (
// // // //             <div className="flex items-center gap-3 text-slate-400">
// // // //               <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
// // // //               RailwayGPT is thinking...
// // // //             </div>
// // // //           )}

// // // //           <div ref={endRef} />
// // // //         </div>

// // // //         {/* Input */}
// // // //         <div className="p-4 border-t border-gray-700 bg-gray-900">
// // // //           <div className="flex gap-2">
// // // //             <textarea
// // // //               value={input}
// // // //               onChange={(e) => setInput(e.target.value)}
// // // //               onKeyDown={(e) => {
// // // //                 if (e.key === 'Enter' && !e.shiftKey) {
// // // //                   e.preventDefault();
// // // //                   send();
// // // //                 }
// // // //               }}
// // // //               placeholder="Ask anything about trains, PNR, booking..."
// // // //               rows={1}
// // // //               className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3 resize-none focus:outline-none focus:border-violet-500"
// // // //             />
// // // //             <button
// // // //               onClick={send}
// // // //               disabled={busy || !input.trim()}
// // // //               className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 px-6 rounded-2xl flex items-center justify-center"
// // // //             >
// // // //               <FiSend size={22} />
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </section>
// // // //     </div>
// // // //   );
// // // // }





// // // import { useEffect, useRef, useState } from 'react';
// // // import { FiSend, FiPlus, FiTrash2, FiZap } from 'react-icons/fi';
// // // import toast from 'react-hot-toast';
// // // import { aiApi } from '../../api/endpoints';

// // // const SUGGESTED = [
// // //   'Kal Mumbai jana hai',
// // //   'Mera PNR 1234567890 check karo',
// // //   'Tatkal ticket Delhi to Lucknow kal ke liye',
// // //   'WL 42 confirm hoga kya?',
// // //   'Agra trip plan kar do, 2 din, 8000 ka budget',
// // // ];

// // // /** Group agents by category for the dropdown */
// // // const GROUP_LABELS = {
// // //   master: '🧠 Master',
// // //   booking: '🎫 Booking',
// // //   search: '🔍 Search',
// // //   trip: '🗺️ Trip',
// // //   pnr: '📋 PNR',
// // //   prediction: '📈 Prediction',
// // //   notification: '🔔 Notification',
// // //   payment: '💳 Payment',
// // //   admin: '⚙️ Admin',
// // //   rag: '📚 Knowledge',
// // //   enterprise: '🏢 Enterprise',
// // //   hackathon: '🚀 Special',
// // // };

// // // function groupAgents(agents) {
// // //   const groups = {};
// // //   for (const agent of agents) {
// // //     const cat = agent.category || 'other';
// // //     if (!groups[cat]) groups[cat] = [];
// // //     groups[cat].push(agent);
// // //   }
// // //   return groups;
// // // }

// // // /** Render message content — newlines become <br /> */
// // // function MessageContent({ content }) {
// // //   return (
// // //     <span>
// // //       {content.split('\n').map((line, i, arr) => (
// // //         <span key={i}>
// // //           {line}
// // //           {i < arr.length - 1 && <br />}
// // //         </span>
// // //       ))}
// // //     </span>
// // //   );
// // // }

// // // export default function AIAssistant() {
// // //   const [agents, setAgents] = useState([]);
// // //   const [selectedAgent, setSelectedAgent] = useState('railway-master');
// // //   const [conversations, setConvos] = useState([]);
// // //   const [activeConversation, setActiveConversation] = useState(null);
// // //   const [messages, setMessages] = useState([]);
// // //   const [input, setInput] = useState('');
// // //   const [busy, setBusy] = useState(false);
// // //   const endRef = useRef(null);
// // //   const textareaRef = useRef(null);

// // //   useEffect(() => {
// // //     loadAgents();
// // //     reloadConvos();
// // //   }, []);

// // //   useEffect(() => {
// // //     endRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //   }, [messages]);

// // //   // Auto-resize textarea
// // //   useEffect(() => {
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = 'auto';
// // //       textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
// // //     }
// // //   }, [input]);

// // //   const loadAgents = async () => {
// // //     try {
// // //       const res = await aiApi.agents();
// // //       setAgents(res.data?.data || []);
// // //     } catch (err) {
// // //       console.error('Failed to load agents:', err);
// // //     }
// // //   };

// // //   const reloadConvos = async () => {
// // //     try {
// // //       const res = await aiApi.conversations();
// // //       setConvos(res.data?.data || []);
// // //     } catch (err) {
// // //       console.error('Failed to load conversations:', err);
// // //     }
// // //   };

// // //   const openConvo = async (id) => {
// // //     setActiveConversation(id);
// // //     try {
// // //       const res = await aiApi.conversation(id);
// // //       setMessages(res.data?.data?.messages || []);
// // //     } catch (err) {
// // //       toast.error('Conversation load nahi ho paya');
// // //     }
// // //   };

// // //   const newChat = () => {
// // //     setActiveConversation(null);
// // //     setMessages([]);
// // //     setInput('');
// // //   };

// // //   const send = async () => {
// // //     const text = input.trim();
// // //     if (!text || busy) return;

// // //     // Append user message immediately for responsiveness
// // //     setMessages((prev) => [...prev, { role: 'user', content: text }]);
// // //     setInput('');
// // //     setBusy(true);

// // //     try {
// // //       const payload = {
// // //         message: text,
// // //         agent: selectedAgent,
// // //         ...(activeConversation && { conversationId: activeConversation }),
// // //       };

// // //       const res = await aiApi.chat(payload);

// // //       if (res.data?.data?.conversationId) {
// // //         setActiveConversation(res.data.data.conversationId);
// // //       }

// // //       // Replace messages with the full conversation returned by server
// // //       // (includes DB-sourced assistant reply)
// // //       const serverMessages = res.data?.data?.messages;
// // //       if (serverMessages?.length) {
// // //         setMessages(serverMessages);
// // //       } else {
// // //         // Fallback: show a neutral error — NOT a hallucinated answer
// // //         setMessages((prev) => [
// // //           ...prev,
// // //           {
// // //             role: 'assistant',
// // //             content:
// // //               'Yeh information abhi database se fetch nahi ho payi. Kripya dobara try karein ya kuch der baad try karein.',
// // //           },
// // //         ]);
// // //       }

// // //       reloadConvos();
// // //     } catch (err) {
// // //       console.error('AI Chat Error:', err.response?.data || err);
// // //       toast.error(err.response?.data?.message || 'AI service unavailable');

// // //       // Show a neutral fallback — NOT a fabricated answer
// // //       setMessages((prev) => [
// // //         ...prev,
// // //         {
// // //           role: 'assistant',
// // //           content:
// // //             '⚠️ Server se data nahi aa paya. Kripya dobara try karein. Agar problem continue ho to support se contact karein.',
// // //         },
// // //       ]);
// // //     } finally {
// // //       setBusy(false);
// // //     }
// // //   };

// // //   const removeConversation = async (id) => {
// // //     try {
// // //       await aiApi.remove(id);
// // //       reloadConvos();
// // //       if (activeConversation === id) newChat();
// // //     } catch (err) {
// // //       toast.error('Conversation delete nahi hui');
// // //     }
// // //   };

// // //   const agentGroups = groupAgents(agents);
// // //   const currentAgent = agents.find((a) => a.key === selectedAgent);

// // //   return (
// // //     <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-64px-72px)]">

// // //       {/* ── Sidebar ── */}
// // //       <aside className="bg-gray-900 border border-gray-700 rounded-3xl p-4 flex flex-col min-h-0 gap-3">

// // //         <button
// // //           onClick={newChat}
// // //           className="btn-primary flex items-center justify-center gap-2 py-3"
// // //         >
// // //           <FiPlus /> New Chat
// // //         </button>

// // //         {/* Agent selector */}
// // //         <div>
// // //           <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">
// // //             Agent
// // //           </label>
// // //           <select
// // //             className="input w-full text-sm"
// // //             value={selectedAgent}
// // //             onChange={(e) => setSelectedAgent(e.target.value)}
// // //           >
// // //             {Object.entries(agentGroups).map(([cat, list]) => (
// // //               <optgroup key={cat} label={GROUP_LABELS[cat] || cat}>
// // //                 {list.map((a) => (
// // //                   <option key={a.key} value={a.key}>
// // //                     {a.name}
// // //                   </option>
// // //                 ))}
// // //               </optgroup>
// // //             ))}
// // //           </select>

// // //           {/* Active agent badge */}
// // //           {currentAgent && (
// // //             <div className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-violet-900/40 border border-violet-700 rounded-xl text-xs text-violet-300">
// // //               <FiZap size={12} className="shrink-0" />
// // //               <span className="truncate">{currentAgent.name}</span>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Recent conversations */}
// // //         <div className="text-xs uppercase tracking-widest text-slate-400">Recent</div>

// // //         <div className="flex-1 overflow-auto space-y-1 pr-1 scroll-thin">
// // //           {conversations.map((conv) => (
// // //             <div
// // //               key={conv._id}
// // //               className={`group flex items-center gap-2 px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
// // //                 activeConversation === conv._id
// // //                   ? 'bg-violet-600 text-white'
// // //                   : 'hover:bg-gray-800 text-slate-300'
// // //               }`}
// // //               onClick={() => openConvo(conv._id)}
// // //             >
// // //               <div className="flex-1 truncate text-sm">
// // //                 {conv.title || 'New Conversation'}
// // //               </div>
// // //               <button
// // //                 onClick={(e) => {
// // //                   e.stopPropagation();
// // //                   removeConversation(conv._id);
// // //                 }}
// // //                 className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 p-1 shrink-0"
// // //                 title="Delete"
// // //               >
// // //                 <FiTrash2 size={14} />
// // //               </button>
// // //             </div>
// // //           ))}

// // //           {conversations.length === 0 && (
// // //             <p className="text-slate-500 text-sm text-center py-8">
// // //               Koi conversation nahi hai abhi
// // //             </p>
// // //           )}
// // //         </div>
// // //       </aside>

// // //       {/* ── Chat Area ── */}
// // //       <section className="bg-gray-900 border border-gray-700 rounded-3xl flex flex-col min-h-0 overflow-hidden">

// // //         {/* Message list */}
// // //         <div className="flex-1 overflow-auto p-6 space-y-5 scroll-thin">

// // //           {/* Empty state */}
// // //           {messages.length === 0 && (
// // //             <div className="text-center py-16 select-none">
// // //               <div className="text-6xl mb-4">🚄</div>
// // //               <h2 className="text-2xl font-semibold mb-1">Namaste! Kya poochna hai?</h2>
// // //               <p className="text-slate-400 text-sm mb-6">
// // //                 Sare jawab live database se aate hain — koi guess nahi.
// // //               </p>
// // //               <div className="flex flex-wrap gap-2 justify-center">
// // //                 {SUGGESTED.map((s) => (
// // //                   <button
// // //                     key={s}
// // //                     onClick={() => setInput(s)}
// // //                     className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-violet-500 px-4 py-2 rounded-2xl text-sm transition"
// // //                   >
// // //                     {s}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Messages */}
// // //           {messages.map((msg, i) => (
// // //             <div
// // //               key={i}
// // //               className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
// // //             >
// // //               {/* Avatar for assistant */}
// // //               {msg.role !== 'user' && (
// // //                 <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center text-sm shrink-0 mr-2 mt-1">
// // //                   🚄
// // //                 </div>
// // //               )}

// // //               <div
// // //                 className={`max-w-[80%] px-5 py-3 rounded-3xl text-sm leading-relaxed ${
// // //                   msg.role === 'user'
// // //                     ? 'bg-violet-600 text-white rounded-br-md'
// // //                     : 'bg-gray-800 border border-gray-700 rounded-bl-md'
// // //                 }`}
// // //               >
// // //                 <MessageContent content={msg.content} />
// // //               </div>
// // //             </div>
// // //           ))}

// // //           {/* Typing indicator */}
// // //           {busy && (
// // //             <div className="flex items-center gap-3 text-slate-400 text-sm">
// // //               <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center shrink-0">
// // //                 🚄
// // //               </div>
// // //               <span className="flex items-center gap-1.5">
// // //                 Database se data fetch ho raha hai
// // //                 <span className="flex gap-0.5 ml-1">
// // //                   {[0, 1, 2].map((d) => (
// // //                     <span
// // //                       key={d}
// // //                       className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"
// // //                       style={{ animationDelay: `${d * 0.15}s` }}
// // //                     />
// // //                   ))}
// // //                 </span>
// // //               </span>
// // //             </div>
// // //           )}

// // //           <div ref={endRef} />
// // //         </div>

// // //         {/* Input bar */}
// // //         <div className="p-4 border-t border-gray-700 bg-gray-900/80 backdrop-blur-sm">
// // //           <div className="flex items-end gap-2">
// // //             <textarea
// // //               ref={textareaRef}
// // //               value={input}
// // //               onChange={(e) => setInput(e.target.value)}
// // //               onKeyDown={(e) => {
// // //                 if (e.key === 'Enter' && !e.shiftKey) {
// // //                   e.preventDefault();
// // //                   send();
// // //                 }
// // //               }}
// // //               placeholder="Train, PNR, booking — kuch bhi poochho..."
// // //               rows={1}
// // //               className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3 resize-none focus:outline-none focus:border-violet-500 text-sm leading-relaxed transition-all"
// // //             />
// // //             <button
// // //               onClick={send}
// // //               disabled={busy || !input.trim()}
// // //               className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-5 py-3 rounded-2xl flex items-center justify-center transition shrink-0"
// // //               title="Send (Enter)"
// // //             >
// // //               <FiSend size={20} />
// // //             </button>
// // //           </div>
// // //           <p className="text-xs text-slate-600 mt-2 text-center">
// // //             Sare jawab live database se — koi assumption nahi
// // //           </p>
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // }





// // import { useEffect, useRef, useState } from 'react';
// // import { FiSend, FiPlus, FiTrash2, FiZap } from 'react-icons/fi';
// // import toast from 'react-hot-toast';
// // import { aiApi } from '../../api/endpoints';

// // const SUGGESTED = [
// //   'Kal Mumbai jana hai',
// //   'Mera PNR 1234567890 check karo',
// //   'Tatkal ticket Delhi to Lucknow kal ke liye',
// //   'WL 42 confirm hoga kya?',
// //   'Agra trip plan kar do, 2 din, 8000 ka budget',
// // ];

// // /** Group agents by category for the dropdown */
// // const GROUP_LABELS = {
// //   master: '🧠 Master',
// //   booking: '🎫 Booking',
// //   search: '🔍 Search',
// //   trip: '🗺️ Trip',
// //   pnr: '📋 PNR',
// //   prediction: '📈 Prediction',
// //   notification: '🔔 Notification',
// //   payment: '💳 Payment',
// //   admin: '⚙️ Admin',
// //   rag: '📚 Knowledge',
// //   enterprise: '🏢 Enterprise',
// //   hackathon: '🚀 Special',
// // };

// // function groupAgents(agents) {
// //   const groups = {};
// //   for (const agent of agents) {
// //     const cat = agent.category || 'other';
// //     if (!groups[cat]) groups[cat] = [];
// //     groups[cat].push(agent);
// //   }
// //   return groups;
// // }

// // /**
// //  * Lightweight markdown renderer.
// //  * Supports: **bold**, `code`, bullet lists (- / •), numbered lists, blank-line paragraphs.
// //  */
// // function MessageContent({ content = '' }) {
// //   const lines = content.split('\n');
// //   const elements = [];
// //   let i = 0;

// //   while (i < lines.length) {
// //     const raw = lines[i];
// //     const trimmed = raw.trim();

// //     if (!trimmed) {
// //       elements.push(<div key={i} className="h-2" />);
// //       i++; continue;
// //     }

// //     if (/^[-•*]\s+/.test(trimmed)) {
// //       const items = [];
// //       while (i < lines.length && /^[-•*]\s+/.test(lines[i].trim())) {
// //         items.push(<li key={i} className="ml-4 list-disc"><InlineMarkdown text={lines[i].trim().replace(/^[-•*]\s+/, '')} /></li>);
// //         i++;
// //       }
// //       elements.push(<ul key={`ul-${i}`} className="space-y-0.5 my-1">{items}</ul>);
// //       continue;
// //     }

// //     if (/^\d+\.\s+/.test(trimmed)) {
// //       const items = [];
// //       while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
// //         items.push(<li key={i} className="ml-4 list-decimal"><InlineMarkdown text={lines[i].trim().replace(/^\d+\.\s+/, '')} /></li>);
// //         i++;
// //       }
// //       elements.push(<ol key={`ol-${i}`} className="space-y-0.5 my-1">{items}</ol>);
// //       continue;
// //     }

// //     elements.push(<p key={i} className="leading-relaxed"><InlineMarkdown text={trimmed} /></p>);
// //     i++;
// //   }

// //   return <div className="space-y-1 text-sm">{elements}</div>;
// // }

// // function InlineMarkdown({ text = '' }) {
// //   const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
// //   return (
// //     <>
// //       {parts.map((part, i) => {
// //         if (part.startsWith('**') && part.endsWith('**'))
// //           return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
// //         if (part.startsWith('`') && part.endsWith('`'))
// //           return <code key={i} className="bg-black/30 text-violet-300 rounded px-1 py-0.5 text-xs font-mono">{part.slice(1, -1)}</code>;
// //         return <span key={i}>{part}</span>;
// //       })}
// //     </>
// //   );
// // }

// // export default function AIAssistant() {
// //   const [agents, setAgents] = useState([]);
// //   const [selectedAgent, setSelectedAgent] = useState('railway-master');
// //   const [conversations, setConvos] = useState([]);
// //   const [activeConversation, setActiveConversation] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [busy, setBusy] = useState(false);
// //   const endRef = useRef(null);
// //   const textareaRef = useRef(null);

// //   useEffect(() => {
// //     loadAgents();
// //     reloadConvos();
// //   }, []);

// //   useEffect(() => {
// //     endRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages]);

// //   // Auto-resize textarea
// //   useEffect(() => {
// //     if (textareaRef.current) {
// //       textareaRef.current.style.height = 'auto';
// //       textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
// //     }
// //   }, [input]);

// //   const loadAgents = async () => {
// //     try {
// //       const res = await aiApi.agents();
// //       setAgents(res.data?.data || []);
// //     } catch (err) {
// //       console.error('Failed to load agents:', err);
// //     }
// //   };

// //   const reloadConvos = async () => {
// //     try {
// //       const res = await aiApi.conversations();
// //       setConvos(res.data?.data || []);
// //     } catch (err) {
// //       console.error('Failed to load conversations:', err);
// //     }
// //   };

// //   const openConvo = async (id) => {
// //     setActiveConversation(id);
// //     try {
// //       const res = await aiApi.conversation(id);
// //       setMessages(res.data?.data?.messages || []);
// //     } catch (err) {
// //       toast.error('Conversation load nahi ho paya');
// //     }
// //   };

// //   const newChat = () => {
// //     setActiveConversation(null);
// //     setMessages([]);
// //     setInput('');
// //   };

// //   const send = async () => {
// //     const text = input.trim();
// //     if (!text || busy) return;

// //     // Append user message immediately for responsiveness
// //     setMessages((prev) => [...prev, { role: 'user', content: text }]);
// //     setInput('');
// //     setBusy(true);

// //     try {
// //       const payload = {
// //         message: text,
// //         agent: selectedAgent,
// //         ...(activeConversation && { conversationId: activeConversation }),
// //       };

// //       const res = await aiApi.chat(payload);

// //       if (res.data?.data?.conversationId) {
// //         setActiveConversation(res.data.data.conversationId);
// //       }

// //       // Replace messages with the full conversation returned by server
// //       // (includes DB-sourced assistant reply)
// //       const serverMessages = res.data?.data?.messages;
// //       if (serverMessages?.length) {
// //         setMessages(serverMessages);
// //       } else {
// //         // Fallback: show a neutral error — NOT a hallucinated answer
// //         setMessages((prev) => [
// //           ...prev,
// //           {
// //             role: 'assistant',
// //             content:
// //               'Yeh information abhi database se fetch nahi ho payi. Kripya dobara try karein ya kuch der baad try karein.',
// //           },
// //         ]);
// //       }

// //       reloadConvos();
// //     } catch (err) {
// //       console.error('AI Chat Error:', err.response?.data || err);
// //       toast.error(err.response?.data?.message || 'AI service unavailable');

// //       // Show a neutral fallback — NOT a fabricated answer
// //       setMessages((prev) => [
// //         ...prev,
// //         {
// //           role: 'assistant',
// //           content:
// //             '⚠️ Server se data nahi aa paya. Kripya dobara try karein. Agar problem continue ho to support se contact karein.',
// //         },
// //       ]);
// //     } finally {
// //       setBusy(false);
// //     }
// //   };

// //   const removeConversation = async (id) => {
// //     try {
// //       await aiApi.remove(id);
// //       reloadConvos();
// //       if (activeConversation === id) newChat();
// //     } catch (err) {
// //       toast.error('Conversation delete nahi hui');
// //     }
// //   };

// //   const agentGroups = groupAgents(agents);
// //   const currentAgent = agents.find((a) => a.key === selectedAgent);

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-64px-72px)]">

// //       {/* ── Sidebar ── */}
// //       <aside className="bg-gray-900 border border-gray-700 rounded-3xl p-4 flex flex-col min-h-0 gap-3">

// //         <button
// //           onClick={newChat}
// //           className="btn-primary flex items-center justify-center gap-2 py-3"
// //         >
// //           <FiPlus /> New Chat
// //         </button>

// //         {/* Agent selector */}
// //         <div>
// //           <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">
// //             Agent
// //           </label>
// //           <select
// //             className="input w-full text-sm"
// //             value={selectedAgent}
// //             onChange={(e) => setSelectedAgent(e.target.value)}
// //           >
// //             {Object.entries(agentGroups).map(([cat, list]) => (
// //               <optgroup key={cat} label={GROUP_LABELS[cat] || cat}>
// //                 {list.map((a) => (
// //                   <option key={a.key} value={a.key}>
// //                     {a.name}
// //                   </option>
// //                 ))}
// //               </optgroup>
// //             ))}
// //           </select>

// //           {/* Active agent badge */}
// //           {currentAgent && (
// //             <div className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-violet-900/40 border border-violet-700 rounded-xl text-xs text-violet-300">
// //               <FiZap size={12} className="shrink-0" />
// //               <span className="truncate">{currentAgent.name}</span>
// //             </div>
// //           )}
// //         </div>

// //         {/* Recent conversations */}
// //         <div className="text-xs uppercase tracking-widest text-slate-400">Recent</div>

// //         <div className="flex-1 overflow-auto space-y-1 pr-1 scroll-thin">
// //           {conversations.map((conv) => (
// //             <div
// //               key={conv._id}
// //               className={`group flex items-center gap-2 px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
// //                 activeConversation === conv._id
// //                   ? 'bg-violet-600 text-white'
// //                   : 'hover:bg-gray-800 text-slate-300'
// //               }`}
// //               onClick={() => openConvo(conv._id)}
// //             >
// //               <div className="flex-1 truncate text-sm">
// //                 {conv.title || 'New Conversation'}
// //               </div>
// //               <button
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   removeConversation(conv._id);
// //                 }}
// //                 className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 p-1 shrink-0"
// //                 title="Delete"
// //               >
// //                 <FiTrash2 size={14} />
// //               </button>
// //             </div>
// //           ))}

// //           {conversations.length === 0 && (
// //             <p className="text-slate-500 text-sm text-center py-8">
// //               Koi conversation nahi hai abhi
// //             </p>
// //           )}
// //         </div>
// //       </aside>

// //       {/* ── Chat Area ── */}
// //       <section className="bg-gray-900 border border-gray-700 rounded-3xl flex flex-col min-h-0 overflow-hidden">

// //         {/* Message list */}
// //         <div className="flex-1 overflow-auto p-6 space-y-5 scroll-thin">

// //           {/* Empty state */}
// //           {messages.length === 0 && (
// //             <div className="text-center py-16 select-none">
// //               <div className="text-6xl mb-4">🚄</div>
// //               <h2 className="text-2xl font-semibold mb-1">Namaste! Kya poochna hai?</h2>
// //               <p className="text-slate-400 text-sm mb-6">
// //                 Sare jawab live database se aate hain — koi guess nahi.
// //               </p>
// //               <div className="flex flex-wrap gap-2 justify-center">
// //                 {SUGGESTED.map((s) => (
// //                   <button
// //                     key={s}
// //                     onClick={() => setInput(s)}
// //                     className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-violet-500 px-4 py-2 rounded-2xl text-sm transition"
// //                   >
// //                     {s}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* Messages */}
// //           {messages.map((msg, i) => (
// //             <div
// //               key={i}
// //               className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
// //             >
// //               {/* Avatar for assistant */}
// //               {msg.role !== 'user' && (
// //                 <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center text-sm shrink-0 mr-2 mt-1">
// //                   🚄
// //                 </div>
// //               )}

// //               <div
// //                 className={`max-w-[80%] px-5 py-3 rounded-3xl text-sm leading-relaxed ${
// //                   msg.role === 'user'
// //                     ? 'bg-violet-600 text-white rounded-br-md'
// //                     : 'bg-gray-800 border border-gray-700 rounded-bl-md'
// //                 }`}
// //               >
// //                 <MessageContent content={msg.content} />
// //               </div>
// //             </div>
// //           ))}

// //           {/* Typing indicator */}
// //           {busy && (
// //             <div className="flex items-center gap-3 text-slate-400 text-sm">
// //               <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center shrink-0">
// //                 🚄
// //               </div>
// //               <span className="flex items-center gap-1.5">
// //                 Database se data fetch ho raha hai
// //                 <span className="flex gap-0.5 ml-1">
// //                   {[0, 1, 2].map((d) => (
// //                     <span
// //                       key={d}
// //                       className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"
// //                       style={{ animationDelay: `${d * 0.15}s` }}
// //                     />
// //                   ))}
// //                 </span>
// //               </span>
// //             </div>
// //           )}

// //           <div ref={endRef} />
// //         </div>

// //         {/* Input bar */}
// //         <div className="p-4 border-t border-gray-700 bg-gray-900/80 backdrop-blur-sm">
// //           <div className="flex items-end gap-2">
// //             <textarea
// //               ref={textareaRef}
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={(e) => {
// //                 if (e.key === 'Enter' && !e.shiftKey) {
// //                   e.preventDefault();
// //                   send();
// //                 }
// //               }}
// //               placeholder="Train, PNR, booking — kuch bhi poochho..."
// //               rows={1}
// //               className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3 resize-none focus:outline-none focus:border-violet-500 text-sm leading-relaxed transition-all"
// //             />
// //             <button
// //               onClick={send}
// //               disabled={busy || !input.trim()}
// //               className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-5 py-3 rounded-2xl flex items-center justify-center transition shrink-0"
// //               title="Send (Enter)"
// //             >
// //               <FiSend size={20} />
// //             </button>
// //           </div>
// //           <p className="text-xs text-slate-600 mt-2 text-center">
// //             Sare jawab live database se — koi assumption nahi
// //           </p>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }







// /**
//  * AIAssistant.jsx
//  * Route: /assistant
//  *
//  * 2 modes:
//  *   1. AI Agent mode  — existing aiApi (agents, booking, PNR etc)
//  *   2. RAG mode       — ragApi (railway policies, refunds, FAQs from DB)
//  *
//  * Toggle button se switch karo — koi existing code nahi tuta
//  */

// import { useEffect, useRef, useState } from 'react';
// import { FiSend, FiPlus, FiTrash2, FiZap, FiBook, FiCpu } from 'react-icons/fi';
// import toast from 'react-hot-toast';
// import { aiApi, ragApi } from '../../api/endpoints';

// // ─── Constants ────────────────────────────────────────────────────────────────
// const SUGGESTED_AGENT = [
//   'Kal Mumbai jana hai',
//   'Mera PNR 1234567890 check karo',
//   'Tatkal ticket Delhi to Lucknow kal ke liye',
//   'WL 42 confirm hoga kya?',
//   'Agra trip plan kar do, 2 din, 8000 ka budget',
// ];

// const SUGGESTED_RAG = [
//   'Tatkal ticket cancel karne pe kitna refund milega?',
//   'Senior citizen ko train mein discount milta hai kya?',
//   'PNR status RAC ka matlab kya hota hai?',
//   'WL ticket confirm nahi hua toh kya hoga?',
//   'Tatkal booking kab open hoti hai aur charges kya hain?',
//   'Regular ticket cancel karne ke charges kya hain?',
// ];

// const GROUP_LABELS = {
//   master: '🧠 Master', booking: '🎫 Booking', search: '🔍 Search',
//   trip: '🗺️ Trip', pnr: '📋 PNR', prediction: '📈 Prediction',
//   notification: '🔔 Notification', payment: '💳 Payment',
//   admin: '⚙️ Admin', rag: '📚 Knowledge', enterprise: '🏢 Enterprise',
//   hackathon: '🚀 Special',
// };

// function groupAgents(agents) {
//   const groups = {};
//   for (const agent of agents) {
//     const cat = agent.category || 'other';
//     if (!groups[cat]) groups[cat] = [];
//     groups[cat].push(agent);
//   }
//   return groups;
// }

// // ─── Markdown renderer (existing — unchanged) ─────────────────────────────────
// function MessageContent({ content = '' }) {
//   const lines    = content.split('\n');
//   const elements = [];
//   let i = 0;

//   while (i < lines.length) {
//     const raw     = lines[i];
//     const trimmed = raw.trim();

//     if (!trimmed) { elements.push(<div key={i} className="h-2" />); i++; continue; }

//     if (/^[-•*]\s+/.test(trimmed)) {
//       const items = [];
//       while (i < lines.length && /^[-•*]\s+/.test(lines[i].trim())) {
//         items.push(
//           <li key={i} className="ml-4 list-disc">
//             <InlineMarkdown text={lines[i].trim().replace(/^[-•*]\s+/, '')} />
//           </li>
//         );
//         i++;
//       }
//       elements.push(<ul key={`ul-${i}`} className="space-y-0.5 my-1">{items}</ul>);
//       continue;
//     }

//     if (/^\d+\.\s+/.test(trimmed)) {
//       const items = [];
//       while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
//         items.push(
//           <li key={i} className="ml-4 list-decimal">
//             <InlineMarkdown text={lines[i].trim().replace(/^\d+\.\s+/, '')} />
//           </li>
//         );
//         i++;
//       }
//       elements.push(<ol key={`ol-${i}`} className="space-y-0.5 my-1">{items}</ol>);
//       continue;
//     }

//     elements.push(<p key={i} className="leading-relaxed"><InlineMarkdown text={trimmed} /></p>);
//     i++;
//   }

//   return <div className="space-y-1 text-sm">{elements}</div>;
// }

// function InlineMarkdown({ text = '' }) {
//   const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
//   return (
//     <>
//       {parts.map((part, i) => {
//         if (part.startsWith('**') && part.endsWith('**'))
//           return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
//         if (part.startsWith('`') && part.endsWith('`'))
//           return <code key={i} className="bg-black/30 text-violet-300 rounded px-1 py-0.5 text-xs font-mono">{part.slice(1, -1)}</code>;
//         return <span key={i}>{part}</span>;
//       })}
//     </>
//   );
// }

// // ─── Source citation (RAG mode only) ─────────────────────────────────────────
// function SourceBadge({ source }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="mt-2 rounded-lg border border-violet-500/20 bg-violet-500/[0.06] overflow-hidden text-xs">
//       <button
//         onClick={() => setOpen(v => !v)}
//         className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-violet-500/10 transition-colors text-left"
//       >
//         <FiBook size={10} className="text-violet-400 flex-shrink-0" />
//         <span className="text-violet-300 flex-1 truncate font-mono">{source.documentName}</span>
//         {source.pageNumber && <span className="text-slate-500 flex-shrink-0">p.{source.pageNumber}</span>}
//         <span className="text-slate-500">{open ? '▲' : '▼'}</span>
//       </button>
//       {open && source.snippet && (
//         <div className="px-3 pb-2 pt-1 border-t border-white/[0.05] text-slate-400 font-mono leading-relaxed">
//           {source.snippet}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MAIN COMPONENT
// // ─────────────────────────────────────────────────────────────────────────────
// export default function AIAssistant() {
//   // ── Mode: 'agent' | 'rag' ─────────────────────────────────────────────────
//   const [mode, setMode] = useState('agent');

//   // ── Agent mode state (existing — unchanged) ───────────────────────────────
//   const [agents,             setAgents]            = useState([]);
//   const [selectedAgent,      setSelectedAgent]      = useState('railway-master');
//   const [conversations,      setConvos]             = useState([]);
//   const [activeConversation, setActiveConversation] = useState(null);

//   // ── RAG mode state ────────────────────────────────────────────────────────
//   const [ragConvos,    setRagConvos]    = useState([]);
//   const [ragSessionId, setRagSessionId] = useState(null);

//   // ── Shared state ──────────────────────────────────────────────────────────
//   const [messages, setMessages] = useState([]);
//   const [input,    setInput]    = useState('');
//   const [busy,     setBusy]     = useState(false);

//   const endRef      = useRef(null);
//   const textareaRef = useRef(null);

//   // ── Init ──────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     loadAgents();
//     reloadConvos();
//     loadRagConvos();
//   }, []);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
//     }
//   }, [input]);

//   // ── Agent mode functions (existing — unchanged) ───────────────────────────
//   const loadAgents = async () => {
//     try {
//       const res = await aiApi.agents();
//       setAgents(res.data?.data || []);
//     } catch (err) { console.error('Failed to load agents:', err); }
//   };

//   const reloadConvos = async () => {
//     try {
//       const res = await aiApi.conversations();
//       setConvos(res.data?.data || []);
//     } catch (err) { console.error('Failed to load conversations:', err); }
//   };

//   const openConvo = async (id) => {
//     setActiveConversation(id);
//     try {
//       const res = await aiApi.conversation(id);
//       setMessages(res.data?.data?.messages || []);
//     } catch (_) { toast.error('Conversation load nahi ho paya'); }
//   };

//   const removeConversation = async (id) => {
//     try {
//       await aiApi.remove(id);
//       reloadConvos();
//       if (activeConversation === id) newChat();
//     } catch (_) { toast.error('Conversation delete nahi hui'); }
//   };

//   // ── RAG mode functions ────────────────────────────────────────────────────
//   const loadRagConvos = async () => {
//     try {
//       const res = await ragApi.listConversations();
//       setRagConvos(res.data?.data || []);
//     } catch (_) {}
//   };

//   const openRagConvo = async (sessionId) => {
//     try {
//       const res  = await ragApi.getConversation(sessionId);
//       const conv = res.data?.data;
//       setRagSessionId(conv.sessionId);
//       setMessages(conv.messages || []);
//     } catch (_) { toast.error('Conversation load nahi ho paya'); }
//   };

//   const removeRagConvo = async (sessionId) => {
//     try {
//       await ragApi.deleteConversation(sessionId);
//       loadRagConvos();
//       if (ragSessionId === sessionId) newChat();
//     } catch (_) {}
//   };

//   // ── Shared ────────────────────────────────────────────────────────────────
//   const newChat = () => {
//     setActiveConversation(null);
//     setRagSessionId(null);
//     setMessages([]);
//     setInput('');
//   };

//   const switchMode = (newMode) => {
//     setMode(newMode);
//     newChat();
//   };

//   // ── SEND ─────────────────────────────────────────────────────────────────
//   const send = async () => {
//     const text = input.trim();
//     if (!text || busy) return;

//     setMessages(prev => [...prev, { role: 'user', content: text }]);
//     setInput('');
//     setBusy(true);

//     try {
//       if (mode === 'rag') {
//         // ── RAG mode — search railway policies DB ────────────────────────
//         const res    = await ragApi.ask({ query: text, sessionId: ragSessionId });
//         const result = res.data?.data;

//         if (result?.sessionId) setRagSessionId(result.sessionId);

//         setMessages(prev => [...prev, {
//           role:    'assistant',
//           content: result?.answer || 'Jawab nahi mila.',
//           sources: result?.sources || [],
//           isRag:   true,
//         }]);

//         loadRagConvos();

//       } else {
//         // ── Agent mode — existing logic unchanged ────────────────────────
//         const payload = {
//           message: text,
//           agent:   selectedAgent,
//           ...(activeConversation && { conversationId: activeConversation }),
//         };

//         const res = await aiApi.chat(payload);

//         if (res.data?.data?.conversationId) {
//           setActiveConversation(res.data.data.conversationId);
//         }

//         const serverMessages = res.data?.data?.messages;
//         if (serverMessages?.length) {
//           setMessages(serverMessages);
//         } else {
//           setMessages(prev => [...prev, {
//             role:    'assistant',
//             content: 'Yeh information abhi database se fetch nahi ho payi. Kripya dobara try karein.',
//           }]);
//         }

//         reloadConvos();
//       }

//     } catch (err) {
//       console.error('Chat error:', err.response?.data || err);
//       toast.error(err.response?.data?.message || 'Service unavailable');
//       setMessages(prev => [...prev, {
//         role:    'assistant',
//         content: '⚠️ Server se data nahi aa paya. Kripya dobara try karein.',
//       }]);
//     } finally {
//       setBusy(false);
//     }
//   };

//   const agentGroups   = groupAgents(agents);
//   const currentAgent  = agents.find(a => a.key === selectedAgent);
//   const SUGGESTED     = mode === 'rag' ? SUGGESTED_RAG : SUGGESTED_AGENT;

//   // ─────────────────────────────────────────────────────────────────────────
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-64px-72px)]">

//       {/* ══ SIDEBAR ══════════════════════════════════════════════════════════ */}
//       <aside className="bg-gray-900 border border-gray-700 rounded-3xl p-4 flex flex-col min-h-0 gap-3">

//         {/* Mode toggle */}
//         <div className="grid grid-cols-2 gap-1 p-1 bg-gray-800 rounded-2xl">
//           <button
//             onClick={() => switchMode('agent')}
//             className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all ${
//               mode === 'agent'
//                 ? 'bg-violet-600 text-white'
//                 : 'text-slate-400 hover:text-white'
//             }`}
//           >
//             <FiCpu size={12} /> AI Agent
//           </button>
//           <button
//             onClick={() => switchMode('rag')}
//             className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all ${
//               mode === 'rag'
//                 ? 'bg-violet-600 text-white'
//                 : 'text-slate-400 hover:text-white'
//             }`}
//           >
//             <FiBook size={12} /> Policies
//           </button>
//         </div>

//         {/* New Chat */}
//         <button
//           onClick={newChat}
//           className="btn-primary flex items-center justify-center gap-2 py-3"
//         >
//           <FiPlus /> New Chat
//         </button>

//         {/* Agent selector — only in agent mode */}
//         {mode === 'agent' && (
//           <div>
//             <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">
//               Agent
//             </label>
//             <select
//               className="input w-full text-sm"
//               value={selectedAgent}
//               onChange={e => setSelectedAgent(e.target.value)}
//             >
//               {Object.entries(agentGroups).map(([cat, list]) => (
//                 <optgroup key={cat} label={GROUP_LABELS[cat] || cat}>
//                   {list.map(a => (
//                     <option key={a.key} value={a.key}>{a.name}</option>
//                   ))}
//                 </optgroup>
//               ))}
//             </select>

//             {currentAgent && (
//               <div className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-violet-900/40 border border-violet-700 rounded-xl text-xs text-violet-300">
//                 <FiZap size={12} className="shrink-0" />
//                 <span className="truncate">{currentAgent.name}</span>
//               </div>
//             )}
//           </div>
//         )}

//         {/* RAG mode info */}
//         {mode === 'rag' && (
//           <div className="px-3 py-2.5 bg-violet-900/20 border border-violet-700/40 rounded-xl">
//             <p className="text-[11px] text-violet-300 font-mono">📚 Railway Policies RAG</p>
//             <p className="text-[10px] text-slate-500 mt-1">
//               Answers from official railway policies, FAQs & uploaded documents
//             </p>
//           </div>
//         )}

//         {/* Recent conversations */}
//         <div className="text-xs uppercase tracking-widest text-slate-400">Recent</div>

//         <div className="flex-1 overflow-auto space-y-1 pr-1">

//           {/* Agent conversations */}
//           {mode === 'agent' && conversations.map(conv => (
//             <div
//               key={conv._id}
//               className={`group flex items-center gap-2 px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
//                 activeConversation === conv._id
//                   ? 'bg-violet-600 text-white'
//                   : 'hover:bg-gray-800 text-slate-300'
//               }`}
//               onClick={() => openConvo(conv._id)}
//             >
//               <div className="flex-1 truncate text-sm">{conv.title || 'New Conversation'}</div>
//               <button
//                 onClick={e => { e.stopPropagation(); removeConversation(conv._id); }}
//                 className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 p-1 shrink-0"
//               >
//                 <FiTrash2 size={14} />
//               </button>
//             </div>
//           ))}

//           {/* RAG conversations */}
//           {mode === 'rag' && ragConvos.map(conv => (
//             <div
//               key={conv.sessionId}
//               className={`group flex items-center gap-2 px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
//                 ragSessionId === conv.sessionId
//                   ? 'bg-violet-600 text-white'
//                   : 'hover:bg-gray-800 text-slate-300'
//               }`}
//               onClick={() => openRagConvo(conv.sessionId)}
//             >
//               <div className="flex-1 truncate text-sm">{conv.title || 'New Conversation'}</div>
//               <button
//                 onClick={e => { e.stopPropagation(); removeRagConvo(conv.sessionId); }}
//                 className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 p-1 shrink-0"
//               >
//                 <FiTrash2 size={14} />
//               </button>
//             </div>
//           ))}

//           {/* Empty state */}
//           {((mode === 'agent' && conversations.length === 0) ||
//             (mode === 'rag'   && ragConvos.length === 0)) && (
//             <p className="text-slate-500 text-sm text-center py-8">
//               Koi conversation nahi hai abhi
//             </p>
//           )}
//         </div>
//       </aside>

//       {/* ══ CHAT AREA ════════════════════════════════════════════════════════ */}
//       <section className="bg-gray-900 border border-gray-700 rounded-3xl flex flex-col min-h-0 overflow-hidden">

//         {/* Messages */}
//         <div className="flex-1 overflow-auto p-6 space-y-5">

//           {/* Empty state */}
//           {messages.length === 0 && (
//             <div className="text-center py-16 select-none">
//               <div className="text-6xl mb-4">{mode === 'rag' ? '📚' : '🚄'}</div>
//               <h2 className="text-2xl font-semibold mb-1">
//                 {mode === 'rag' ? 'Railway Policies Poochho' : 'Namaste! Kya poochna hai?'}
//               </h2>
//               <p className="text-slate-400 text-sm mb-6">
//                 {mode === 'rag'
//                   ? 'Refunds, tatkal rules, PNR status meanings — sab kuch official policy se'
//                   : 'Sare jawab live database se aate hain — koi guess nahi.'}
//               </p>
//               <div className="flex flex-wrap gap-2 justify-center">
//                 {SUGGESTED.map(s => (
//                   <button
//                     key={s}
//                     onClick={() => setInput(s)}
//                     className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-violet-500 px-4 py-2 rounded-2xl text-sm transition"
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Messages */}
//           {messages.map((msg, i) => (
//             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//               {msg.role !== 'user' && (
//                 <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center text-sm shrink-0 mr-2 mt-1">
//                   {mode === 'rag' ? '📚' : '🚄'}
//                 </div>
//               )}
//               <div className={`max-w-[80%] px-5 py-3 rounded-3xl text-sm leading-relaxed ${
//                 msg.role === 'user'
//                   ? 'bg-violet-600 text-white rounded-br-md'
//                   : 'bg-gray-800 border border-gray-700 rounded-bl-md'
//               }`}>
//                 <MessageContent content={msg.content} />

//                 {/* RAG sources */}
//                 {msg.isRag && msg.sources?.length > 0 && (
//                   <div className="mt-3 space-y-1">
//                     <p className="text-[10px] text-slate-500 flex items-center gap-1">
//                       <FiBook size={9}/> Sources
//                     </p>
//                     {msg.sources.map((s, j) => <SourceBadge key={j} source={s}/>)}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}

//           {/* Typing indicator */}
//           {busy && (
//             <div className="flex items-center gap-3 text-slate-400 text-sm">
//               <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center shrink-0">
//                 {mode === 'rag' ? '📚' : '🚄'}
//               </div>
//               <span className="flex items-center gap-1.5">
//                 {mode === 'rag' ? 'Policy database search ho rahi hai' : 'Database se data fetch ho raha hai'}
//                 <span className="flex gap-0.5 ml-1">
//                   {[0,1,2].map(d => (
//                     <span key={d} className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"
//                       style={{ animationDelay: `${d * 0.15}s` }}/>
//                   ))}
//                 </span>
//               </span>
//             </div>
//           )}

//           <div ref={endRef} />
//         </div>

//         {/* Input bar */}
//         <div className="p-4 border-t border-gray-700 bg-gray-900/80 backdrop-blur-sm">
//           <div className="flex items-end gap-2">
//             <textarea
//               ref={textareaRef}
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               onKeyDown={e => {
//                 if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
//               }}
//               placeholder={mode === 'rag'
//                 ? 'Railway policy ya refund ke baare mein poochho...'
//                 : 'Train, PNR, booking — kuch bhi poochho...'}
//               rows={1}
//               className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3 resize-none focus:outline-none focus:border-violet-500 text-sm leading-relaxed transition-all"
//             />
//             <button
//               onClick={send}
//               disabled={busy || !input.trim()}
//               className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-5 py-3 rounded-2xl flex items-center justify-center transition shrink-0"
//             >
//               <FiSend size={20} />
//             </button>
//           </div>
//           <p className="text-xs text-slate-600 mt-2 text-center">
//             {mode === 'rag'
//               ? 'Answers sourced from official railway policies in database'
//               : 'Sare jawab live database se — koi assumption nahi'}
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }









import { useEffect, useRef, useState } from 'react';
import { FiSend, FiPlus, FiTrash2, FiZap, FiBook, FiCpu, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { aiApi, ragApi } from '../../api/endpoints';

// ─── Constants (UNCHANGED) ────────────────────────────────────────────────────
const SUGGESTED_AGENT = [
  'Kal Mumbai jana hai',
  'Mera PNR 1234567890 check karo',
  'Tatkal ticket Delhi to Lucknow kal ke liye',
  'WL 42 confirm hoga kya?',
  'Agra trip plan kar do, 2 din, 8000 ka budget',
];

const SUGGESTED_RAG = [
  'Tatkal ticket cancel karne pe kitna refund milega?',
  'Senior citizen ko train mein discount milta hai kya?',
  'PNR status RAC ka matlab kya hota hai?',
  'WL ticket confirm nahi hua toh kya hoga?',
  'Tatkal booking kab open hoti hai aur charges kya hain?',
  'Regular ticket cancel karne ke charges kya hain?',
];

const GROUP_LABELS = {
  master: '🧠 Master', booking: '🎫 Booking', search: '🔍 Search',
  trip: '🗺️ Trip', pnr: '📋 PNR', prediction: '📈 Prediction',
  notification: '🔔 Notification', payment: '💳 Payment',
  admin: '⚙️ Admin', rag: '📚 Knowledge', enterprise: '🏢 Enterprise',
  hackathon: '🚀 Special',
};

function groupAgents(agents) {
  const groups = {};
  for (const agent of agents) {
    const cat = agent.category || 'other';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(agent);
  }
  return groups;
}

// ─── Markdown renderer (LOGIC UNCHANGED, only classNames upgraded) ────────────
function MessageContent({ content = '' }) {
  const lines    = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const raw     = lines[i];
    const trimmed = raw.trim();

    if (!trimmed) { elements.push(<div key={i} className="h-2" />); i++; continue; }

    if (/^[-•*]\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[-•*]\s+/.test(lines[i].trim())) {
        items.push(
          <li key={i} className="ml-5 list-disc text-slate-300">
            <InlineMarkdown text={lines[i].trim().replace(/^[-•*]\s+/, '')} />
          </li>
        );
        i++;
      }
      elements.push(<ul key={`ul-${i}`} className="space-y-1 my-2">{items}</ul>);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(
          <li key={i} className="ml-5 list-decimal text-slate-300">
            <InlineMarkdown text={lines[i].trim().replace(/^\d+\.\s+/, '')} />
          </li>
        );
        i++;
      }
      elements.push(<ol key={`ol-${i}`} className="space-y-1 my-2">{items}</ol>);
      continue;
    }

    elements.push(
      <p key={i} className="leading-7 text-slate-200">
        <InlineMarkdown text={trimmed} />
      </p>
    );
    i++;
  }

  return <div className="space-y-1.5 text-[14px]">{elements}</div>;
}

function InlineMarkdown({ text = '' }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
        if (part.startsWith('`') && part.endsWith('`'))
          return (
            <code key={i} className="bg-violet-950/60 text-violet-300 border border-violet-500/20 rounded-md px-1.5 py-0.5 text-xs font-mono">
              {part.slice(1, -1)}
            </code>
          );
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ─── RAG Source card (UI upgraded, logic unchanged) ───────────────────────────
function SourceBadge({ source }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 rounded-xl border border-violet-500/20 bg-violet-950/30 overflow-hidden text-xs"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-violet-500/10 transition-colors text-left"
      >
        <FiBook size={10} className="text-violet-400 flex-shrink-0" />
        <span className="text-violet-300 flex-1 truncate font-medium">{source.documentName}</span>
        {source.pageNumber && (
          <span className="text-slate-500 flex-shrink-0 text-[10px]">p.{source.pageNumber}</span>
        )}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-500 flex-shrink-0"
        >
          <FiChevronDown size={12} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && source.snippet && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1 border-t border-white/[0.05] text-slate-400 font-mono leading-relaxed text-[11px]">
              {source.snippet}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Premium Agent Select dropdown ───────────────────────────────────────────
function AgentSelect({ agents, value, onChange }) {
  const [open, setOpen]   = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);
  const agentGroups = groupAgents(agents);
  const current = agents.find(a => a.key === value);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = search.trim()
    ? agents.filter(a => a.name?.toLowerCase().includes(search.toLowerCase()))
    : null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]
                   hover:border-violet-500/40 hover:bg-violet-500/[0.05] transition-all text-sm text-left"
      >
        <span className="flex-1 truncate text-slate-200 font-medium">
          {current?.name || 'Select Agent'}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown size={14} className="text-slate-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mt-1.5 z-50 bg-[#131928] border border-white/[0.08]
                       rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
          >
            {/* Search */}
            <div className="p-2 border-b border-white/[0.06]">
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search agents..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2
                           text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/40"
              />
            </div>

            {/* List */}
            <div className="max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent p-1.5">
              {filtered
                ? filtered.map(a => (
                    <button
                      key={a.key}
                      onClick={() => { onChange(a.key); setOpen(false); setSearch(''); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors
                        ${value === a.key
                          ? 'bg-violet-600/30 text-violet-300'
                          : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'}`}
                    >
                      {a.name}
                    </button>
                  ))
                : Object.entries(agentGroups).map(([cat, list]) => (
                    <div key={cat} className="mb-1">
                      <p className="px-3 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                        {GROUP_LABELS[cat] || cat}
                      </p>
                      {list.map(a => (
                        <button
                          key={a.key}
                          onClick={() => { onChange(a.key); setOpen(false); setSearch(''); }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors
                            ${value === a.key
                              ? 'bg-violet-600/30 text-violet-300'
                              : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'}`}
                        >
                          {a.name}
                        </button>
                      ))}
                    </div>
                  ))
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AIAssistant() {
  // ══ ALL STATE & LOGIC UNCHANGED ══════════════════════════════════════════════
  const [mode, setMode] = useState('agent');

  const [agents,             setAgents]            = useState([]);
  const [selectedAgent,      setSelectedAgent]      = useState('railway-master');
  const [conversations,      setConvos]             = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

  const [ragConvos,    setRagConvos]    = useState([]);
  const [ragSessionId, setRagSessionId] = useState(null);

  const [messages, setMessages] = useState([]);
  const [input,    setInput]    = useState('');
  const [busy,     setBusy]     = useState(false);

  // Mobile sidebar toggle (NEW — UI only)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const endRef      = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { loadAgents(); reloadConvos(); loadRagConvos(); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  // ── ALL FUNCTIONS UNCHANGED ───────────────────────────────────────────────
  const loadAgents = async () => {
    try {
      const res = await aiApi.agents();
      setAgents(res.data?.data || []);
    } catch (err) { console.error('Failed to load agents:', err); }
  };

  const reloadConvos = async () => {
    try {
      const res = await aiApi.conversations();
      setConvos(res.data?.data || []);
    } catch (err) { console.error('Failed to load conversations:', err); }
  };

  const openConvo = async (id) => {
    setActiveConversation(id);
    setSidebarOpen(false);
    try {
      const res = await aiApi.conversation(id);
      setMessages(res.data?.data?.messages || []);
    } catch (_) { toast.error('Conversation load nahi ho paya'); }
  };

  const removeConversation = async (id) => {
    try {
      await aiApi.remove(id);
      reloadConvos();
      if (activeConversation === id) newChat();
    } catch (_) { toast.error('Conversation delete nahi hui'); }
  };

  const loadRagConvos = async () => {
    try {
      const res = await ragApi.listConversations();
      setRagConvos(res.data?.data || []);
    } catch (_) {}
  };

  const openRagConvo = async (sessionId) => {
    setSidebarOpen(false);
    try {
      const res  = await ragApi.getConversation(sessionId);
      const conv = res.data?.data;
      setRagSessionId(conv.sessionId);
      setMessages(conv.messages || []);
    } catch (_) { toast.error('Conversation load nahi ho paya'); }
  };

  const removeRagConvo = async (sessionId) => {
    try {
      await ragApi.deleteConversation(sessionId);
      loadRagConvos();
      if (ragSessionId === sessionId) newChat();
    } catch (_) {}
  };

  const newChat = () => {
    setActiveConversation(null);
    setRagSessionId(null);
    setMessages([]);
    setInput('');
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    newChat();
  };

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setBusy(true);

    try {
      if (mode === 'rag') {
        const res    = await ragApi.ask({ query: text, sessionId: ragSessionId });
        const result = res.data?.data;

        if (result?.sessionId) setRagSessionId(result.sessionId);

        setMessages(prev => [...prev, {
          role:    'assistant',
          content: result?.answer || 'Jawab nahi mila.',
          sources: result?.sources || [],
          isRag:   true,
        }]);
        loadRagConvos();
      } else {
        const payload = {
          message: text,
          agent:   selectedAgent,
          ...(activeConversation && { conversationId: activeConversation }),
        };

        const res = await aiApi.chat(payload);

        if (res.data?.data?.conversationId) {
          setActiveConversation(res.data.data.conversationId);
        }

        const serverMessages = res.data?.data?.messages;
        if (serverMessages?.length) {
          setMessages(serverMessages);
        } else {
          setMessages(prev => [...prev, {
            role:    'assistant',
            content: 'Yeh information abhi database se fetch nahi ho payi. Kripya dobara try karein.',
          }]);
        }
        reloadConvos();
      }
    } catch (err) {
      console.error('Chat error:', err.response?.data || err);
      toast.error(err.response?.data?.message || 'Service unavailable');
      setMessages(prev => [...prev, {
        role:    'assistant',
        content: '⚠️ Server se data nahi aa paya. Kripya dobara try karein.',
      }]);
    } finally {
      setBusy(false);
    }
  };

  const currentAgent = agents.find(a => a.key === selectedAgent);
  const SUGGESTED    = mode === 'rag' ? SUGGESTED_RAG : SUGGESTED_AGENT;

  // ─── Sidebar inner content (shared between desktop & mobile drawer) ─────────
  const SidebarContent = () => (
    <div className="flex flex-col h-full gap-3 p-4">

      {/* Mode toggle — animated sliding pill */}
      <div className="relative flex p-1 bg-white/[0.04] rounded-2xl border border-white/[0.06]">
        <motion.div
          layoutId="mode-pill"
          className="absolute top-1 bottom-1 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 shadow-lg shadow-violet-900/40"
          style={{ left: mode === 'agent' ? '4px' : '50%', width: 'calc(50% - 4px)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
        {[
          { id: 'agent', icon: <FiCpu size={12} />, label: 'AI Agent' },
          { id: 'rag',   icon: <FiBook size={12} />, label: 'Policies' },
        ].map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => switchMode(id)}
            className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-colors duration-200
              ${mode === id ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* New Chat */}
      <motion.button
        onClick={newChat}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm
                   bg-gradient-to-r from-violet-600 to-violet-500 text-white
                   shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50 transition-shadow"
      >
        <FiPlus size={16} /> New Chat
      </motion.button>

      {/* Agent selector — only agent mode */}
      {mode === 'agent' && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-0.5">Agent</p>
          <AgentSelect
            agents={agents}
            value={selectedAgent}
            onChange={setSelectedAgent}
          />

          {/* Active agent card */}
          <AnimatePresence>
            {currentAgent && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="relative flex items-start gap-2.5 p-3 rounded-xl
                           bg-violet-950/40 border border-violet-500/20 overflow-hidden"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-400 to-violet-600 rounded-full" />
                <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                  <FiZap size={13} className="text-violet-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-violet-200 truncate">{currentAgent.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-slate-500">Active</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* RAG info card */}
      {mode === 'rag' && (
        <div className="relative p-3 rounded-xl bg-violet-950/30 border border-violet-500/20 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-400 to-violet-600" />
          <p className="text-xs font-semibold text-violet-300 flex items-center gap-1.5">
            <FiBook size={11} /> Railway Policies RAG
          </p>
          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
            Official policies, FAQs & uploaded documents
          </p>
        </div>
      )}

      {/* Recent conversations */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-0.5 mb-2">Recent</p>
        <div className="flex-1 space-y-0.5 overflow-y-auto max-h-[300px] pr-0.5
                        scrollbar-thin scrollbar-thumb-white/[0.08] scrollbar-track-transparent">

          {mode === 'agent' && conversations.map(conv => (
            <ConvoItem
              key={conv._id}
              title={conv.title || 'New Conversation'}
              isActive={activeConversation === conv._id}
              onClick={() => openConvo(conv._id)}
              onDelete={(e) => { e.stopPropagation(); removeConversation(conv._id); }}
            />
          ))}

          {mode === 'rag' && ragConvos.map(conv => (
            <ConvoItem
              key={conv.sessionId}
              title={conv.title || 'New Conversation'}
              isActive={ragSessionId === conv.sessionId}
              onClick={() => openRagConvo(conv.sessionId)}
              onDelete={(e) => { e.stopPropagation(); removeRagConvo(conv.sessionId); }}
            />
          ))}

          {((mode === 'agent' && conversations.length === 0) ||
            (mode === 'rag' && ragConvos.length === 0)) && (
            <p className="text-slate-500 text-xs text-center py-8">No conversations yet</p>
          )}
        </div>
      </div>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex h-[calc(100vh-56px)] bg-[#0B1120] text-white overflow-hidden">

      {/* ══ DESKTOP SIDEBAR ════════════════════════════════════════════════ */}
      <aside className="hidden md:flex flex-col w-[280px] flex-shrink-0
                        bg-[#111827]/80 border-r border-white/[0.06] backdrop-blur-xl">
        <SidebarContent />
      </aside>

      {/* ══ MOBILE DRAWER ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 380, damping: 35 }}
              className="md:hidden fixed left-0 top-0 bottom-0 z-50 w-[280px]
                         bg-[#111827] border-r border-white/[0.06]"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <span className="text-sm font-semibold text-slate-200">Menu</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
                >
                  <FiX size={16} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ══ CHAT AREA ══════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.05]
                        bg-[#0B1120]/80 backdrop-blur-xl flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <FiMenu size={18} />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[15px] font-semibold text-white truncate">
              {mode === 'rag'
                ? '📚 Railway Policies'
                : (currentAgent ? `🚄 ${currentAgent.name}` : '🚄 RailwayGPT')}
            </span>
            {mode === 'rag' && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium
                               px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" /> RAG
              </span>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6
                        scrollbar-thin scrollbar-thumb-white/[0.08] scrollbar-track-transparent">
          <div className="max-w-3xl mx-auto">

            {/* Empty / welcome state */}
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center pt-12 pb-8 px-4"
              >
                {/* Animated icon */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600/30 to-violet-900/30
                             border border-violet-500/20 flex items-center justify-center mb-6 text-4xl
                             shadow-2xl shadow-violet-900/30"
                >
                  {mode === 'rag' ? '📚' : '🚄'}
                </motion.div>

                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-slate-400
                               bg-clip-text text-transparent mb-2">
                  {mode === 'rag' ? 'Railway Policies Poochho' : 'Namaste! Kya poochna hai?'}
                </h1>
                <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-8">
                  {mode === 'rag'
                    ? 'Refunds, tatkal rules, PNR meanings — official policy database se seedha jawab.'
                    : 'Sare jawab live database se aate hain. Koi guess nahi, sirf real data.'}
                </p>

                {/* Suggestion chips */}
                <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                  {SUGGESTED.map(s => (
                    <motion.button
                      key={s}
                      onClick={() => setInput(s)}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-4 py-2 rounded-xl text-sm text-slate-300 bg-white/[0.04]
                                 border border-white/[0.08] hover:border-violet-500/40 hover:bg-violet-500/[0.06]
                                 hover:text-violet-200 transition-all duration-200"
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant avatar */}
                {msg.role !== 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800
                                  flex items-center justify-center text-sm flex-shrink-0 mt-0.5
                                  shadow-lg shadow-violet-900/30">
                    {mode === 'rag' ? '📚' : '🚄'}
                  </div>
                )}

                {/* Bubble */}
                <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-violet-600 to-violet-700 text-white rounded-tr-md shadow-lg shadow-violet-900/30'
                    : 'bg-[#1A2233]/80 border border-white/[0.06] rounded-tl-md backdrop-blur-sm'
                }`}>
                  <MessageContent content={msg.content} />

                  {msg.isRag && msg.sources?.length > 0 && (
                    <div className="mt-3 space-y-1 pt-2 border-t border-white/[0.06]">
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 font-medium uppercase tracking-wide">
                        <FiBook size={9} /> Sources
                      </p>
                      {msg.sources.map((s, j) => <SourceBadge key={j} source={s} />)}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {busy && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800
                                flex items-center justify-center text-sm flex-shrink-0
                                shadow-lg shadow-violet-900/30">
                  {mode === 'rag' ? '📚' : '🚄'}
                </div>
                <div className="bg-[#1A2233]/80 border border-white/[0.06] rounded-2xl rounded-tl-md px-4 py-3
                                flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    {mode === 'rag' ? 'Policy database search ho rahi hai' : 'Database se data fetch ho raha hai'}
                  </span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(d => (
                      <motion.span
                        key={d}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                        className="block w-1.5 h-1.5 rounded-full bg-violet-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={endRef} />
          </div>
        </div>

        {/* ── Input area ─────────────────────────────────────────────────── */}
        <div className="flex-shrink-0 px-4 pb-4 pt-2 bg-[#0B1120]/90 backdrop-blur-xl border-t border-white/[0.04]">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2 p-2 rounded-2xl bg-[#1A2233]/80 border border-white/[0.08]
                            focus-within:border-violet-500/40 transition-colors duration-200
                            shadow-xl shadow-black/30">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
                }}
                placeholder={mode === 'rag'
                  ? 'Railway policy ya refund ke baare mein poochho...'
                  : 'Train, PNR, booking — kuch bhi poochho...'}
                rows={1}
                className="flex-1 bg-transparent px-3 py-2 resize-none focus:outline-none text-sm text-slate-100
                           placeholder-slate-500 leading-relaxed min-h-[40px]
                           scrollbar-thin scrollbar-thumb-white/[0.08] scrollbar-track-transparent"
              />
              <motion.button
                onClick={send}
                disabled={busy || !input.trim()}
                whileHover={{ scale: busy || !input.trim() ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
                  ${busy || !input.trim()
                    ? 'bg-white/[0.06] text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-br from-violet-600 to-violet-500 text-white shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60'
                  }`}
              >
                <FiSend size={16} />
              </motion.button>
            </div>
            <p className="text-[10px] text-slate-600 text-center mt-2">
              {mode === 'rag'
                ? 'Answers sourced from official railway policies · Press Enter to send'
                : 'Live data from database · No assumptions · Press Enter to send'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Conversation list item ───────────────────────────────────────────────────
function ConvoItem({ title, isActive, onClick, onDelete }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ x: 2 }}
      className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
        isActive
          ? 'bg-violet-600/20 border border-violet-500/30 text-white'
          : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200 border border-transparent'
      }`}
    >
      {/* Active left bar */}
      {isActive && (
        <motion.div
          layoutId="active-bar"
          className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-violet-400"
        />
      )}
      <span className="flex-1 truncate text-xs font-medium">{title}</span>
      <motion.button
        onClick={onDelete}
        initial={{ opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 p-1 rounded-md
                   hover:bg-red-500/10 transition-colors flex-shrink-0"
      >
        <FiTrash2 size={12} />
      </motion.button>
    </motion.div>
  );
}