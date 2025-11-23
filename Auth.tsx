'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Chrome, Sparkles, Shield, Zap } from 'lucide-react';

interface AuthProps {
  onGuestAccess: () => void;
}

export default function Auth({ onGuestAccess }: AuthProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // TODO: Implement actual authentication
    console.log('Sign in with email:', email);
    setIsLoading(false);
  };

  const handleOAuthSignIn = (provider: 'google' | 'github') => {
    // TODO: Implement OAuth flow
    console.log('Sign in with:', provider);
  };

  const features = [
    { icon: Shield, text: 'Secure & Private' },
    { icon: Zap, text: 'Lightning Fast' },
    { icon: Sparkles, text: 'AI-Powered' },
  ];

  return (
    <div className="min-h-screen bg-cosmic-dark relative overflow-hidden flex items-center justify-center p-6">
      {/* Cosmic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cosmic-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cosmic-primary to-cosmic-secondary mb-6 shadow-cosmic"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-display font-bold text-white mb-3">
            Cosmic Financials
          </h1>
          <p className="text-gray-400">
            AI-Powered Financial Intelligence Platform
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-cosmic-surface/50 backdrop-blur-xl rounded-3xl border border-cosmic-primary/20 p-8 shadow-2xl">
          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuthSignIn('google')}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-900 font-medium transition-all hover:scale-105"
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </button>

            <button
              onClick={() => handleOAuthSignIn('github')}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium border border-gray-700 transition-all hover:scale-105"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cosmic-primary/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-cosmic-surface text-gray-400">or</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="cosmic-input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cosmic-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Sign in with Email
                </span>
              )}
            </button>
          </form>

          {/* Guest Access */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cosmic-primary/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-cosmic-surface text-gray-400">or</span>
            </div>
          </div>

          <button
            onClick={onGuestAccess}
            className="w-full mt-6 px-6 py-3 rounded-xl bg-cosmic-surface/50 border border-cosmic-primary/30 text-white font-medium hover:border-cosmic-primary/50 transition-all hover:scale-105"
          >
            Continue as Guest
          </button>

          {/* Terms */}
          <p className="text-center text-xs text-gray-500 mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-cosmic-primary hover:text-cosmic-secondary transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-cosmic-primary hover:text-cosmic-secondary transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center gap-2 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-cosmic-surface/30 border border-cosmic-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cosmic-primary" />
                </div>
                <p className="text-xs text-gray-400">{feature.text}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
