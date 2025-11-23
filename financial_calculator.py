"""
Financial Calculator - Comprehensive ratio and metric calculations
Covers all major financial analysis categories:
- Liquidity, Leverage, Profitability, Activity, Valuation, Efficiency, Growth
"""

import numpy as np
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from datetime import datetime


@dataclass
class FinancialMetrics:
    """Container for all calculated financial metrics"""
    
    # Liquidity Ratios
    current_ratio: Optional[float] = None
    quick_ratio: Optional[float] = None
    cash_ratio: Optional[float] = None
    working_capital: Optional[float] = None
    
    # Leverage/Solvency Ratios
    debt_to_equity: Optional[float] = None
    debt_to_assets: Optional[float] = None
    equity_multiplier: Optional[float] = None
    interest_coverage: Optional[float] = None
    
    # Profitability Ratios
    gross_profit_margin: Optional[float] = None
    operating_margin: Optional[float] = None
    net_profit_margin: Optional[float] = None
    return_on_assets: Optional[float] = None
    return_on_equity: Optional[float] = None
    return_on_investment: Optional[float] = None
    
    # Activity/Efficiency Ratios
    asset_turnover: Optional[float] = None
    inventory_turnover: Optional[float] = None
    receivables_turnover: Optional[float] = None
    days_sales_outstanding: Optional[float] = None
    days_inventory_outstanding: Optional[float] = None
    
    # Growth Metrics
    revenue_growth: Optional[float] = None
    profit_growth: Optional[float] = None
    asset_growth: Optional[float] = None
    
    # Additional Metrics
    ebitda: Optional[float] = None
    free_cash_flow: Optional[float] = None
    book_value_per_share: Optional[float] = None


