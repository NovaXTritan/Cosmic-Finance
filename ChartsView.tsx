'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { AnalysisData } from '@/types';

// Dynamically import chart components to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface ChartsViewProps {
  data: AnalysisData;
}

export default function ChartsView({ data }: ChartsViewProps) {
  const { ratios, visualizations } = data;

  // Liquidity Radar Chart Data
  const liquidityData = {
    data: [{
      type: 'scatterpolar' as const,
      r: [
        Math.min(100, (ratios.liquidity.current_ratio / 3.0) * 100),
        Math.min(100, (ratios.liquidity.quick_ratio / 2.0) * 100),
        Math.min(100, (ratios.liquidity.cash_ratio / 1.0) * 100)
      ],
      theta: ['Current Ratio', 'Quick Ratio', 'Cash Ratio'],
      fill: 'toself',
      name: 'Current',
      marker: { color: '#6366f1' },
      line: { color: '#6366f1' }
    }, {
      type: 'scatterpolar' as const,
      r: [67, 75, 50],
      theta: ['Current Ratio', 'Quick Ratio', 'Cash Ratio'],
      fill: 'toself',
      name: 'Benchmark',
      marker: { color: '#8b5cf6' },
      line: { color: '#8b5cf6', dash: 'dash' },
      opacity: 0.5
    }],
    layout: {
      polar: {
        radialaxis: { visible: true, range: [0, 100] },
        bgcolor: 'rgba(26, 26, 46, 0.3)'
      },
      showlegend: true,
      legend: { x: 0.5, y: -0.1, xanchor: 'center', font: { color: '#fff' } },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      font: { color: '#9ca3af' },
      margin: { t: 40, b: 60, l: 60, r: 60 }
    },
    config: { displayModeBar: false }
  };

  // Profitability Margins Bar Chart
  const profitabilityData = {
    data: [{
      x: ['Gross', 'Operating', 'Net', 'EBITDA'],
      y: [
        ratios.profitability.gross_margin * 100,
        ratios.profitability.operating_margin * 100,
        ratios.profitability.net_margin * 100,
        ratios.profitability.ebitda_margin * 100
      ],
      type: 'bar' as const,
      marker: {
        color: ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'],
        line: { width: 0 }
      },
      text: [
        `${(ratios.profitability.gross_margin * 100).toFixed(1)}%`,
        `${(ratios.profitability.operating_margin * 100).toFixed(1)}%`,
        `${(ratios.profitability.net_margin * 100).toFixed(1)}%`,
        `${(ratios.profitability.ebitda_margin * 100).toFixed(1)}%`
      ],
      textposition: 'outside' as const,
      textfont: { color: '#fff' }
    }],
    layout: {
      title: { text: '', font: { color: '#fff' } },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      xaxis: { color: '#9ca3af', gridcolor: 'rgba(99, 102, 241, 0.1)' },
      yaxis: { 
        title: 'Margin %', 
        color: '#9ca3af',
        gridcolor: 'rgba(99, 102, 241, 0.1)'
      },
      margin: { t: 40, b: 60, l: 60, r: 40 }
    },
    config: { displayModeBar: false }
  };

  // Leverage Gauge Chart
  const debtRatio = ratios.leverage.debt_to_equity;
  const leverageData = {
    data: [{
      type: 'indicator' as const,
      mode: 'gauge+number',
      value: debtRatio,
      title: { text: 'Debt-to-Equity Ratio', font: { color: '#fff', size: 16 } },
      number: { font: { color: '#fff', size: 40 } },
      gauge: {
        axis: { range: [0, 3], tickcolor: '#6366f1' },
        bar: { color: debtRatio > 2 ? '#ef4444' : debtRatio > 1.5 ? '#f59e0b' : '#10b981' },
        bgcolor: 'rgba(26, 26, 46, 0.3)',
        borderwidth: 2,
        bordercolor: 'rgba(99, 102, 241, 0.3)',
        steps: [
          { range: [0, 0.5], color: 'rgba(16, 185, 129, 0.2)' },
          { range: [0.5, 1.5], color: 'rgba(245, 158, 11, 0.2)' },
          { range: [1.5, 3], color: 'rgba(239, 68, 68, 0.2)' }
        ],
        threshold: {
          line: { color: '#8b5cf6', width: 4 },
          thickness: 0.75,
          value: 1.5
        }
      }
    }],
    layout: {
      paper_bgcolor: 'transparent',
      font: { color: '#9ca3af' },
      margin: { t: 40, b: 20, l: 40, r: 40 },
      height: 300
    },
    config: { displayModeBar: false }
  };

  // Efficiency Metrics
  const efficiencyData = {
    data: [{
      x: ['Asset Turnover', 'Inventory Turnover', 'Working Capital Turnover'],
      y: [
        ratios.efficiency.asset_turnover,
        ratios.efficiency.inventory_turnover,
        ratios.efficiency.working_capital_turnover
      ],
      type: 'bar' as const,
      orientation: 'v' as const,
      marker: {
        color: '#6366f1',
        line: { width: 0 }
      }
    }],
    layout: {
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      xaxis: { color: '#9ca3af', gridcolor: 'rgba(99, 102, 241, 0.1)' },
      yaxis: { 
        title: 'Turnover Ratio',
        color: '#9ca3af',
        gridcolor: 'rgba(99, 102, 241, 0.1)'
      },
      margin: { t: 40, b: 80, l: 60, r: 40 }
    },
    config: { displayModeBar: false }
  };

  // DuPont ROE Waterfall
  const dupontData = {
    data: [{
      type: 'waterfall' as const,
      orientation: 'v' as const,
      x: ['Profit Margin', 'Asset Turnover', 'Equity Multiplier', 'ROE'],
      y: [
        ratios.profitability.dupont_profit_margin,
        ratios.profitability.dupont_asset_turnover - ratios.profitability.dupont_profit_margin,
        ratios.profitability.dupont_equity_multiplier - ratios.profitability.dupont_asset_turnover,
        ratios.profitability.roe - ratios.profitability.dupont_equity_multiplier
      ],
      connector: { line: { color: '#6366f1' } },
      decreasing: { marker: { color: '#ef4444' } },
      increasing: { marker: { color: '#10b981' } },
      totals: { marker: { color: '#8b5cf6' } },
      text: [
        `${(ratios.profitability.dupont_profit_margin * 100).toFixed(1)}%`,
        `${ratios.profitability.dupont_asset_turnover.toFixed(2)}×`,
        `${ratios.profitability.dupont_equity_multiplier.toFixed(2)}×`,
        `${(ratios.profitability.roe * 100).toFixed(1)}%`
      ],
      textposition: 'outside' as const,
      textfont: { color: '#fff' }
    }],
    layout: {
      title: { text: 'DuPont ROE Decomposition', font: { color: '#fff', size: 16 } },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      xaxis: { color: '#9ca3af' },
      yaxis: { 
        title: 'Value',
        color: '#9ca3af',
        gridcolor: 'rgba(99, 102, 241, 0.1)'
      },
      margin: { t: 60, b: 60, l: 60, r: 40 }
    },
    config: { displayModeBar: false }
  };

  // Cash Conversion Cycle
  const cccData = {
    data: [{
      x: ['Days Inventory', 'Days Sales Outstanding', 'Days Payables Outstanding', 'Cash Conversion Cycle'],
      y: [
        ratios.efficiency.days_inventory,
        ratios.efficiency.days_sales_outstanding,
        -ratios.efficiency.days_payables_outstanding,
        ratios.efficiency.cash_conversion_cycle
      ],
      type: 'bar' as const,
      marker: {
        color: ['#6366f1', '#8b5cf6', '#ec4899', '#10b981']
      },
      text: [
        `${ratios.efficiency.days_inventory.toFixed(0)} days`,
        `${ratios.efficiency.days_sales_outstanding.toFixed(0)} days`,
        `${ratios.efficiency.days_payables_outstanding.toFixed(0)} days`,
        `${ratios.efficiency.cash_conversion_cycle.toFixed(0)} days`
      ],
      textposition: 'outside' as const,
      textfont: { color: '#fff' }
    }],
    layout: {
      title: { text: 'Cash Conversion Cycle', font: { color: '#fff', size: 16 } },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      xaxis: { color: '#9ca3af' },
      yaxis: { 
        title: 'Days',
        color: '#9ca3af',
        gridcolor: 'rgba(99, 102, 241, 0.1)'
      },
      margin: { t: 60, b: 100, l: 60, r: 40 }
    },
    config: { displayModeBar: false }
  };

  const charts = [
    {
      title: 'Liquidity Health Radar',
      description: 'Multi-dimensional view of short-term financial strength',
      data: liquidityData,
      gridClass: 'md:col-span-2'
    },
    {
      title: 'Leverage Risk Gauge',
      description: 'Current debt position relative to healthy ranges',
      data: leverageData,
      gridClass: 'md:col-span-1'
    },
    {
      title: 'Profitability Margins',
      description: 'Profit margins at different operational levels',
      data: profitabilityData,
      gridClass: 'md:col-span-2'
    },
    {
      title: 'Efficiency Metrics',
      description: 'Asset utilization and turnover ratios',
      data: efficiencyData,
      gridClass: 'md:col-span-1'
    },
    {
      title: 'DuPont Analysis',
      description: 'ROE breakdown into component drivers',
      data: dupontData,
      gridClass: 'md:col-span-3'
    },
    {
      title: 'Cash Cycle Analysis',
      description: 'Time to convert operations into cash',
      data: cccData,
      gridClass: 'md:col-span-3'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {charts.map((chart, index) => (
        <motion.div
          key={chart.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`cosmic-card ${chart.gridClass}`}
        >
          <div className="mb-4">
            <h3 className="text-lg font-display font-bold text-white mb-1">{chart.title}</h3>
            <p className="text-sm text-gray-400">{chart.description}</p>
          </div>
          
          <div className="rounded-xl overflow-hidden bg-cosmic-void/30">
            <Plot
              data={chart.data.data}
              layout={chart.data.layout}
              config={chart.data.config}
              useResizeHandler
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
