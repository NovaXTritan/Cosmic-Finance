'use client';

import { motion } from 'framer-motion';
import { AnalysisData } from '@/types';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  Shield,
  Zap
} from 'lucide-react';

interface OverviewProps {
  data: AnalysisData;
}

export default function Overview({ data }: OverviewProps) {
  const { ratios, trends, financial_data } = data;

  // Calculate health scores
  const calculateHealthScore = () => {
    const scores = {
      liquidity: Math.min(100, (ratios.liquidity.current_ratio / 2.0) * 100),
      leverage: Math.min(100, 100 - (ratios.leverage.debt_to_equity / 2.0) * 100),
      profitability: Math.min(100, (ratios.profitability.roe * 500)),
      efficiency: Math.min(100, (ratios.efficiency.asset_turnover / 2.0) * 100)
    };
    
    const overall = Object.values(scores).reduce((a, b) => a + b, 0) / 4;
    return { ...scores, overall: Math.max(0, overall) };
  };

  const healthScores = calculateHealthScore();

  const keyMetrics = [
    {
      label: 'Liquidity Score',
      value: healthScores.liquidity.toFixed(0),
      change: ratios.liquidity.current_ratio >= 1.5 ? '+Good' : '-Needs Attention',
      positive: ratios.liquidity.current_ratio >= 1.5,
      icon: Activity,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Leverage Health',
      value: healthScores.leverage.toFixed(0),
      change: ratios.leverage.debt_to_equity <= 1.5 ? '+Healthy' : '-High Risk',
      positive: ratios.leverage.debt_to_equity <= 1.5,
      icon: Shield,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Profitability',
      value: healthScores.profitability.toFixed(0),
      change: ratios.profitability.roe > 0.15 ? '+Strong' : '-Below Target',
      positive: ratios.profitability.roe > 0.15,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Efficiency',
      value: healthScores.efficiency.toFixed(0),
      change: ratios.efficiency.asset_turnover > 1.0 ? '+Efficient' : '-Improve',
      positive: ratios.efficiency.asset_turnover > 1.0,
      icon: Zap,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Health Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cosmic-card p-8"
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-400 mb-4">Overall Financial Health</h3>
          <div className="relative inline-block">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="rgba(99, 102, 241, 0.2)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(healthScores.overall / 100) * 440} 440`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-cosmic-primary to-cosmic-secondary bg-clip-text text-transparent">
                  {healthScores.overall.toFixed(0)}
                </div>
                <div className="text-sm text-gray-400 font-medium">out of 100</div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-gray-400">
            {healthScores.overall >= 80 ? 'Excellent financial health' :
             healthScores.overall >= 65 ? 'Good financial position' :
             healthScores.overall >= 50 ? 'Fair condition, room for improvement' :
             'Requires attention and improvement'}
          </p>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cosmic-card-hover"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="mb-2">
                <div className="text-3xl font-bold text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-400">{metric.label}</div>
              </div>
              
              <div className={`flex items-center gap-1 text-sm font-medium ${metric.positive ? 'text-cosmic-success' : 'text-cosmic-danger'}`}>
                {metric.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {metric.change}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <div className="cosmic-card">
          <div className="text-sm text-gray-400 mb-1">Current Ratio</div>
          <div className="text-2xl font-bold text-white">
            {ratios.liquidity.current_ratio.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Target: 1.5 - 3.0</div>
        </div>

        <div className="cosmic-card">
          <div className="text-sm text-gray-400 mb-1">Debt-to-Equity</div>
          <div className="text-2xl font-bold text-white">
            {ratios.leverage.debt_to_equity.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Target: &lt; 1.5</div>
        </div>

        <div className="cosmic-card">
          <div className="text-sm text-gray-400 mb-1">ROE</div>
          <div className="text-2xl font-bold text-white">
            {(ratios.profitability.roe * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 mt-1">Target: &gt; 15%</div>
        </div>
      </motion.div>

      {/* Trends Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="cosmic-card"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Trend Analysis</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Revenue</div>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-semibold ${trends.revenue_trend === 'Growing' ? 'text-cosmic-success' : 'text-gray-400'}`}>
                {trends.revenue_trend}
              </span>
              {trends.revenue_trend === 'Growing' && <TrendingUp className="w-5 h-5 text-cosmic-success" />}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-400 mb-1">Profitability</div>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-semibold ${trends.profit_trend === 'Positive' ? 'text-cosmic-success' : 'text-cosmic-danger'}`}>
                {trends.profit_trend}
              </span>
              {trends.profit_trend === 'Positive' ? 
                <TrendingUp className="w-5 h-5 text-cosmic-success" /> : 
                <TrendingDown className="w-5 h-5 text-cosmic-danger" />
              }
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-400 mb-1">Cash Flow</div>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-semibold ${trends.cash_flow_trend === 'Positive' ? 'text-cosmic-success' : 'text-cosmic-danger'}`}>
                {trends.cash_flow_trend}
              </span>
              {trends.cash_flow_trend === 'Positive' ? 
                <TrendingUp className="w-5 h-5 text-cosmic-success" /> : 
                <TrendingDown className="w-5 h-5 text-cosmic-danger" />
              }
            </div>
          </div>
        </div>

        {trends.key_observations.length > 0 && (
          <div className="mt-4 pt-4 border-t border-cosmic-primary/20">
            <div className="text-sm text-gray-400 mb-2">Key Observations:</div>
            <ul className="space-y-1">
              {trends.key_observations.map((obs, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-cosmic-primary mt-1">•</span>
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}
