'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartsSectionProps {
  data: any;
}

export default function ChartsSection({ data }: ChartsSectionProps) {
  const metrics = data?.metrics || {};

  // Prepare data for ratio comparison chart
  const ratioData = [
    {
      name: 'Current Ratio',
      value: metrics.liquidity_ratios?.current_ratio?.value || 0,
      benchmark: metrics.liquidity_ratios?.current_ratio?.benchmark || 0,
    },
    {
      name: 'Quick Ratio',
      value: metrics.liquidity_ratios?.quick_ratio?.value || 0,
      benchmark: metrics.liquidity_ratios?.quick_ratio?.benchmark || 0,
    },
    {
      name: 'Debt/Equity',
      value: metrics.leverage_ratios?.debt_to_equity?.value || 0,
      benchmark: metrics.leverage_ratios?.debt_to_equity?.benchmark || 0,
    },
    {
      name: 'ROE',
      value: metrics.profitability_ratios?.return_on_equity?.value || 0,
      benchmark: metrics.profitability_ratios?.return_on_equity?.benchmark || 0,
    },
  ];

  // Prepare profitability data
  const profitabilityData = [
    { name: 'Gross Margin', value: metrics.profitability_ratios?.gross_profit_margin?.value || 0 },
    { name: 'Operating Margin', value: metrics.profitability_ratios?.operating_margin?.value || 0 },
    { name: 'Net Margin', value: metrics.profitability_ratios?.net_profit_margin?.value || 0 },
  ];

  // Prepare radar chart data
  const radarData = [
    {
      metric: 'Liquidity',
      value: metrics.liquidity_ratios?.current_ratio?.value 
        ? Math.min(100, (metrics.liquidity_ratios.current_ratio.value / (metrics.liquidity_ratios.current_ratio.benchmark || 2)) * 100)
        : 50,
    },
    {
      metric: 'Profitability',
      value: metrics.profitability_ratios?.net_profit_margin?.value
        ? Math.min(100, (metrics.profitability_ratios.net_profit_margin.value / (metrics.profitability_ratios.net_profit_margin.benchmark || 10)) * 100)
        : 50,
    },
    {
      metric: 'Efficiency',
      value: metrics.activity_ratios?.asset_turnover?.value
        ? Math.min(100, (metrics.activity_ratios.asset_turnover.value / (metrics.activity_ratios.asset_turnover.benchmark || 1)) * 100)
        : 50,
    },
    {
      metric: 'Leverage',
      value: metrics.leverage_ratios?.debt_to_equity?.value
        ? Math.min(100, 100 - (metrics.leverage_ratios.debt_to_equity.value / (metrics.leverage_ratios.debt_to_equity.benchmark || 1)) * 50)
        : 50,
    },
  ];

  const COLORS = ['#8B5CF6', '#D946EF', '#6366F1', '#A78BFA'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-void-800 border border-cosmic-500/30 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-cosmic-100 font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Ratio Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-void-800/40 backdrop-blur-sm border border-cosmic-500/30 rounded-2xl"
      >
        <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-cosmic-300 to-cosmic-500 bg-clip-text text-transparent">
          Key Ratios vs Benchmark
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratioData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#8B5CF6" opacity={0.1} />
            <XAxis dataKey="name" stroke="#A78BFA" tick={{ fill: '#A78BFA' }} />
            <YAxis stroke="#A78BFA" tick={{ fill: '#A78BFA' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#A78BFA' }} />
            <Bar dataKey="value" fill="#8B5CF6" name="Actual" radius={[8, 8, 0, 0]} />
            <Bar dataKey="benchmark" fill="#D946EF" name="Benchmark" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Profitability Margins */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 bg-void-800/40 backdrop-blur-sm border border-nebula-500/30 rounded-2xl"
      >
        <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-nebula-300 to-nebula-500 bg-clip-text text-transparent">
          Profitability Margins
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={profitabilityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value?.toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {profitabilityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Financial Health Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-2 p-6 bg-void-800/40 backdrop-blur-sm border border-cosmic-500/30 rounded-2xl"
      >
        <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-cosmic-300 to-cosmic-500 bg-clip-text text-transparent">
          Overall Financial Health
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#8B5CF6" opacity={0.3} />
            <PolarAngleAxis dataKey="metric" tick={{ fill: '#A78BFA' }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#A78BFA' }} />
            <Radar 
              name="Performance" 
              dataKey="value" 
              stroke="#8B5CF6" 
              fill="#8B5CF6" 
              fillOpacity={0.6}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center text-cosmic-200/60 text-sm">
          <p>Higher values indicate better performance relative to industry benchmarks</p>
        </div>
      </motion.div>

      {/* Activity Metrics */}
      {metrics.activity_ratios && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 p-6 bg-void-800/40 backdrop-blur-sm border border-nebula-500/30 rounded-2xl"
        >
          <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-nebula-300 to-nebula-500 bg-clip-text text-transparent">
            Activity & Efficiency Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'Asset Turnover',
                value: metrics.activity_ratios.asset_turnover?.value,
                benchmark: metrics.activity_ratios.asset_turnover?.benchmark,
              },
              {
                label: 'Inventory Turnover',
                value: metrics.activity_ratios.inventory_turnover?.value,
                benchmark: metrics.activity_ratios.inventory_turnover?.benchmark,
              },
              {
                label: 'Days Sales Outstanding',
                value: metrics.activity_ratios.days_sales_outstanding?.value,
                benchmark: metrics.activity_ratios.days_sales_outstanding?.benchmark,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-void-700/30 rounded-xl border border-nebula-500/20"
              >
                <div className="text-sm text-cosmic-200/60 mb-2">{item.label}</div>
                <div className="text-3xl font-bold text-nebula-300 mb-1">
                  {item.value?.toFixed(2) || 'N/A'}
                </div>
                <div className="text-xs text-cosmic-200/50">
                  Benchmark: {item.benchmark?.toFixed(2) || 'N/A'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
