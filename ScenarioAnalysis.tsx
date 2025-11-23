'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sliders, TrendingUp, TrendingDown, AlertCircle, Info } from 'lucide-react';
import { AnalysisData } from '@/types';

interface ScenarioAnalysisProps {
  data: AnalysisData;
}

interface Scenario {
  revenueChange: number;
  costChange: number;
  debtChange: number;
}

export default function ScenarioAnalysis({ data }: ScenarioAnalysisProps) {
  const [scenario, setScenario] = useState<Scenario>({
    revenueChange: 0,
    costChange: 0,
    debtChange: 0,
  });

  // Calculate projected metrics based on scenario
  const projectedMetrics = useMemo(() => {
    const baseRevenue = data.summary.revenue || 10000000;
    const baseProfit = data.summary.profit || 1000000;
    const baseDebt = data.summary.total_debt || 5000000;
    const baseEquity = data.summary.equity || 5000000;

    const newRevenue = baseRevenue * (1 + scenario.revenueChange / 100);
    const costImpact = (baseRevenue - baseProfit) * (1 + scenario.costChange / 100);
    const newProfit = newRevenue - costImpact;
    const newDebt = baseDebt * (1 + scenario.debtChange / 100);

    // Recalculate key ratios
    const profitMargin = (newProfit / newRevenue) * 100;
    const roe = ((newProfit / baseEquity) * 100);
    const debtToEquity = newDebt / baseEquity;
    const currentRatio = data.ratios.liquidity.current_ratio * (1 + scenario.revenueChange / 200);

    return {
      revenue: newRevenue,
      profit: newProfit,
      profitMargin,
      roe,
      debtToEquity,
      currentRatio,
      revenueChange: newRevenue - baseRevenue,
      profitChange: newProfit - baseProfit,
    };
  }, [scenario, data]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getImpactColor = (value: number, inverse = false) => {
    const isPositive = inverse ? value < 0 : value > 0;
    return isPositive ? 'text-cosmic-success' : 'text-cosmic-danger';
  };

  const scenarios = [
    { name: 'Optimistic', revenue: 15, cost: -5, debt: -10 },
    { name: 'Base Case', revenue: 0, cost: 0, debt: 0 },
    { name: 'Conservative', revenue: -10, cost: 5, debt: 5 },
    { name: 'Worst Case', revenue: -20, cost: 10, debt: 10 },
  ];

  const applyScenario = (preset: typeof scenarios[0]) => {
    setScenario({
      revenueChange: preset.revenue,
      costChange: preset.cost,
      debtChange: preset.debt,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-cosmic-primary/10 border border-cosmic-primary/30">
          <Sliders className="w-6 h-6 text-cosmic-primary" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-1">
            Scenario Analysis
          </h3>
          <p className="text-sm text-gray-400">
            Adjust variables to see how changes impact key financial metrics
          </p>
        </div>
      </div>

      {/* Quick Scenarios */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {scenarios.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyScenario(preset)}
            className="p-4 rounded-xl bg-cosmic-surface/30 border border-cosmic-primary/20 hover:border-cosmic-primary/50 transition-all text-left group"
          >
            <p className="text-sm font-semibold text-white group-hover:text-cosmic-primary transition-colors">
              {preset.name}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Rev {formatPercent(preset.revenue)}
            </p>
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Revenue Change */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-white">Revenue Change</label>
            <span className={`text-sm font-bold ${getImpactColor(scenario.revenueChange)}`}>
              {formatPercent(scenario.revenueChange)}
            </span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            step="5"
            value={scenario.revenueChange}
            onChange={(e) => setScenario({ ...scenario, revenueChange: Number(e.target.value) })}
            className="w-full h-2 bg-cosmic-surface rounded-lg appearance-none cursor-pointer slider-cosmic"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>-50%</span>
            <span>0%</span>
            <span>+50%</span>
          </div>
        </div>

        {/* Cost Change */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-white">Cost Change</label>
            <span className={`text-sm font-bold ${getImpactColor(scenario.costChange, true)}`}>
              {formatPercent(scenario.costChange)}
            </span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            step="5"
            value={scenario.costChange}
            onChange={(e) => setScenario({ ...scenario, costChange: Number(e.target.value) })}
            className="w-full h-2 bg-cosmic-surface rounded-lg appearance-none cursor-pointer slider-cosmic"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>-50%</span>
            <span>0%</span>
            <span>+50%</span>
          </div>
        </div>

        {/* Debt Change */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-white">Debt Change</label>
            <span className={`text-sm font-bold ${getImpactColor(scenario.debtChange, true)}`}>
              {formatPercent(scenario.debtChange)}
            </span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            step="5"
            value={scenario.debtChange}
            onChange={(e) => setScenario({ ...scenario, debtChange: Number(e.target.value) })}
            className="w-full h-2 bg-cosmic-surface rounded-lg appearance-none cursor-pointer slider-cosmic"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>-50%</span>
            <span>0%</span>
            <span>+50%</span>
          </div>
        </div>
      </div>

      {/* Projected Impact */}
      <motion.div
        key={JSON.stringify(scenario)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {/* Revenue Impact */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-cosmic-surface/50 to-cosmic-surface/30 border border-cosmic-primary/20">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-400">Projected Revenue</p>
            {projectedMetrics.revenueChange > 0 ? (
              <TrendingUp className="w-4 h-4 text-cosmic-success" />
            ) : projectedMetrics.revenueChange < 0 ? (
              <TrendingDown className="w-4 h-4 text-cosmic-danger" />
            ) : null}
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {formatCurrency(projectedMetrics.revenue)}
          </p>
          <p className={`text-sm font-medium ${getImpactColor(projectedMetrics.revenueChange)}`}>
            {projectedMetrics.revenueChange >= 0 ? '+' : ''}{formatCurrency(projectedMetrics.revenueChange)}
          </p>
        </div>

        {/* Profit Impact */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-cosmic-surface/50 to-cosmic-surface/30 border border-cosmic-primary/20">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-400">Projected Profit</p>
            {projectedMetrics.profitChange > 0 ? (
              <TrendingUp className="w-4 h-4 text-cosmic-success" />
            ) : projectedMetrics.profitChange < 0 ? (
              <TrendingDown className="w-4 h-4 text-cosmic-danger" />
            ) : null}
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {formatCurrency(projectedMetrics.profit)}
          </p>
          <p className={`text-sm font-medium ${getImpactColor(projectedMetrics.profitChange)}`}>
            {projectedMetrics.profitChange >= 0 ? '+' : ''}{formatCurrency(projectedMetrics.profitChange)}
          </p>
        </div>

        {/* Profit Margin */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-cosmic-surface/50 to-cosmic-surface/30 border border-cosmic-primary/20">
          <p className="text-sm text-gray-400 mb-3">Profit Margin</p>
          <p className="text-2xl font-bold text-white mb-1">
            {projectedMetrics.profitMargin.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500">
            Target: 15-20%
          </p>
        </div>

        {/* ROE */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-cosmic-surface/50 to-cosmic-surface/30 border border-cosmic-primary/20">
          <p className="text-sm text-gray-400 mb-3">Return on Equity</p>
          <p className="text-2xl font-bold text-white mb-1">
            {projectedMetrics.roe.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500">
            Target: 15-25%
          </p>
        </div>

        {/* Debt-to-Equity */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-cosmic-surface/50 to-cosmic-surface/30 border border-cosmic-primary/20">
          <p className="text-sm text-gray-400 mb-3">Debt-to-Equity</p>
          <p className="text-2xl font-bold text-white mb-1">
            {projectedMetrics.debtToEquity.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Target: &lt; 2.0
          </p>
        </div>

        {/* Current Ratio */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-cosmic-surface/50 to-cosmic-surface/30 border border-cosmic-primary/20">
          <p className="text-sm text-gray-400 mb-3">Current Ratio</p>
          <p className="text-2xl font-bold text-white mb-1">
            {projectedMetrics.currentRatio.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Target: 1.5-3.0
          </p>
        </div>
      </motion.div>

      {/* Info Note */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-cosmic-primary/5 border border-cosmic-primary/20">
        <Info className="w-5 h-5 text-cosmic-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-white">Note:</span> These projections are simplified models 
            for planning purposes. Actual results may vary based on market conditions, execution, and 
            numerous other factors. Consult with financial advisors for detailed planning.
          </p>
        </div>
      </div>
    </div>
  );
}
