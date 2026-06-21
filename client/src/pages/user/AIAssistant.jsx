// // // import { useEffect, useRef, useState } from 'react';
// // // import { FiSend, FiPlus, FiTrash2 } from 'react-icons/fi';
// // // import toast from 'react-hot-toast';
// // // import { aiApi } from '../../api/endpoints';

// // // const SUGGESTED = [
// // //   'Kal Mumbai jana hai',
// // //   'Mera PNR 1234567890 check karo',
// // //   'Tatkal ticket Delhi to Lucknow kal ke liye',
// // //   'WL 42 confirm hoga kya?',
// // //   'Agra trip plan kar do, 2 din, 8000 ka budget',
// // // ];

// // // export default function AIAssistant() {
// // //   const [agents, setAgents] = useState([]);
// // //   const [agent, setAgent] = useState('railway-master');
// // //   const [conversations, setConvos] = useState([]);
// // //   const [active, setActive] = useState(null);
// // //   const [messages, setMessages] = useState([]);
// // //   const [input, setInput] = useState('');
// // //   const [busy, setBusy] = useState(false);
// // //   const endRef = useRef(null);

// // //   useEffect(() => { aiApi.agents().then((r) => setAgents(r.data.data)).catch(()=>{}); reloadConvos(); }, []);
// // //   useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

// // //   const reloadConvos = async () => {
// // //     try { const r = await aiApi.conversations(); setConvos(r.data.data); } catch {}
// // //   };
// // //   const openConvo = async (id) => {
// // //     setActive(id);
// // //     const r = await aiApi.conversation(id);
// // //     setMessages(r.data.data.messages || []);
// // //   };
// // //   const newChat = () => { setActive(null); setMessages([]); };

// // //   const send = async () => {
// // //     if (!input.trim() || busy) return;
// // //     const userMsg = { role: 'user', content: input };
// // //     setMessages((m) => [...m, userMsg]);
// // //     setBusy(true); const text = input; setInput('');
// // //     try {
// // //       const r = await aiApi.chat({ conversationId: active, message: text, agent });
// // //       setActive(r.data.data.conversationId);
// // //       setMessages(r.data.data.messages);
// // //       reloadConvos();
// // //     } catch (e) {
// // //       toast.error(e?.response?.data?.message || 'AI request failed');
// // //       setMessages((m) => [...m, { role: 'assistant', content: '⚠️ Failed to reach the AI service.' }]);
// // //     } finally { setBusy(false); }
// // //   };

// // //   const remove = async (id) => {
// // //     await aiApi.remove(id); reloadConvos(); if (active === id) newChat();
// // //   };

// // //   return (
// // //     <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-64px-72px)]">
// // //       <aside className="card flex flex-col min-h-0">
// // //         <button onClick={newChat} className="btn-primary"><FiPlus className="mr-1"/> New chat</button>
// // //         <div className="mt-3">
// // //           <label className="label">Agent</label>
// // //           <select className="input" value={agent} onChange={(e) => setAgent(e.target.value)}>
// // //             {agents.map((a) => <option key={a.key} value={a.key}>{a.name}</option>)}
// // //           </select>
// // //         </div>
// // //         <div className="mt-4 text-xs uppercase text-slate-400">History</div>
// // //         <div className="mt-2 flex-1 overflow-auto scroll-thin space-y-1">
// // //           {conversations.map((c) => (
// // //             <div key={c._id} className={`group flex items-center gap-2 px-2 py-2 rounded cursor-pointer ${active === c._id ? 'bg-white/10' : 'hover:bg-white/5'}`} onClick={() => openConvo(c._id)}>
// // //               <div className="flex-1 truncate text-sm">{c.title}</div>
// // //               <button onClick={(e) => { e.stopPropagation(); remove(c._id); }} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-400"><FiTrash2 /></button>
// // //             </div>
// // //           ))}
// // //           {conversations.length === 0 && <div className="text-xs text-slate-500 px-2">No conversations yet.</div>}
// // //         </div>
// // //       </aside>

