from pydantic import BaseModel
from typing import Dict, List, Optional, Any

class FileUploadResponse(BaseModel):
    success: bool
    filename: str
    file_type: str
    data_preview: Dict[str, Any]
    message: str

class FinancialRatios(BaseModel):
    liquidity: Dict[str, float]
    leverage: Dict[str, float]
    profitability: Dict[str, float]
    efficiency: Dict[str, float]
    valuation: Optional[Dict[str, float]] = None
    growth: Dict[str, float]

class TrendAnalysis(BaseModel):
    revenue_trend: str
    profit_trend: str
    cash_flow_trend: str
    key_observations: List[str]

class Anomaly(BaseModel):
    metric: str
    value: float
    expected_range: str
    severity: str
    explanation: str

class AIInsight(BaseModel):
    category: str
    insight: str
    recommendation: str
    impact: str
    priority: str

class ChartData(BaseModel):
    chart_type: str
    title: str
    data: Dict[str, Any]
    explanation: str

class AnalysisResponse(BaseModel):
    success: bool
    financial_data: Dict[str, Any]
    ratios: FinancialRatios
    trends: TrendAnalysis
    anomalies: List[Anomaly]
    ai_insights: List[AIInsight]
    visualizations: List[ChartData]
