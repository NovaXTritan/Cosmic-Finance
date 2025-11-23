'use client';

import { motion } from 'framer-motion';

interface MetricsOverviewProps {
  data: any;
}

export default function MetricsOverview({ data }: MetricsOverviewProps) {
  const metrics = data?.metrics || {};

  const renderMetricCard = (category: string, categoryData: any, index: number) => {
    if (!categoryData || typeof categoryData !== 'object') return null;

    const categoryColors = {
      liquidity_ratios: { border: 'cosmic', bg: 'cosmic', text: 'cosmic' },
      leverage_ratios: { border: 'nebula', bg: 'nebula', text: 'nebula' },
      profitability_ratios: { border: 'cosmic', bg: 'cosmic', text: 'cosmic' },
      activity_ratios: { border: 'nebula', bg: 'nebula', text: 'nebula' },
    };

    const colors = categoryColors[category as keyof typeof categoryColors] || { border: 'cosmic', bg: 'cosmic', text: 'cosmic' };

    return (
      <motion.div
        key={category}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`p-6 bg-void-800/40 backdrop-blur-sm border border-${colors.border}-500/30 rounded-2xl hover:border-${colors.border}-500/50 transition-all`}
      >
        <h3 className={`text-xl font-semibold mb-6 bg-gradient-to-r from-${colors.text}-300 to-${colors.text}-500 bg-clip-text text-transparent capitalize`}>
          {category.replace(/_/g, ' ')}
        </h3>

        <div className="space-y-4">
          {Object.entries(categoryData).map(([metricName, metricData]: [string, any]) => {
            if (!metricData || typeof metricData !== 'object' || !('value' in metricData)) return null;

            const value = metricData.value;
            const benchmark = metricData.benchmark;
            const interpretation = metricData.interpretation || '';
            const description = metricData.description || '';

            // Determine status color
            let statusColor = 'gray';
            if (interpretation.toLowerCase().includes('excellent') || interpretation.toLowerCase().includes('good')) {
              statusColor = 'green';
            } else if (interpretation.toLowerCase().includes('fair')) {
              statusColor = 'yellow';
            } else if (interpretation.toLowerCase().includes('concerning')) {
              statusColor = 'red';
            }

            return (
              <motion.div
                key={metricName}
                whileHover={{ scale: 1.02, x: 4 }}
                className="p-4 bg-void-700/30 rounded-xl border border-cosmic-500/10 hover:border-cosmic-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-cosmic-100 capitalize">
                      {metricName.replace(/_/g, ' ')}
                    </h4>
                    <p className="text-xs text-cosmic-200/50 mt-1">{description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    statusColor === 'green' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    statusColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                    statusColor === 'red' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                    'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                  }`}>
                    {value !== null && value !== undefined ? 
                      (typeof value === 'number' ? value.toFixed(2) : value) 
                      : 'N/A'}
                  </div>
                </div>

                {benchmark !== null && benchmark !== undefined && (
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-cosmic-200/50">Benchmark:</span>
                    <span className="text-cosmic-200/70">{benchmark.toFixed(2)}</span>
                    {value !== null && (
                      <span className={`ml-auto ${
                        statusColor === 'green' ? 'text-green-400' :
                        statusColor === 'yellow' ? 'text-yellow-400' :
                        statusColor === 'red' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {interpretation}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Object.entries(metrics).map(([category, categoryData], index) => 
        renderMetricCard(category, categoryData, index)
      )}

      {/* Anomalies Card if present */}
      {data?.anomalies && data.anomalies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-6 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-2xl"
        >
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-semibold text-red-300">Detected Anomalies</h3>
          </div>
          <div className="space-y-3">
            {data.anomalies.map((anomaly: any, index: number) => (
              <div key={index} className="p-4 bg-void-700/30 rounded-xl border border-red-500/20">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-red-300">{anomaly.category}</h4>
                    <p className="text-sm text-cosmic-200/70 mt-1">{anomaly.issue}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    anomaly.severity === 'critical' ? 'bg-red-500/30 text-red-200' :
                    anomaly.severity === 'high' ? 'bg-orange-500/30 text-orange-200' :
                    'bg-yellow-500/30 text-yellow-200'
                  }`}>
                    {anomaly.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