// // //       <section className="card flex flex-col min-h-0">
// // //         <div className="flex-1 overflow-auto scroll-thin space-y-3 pr-2">
// // //           {messages.length === 0 && (
// // //             <div className="text-center py-10">
// // //               <div className="text-4xl">🤖</div>
// // //               <h2 className="text-xl font-semibold mt-2">How can RailwayGPT help?</h2>
// // //               <div className="mt-4 flex flex-wrap gap-2 justify-center">
// // //                 {SUGGESTED.map((s) => (
// // //                   <button key={s} className="chip hover:bg-white/20" onClick={() => setInput(s)}>{s}</button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}
// // //           {messages.filter(m => m.role !== 'tool').map((m, i) => (
// // //             <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
// // //               <div className={`max-w-[80%] rounded-2xl px-4 py-2 whitespace-pre-wrap ${m.role === 'user' ? 'bg-brand-600 text-white' : 'bg-white/5 border border-white/10'}`}>
// // //                 {m.content || (m.toolCalls ? `🔧 Calling ${m.toolCalls.map(t => t.function?.name).join(', ')}…` : '')}
// // //               </div>
// // //             </div>
// // //           ))}
// // //           {busy && <div className="text-slate-400 text-sm">RailwayGPT is thinking…</div>}
// // //           <div ref={endRef} />
// // //         </div>
// // //         <div className="mt-3 flex gap-2">
// // //           <textarea
// // //             value={input}
// // //             onChange={(e) => setInput(e.target.value)}
// // //             onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
// // //             placeholder="Ask anything about trains, PNR, refunds, planning…"
// // //             rows={1}
// // //             className="input resize-none"
// // //           />
// // //           <button className="btn-primary" onClick={send} disabled={busy}><FiSend /></button>
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // }








// // import { useEffect, useRef, useState } from 'react';
// // import { FiSend, FiPlus, FiTrash2 } from 'react-icons/fi';
// // import toast from 'react-hot-toast';
// // import { aiApi } from '../../api/endpoints';

// // const SUGGESTED = [
// //   'Kal Mumbai jana hai',
// //   'Mera PNR 1234567890 check karo',
// //   'Tatkal ticket Delhi to Lucknow kal ke liye',
// //   'WL 42 confirm hoga kya?',
// //   'Agra trip plan kar do, 2 din, 8000 ka budget',
// // ];

// // export default function AIAssistant() {
// //   const [agents, setAgents] = useState([]);
// //   const [selectedAgent, setSelectedAgent] = useState('railway-master');
// //   const [conversations, setConvos] = useState([]);
// //   const [activeConversation, setActiveConversation] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [busy, setBusy] = useState(false);
// //   const endRef = useRef(null);

// //   useEffect(() => {
// //     loadAgents();
// //     reloadConvos();
// //   }, []);

// //   useEffect(() => {
// //     endRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages]);

// //   const loadAgents = async () => {
// //     try {
// //       const res = await aiApi.agents();
// //       setAgents(res.data?.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const reloadConvos = async () => {
// //     try {
// //       const res = await aiApi.conversations();
// //       setConvos(res.data?.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const openConvo = async (id) => {
// //     setActiveConversation(id);
// //     try {
// //       const res = await aiApi.conversation(id);
// //       setMessages(res.data?.data?.messages || []);
// //     } catch (err) {
// //       toast.error("Failed to load conversation");
// //     }
// //   };

// //   const newChat = () => {
// //     setActiveConversation(null);
// //     setMessages([]);
// //   };

// //   const send = async () => {
// //     if (!input.trim() || busy) return;

// //     const userMessage = { role: 'user', content: input };
// //     setMessages(prev => [...prev, userMessage]);
// //     const currentInput = input;
// //     setInput('');
// //     setBusy(true);

// //     try {
// //       const payload = {
// //         message: currentInput,
// //         agent: selectedAgent,
// //         ...(activeConversation && { conversationId: activeConversation }), // Only send if exists
// //       };

// //       console.log("Sending to AI:", payload);

// //       const res = await aiApi.chat(payload);

// //       // Update conversation ID if new chat
// //       if (res.data?.data?.conversationId) {
// //         setActiveConversation(res.data.data.conversationId);
// //       }

// //       setMessages(res.data?.data?.messages || []);
// //       reloadConvos();
// //     } catch (err) {
// //       console.error("AI Chat Error:", err.response?.data || err);
// //       toast.error(err.response?.data?.message || "AI service failed");

// //       setMessages(prev => [...prev, {
// //         role: 'assistant',
// //         content: "⚠️ Sorry, I'm having trouble responding right now. Please try again."
// //       }]);
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
// //       toast.error("Failed to delete conversation");
// //     }
// //   };

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-64px-72px)]">
// //       {/* Sidebar */}
// //       <aside className="bg-gray-900 border border-gray-700 rounded-3xl p-4 flex flex-col min-h-0">
// //         <button 
// //           onClick={newChat} 
// //           className="btn-primary flex items-center justify-center gap-2 py-3 mb-4"
// //         >
// //           <FiPlus /> New Chat
// //         </button>

