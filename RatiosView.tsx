'use client';

import { motion } from 'framer-motion';
import { AnalysisData } from '@/types';
import { Info } from 'lucide-react';

interface RatiosViewProps {
  data: AnalysisData;
}

export default function RatiosView({ data }: RatiosViewProps) {
  const { ratios } = data;

  const ratioCategories = [
    {
      title: 'Liquidity Ratios',
      description: 'Measure ability to meet short-term obligations',
      color: 'from-blue-500 to-cyan-500',
      ratios: [
        { name: 'Current Ratio', value: ratios.liquidity.current_ratio, format: 'decimal', benchmark: '1.5 - 3.0', explanation: 'Current assets divided by current liabilities. Indicates ability to pay short-term debts.' },
        { name: 'Quick Ratio', value: ratios.liquidity.quick_ratio, format: 'decimal', benchmark: '1.0 - 2.0', explanation: 'Quick assets (current assets minus inventory) divided by current liabilities.' },
        { name: 'Cash Ratio', value: ratios.liquidity.cash_ratio, format: 'decimal', benchmark: '> 0.5', explanation: 'Cash and cash equivalents divided by current liabilities.' },
        { name: 'Working Capital', value: ratios.liquidity.working_capital, format: 'currency', benchmark: '> 0', explanation: 'Current assets minus current liabilities.' }
      ]
    },
    {
      title: 'Leverage Ratios',
      description: 'Measure financial risk and capital structure',
      color: 'from-purple-500 to-pink-500',
      ratios: [
        { name: 'Debt-to-Equity', value: ratios.leverage.debt_to_equity, format: 'decimal', benchmark: '0.5 - 1.5', explanation: 'Total debt divided by total equity. Lower is less risky.' },
        { name: 'Debt Ratio', value: ratios.leverage.debt_ratio, format: 'percent', benchmark: '< 60%', explanation: 'Total debt divided by total assets.' },
        { name: 'Equity Multiplier', value: ratios.leverage.equity_multiplier, format: 'decimal', benchmark: '1.5 - 2.5', explanation: 'Total assets divided by total equity.' },
        { name: 'Interest Coverage', value: ratios.leverage.interest_coverage, format: 'decimal', benchmark: '> 2.5', explanation: 'Operating income divided by interest expense. Higher means better ability to service debt.' }
      ]
    },
    {
      title: 'Profitability Ratios',
      description: 'Measure ability to generate earnings',
      color: 'from-green-500 to-emerald-500',
      ratios: [
        { name: 'Gross Margin', value: ratios.profitability.gross_margin, format: 'percent', benchmark: '> 30%', explanation: 'Gross profit divided by revenue.' },
        { name: 'Operating Margin', value: ratios.profitability.operating_margin, format: 'percent', benchmark: '> 15%', explanation: 'Operating income divided by revenue.' },
        { name: 'Net Margin', value: ratios.profitability.net_margin, format: 'percent', benchmark: '> 10%', explanation: 'Net income divided by revenue.' },
        { name: 'ROA', value: ratios.profitability.roa, format: 'percent', benchmark: '> 5%', explanation: 'Return on Assets - net income divided by total assets.' },
        { name: 'ROE', value: ratios.profitability.roe, format: 'percent', benchmark: '> 15%', explanation: 'Return on Equity - net income divided by shareholders\' equity.' },
        { name: 'EBITDA Margin', value: ratios.profitability.ebitda_margin, format: 'percent', benchmark: '> 15%', explanation: 'EBITDA divided by revenue.' }
      ]
    },
    {
      title: 'Efficiency Ratios',
      description: 'Measure asset utilization and operational efficiency',
      color: 'from-yellow-500 to-orange-500',
      ratios: [
        { name: 'Asset Turnover', value: ratios.efficiency.asset_turnover, format: 'decimal', benchmark: '1.0 - 3.0', explanation: 'Revenue divided by total assets. Measures how efficiently assets generate revenue.' },
        { name: 'Inventory Turnover', value: ratios.efficiency.inventory_turnover, format: 'decimal', benchmark: '> 5', explanation: 'Cost of goods sold divided by average inventory.' },
        { name: 'Days Inventory', value: ratios.efficiency.days_inventory, format: 'days', benchmark: '< 60 days', explanation: 'Average number of days inventory is held.' },
        { name: 'Days Sales Outstanding', value: ratios.efficiency.days_sales_outstanding, format: 'days', benchmark: '< 45 days', explanation: 'Average time to collect receivables.' },
        { name: 'Cash Conversion Cycle', value: ratios.efficiency.cash_conversion_cycle, format: 'days', benchmark: '< 60 days', explanation: 'Days to convert inventory and receivables to cash.' }
      ]
    }
  ];

  const formatValue = (value: number, format: string) => {
    if (format === 'percent') {
      return `${(value * 100).toFixed(1)}%`;
    } else if (format === 'currency') {
      return `$${value.toLocaleString()}`;
    } else if (format === 'days') {
      return `${value.toFixed(0)} days`;
    } else {
      return value.toFixed(2);
    }
  };

  const getRatioHealth = (value: number, benchmark: string, format: string) => {
    // Simplified health check - would be more sophisticated in production
    if (format === 'percent') {
      const threshold = parseFloat(benchmark.replace(/[><%]/g, '')) / 100;
      if (benchmark.includes('>')) return value >= threshold ? 'good' : 'warning';
      if (benchmark.includes('<')) return value <= threshold ? 'good' : 'warning';
    }
    return 'neutral';
  };

  return (
    <div className="space-y-6">
      {ratioCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="cosmic-card"
        >
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${category.color}`} />
              <div>
                <h3 className="text-xl font-display font-bold text-white">{category.title}</h3>
                <p className="text-sm text-gray-400">{category.description}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {category.ratios.map((ratio, ratioIndex) => {
              const health = getRatioHealth(ratio.value, ratio.benchmark, ratio.format);
              
              return (
                <motion.div
                  key={ratio.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: categoryIndex * 0.1 + ratioIndex * 0.05 }}
                  className="p-4 rounded-xl bg-cosmic-void/30 border border-cosmic-primary/10 hover:border-cosmic-primary/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                        {ratio.name}
                      </h4>
                      <div className="text-2xl font-bold text-white mt-1">
                        {formatValue(ratio.value, ratio.format)}
                      </div>
                    </div>
                    
                    <div className="relative group/tooltip">
                      <Info className="w-4 h-4 text-gray-500 cursor-help" />
                      <div className="absolute right-0 top-6 w-64 p-3 rounded-lg bg-cosmic-deep border border-cosmic-primary/30 text-xs text-gray-300 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10">
                        {ratio.explanation}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Benchmark: <span className="text-gray-400">{ratio.benchmark}</span>
                    </div>
                    
                    <div className={`
                      px-2 py-1 rounded text-xs font-medium
                      ${health === 'good' ? 'bg-cosmic-success/20 text-cosmic-success' :
                        health === 'warning' ? 'bg-cosmic-warning/20 text-cosmic-warning' :
                        'bg-gray-500/20 text-gray-400'}
                    `}>
                      {health === 'good' ? '✓ Healthy' : health === 'warning' ? '⚠ Review' : '—'}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* DuPont Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="cosmic-card"
      >
        <h3 className="text-xl font-display font-bold text-white mb-4">DuPont ROE Analysis</h3>
        <p className="text-sm text-gray-400 mb-6">
          Breakdown of Return on Equity into its three components
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-6 rounded-xl bg-cosmic-void/30">
            <div className="text-sm text-gray-400 mb-2">Profit Margin</div>
            <div className="text-3xl font-bold text-white mb-1">
              {(ratios.profitability.dupont_profit_margin * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">Net Income / Revenue</div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-cosmic-void/30">
            <div className="text-sm text-gray-400 mb-2">Asset Turnover</div>
            <div className="text-3xl font-bold text-white mb-1">
              {ratios.profitability.dupont_asset_turnover.toFixed(2)}×
            </div>
            <div className="text-xs text-gray-500">Revenue / Total Assets</div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-cosmic-void/30">
            <div className="text-sm text-gray-400 mb-2">Equity Multiplier</div>
            <div className="text-3xl font-bold text-white mb-1">
              {ratios.profitability.dupont_equity_multiplier.toFixed(2)}×
            </div>
            <div className="text-xs text-gray-500">Total Assets / Equity</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cosmic-primary/10 to-cosmic-secondary/10 border border-cosmic-primary/20">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Combined ROE</div>
            <div className="text-4xl font-bold bg-gradient-to-r from-cosmic-primary to-cosmic-secondary bg-clip-text text-transparent">
              {(ratios.profitability.roe * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
