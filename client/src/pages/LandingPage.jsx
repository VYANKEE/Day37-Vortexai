import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Cpu, Zap, Shield, Activity, Terminal, Code2, Globe, CheckCircle, Lock } from "lucide-react";

// --- 1. INFINITE LOGO MARQUEE (New) ---
const LogoMarquee = () => {
  return (
    <div className="relative flex overflow-x-hidden bg-white/5 border-y border-white/10 py-8 backdrop-blur-sm">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10" />
      
      <motion.div
        className="flex gap-20 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-500 font-bold text-xl uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-cyan-400 transition-all cursor-pointer">
            <Cpu size={24} /> <span>CORP_NODE_{i}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- 2. HACKER TERMINAL (New) ---
const NeuralTerminal = () => {
  return (
    <div className="max-w-4xl mx-auto my-20 p-1 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x shadow-[0_0_50px_-10px_rgba(168,85,247,0.5)]">
      <div className="bg-[#0a0a0a] rounded-lg overflow-hidden font-mono text-xs md:text-sm shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="text-gray-500">root@vortex-ai:~</div>
        </div>
        <div className="p-6 space-y-2 h-64 overflow-hidden text-gray-300">
          <div className="flex gap-2">
            <span className="text-green-400">➜</span>
            <span className="text-cyan-400">~</span>
            <span>initiate_sequence --force</span>
          </div>
          <div className="text-gray-500 pl-4">
            [INFO] Establishing neural link... <br/>
            [INFO] Bypassing firewall protocol 8080... <br/>
            [SUCCESS] Connection established in 0.04ms <br/>
            [INFO] Loading memory modules: <br/>
            &nbsp;&nbsp;├── Context_Vector_DB (LOADED) <br/>
            &nbsp;&nbsp;├── Sentiment_Analysis (LOADED) <br/>
            &nbsp;&nbsp;└── Predictive_Engine (OPTIMIZED) <br/>
          </div>
          <div className="flex gap-2 pt-2">
            <span className="text-green-400">➜</span>
            <span className="text-cyan-400">~</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. 3D TILT CARD (Enhanced) ---
const TiltCard = ({ title, desc, icon, color }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;
    const rX = (mouseY / height - 32.5 / 2) * -1;
    const rY = mouseX / width - 32.5 / 2;
    x.set(rX);
    y.set(rY);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: mouseXSpring, rotateY: mouseYSpring, transformStyle: "preserve-3d" }}
      className="relative h-80 w-full rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 backdrop-blur-xl group hover:border-white/20 transition-all duration-300"
    >
      <div style={{ transform: "translateZ(75px)" }} className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div className={`p-5 rounded-2xl bg-${color}-500/10 text-${color}-400 mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

// --- MAIN LANDING PAGE ---
const LandingPage = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);
  
  return (
    <div className="relative min-h-screen bg-[#030014] text-white overflow-hidden selection:bg-cyan-500/30">
      
      {/* Background Grid & Globs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#030014]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Activity className="animate-pulse" />
            <span className="text-xl font-black tracking-widest text-white">VORTEX.SYS</span>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded text-sm font-mono tracking-wide transition-all"
          >
            // LOGIN
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            style={{ y: yHero }}
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            SYSTEM ONLINE V3.4.2
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
            DIGITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              EVOLUTION
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Experience the latency-free, memory-persistent AI architecture. 
            Built for the <span className="text-white font-bold">next generation</span> of developers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => navigate('/login')}
              className="group relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg tracking-tight rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(6,182,212,0.6)]"
            >
              INITIALIZE SYSTEM
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-lg rounded-xl backdrop-blur-md transition-all">
              READ DOCS
            </button>
          </div>
        </div>

        {/* TERMINAL BLOCK (ADDS DENSITY) */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <NeuralTerminal />
        </motion.div>
      </section>

      {/* INFINITE MARQUEE */}
      <LogoMarquee />

      {/* FEATURE GRID */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Architecture</h2>
            <p className="text-gray-400">Engineered for absolute performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
            <TiltCard 
              title="Quantum Speed" 
              desc="Optimized for <50ms response times using edge caching." 
              icon={<Zap size={40} />} 
              color="yellow"
            />
            <TiltCard 
              title="Encrypted Vault" 
              desc="Zero-knowledge architecture ensuring your data remains yours." 
              icon={<Lock size={40} />} 
              color="cyan"
            />
            <TiltCard 
              title="Neural Mesh" 
              desc="Self-healing context windows that grow with conversation." 
              icon={<Cpu size={40} />} 
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* PRICING / PLANS (FILLER) */}
      <section className="py-32 px-6 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold">Unleash Full <br/> Potential</h2>
              <p className="text-gray-400 text-lg">
                Join 10,000+ developers building the future with Vortex AI.
                Scale your memory infinitely.
              </p>
              <ul className="space-y-4 text-gray-300">
                {['Unlimited Context Window', 'GPT-4 & Claude 3 Models', 'Custom System Prompts', 'Priority Support'].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="text-cyan-400" size={20} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative p-1 rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500">
              <div className="bg-[#0a0a0a] p-8 rounded-xl h-full flex flex-col justify-between">
                <div>
                  <div className="text-cyan-400 font-mono text-sm mb-2">PRO LICENSE</div>
                  <div className="text-5xl font-bold text-white mb-6">$0<span className="text-lg text-gray-500">/mo</span></div>
                  <p className="text-gray-400 mb-8">Currently in Beta. Access all premium features for free while we scale.</p>
                </div>
                <button onClick={() => navigate('/login')} className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition">
                  CLAIM ACCESS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 bg-black text-center text-gray-600 font-mono text-xs">
        <p>VORTEX AI SYSTEMS © 2026. ALL PROTOCOLS SECURE.</p>
      </footer>
    </div>
  );
};

export default LandingPage;