// //         <div className="mb-4">
// //           <label className="block text-sm text-slate-400 mb-2">Select Agent</label>
// //           <select 
// //             className="input w-full" 
// //             value={selectedAgent} 
// //             onChange={(e) => setSelectedAgent(e.target.value)}
// //           >
// //             {agents.map((a) => (
// //               <option key={a.key} value={a.key}>{a.name}</option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">Recent</div>
        
// //         <div className="flex-1 overflow-auto space-y-1 pr-2 scroll-thin">
// //           {conversations.map((conv) => (
// //             <div 
// //               key={conv._id} 
// //               className={`group flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
// //                 activeConversation === conv._id ? 'bg-violet-600 text-white' : 'hover:bg-gray-800'
// //               }`}
// //               onClick={() => openConvo(conv._id)}
// //             >
// //               <div className="flex-1 truncate text-sm">{conv.title || "New Conversation"}</div>
// //               <button 
// //                 onClick={(e) => { e.stopPropagation(); removeConversation(conv._id); }}
// //                 className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 p-1"
// //               >
// //                 <FiTrash2 size={16} />
// //               </button>
// //             </div>
// //           ))}
// //           {conversations.length === 0 && (
// //             <div className="text-slate-500 text-sm px-3 py-8 text-center">No conversations yet</div>
// //           )}
// //         </div>
// //       </aside>

// //       {/* Chat Area */}
// //       <section className="bg-gray-900 border border-gray-700 rounded-3xl flex flex-col min-h-0 overflow-hidden">
// //         <div className="flex-1 overflow-auto p-6 space-y-6 scroll-thin">
// //           {messages.length === 0 && (
// //             <div className="text-center py-20">
// //               <div className="text-6xl mb-4">🚄</div>
// //               <h2 className="text-2xl font-semibold">How can I help you today?</h2>
// //               <div className="mt-6 flex flex-wrap gap-2 justify-center">
// //                 {SUGGESTED.map((suggestion) => (
// //                   <button
// //                     key={suggestion}
// //                     onClick={() => setInput(suggestion)}
// //                     className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-violet-500 px-5 py-2.5 rounded-2xl text-sm transition"
// //                   >
// //                     {suggestion}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {messages.map((msg, i) => (
// //             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
// //               <div className={`max-w-[85%] px-5 py-3 rounded-3xl ${
// //                 msg.role === 'user' 
// //                   ? 'bg-violet-600 text-white' 
// //                   : 'bg-gray-800 border border-gray-700'
// //               }`}>
// //                 {msg.content}
// //               </div>
// //             </div>
// //           ))}

// //           {busy && (
// //             <div className="flex items-center gap-3 text-slate-400">
// //               <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
// //               RailwayGPT is thinking...
// //             </div>
// //           )}

// //           <div ref={endRef} />
// //         </div>

