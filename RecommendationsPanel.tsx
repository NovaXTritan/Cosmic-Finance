'use client';

import { motion } from 'framer-motion';

interface RecommendationsPanelProps {
  recommendations: any[];
}

export default function RecommendationsPanel({ recommendations }: RecommendationsPanelProps) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-12 text-cosmic-200/60">
        No recommendations available
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return { border: 'red-500', bg: 'red-500', text: 'red-300' };
      case 'medium':
        return { border: 'yellow-500', bg: 'yellow-500', text: 'yellow-300' };
      case 'low':
        return { border: 'green-500', bg: 'green-500', text: 'green-300' };
      default:
        return { border: 'cosmic-500', bg: 'cosmic-500', text: 'cosmic-300' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cosmic-200 via-nebula-300 to-cosmic-400 bg-clip-text text-transparent">
          Strategic Recommendations
        </h2>
        <p className="text-cosmic-200/60">
          Actionable insights to improve financial performance and competitiveness
        </p>
      </motion.div>

      {/* Recommendations Grid */}
      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const colors = getPriorityColor(rec.priority);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 8 }}
              className={`p-6 bg-void-800/40 backdrop-blur-sm border-l-4 border-${colors.border} rounded-2xl hover:bg-void-800/60 transition-all group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 bg-${colors.bg}/20 border border-${colors.border}/30 rounded-lg text-sm font-medium text-${colors.text}`}>
                      {rec.priority} Priority
                    </span>
                    <span className="px-3 py-1 bg-cosmic-500/10 border border-cosmic-500/20 rounded-lg text-sm text-cosmic-200">
                      {rec.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-cosmic-100 group-hover:text-cosmic-50 transition-colors">
                    {rec.recommendation}
                  </h3>
                </div>

                {/* Priority Badge */}
                <div className={`w-12 h-12 bg-${colors.bg}/20 rounded-xl flex items-center justify-center border border-${colors.border}/30`}>
                  <svg className={`w-6 h-6 text-${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {rec.priority.toLowerCase() === 'high' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    )}
                    {rec.priority.toLowerCase() === 'medium' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    )}
                    {rec.priority.toLowerCase() === 'low' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>
              </div>

              {/* Expected Impact */}
              <div className="mt-4 p-4 bg-void-700/30 rounded-xl border border-cosmic-500/10">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-cosmic-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-cosmic-200/60 mb-1">Expected Impact</div>
                    <div className="text-cosmic-100">{rec.expected_impact}</div>
                  </div>
                </div>
              </div>

              {/* Implementation Timeline */}
              <div className="mt-3 flex items-center space-x-2 text-sm text-cosmic-200/50">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {rec.priority.toLowerCase() === 'high' ? 'Immediate action recommended' :
                   rec.priority.toLowerCase() === 'medium' ? 'Implement within 3-6 months' :
                   'Long-term initiative (6-12 months)'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Plan Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: recommendations.length * 0.1 }}
        className="p-6 bg-cosmic-gradient rounded-2xl shadow-cosmic-lg"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span>Implementation Plan</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {recommendations.filter(r => r.priority.toLowerCase() === 'high').length}
            </div>
            <div className="text-white/80 text-sm">High Priority Items</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {recommendations.filter(r => r.priority.toLowerCase() === 'medium').length}
            </div>
            <div className="text-white/80 text-sm">Medium Priority Items</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {recommendations.length}
            </div>
            <div className="text-white/80 text-sm">Total Recommendations</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
