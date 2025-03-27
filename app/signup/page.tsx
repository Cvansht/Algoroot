"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, User } from "lucide-react";
import { useAuth } from "@/app/context/Auth";

const SignupPage = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const success = signup(username, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Username already exists");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">Create an Account</h2>
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Username Field */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <label className="text-white font-semibold">Username</label>
            <div className="flex items-center mt-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
              <User className="text-white/70 mr-2" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent w-full text-white placeholder-white/60 focus:outline-none"
                placeholder="Enter your username"
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="text-white font-semibold">Password</label>
            <div className="flex items-center mt-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
              <Lock className="text-white/70 mr-2" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full text-white placeholder-white/60 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="text-white font-semibold">Confirm Password</label>
            <div className="flex items-center mt-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
              <ShieldCheck className="text-white/70 mr-2" size={20} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-transparent w-full text-white placeholder-white/60 focus:outline-none"
                placeholder="Re-enter your password"
                required
              />
            </div>
          </motion.div>

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Signup Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition duration-300 text-lg shadow-md"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="mt-6 text-center text-white/80">
          Already have an account?{" "}
          <a href="/login" className="text-purple-200 hover:underline">
            Log in here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
