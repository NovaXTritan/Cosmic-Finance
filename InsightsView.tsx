'use client';

import { motion } from 'framer-motion';
import { AnalysisData } from '@/types';
import { AlertTriangle, AlertCircle, Info, CheckCircle, Lightbulb, TrendingUp } from 'lucide-react';

interface InsightsViewProps {
  data: AnalysisData;
}

export default function InsightsView({ data }: InsightsViewProps) {
  const { ai_insights, anomalies } = data;

  const priorityConfig = {
    'Critical': { color: 'from-red-500 to-red-600', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: AlertTriangle },
    'High': { color: 'from-orange-500 to-orange-600', bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', icon: AlertCircle },
    'Medium': { color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: Info },
    'Low': { color: 'from-green-500 to-green-600', bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', icon: CheckCircle }
  };

  const severityConfig = {
    'Critical': { color: 'text-red-500', bg: 'bg-red-500/20' },
    'High': { color: 'text-orange-500', bg: 'bg-orange-500/20' },
    'Medium': { color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
    'Low': { color: 'text-blue-500', bg: 'bg-blue-500/20' }
  };

  // Group insights by category
  const groupedInsights = ai_insights.reduce((acc, insight) => {
    if (!acc[insight.category]) {
      acc[insight.category] = [];
    }
    acc[insight.category].push(insight);
    return acc;
  }, {} as Record<string, typeof ai_insights>);

  return (
    <div className="space-y-6">
      {/* Anomalies Section */}
      {anomalies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cosmic-card"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-white">Anomalies Detected</h3>
              <p className="text-sm text-gray-400">Metrics that fall outside expected ranges</p>
            </div>
          </div>

          <div className="space-y-3">
            {anomalies.map((anomaly, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border ${severityConfig[anomaly.severity].bg} ${
                  anomaly.severity === 'Critical' ? 'border-red-500/30' :
                  anomaly.severity === 'High' ? 'border-orange-500/30' :
                  anomaly.severity === 'Medium' ? 'border-yellow-500/30' :
                  'border-blue-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-white">{anomaly.metric}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${severityConfig[anomaly.severity].color} ${severityConfig[anomaly.severity].bg}`}>
                        {anomaly.severity}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-gray-400">Current Value</div>
                        <div className="text-lg font-bold text-white">{anomaly.value}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Expected Range</div>
                        <div className="text-lg font-semibold text-gray-300">{anomaly.expected_range}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">{anomaly.explanation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* AI Insights by Category */}
      {Object.entries(groupedInsights).map(([category, insights], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="cosmic-card"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cosmic-primary to-cosmic-secondary flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-white">{category}</h3>
              <p className="text-sm text-gray-400">{insights.length} insight{insights.length !== 1 ? 's' : ''} identified</p>
            </div>
          </div>

          <div className="space-y-4">
            {insights.map((insight, index) => {
              const config = priorityConfig[insight.priority];
              const Icon = config.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                  className={`p-5 rounded-xl border ${config.bg} ${config.border} hover:border-cosmic-primary/50 transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${config.text} ${config.bg}`}>
                          {insight.priority} Priority
                        </span>
                      </div>

                      {/* Insight */}
                      <div className="mb-4">
                        <div className="text-xs font-medium text-gray-400 uppercase mb-1">Analysis</div>
                        <p className="text-sm text-white leading-relaxed">{insight.insight}</p>
                      </div>

                      {/* Recommendation */}
                      <div className="mb-4 p-3 rounded-lg bg-cosmic-void/30">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-cosmic-success" />
                          <div className="text-xs font-medium text-cosmic-success uppercase">Recommendation</div>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">{insight.recommendation}</p>
                      </div>

                      {/* Impact */}
                      <div className="p-3 rounded-lg bg-gradient-to-r from-cosmic-primary/5 to-cosmic-secondary/5 border border-cosmic-primary/20">
                        <div className="text-xs font-medium text-gray-400 uppercase mb-1">Expected Impact</div>
                        <p className="text-sm text-gray-300">{insight.impact}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="cosmic-card bg-gradient-to-r from-cosmic-primary/10 to-cosmic-secondary/10"
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Insight Summary</h3>
          <div className="flex items-center justify-center gap-8 mt-4">
            <div>
              <div className="text-3xl font-bold text-cosmic-danger">
                {ai_insights.filter(i => i.priority === 'Critical').length}
              </div>
              <div className="text-xs text-gray-400">Critical</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cosmic-warning">
                {ai_insights.filter(i => i.priority === 'High').length}
              </div>
              <div className="text-xs text-gray-400">High</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500">
                {ai_insights.filter(i => i.priority === 'Medium').length}
              </div>
              <div className="text-xs text-gray-400">Medium</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cosmic-success">
                {ai_insights.filter(i => i.priority === 'Low').length}
              </div>
              <div className="text-xs text-gray-400">Low</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
