"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { User, Lock, Loader2, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Invalid credentials');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
          {/* Glass effect top bar */}
          <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
          
          <div className="p-8">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h2>
              <p className="text-white/80 text-center mb-8">Please sign in to continue</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div className="space-y-2">
                <label className="block text-white/90 text-sm font-medium pl-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/50" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl 
                             text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/25
                             transition-all duration-200"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-white/90 text-sm font-medium pl-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl 
                             text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/25
                             transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-200 bg-red-500/10 p-3 rounded-lg"
                  >
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isLoading}
                className="relative w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                         text-white py-3 rounded-xl font-medium text-lg shadow-lg
                         disabled:opacity-70 disabled:cursor-not-allowed
                         transition-all duration-200"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  'Sign In'
                )}
              </motion.button>

              {/* Forgot Password & Sign Up Links */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/80">
                <motion.a
                  whileHover={{ color: '#fff' }}
                  href="/forgot-password"
                  className="hover:underline"
                >
                  Forgot your password?
                </motion.a>
                <motion.a
                  whileHover={{ color: '#fff' }}
                  href="/signup"
                  className="hover:underline"
                >
                  Don't have an account? Sign up
                </motion.a>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-white/60 text-center mt-8 text-sm">
          © 2025 AlgoRoot. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