// //         {/* Input */}
// //         <div className="p-4 border-t border-gray-700 bg-gray-900">
// //           <div className="flex gap-2">
// //             <textarea
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={(e) => {
// //                 if (e.key === 'Enter' && !e.shiftKey) {
// //                   e.preventDefault();
// //                   send();
// //                 }
// //               }}
// //               placeholder="Ask anything about trains, PNR, booking..."
// //               rows={1}
// //               className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3 resize-none focus:outline-none focus:border-violet-500"
// //             />
// //             <button
// //               onClick={send}
// //               disabled={busy || !input.trim()}
// //               className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 px-6 rounded-2xl flex items-center justify-center"
// //             >
// //               <FiSend size={22} />
// //             </button>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }





// import { useEffect, useRef, useState } from 'react';
// import { FiSend, FiPlus, FiTrash2, FiZap } from 'react-icons/fi';
// import toast from 'react-hot-toast';
// import { aiApi } from '../../api/endpoints';

// const SUGGESTED = [
//   'Kal Mumbai jana hai',
//   'Mera PNR 1234567890 check karo',
//   'Tatkal ticket Delhi to Lucknow kal ke liye',
//   'WL 42 confirm hoga kya?',
//   'Agra trip plan kar do, 2 din, 8000 ka budget',
// ];

// /** Group agents by category for the dropdown */
// const GROUP_LABELS = {
//   master: '🧠 Master',
//   booking: '🎫 Booking',
//   search: '🔍 Search',
//   trip: '🗺️ Trip',
//   pnr: '📋 PNR',
//   prediction: '📈 Prediction',
//   notification: '🔔 Notification',
//   payment: '💳 Payment',
//   admin: '⚙️ Admin',
//   rag: '📚 Knowledge',
//   enterprise: '🏢 Enterprise',
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

// /** Render message content — newlines become <br /> */
// function MessageContent({ content }) {
//   return (
//     <span>
//       {content.split('\n').map((line, i, arr) => (
//         <span key={i}>
//           {line}
//           {i < arr.length - 1 && <br />}
//         </span>
//       ))}
//     </span>
//   );
// }

// export default function AIAssistant() {
//   const [agents, setAgents] = useState([]);
//   const [selectedAgent, setSelectedAgent] = useState('railway-master');
//   const [conversations, setConvos] = useState([]);
//   const [activeConversation, setActiveConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [busy, setBusy] = useState(false);
//   const endRef = useRef(null);
//   const textareaRef = useRef(null);

//   useEffect(() => {
//     loadAgents();
//     reloadConvos();
//   }, []);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Auto-resize textarea
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
//     }
//   }, [input]);

//   const loadAgents = async () => {
//     try {
//       const res = await aiApi.agents();
//       setAgents(res.data?.data || []);
//     } catch (err) {
//       console.error('Failed to load agents:', err);
//     }
//   };

//   const reloadConvos = async () => {
//     try {
//       const res = await aiApi.conversations();
//       setConvos(res.data?.data || []);
//     } catch (err) {
//       console.error('Failed to load conversations:', err);
//     }
//   };

//   const openConvo = async (id) => {
//     setActiveConversation(id);
//     try {
//       const res = await aiApi.conversation(id);
//       setMessages(res.data?.data?.messages || []);
//     } catch (err) {
//       toast.error('Conversation load nahi ho paya');
//     }
//   };

//   const newChat = () => {
//     setActiveConversation(null);
//     setMessages([]);
//     setInput('');
//   };

//   const send = async () => {
//     const text = input.trim();
//     if (!text || busy) return;

//     // Append user message immediately for responsiveness
//     setMessages((prev) => [...prev, { role: 'user', content: text }]);
//     setInput('');
//     setBusy(true);

//     try {
//       const payload = {
//         message: text,
//         agent: selectedAgent,
//         ...(activeConversation && { conversationId: activeConversation }),
//       };

//       const res = await aiApi.chat(payload);

//       if (res.data?.data?.conversationId) {
//         setActiveConversation(res.data.data.conversationId);
//       }

//       // Replace messages with the full conversation returned by server
//       // (includes DB-sourced assistant reply)
//       const serverMessages = res.data?.data?.messages;
//       if (serverMessages?.length) {
//         setMessages(serverMessages);
//       } else {
//         // Fallback: show a neutral error — NOT a hallucinated answer
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: 'assistant',
//             content:
//               'Yeh information abhi database se fetch nahi ho payi. Kripya dobara try karein ya kuch der baad try karein.',
//           },
//         ]);
//       }

//       reloadConvos();
//     } catch (err) {
//       console.error('AI Chat Error:', err.response?.data || err);
//       toast.error(err.response?.data?.message || 'AI service unavailable');

//       // Show a neutral fallback — NOT a fabricated answer
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'assistant',
//           content:
//             '⚠️ Server se data nahi aa paya. Kripya dobara try karein. Agar problem continue ho to support se contact karein.',
//         },
//       ]);
//     } finally {
//       setBusy(false);
//     }
//   };

//   const removeConversation = async (id) => {
//     try {
//       await aiApi.remove(id);
//       reloadConvos();
//       if (activeConversation === id) newChat();
//     } catch (err) {
//       toast.error('Conversation delete nahi hui');
//     }
//   };

//   const agentGroups = groupAgents(agents);
//   const currentAgent = agents.find((a) => a.key === selectedAgent);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-64px-72px)]">

//       {/* ── Sidebar ── */}
//       <aside className="bg-gray-900 border border-gray-700 rounded-3xl p-4 flex flex-col min-h-0 gap-3">

//         <button
//           onClick={newChat}
//           className="btn-primary flex items-center justify-center gap-2 py-3"
//         >
//           <FiPlus /> New Chat
//         </button>

//         {/* Agent selector */}
//         <div>
//           <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">
//             Agent
//           </label>
//           <select
//             className="input w-full text-sm"
//             value={selectedAgent}
//             onChange={(e) => setSelectedAgent(e.target.value)}
//           >
//             {Object.entries(agentGroups).map(([cat, list]) => (
//               <optgroup key={cat} label={GROUP_LABELS[cat] || cat}>
//                 {list.map((a) => (
//                   <option key={a.key} value={a.key}>
//                     {a.name}
//                   </option>
//                 ))}
//               </optgroup>
//             ))}
//           </select>

//           {/* Active agent badge */}
//           {currentAgent && (
//             <div className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-violet-900/40 border border-violet-700 rounded-xl text-xs text-violet-300">
//               <FiZap size={12} className="shrink-0" />
//               <span className="truncate">{currentAgent.name}</span>
//             </div>
//           )}
//         </div>

//         {/* Recent conversations */}
//         <div className="text-xs uppercase tracking-widest text-slate-400">Recent</div>

//         <div className="flex-1 overflow-auto space-y-1 pr-1 scroll-thin">
//           {conversations.map((conv) => (
//             <div
//               key={conv._id}
//               className={`group flex items-center gap-2 px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
//                 activeConversation === conv._id
//                   ? 'bg-violet-600 text-white'
//                   : 'hover:bg-gray-800 text-slate-300'
//               }`}
//               onClick={() => openConvo(conv._id)}
//             >
//               <div className="flex-1 truncate text-sm">
//                 {conv.title || 'New Conversation'}
//               </div>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   removeConversation(conv._id);
//                 }}
//                 className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 p-1 shrink-0"
//                 title="Delete"
//               >
//                 <FiTrash2 size={14} />
//               </button>
//             </div>
//           ))}

//           {conversations.length === 0 && (
//             <p className="text-slate-500 text-sm text-center py-8">
//               Koi conversation nahi hai abhi
//             </p>
//           )}
//         </div>
//       </aside>

//       {/* ── Chat Area ── */}
//       <section className="bg-gray-900 border border-gray-700 rounded-3xl flex flex-col min-h-0 overflow-hidden">

//         {/* Message list */}
//         <div className="flex-1 overflow-auto p-6 space-y-5 scroll-thin">

//           {/* Empty state */}
//           {messages.length === 0 && (
//             <div className="text-center py-16 select-none">
//               <div className="text-6xl mb-4">🚄</div>
//               <h2 className="text-2xl font-semibold mb-1">Namaste! Kya poochna hai?</h2>
//               <p className="text-slate-400 text-sm mb-6">
//                 Sare jawab live database se aate hain — koi guess nahi.
//               </p>
//               <div className="flex flex-wrap gap-2 justify-center">
//                 {SUGGESTED.map((s) => (
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
//             <div
//               key={i}
//               className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               {/* Avatar for assistant */}
//               {msg.role !== 'user' && (
//                 <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center text-sm shrink-0 mr-2 mt-1">
//                   🚄
//                 </div>
//               )}

//               <div
//                 className={`max-w-[80%] px-5 py-3 rounded-3xl text-sm leading-relaxed ${
//                   msg.role === 'user'
//                     ? 'bg-violet-600 text-white rounded-br-md'
//                     : 'bg-gray-800 border border-gray-700 rounded-bl-md'
//                 }`}
//               >
//                 <MessageContent content={msg.content} />
//               </div>
//             </div>
//           ))}

//           {/* Typing indicator */}
//           {busy && (
//             <div className="flex items-center gap-3 text-slate-400 text-sm">
//               <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center shrink-0">
//                 🚄
//               </div>
//               <span className="flex items-center gap-1.5">
//                 Database se data fetch ho raha hai
//                 <span className="flex gap-0.5 ml-1">
//                   {[0, 1, 2].map((d) => (
//                     <span
//                       key={d}
//                       className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"
//                       style={{ animationDelay: `${d * 0.15}s` }}
//                     />
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
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' && !e.shiftKey) {
//                   e.preventDefault();
//                   send();
//                 }
//               }}
//               placeholder="Train, PNR, booking — kuch bhi poochho..."
//               rows={1}
//               className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3 resize-none focus:outline-none focus:border-violet-500 text-sm leading-relaxed transition-all"
//             />
//             <button
//               onClick={send}
//               disabled={busy || !input.trim()}
//               className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-5 py-3 rounded-2xl flex items-center justify-center transition shrink-0"
//               title="Send (Enter)"
//             >
//               <FiSend size={20} />
//             </button>
//           </div>
//           <p className="text-xs text-slate-600 mt-2 text-center">
//             Sare jawab live database se — koi assumption nahi
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }





import { useEffect, useRef, useState } from 'react';
import { FiSend, FiPlus, FiTrash2, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { aiApi } from '../../api/endpoints';

const SUGGESTED = [
  'Kal Mumbai jana hai',
  'Mera PNR 1234567890 check karo',
  'Tatkal ticket Delhi to Lucknow kal ke liye',
  'WL 42 confirm hoga kya?',
  'Agra trip plan kar do, 2 din, 8000 ka budget',
];

/** Group agents by category for the dropdown */
const GROUP_LABELS = {
  master: '🧠 Master',
  booking: '🎫 Booking',
  search: '🔍 Search',
  trip: '🗺️ Trip',
  pnr: '📋 PNR',
  prediction: '📈 Prediction',
  notification: '🔔 Notification',
  payment: '💳 Payment',
  admin: '⚙️ Admin',
  rag: '📚 Knowledge',
  enterprise: '🏢 Enterprise',
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

/**
 * Lightweight markdown renderer.
 * Supports: **bold**, `code`, bullet lists (- / •), numbered lists, blank-line paragraphs.
 */
function MessageContent({ content = '' }) {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const trimmed = raw.trim();

    if (!trimmed) {
      elements.push(<div key={i} className="h-2" />);
      i++; continue;
    }

    if (/^[-•*]\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[-•*]\s+/.test(lines[i].trim())) {
        items.push(<li key={i} className="ml-4 list-disc"><InlineMarkdown text={lines[i].trim().replace(/^[-•*]\s+/, '')} /></li>);
        i++;
      }
      elements.push(<ul key={`ul-${i}`} className="space-y-0.5 my-1">{items}</ul>);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(<li key={i} className="ml-4 list-decimal"><InlineMarkdown text={lines[i].trim().replace(/^\d+\.\s+/, '')} /></li>);
        i++;
      }
      elements.push(<ol key={`ol-${i}`} className="space-y-0.5 my-1">{items}</ol>);
      continue;
    }

    elements.push(<p key={i} className="leading-relaxed"><InlineMarkdown text={trimmed} /></p>);
    i++;
  }

  return <div className="space-y-1 text-sm">{elements}</div>;
}

