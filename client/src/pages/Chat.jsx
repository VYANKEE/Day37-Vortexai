import { useState, useRef, useEffect } from "react";
import { auth, db } from "../firebase";
import { Send, Power, Cpu, User, Command, Trash2 } from "lucide-react";
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, deleteDoc, getDocs, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const user = auth.currentUser;

  // --- 1. FIREBASE LISTENER ---
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "messages"), where("uid", "==", user.uid), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  // Scroll to bottom
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // --- 2. SEND MESSAGE ---
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setIsLoading(true);

    try {
      await addDoc(collection(db, "messages"), { text: userMessage, role: "user", uid: user.uid, createdAt: serverTimestamp() });
      
      // AB HUM LIVE SERVER SE BAAT KARENGE
    const API_URL = "https://day37-vortexai.onrender.com/api/chat";
      const historyContext = messages.slice(-5).map(msg => ({ role: msg.role === "user" ? "user" : "assistant", content: msg.text }));
      
      const response = await fetch(API_URL, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: historyContext }),
      });
      
      const data = await response.json();
      if (data.reply) {
        await addDoc(collection(db, "messages"), { text: data.reply, role: "assistant", uid: user.uid, createdAt: serverTimestamp() });
      }
    } catch (error) { console.error(error); } 
    finally { setIsLoading(false); }
  };

  const clearChat = async () => {
    if(!confirm("PURGE MEMORY BANKS?")) return;
    const q = query(collection(db, "messages"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);
    snapshot.forEach(async (doc) => await deleteDoc(doc.ref));
  };

  return (
    <div className="flex h-screen bg-[#030014] text-white overflow-hidden font-mono">
      
      {/* --- SIDEBAR (Glass HUD) --- */}
      <motion.div 
        initial={{ x: -100 }} animate={{ x: 0 }}
        className="w-20 md:w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl flex flex-col justify-between p-4"
      >
        <div className="space-y-8">
          <div className="flex items-center gap-3 text-cyan-400">
            <Cpu className="animate-pulse" size={32} />
            <h1 className="hidden md:block text-2xl font-black tracking-widest">VORTEX</h1>
          </div>
          <div className="space-y-2">
             <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-xs text-gray-400">
               STATUS: <span className="text-green-400">CONNECTED</span> <br/>
               LATENCY: 12ms <br/>
               MEMORY: 84%
             </div>
          </div>
        </div>
        <button onClick={() => auth.signOut()} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition">
          <Power size={20} /> <span className="hidden md:block">DISCONNECT</span>
        </button>
      </motion.div>

      {/* --- MAIN CHAT AREA --- */}
      <div className="flex-1 flex flex-col relative">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar z-10">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={msg.id} 
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] p-4 rounded-xl border backdrop-blur-md relative overflow-hidden group ${
                  msg.role === "user" 
                    ? "bg-cyan-900/20 border-cyan-500/30 text-cyan-50" 
                    : "bg-purple-900/20 border-purple-500/30 text-purple-50"
                }`}>
                  {/* Glowing Corner Accent */}
                  <div className={`absolute top-0 w-20 h-20 bg-gradient-to-br opacity-20 blur-xl ${msg.role === 'user' ? 'from-cyan-400' : 'from-purple-400'} to-transparent`} />
                  
                  <div className="flex items-start gap-3 relative z-10">
                    {msg.role === "assistant" && <Cpu size={18} className="mt-1 text-purple-400 shrink-0" />}
                    <p className="leading-relaxed text-sm md:text-base">{msg.text}</p>
                    {msg.role === "user" && <User size={18} className="mt-1 text-cyan-400 shrink-0" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-75" />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150" />
                <span className="text-xs text-purple-300 font-mono ml-2">PROCESSING...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* --- INPUT AREA --- */}
        <div className="p-6 bg-[#030014]/80 backdrop-blur-xl border-t border-white/10 z-20">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-4">
            <button type="button" onClick={clearChat} className="text-gray-500 hover:text-red-500 transition">
              <Trash2 size={20} />
            </button>
            <div className="flex-1 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ENTER COMMAND OR MESSAGE..."
                className="relative w-full bg-[#0a0a0a] text-white px-6 py-4 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-500/50 focus:text-cyan-50 font-mono tracking-wide placeholder-gray-600"
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-800 text-white p-4 rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.5)] transition-all active:scale-95"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;