import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/chat");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-3xl bg-gray-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] z-10"
      >
        <button 
          onClick={() => navigate('/')} 
          className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition"
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {isRegistering ? "Join VORTEX AI" : "Welcome Back"}
          </h2>
          <p className="text-gray-400 mt-2">
            {isRegistering ? "Create your intelligent account" : "Enter your credentials to access"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-500" size={20} />
            <input
              type="email"
              required
              className="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-500" size={20} />
            <input
              type="password"
              required
              className="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 transition-all"
          >
            {isRegistering ? "Initialize Account" : "Access System"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            {isRegistering
              ? "Already have an account? Sign in"
              : "Don't have an account? Create one"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;