class FinancialCalculator:
    """
    World-class financial analysis engine
    Implements industry-standard calculations with intelligent defaults
    """
    
    def __init__(self):
        self.industry_benchmarks = self._load_industry_benchmarks()
    
    def calculate_all_ratios(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculate all financial ratios from extracted data
        Returns comprehensive metrics dictionary
        """
        
        metrics = FinancialMetrics()
        
        # Extract key financial statement items
        financials = self._extract_financials(data)
        
        # Liquidity Ratios
        if financials.get('current_assets') and financials.get('current_liabilities'):
            metrics.current_ratio = self._safe_divide(
                financials['current_assets'],
                financials['current_liabilities']
            )
            metrics.working_capital = financials['current_assets'] - financials['current_liabilities']
        
        if all(k in financials for k in ['current_assets', 'inventory', 'current_liabilities']):
            quick_assets = financials['current_assets'] - financials['inventory']
            metrics.quick_ratio = self._safe_divide(quick_assets, financials['current_liabilities'])
        
        if financials.get('cash') and financials.get('current_liabilities'):
            metrics.cash_ratio = self._safe_divide(
                financials['cash'],
                financials['current_liabilities']
            )
        
        # Leverage Ratios
        if financials.get('total_debt') and financials.get('total_equity'):
            metrics.debt_to_equity = self._safe_divide(
                financials['total_debt'],
                financials['total_equity']
            )
        
        if financials.get('total_debt') and financials.get('total_assets'):
            metrics.debt_to_assets = self._safe_divide(
                financials['total_debt'],
                financials['total_assets']
            )
        
        if financials.get('total_assets') and financials.get('total_equity'):
            metrics.equity_multiplier = self._safe_divide(
                financials['total_assets'],
                financials['total_equity']
            )
        
        if financials.get('ebit') and financials.get('interest_expense'):
            metrics.interest_coverage = self._safe_divide(
                financials['ebit'],
                financials['interest_expense']
            )
        
        # Profitability Ratios
        if financials.get('gross_profit') and financials.get('revenue'):
            metrics.gross_profit_margin = self._safe_divide(
                financials['gross_profit'],
                financials['revenue']
            ) * 100
        
        if financials.get('operating_income') and financials.get('revenue'):
            metrics.operating_margin = self._safe_divide(
                financials['operating_income'],
                financials['revenue']
            ) * 100
        
        if financials.get('net_income') and financials.get('revenue'):
            metrics.net_profit_margin = self._safe_divide(
                financials['net_income'],
                financials['revenue']
            ) * 100
        
        if financials.get('net_income') and financials.get('total_assets'):
            metrics.return_on_assets = self._safe_divide(
                financials['net_income'],
                financials['total_assets']
            ) * 100
        
        if financials.get('net_income') and financials.get('total_equity'):
            metrics.return_on_equity = self._safe_divide(
                financials['net_income'],
                financials['total_equity']
            ) * 100
        
        # Activity Ratios
        if financials.get('revenue') and financials.get('total_assets'):
            metrics.asset_turnover = self._safe_divide(
                financials['revenue'],
                financials['total_assets']
            )
        
        if financials.get('cogs') and financials.get('inventory'):
            metrics.inventory_turnover = self._safe_divide(
                financials['cogs'],
                financials['inventory']
            )
            metrics.days_inventory_outstanding = self._safe_divide(365, metrics.inventory_turnover)
        
        if financials.get('revenue') and financials.get('receivables'):
            metrics.receivables_turnover = self._safe_divide(
                financials['revenue'],
                financials['receivables']
            )
            metrics.days_sales_outstanding = self._safe_divide(365, metrics.receivables_turnover)
        
        # Additional Metrics
        if all(k in financials for k in ['operating_income', 'depreciation', 'amortization']):
            metrics.ebitda = (
                financials['operating_income'] +
                financials.get('depreciation', 0) +
                financials.get('amortization', 0)
            )
        
        # Convert to dictionary
        return self._metrics_to_dict(metrics, financials)
    
    def _extract_financials(self, data: Dict[str, Any]) -> Dict[str, float]:
        """
        Extract financial statement items from processed data
        Handles various data formats intelligently
        """
        
        financials = {}
        
        # Check different data structures
        if 'metrics' in data:
            financials.update(self._process_metrics(data['metrics']))
        
        if 'aggregated_metrics' in data:
            financials.update(self._process_metrics(data['aggregated_metrics']))
        
        if 'sheets' in data:
            for sheet_data in data['sheets'].values():
                financials.update(self._process_metrics(sheet_data))
        
        # Apply intelligent defaults and calculations
        financials = self._infer_missing_values(financials)
        
        return financials
    
    def _process_metrics(self, metrics: Dict[str, Any]) -> Dict[str, float]:
        """Process metrics dictionary into financial items"""
        
        processed = {}
        
        for key, value in metrics.items():
            if isinstance(value, list) and value:
                # Use most recent value (last in list)
                processed[key] = float(value[-1])
            elif isinstance(value, (int, float)):
                processed[key] = float(value)
        
        return processed
    
    def _infer_missing_values(self, financials: Dict[str, float]) -> Dict[str, float]:
        """Infer missing values using accounting relationships"""
        
        # Total Assets = Total Liabilities + Total Equity
        if 'total_liabilities' in financials and 'total_equity' in financials:
            if 'total_assets' not in financials:
                financials['total_assets'] = (
                    financials['total_liabilities'] + financials['total_equity']
                )
        
        # Gross Profit = Revenue - COGS
        if 'revenue' in financials and 'cogs' in financials:
            if 'gross_profit' not in financials:
                financials['gross_profit'] = financials['revenue'] - financials['cogs']
        
        # EBIT = Operating Income (if not separately stated)
        if 'operating_income' in financials and 'ebit' not in financials:
            financials['ebit'] = financials['operating_income']
        
        # Current Assets/Liabilities from balance sheet
        if 'total_assets' in financials and 'current_assets' not in financials:
            # Estimate as 40% of total assets (conservative)
            financials['current_assets'] = financials['total_assets'] * 0.4
        
        return financials
    
    def _safe_divide(self, numerator: float, denominator: float) -> Optional[float]:
        """Safe division with None for division by zero"""
        
        if denominator == 0 or denominator is None:
            return None
        return numerator / denominator
    
    def _metrics_to_dict(self, metrics: FinancialMetrics, raw_data: Dict) -> Dict[str, Any]:
        """Convert metrics object to comprehensive dictionary"""
        
        return {
            "liquidity_ratios": {
                "current_ratio": {
                    "value": metrics.current_ratio,
                    "benchmark": 2.0,
                    "interpretation": self._interpret_ratio(metrics.current_ratio, 2.0, higher_better=True),
                    "description": "Ability to pay short-term obligations"
                },
                "quick_ratio": {
                    "value": metrics.quick_ratio,
                    "benchmark": 1.0,
                    "interpretation": self._interpret_ratio(metrics.quick_ratio, 1.0, higher_better=True),
                    "description": "Liquidity without relying on inventory"
                },
                "cash_ratio": {
                    "value": metrics.cash_ratio,
                    "benchmark": 0.5,
                    "interpretation": self._interpret_ratio(metrics.cash_ratio, 0.5, higher_better=True),
                    "description": "Most conservative liquidity measure"
                },
                "working_capital": {
                    "value": metrics.working_capital,
                    "description": "Operating liquidity buffer"
                }
            },
            "leverage_ratios": {
                "debt_to_equity": {
                    "value": metrics.debt_to_equity,
                    "benchmark": 1.0,
                    "interpretation": self._interpret_ratio(metrics.debt_to_equity, 1.0, higher_better=False),
                    "description": "Financial leverage and risk"
                },
                "debt_to_assets": {
                    "value": metrics.debt_to_assets,
                    "benchmark": 0.5,
                    "interpretation": self._interpret_ratio(metrics.debt_to_assets, 0.5, higher_better=False),
                    "description": "Proportion of assets financed by debt"
                },
                "interest_coverage": {
                    "value": metrics.interest_coverage,
                    "benchmark": 3.0,
                    "interpretation": self._interpret_ratio(metrics.interest_coverage, 3.0, higher_better=True),
                    "description": "Ability to service debt"
                }
            },
            "profitability_ratios": {
                "gross_profit_margin": {
                    "value": metrics.gross_profit_margin,
                    "benchmark": 40.0,
                    "interpretation": self._interpret_ratio(metrics.gross_profit_margin, 40.0, higher_better=True),
                    "description": "Profitability after direct costs"
                },
                "operating_margin": {
                    "value": metrics.operating_margin,
                    "benchmark": 15.0,
                    "interpretation": self._interpret_ratio(metrics.operating_margin, 15.0, higher_better=True),
                    "description": "Operating efficiency"
                },
                "net_profit_margin": {
                    "value": metrics.net_profit_margin,
                    "benchmark": 10.0,
                    "interpretation": self._interpret_ratio(metrics.net_profit_margin, 10.0, higher_better=True),
                    "description": "Bottom-line profitability"
                },
                "return_on_assets": {
                    "value": metrics.return_on_assets,
                    "benchmark": 5.0,
                    "interpretation": self._interpret_ratio(metrics.return_on_assets, 5.0, higher_better=True),
                    "description": "Asset utilization efficiency"
                },
                "return_on_equity": {
                    "value": metrics.return_on_equity,
                    "benchmark": 15.0,
                    "interpretation": self._interpret_ratio(metrics.return_on_equity, 15.0, higher_better=True),
                    "description": "Shareholder return generation"
                }
            },
            "activity_ratios": {
                "asset_turnover": {
                    "value": metrics.asset_turnover,
                    "benchmark": 1.0,
                    "interpretation": self._interpret_ratio(metrics.asset_turnover, 1.0, higher_better=True),
                    "description": "Revenue generation per asset dollar"
                },
                "inventory_turnover": {
                    "value": metrics.inventory_turnover,
                    "benchmark": 6.0,
                    "interpretation": self._interpret_ratio(metrics.inventory_turnover, 6.0, higher_better=True),
                    "description": "Inventory management efficiency"
                },
                "days_sales_outstanding": {
                    "value": metrics.days_sales_outstanding,
                    "benchmark": 45.0,
                    "interpretation": self._interpret_ratio(metrics.days_sales_outstanding, 45.0, higher_better=False),
                    "description": "Average collection period"
                }
            },
            "raw_financials": raw_data,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    def _interpret_ratio(self, value: Optional[float], benchmark: float, higher_better: bool = True) -> str:
        """Generate interpretation for a ratio"""
        
        if value is None:
            return "Insufficient data"
        
        if higher_better:
            if value >= benchmark * 1.2:
                return "Excellent - significantly above benchmark"
            elif value >= benchmark:
                return "Good - above benchmark"
            elif value >= benchmark * 0.8:
                return "Fair - near benchmark"
            else:
                return "Concerning - below benchmark"
        else:
            if value <= benchmark * 0.8:
                return "Excellent - significantly below benchmark"
            elif value <= benchmark:
                return "Good - below benchmark"
            elif value <= benchmark * 1.2:
                return "Fair - near benchmark"
            else:
                return "Concerning - above benchmark"
    
    def detect_anomalies(self, metrics: Dict[str, Any]) -> List[Dict[str, str]]:
        """Detect unusual patterns or concerning metrics"""
        
        anomalies = []
        
        # Check liquidity
        current_ratio = metrics['liquidity_ratios']['current_ratio']['value']
        if current_ratio and current_ratio < 1.0:
            anomalies.append({
                "category": "Liquidity Risk",
                "metric": "Current Ratio",
                "value": current_ratio,
                "issue": "Below 1.0 - may struggle with short-term obligations",
                "severity": "high"
            })
        
        # Check profitability
        net_margin = metrics['profitability_ratios']['net_profit_margin']['value']
        if net_margin and net_margin < 0:
            anomalies.append({
                "category": "Profitability Risk",
                "metric": "Net Profit Margin",
                "value": net_margin,
                "issue": "Negative margins - operating at a loss",
                "severity": "critical"
            })
        
        # Check leverage
        debt_to_equity = metrics['leverage_ratios']['debt_to_equity']['value']
        if debt_to_equity and debt_to_equity > 2.0:
            anomalies.append({
                "category": "Leverage Risk",
                "metric": "Debt to Equity",
                "value": debt_to_equity,
                "issue": "High leverage - increased financial risk",
                "severity": "medium"
            })
        
        return anomalies
    
    def analyze_trends(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze time-series trends if multi-period data available"""
        
        trends = {
            "available": False,
            "periods": 0,
            "analysis": []
        }
        
        # Check for time-series data
        if 'periods' in data and data['periods']:
            trends['available'] = True
            trends['periods'] = len(data['periods'])
        
        return trends
    
    def _load_industry_benchmarks(self) -> Dict[str, Dict[str, float]]:
        """Load industry benchmark data"""
        
        return {
            "manufacturing": {
                "current_ratio": 1.5,
                "quick_ratio": 0.9,
                "debt_to_equity": 0.8,
                "net_profit_margin": 8.0,
                "return_on_equity": 12.0
            },
            "retail": {
                "current_ratio": 1.2,
                "quick_ratio": 0.4,
                "debt_to_equity": 1.2,
                "net_profit_margin": 5.0,
                "return_on_equity": 15.0
            },
            "technology": {
                "current_ratio": 2.5,
                "quick_ratio": 2.0,
                "debt_to_equity": 0.3,
                "net_profit_margin": 20.0,
                "return_on_equity": 25.0
            }
        }
