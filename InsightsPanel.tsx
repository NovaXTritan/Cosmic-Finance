'use client';

import { motion } from 'framer-motion';

interface InsightsPanelProps {
  insights: any;
}

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  if (!insights) return null;

  const renderSection = (title: string, items: string[], icon: string, colorScheme: string, delay: number) => {
    if (!items || items.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className={`p-6 bg-void-800/40 backdrop-blur-sm border border-${colorScheme}-500/30 rounded-2xl hover:border-${colorScheme}-500/50 transition-all`}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-10 h-10 bg-${colorScheme}-500/20 rounded-xl flex items-center justify-center`}>
            <svg className={`w-6 h-6 text-${colorScheme}-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
            </svg>
          </div>
          <h3 className={`text-xl font-semibold bg-gradient-to-r from-${colorScheme}-300 to-${colorScheme}-500 bg-clip-text text-transparent`}>
            {title}
          </h3>
        </div>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + (index * 0.05) }}
              className="flex items-start space-x-3 text-cosmic-200/80"
            >
              <span className={`text-${colorScheme}-400 mt-1`}>•</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      {insights.executive_summary && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-cosmic-gradient rounded-2xl shadow-cosmic-lg"
        >
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Executive Summary</span>
          </h3>
          <p className="text-white/90 text-lg leading-relaxed">{insights.executive_summary}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        {renderSection(
          'Key Strengths',
          insights.strengths,
          'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
          'cosmic',
          0.1
        )}

        {/* Weaknesses */}
        {renderSection(
          'Areas for Improvement',
          insights.weaknesses,
          'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
          'nebula',
          0.2
        )}

        {/* Opportunities */}
        {renderSection(
          'Strategic Opportunities',
          insights.opportunities,
          'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
          'cosmic',
          0.3
        )}

        {/* Risks */}
        {renderSection(
          'Risk Factors',
          insights.risks,
          'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
          'nebula',
          0.4
        )}
      </div>

      {/* Industry Comparison */}
      {insights.industry_comparison && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-void-800/40 backdrop-blur-sm border border-cosmic-500/30 rounded-2xl"
        >
          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cosmic-300 to-cosmic-500 bg-clip-text text-transparent">
            Industry Benchmarking
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-void-700/30 rounded-xl border border-cosmic-500/20">
              <div className="text-sm text-cosmic-200/60 mb-1">Overall Score</div>
              <div className="text-3xl font-bold text-cosmic-300">
                {insights.industry_comparison.overall_score?.toFixed(0)}/100
              </div>
            </div>
            <div className="p-4 bg-void-700/30 rounded-xl border border-nebula-500/20">
              <div className="text-sm text-cosmic-200/60 mb-1">Industry Rank</div>
              <div className="text-3xl font-bold text-nebula-300">
                {insights.industry_comparison.percentile}
              </div>
            </div>
            <div className="p-4 bg-void-700/30 rounded-xl border border-cosmic-500/20">
              <div className="text-sm text-cosmic-200/60 mb-1">Assessment</div>
              <div className="text-lg font-semibold text-cosmic-200">
                {insights.industry_comparison.summary}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Key Takeaways */}
      {insights.key_takeaways && insights.key_takeaways.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 bg-nebula-gradient rounded-2xl shadow-nebula"
        >
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>Key Takeaways</span>
          </h3>
          <ul className="space-y-2">
            {insights.key_takeaways.map((takeaway: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + (index * 0.05) }}
                className="flex items-start space-x-3 text-white/90"
              >
                <span className="text-white mt-1">✓</span>
                <span>{takeaway}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
