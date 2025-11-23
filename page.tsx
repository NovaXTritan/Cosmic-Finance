'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FileUpload from '@/components/FileUpload';
import Dashboard from '@/components/Dashboard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AnalysisData } from '@/types';

export default function Home() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = (data: AnalysisData) => {
    setAnalysisData(data);
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-cosmic-void relative overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-void-gradient opacity-50" />
        <div className="absolute top-0 -left-40 w-80 h-80 bg-cosmic-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cosmic-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="stars" />
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-cosmic-surface/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cosmic-primary to-cosmic-secondary flex items-center justify-center shadow-cosmic">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-cosmic-aurora-purple to-cosmic-aurora-pink bg-clip-text text-transparent">
                  Cosmic Financials
                </h1>
                <p className="text-sm text-gray-400">AI-Powered Financial Intelligence</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="px-4 py-2 rounded-lg bg-cosmic-surface/50 border border-cosmic-primary/30 backdrop-blur">
                <span className="text-xs text-gray-400">Status:</span>
                <span className="ml-2 text-cosmic-success text-sm font-medium">● Operational</span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinner message="Analyzing your financial data..." />
            </motion.div>
          ) : !analysisData ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-display font-bold mb-4"
                >
                  <span className="bg-gradient-to-r from-cosmic-aurora-purple via-cosmic-aurora-pink to-cosmic-aurora-blue bg-clip-text text-transparent">
                    Transform Financial Data
                  </span>
                  <br />
                  <span className="text-white">Into Cosmic Insights</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 text-lg max-w-2xl mx-auto"
                >
                  Upload any financial document and watch AI extract, analyze, and visualize
                  every key metric with expert-level insights
                </motion.p>
              </div>

              <FileUpload
                onAnalysisComplete={handleAnalysisComplete}
                onLoadingChange={setIsLoading}
              />

              {/* Feature Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid md:grid-cols-3 gap-6 mt-16"
              >
                {[
                  {
                    icon: '📊',
                    title: 'Smart Extraction',
                    description: 'AI-powered parsing of PDF, Excel, CSV, and scanned documents'
                  },
                  {
                    icon: '🧮',
                    title: 'Complete Analysis',
                    description: '50+ financial ratios calculated across all major categories'
                  },
                  {
                    icon: '🎨',
                    title: 'Visual Intelligence',
                    description: 'Interactive charts with expert explanations and benchmarks'
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="p-6 rounded-2xl bg-cosmic-surface/30 border border-cosmic-primary/20 backdrop-blur hover:border-cosmic-primary/50 transition-all group"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-cosmic-aurora-purple transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Dashboard
                data={analysisData}
                onReset={() => setAnalysisData(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .stars {
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, white, transparent),
            radial-gradient(2px 2px at 60px 70px, white, transparent),
            radial-gradient(1px 1px at 50px 50px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, white, transparent),
            radial-gradient(2px 2px at 90px 10px, white, transparent);
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: twinkle 5s infinite;
          opacity: 0.4;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </main>
    </ErrorBoundary>
  );
}
