export interface FinancialData {
  balance_sheet: Record<string, number>;
  income_statement: Record<string, number>;
  cash_flow: Record<string, number>;
  [key: string]: any;
}

export interface FinancialRatios {
  liquidity: Record<string, number>;
  leverage: Record<string, number>;
  profitability: Record<string, number>;
  efficiency: Record<string, number>;
  valuation?: Record<string, number>;
  growth: Record<string, number>;
}

export interface TrendAnalysis {
  revenue_trend: string;
  profit_trend: string;
  cash_flow_trend: string;
  key_observations: string[];
}

export interface Anomaly {
  metric: string;
  value: number;
  expected_range: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  explanation: string;
}

export interface AIInsight {
  category: string;
  insight: string;
  recommendation: string;
  impact: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface ChartData {
  chart_type: string;
  title: string;
  data: Record<string, any>;
  explanation: string;
}

export interface AnalysisData {
  success: boolean;
  financial_data: FinancialData;
  ratios: FinancialRatios;
  trends: TrendAnalysis;
  anomalies: Anomaly[];
  ai_insights: AIInsight[];
  visualizations: ChartData[];
}

export interface UploadResponse {
  success: boolean;
  filename: string;
  file_type: string;
  data_preview: Record<string, any>;
  message: string;
}