function InlineMarkdown({ text = '' }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
        if (part.startsWith('`') && part.endsWith('`'))
          return <code key={i} className="bg-black/30 text-violet-300 rounded px-1 py-0.5 text-xs font-mono">{part.slice(1, -1)}</code>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function AIAssistant() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('railway-master');
  const [conversations, setConvos] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    loadAgents();
    reloadConvos();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  const loadAgents = async () => {
    try {
      const res = await aiApi.agents();
      setAgents(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load agents:', err);
    }
  };

  const reloadConvos = async () => {
    try {
      const res = await aiApi.conversations();
      setConvos(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load conversations:', err);
    }
  };

  const openConvo = async (id) => {
    setActiveConversation(id);
    try {
      const res = await aiApi.conversation(id);
      setMessages(res.data?.data?.messages || []);
    } catch (err) {
      toast.error('Conversation load nahi ho paya');
    }
  };

  const newChat = () => {
    setActiveConversation(null);
    setMessages([]);
    setInput('');
  };

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;

    // Append user message immediately for responsiveness
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setBusy(true);

    try {
      const payload = {
        message: text,
        agent: selectedAgent,
        ...(activeConversation && { conversationId: activeConversation }),
      };

      const res = await aiApi.chat(payload);

      if (res.data?.data?.conversationId) {
        setActiveConversation(res.data.data.conversationId);
      }

      // Replace messages with the full conversation returned by server
      // (includes DB-sourced assistant reply)
      const serverMessages = res.data?.data?.messages;
      if (serverMessages?.length) {
        setMessages(serverMessages);
      } else {
        // Fallback: show a neutral error — NOT a hallucinated answer
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'Yeh information abhi database se fetch nahi ho payi. Kripya dobara try karein ya kuch der baad try karein.',
          },
        ]);
      }

      reloadConvos();
    } catch (err) {
      console.error('AI Chat Error:', err.response?.data || err);
      toast.error(err.response?.data?.message || 'AI service unavailable');

      // Show a neutral fallback — NOT a fabricated answer
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            '⚠️ Server se data nahi aa paya. Kripya dobara try karein. Agar problem continue ho to support se contact karein.',
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const removeConversation = async (id) => {
    try {
      await aiApi.remove(id);
      reloadConvos();
      if (activeConversation === id) newChat();
    } catch (err) {
      toast.error('Conversation delete nahi hui');
    }
  };

  const agentGroups = groupAgents(agents);
  const currentAgent = agents.find((a) => a.key === selectedAgent);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-64px-72px)]">

      {/* ── Sidebar ── */}
      <aside className="bg-gray-900 border border-gray-700 rounded-3xl p-4 flex flex-col min-h-0 gap-3">

        <button
          onClick={newChat}
          className="btn-primary flex items-center justify-center gap-2 py-3"
        >
          <FiPlus /> New Chat
        </button>

        {/* Agent selector */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">
            Agent
          </label>
          <select
            className="input w-full text-sm"
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
          >
            {Object.entries(agentGroups).map(([cat, list]) => (
              <optgroup key={cat} label={GROUP_LABELS[cat] || cat}>
                {list.map((a) => (
                  <option key={a.key} value={a.key}>
                    {a.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          {/* Active agent badge */}
          {currentAgent && (
            <div className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-violet-900/40 border border-violet-700 rounded-xl text-xs text-violet-300">
              <FiZap size={12} className="shrink-0" />
              <span className="truncate">{currentAgent.name}</span>
            </div>
          )}
        </div>

        {/* Recent conversations */}
        <div className="text-xs uppercase tracking-widest text-slate-400">Recent</div>

        <div className="flex-1 overflow-auto space-y-1 pr-1 scroll-thin">
          {conversations.map((conv) => (
            <div
              key={conv._id}
              className={`group flex items-center gap-2 px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
                activeConversation === conv._id
                  ? 'bg-violet-600 text-white'
                  : 'hover:bg-gray-800 text-slate-300'
              }`}
              onClick={() => openConvo(conv._id)}
            >
              <div className="flex-1 truncate text-sm">
                {conv.title || 'New Conversation'}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeConversation(conv._id);
                }}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 p-1 shrink-0"
                title="Delete"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}

          {conversations.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-8">
              Koi conversation nahi hai abhi
            </p>
          )}
        </div>
      </aside>

      {/* ── Chat Area ── */}
      <section className="bg-gray-900 border border-gray-700 rounded-3xl flex flex-col min-h-0 overflow-hidden">

        {/* Message list */}
        <div className="flex-1 overflow-auto p-6 space-y-5 scroll-thin">

          {/* Empty state */}
          {messages.length === 0 && (
            <div className="text-center py-16 select-none">
              <div className="text-6xl mb-4">🚄</div>
              <h2 className="text-2xl font-semibold mb-1">Namaste! Kya poochna hai?</h2>
              <p className="text-slate-400 text-sm mb-6">
                Sare jawab live database se aate hain — koi guess nahi.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-violet-500 px-4 py-2 rounded-2xl text-sm transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Avatar for assistant */}
              {msg.role !== 'user' && (
                <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center text-sm shrink-0 mr-2 mt-1">
                  🚄
                </div>
              )}

              <div
                className={`max-w-[80%] px-5 py-3 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-violet-600 text-white rounded-br-md'
                    : 'bg-gray-800 border border-gray-700 rounded-bl-md'
                }`}
              >
                <MessageContent content={msg.content} />
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {busy && (
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center shrink-0">
                🚄
              </div>
              <span className="flex items-center gap-1.5">
                Database se data fetch ho raha hai
                <span className="flex gap-0.5 ml-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </span>
              </span>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Input bar */}
        <div className="p-4 border-t border-gray-700 bg-gray-900/80 backdrop-blur-sm">
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Train, PNR, booking — kuch bhi poochho..."
              rows={1}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3 resize-none focus:outline-none focus:border-violet-500 text-sm leading-relaxed transition-all"
            />
            <button
              onClick={send}
              disabled={busy || !input.trim()}
              className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-5 py-3 rounded-2xl flex items-center justify-center transition shrink-0"
              title="Send (Enter)"
            >
              <FiSend size={20} />
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-2 text-center">
            Sare jawab live database se — koi assumption nahi
          </p>
        </div>
      </section>
    </div>
  );
}