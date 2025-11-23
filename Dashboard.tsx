'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  AlertTriangle,
  Lightbulb,
  Download,
  RefreshCw,
  Sliders,
  Share2
} from 'lucide-react';
import { AnalysisData } from '@/types';
import Overview from './dashboard/Overview';
import RatiosView from './dashboard/RatiosView';
import InsightsView from './dashboard/InsightsView';
import ChartsView from './dashboard/ChartsView';
import ScenarioAnalysis from './dashboard/ScenarioAnalysis';

interface DashboardProps {
  data: AnalysisData;
  onReset: () => void;
}

type Tab = 'overview' | 'ratios' | 'insights' | 'charts' | 'scenarios';

export default function Dashboard({ data, onReset }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: BarChart3 },
    { id: 'ratios' as Tab, label: 'Financial Ratios', icon: TrendingUp },
    { id: 'insights' as Tab, label: 'AI Insights', icon: Lightbulb },
    { id: 'charts' as Tab, label: 'Visualizations', icon: DollarSign },
    { id: 'scenarios' as Tab, label: 'What-If Analysis', icon: Sliders },
  ];

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'financial-analysis.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = 'Check out this financial analysis dashboard!';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Financial Analysis',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">
            Financial Analysis Dashboard
          </h2>
          <p className="text-gray-400">
            Comprehensive AI-powered analysis with {Object.keys(data.ratios.liquidity).length + 
            Object.keys(data.ratios.profitability).length + 
            Object.keys(data.ratios.leverage).length + 
            Object.keys(data.ratios.efficiency).length}+ calculated metrics
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cosmic-surface/50 border border-cosmic-primary/30 text-white hover:border-cosmic-primary/50 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
          
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cosmic-surface/50 border border-cosmic-primary/30 text-white hover:border-cosmic-primary/50 transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
          
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cosmic-surface/50 border border-cosmic-primary/30 text-white hover:border-cosmic-primary/50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">New Analysis</span>
          </button>
        </div>
      </div>

      {/* Anomaly Alerts */}
      {data.anomalies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-cosmic-danger/10 border border-cosmic-danger/30"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-cosmic-danger flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-cosmic-danger mb-1">
                {data.anomalies.length} Anomal{data.anomalies.length === 1 ? 'y' : 'ies'} Detected
              </h3>
              <p className="text-xs text-gray-400">
                Critical issues requiring attention - see Insights tab for details
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-cosmic-primary to-cosmic-secondary text-white shadow-cosmic'
                  : 'bg-cosmic-surface/30 text-gray-400 hover:text-white hover:bg-cosmic-surface/50'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="relative">
        {activeTab === 'overview' && <Overview data={data} />}
        {activeTab === 'ratios' && <RatiosView data={data} />}
        {activeTab === 'insights' && <InsightsView data={data} />}
        {activeTab === 'charts' && <ChartsView data={data} />}
        {activeTab === 'scenarios' && <ScenarioAnalysis data={data} />}
      </div>
    </motion.div>
  );
}
