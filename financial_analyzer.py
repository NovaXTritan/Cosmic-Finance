from typing import Dict, List, Any
from app.models.schemas import FinancialRatios, TrendAnalysis, Anomaly, ChartData
import numpy as np

class FinancialAnalyzer:
    """Comprehensive financial analysis and ratio calculations"""
    
    def __init__(self):
        # Industry benchmarks (can be expanded)
        self.benchmarks = {
            "current_ratio": {"healthy": (1.5, 3.0), "average": 2.0},
            "quick_ratio": {"healthy": (1.0, 2.0), "average": 1.5},
            "debt_to_equity": {"healthy": (0.0, 1.5), "average": 0.75},
            "roe": {"healthy": (0.15, 0.25), "average": 0.20},
            "roa": {"healthy": (0.05, 0.15), "average": 0.10},
            "profit_margin": {"healthy": (0.10, 0.20), "average": 0.15},
            "asset_turnover": {"healthy": (1.0, 3.0), "average": 2.0}
        }
    
    def calculate_all_ratios(self, data: Dict[str, Any]) -> FinancialRatios:
        """Calculate comprehensive financial ratios"""
        
        bs = data.get("balance_sheet", {})
        is_data = data.get("income_statement", {})
        cf = data.get("cash_flow", {})
        
        return FinancialRatios(
            liquidity=self._calculate_liquidity_ratios(bs),
            leverage=self._calculate_leverage_ratios(bs, is_data),
            profitability=self._calculate_profitability_ratios(bs, is_data),
            efficiency=self._calculate_efficiency_ratios(bs, is_data),
            valuation=self._calculate_valuation_ratios(is_data),
            growth=self._calculate_growth_ratios(is_data)
        )
    
    def _calculate_liquidity_ratios(self, bs: Dict) -> Dict[str, float]:
        """Liquidity ratios - ability to meet short-term obligations"""
        ratios = {}
        
        current_assets = bs.get("current_assets", 0)
        current_liabilities = bs.get("current_liabilities", 1)
        cash = bs.get("cash", 0)
        inventory = bs.get("inventory", 0)
        receivables = bs.get("receivables", 0)
        
        # Current Ratio
        ratios["current_ratio"] = current_assets / current_liabilities if current_liabilities else 0
        
        # Quick Ratio (Acid Test)
        quick_assets = current_assets - inventory
        ratios["quick_ratio"] = quick_assets / current_liabilities if current_liabilities else 0
        
        # Cash Ratio
        ratios["cash_ratio"] = cash / current_liabilities if current_liabilities else 0
        
        # Working Capital
        ratios["working_capital"] = current_assets - current_liabilities
        
        # Defensive Interval Ratio
        daily_operating_expenses = (bs.get("operating_expenses", 0) / 365) if bs.get("operating_expenses") else 1
        ratios["defensive_interval_days"] = quick_assets / daily_operating_expenses if daily_operating_expenses else 0
        
        return ratios
    
    def _calculate_leverage_ratios(self, bs: Dict, is_data: Dict) -> Dict[str, float]:
        """Leverage ratios - capital structure and solvency"""
        ratios = {}
        
        total_assets = bs.get("total_assets", 1)
        total_liabilities = bs.get("total_liabilities", 0)
        equity = bs.get("equity", 1)
        operating_income = is_data.get("operating_income", 0)
        ebitda = is_data.get("ebitda", 0)
        interest_expense = is_data.get("interest_expense", 1)
        
        # Debt-to-Equity Ratio
        ratios["debt_to_equity"] = total_liabilities / equity if equity else 0
        
        # Debt Ratio
        ratios["debt_ratio"] = total_liabilities / total_assets if total_assets else 0
        
        # Equity Multiplier
        ratios["equity_multiplier"] = total_assets / equity if equity else 0
        
        # Interest Coverage Ratio
        ratios["interest_coverage"] = operating_income / interest_expense if interest_expense else 0
        
        # Debt Service Coverage Ratio (DSCR)
        ratios["dscr"] = ebitda / interest_expense if interest_expense else 0
        
        # Equity Ratio
        ratios["equity_ratio"] = equity / total_assets if total_assets else 0
        
        return ratios
    
    def _calculate_profitability_ratios(self, bs: Dict, is_data: Dict) -> Dict[str, float]:
        """Profitability ratios - ability to generate earnings"""
        ratios = {}
        
        revenue = is_data.get("revenue", 1)
        gross_profit = is_data.get("gross_profit", 0)
        operating_income = is_data.get("operating_income", 0)
        net_income = is_data.get("net_income", 0)
        total_assets = bs.get("total_assets", 1)
        equity = bs.get("equity", 1)
        ebitda = is_data.get("ebitda", 0)
        
        # Gross Profit Margin
        ratios["gross_margin"] = (gross_profit / revenue) if revenue else 0
        
        # Operating Profit Margin
        ratios["operating_margin"] = (operating_income / revenue) if revenue else 0
        
        # Net Profit Margin
        ratios["net_margin"] = (net_income / revenue) if revenue else 0
        
        # Return on Assets (ROA)
        ratios["roa"] = (net_income / total_assets) if total_assets else 0
        
        # Return on Equity (ROE)
        ratios["roe"] = (net_income / equity) if equity else 0
        
        # EBITDA Margin
        ratios["ebitda_margin"] = (ebitda / revenue) if revenue else 0
        
        # Return on Invested Capital (ROIC)
        invested_capital = equity + bs.get("total_liabilities", 0)
        ratios["roic"] = (net_income / invested_capital) if invested_capital else 0
        
        # DuPont Analysis components
        ratios["dupont_profit_margin"] = ratios["net_margin"]
        ratios["dupont_asset_turnover"] = revenue / total_assets if total_assets else 0
        ratios["dupont_equity_multiplier"] = total_assets / equity if equity else 0
        
        return ratios
    
    def _calculate_efficiency_ratios(self, bs: Dict, is_data: Dict) -> Dict[str, float]:
        """Efficiency ratios - asset utilization"""
        ratios = {}
        
        revenue = is_data.get("revenue", 1)
        cogs = is_data.get("cogs", 0)
        total_assets = bs.get("total_assets", 1)
        current_assets = bs.get("current_assets", 1)
        inventory = bs.get("inventory", 1)
        receivables = bs.get("receivables", 1)
        payables = bs.get("payables", 1)
        
        # Asset Turnover
        ratios["asset_turnover"] = revenue / total_assets if total_assets else 0
        
        # Inventory Turnover
        ratios["inventory_turnover"] = cogs / inventory if inventory else 0
        ratios["days_inventory"] = 365 / ratios["inventory_turnover"] if ratios["inventory_turnover"] else 0
        
        # Receivables Turnover
        ratios["receivables_turnover"] = revenue / receivables if receivables else 0
        ratios["days_sales_outstanding"] = 365 / ratios["receivables_turnover"] if ratios["receivables_turnover"] else 0
        
        # Payables Turnover
        ratios["payables_turnover"] = cogs / payables if payables else 0
        ratios["days_payables_outstanding"] = 365 / ratios["payables_turnover"] if ratios["payables_turnover"] else 0
        
        # Cash Conversion Cycle
        ratios["cash_conversion_cycle"] = (ratios["days_inventory"] + 
                                          ratios["days_sales_outstanding"] - 
                                          ratios["days_payables_outstanding"])
        
        # Working Capital Turnover
        working_capital = current_assets - bs.get("current_liabilities", 0)
        ratios["working_capital_turnover"] = revenue / working_capital if working_capital else 0
        
        return ratios
    
    def _calculate_valuation_ratios(self, is_data: Dict) -> Dict[str, float]:
        """Valuation ratios (when market data available)"""
        ratios = {}
        
        # These would require market price data
        # Placeholder for when that data is available
        ratios["pe_ratio"] = 0  # Price / EPS
        ratios["pb_ratio"] = 0  # Price / Book Value
        ratios["ps_ratio"] = 0  # Price / Sales
        
        # Earnings per share (needs share count)
        ratios["eps"] = 0
        
        return ratios
    
    def _calculate_growth_ratios(self, is_data: Dict) -> Dict[str, float]:
        """Growth metrics (requires historical data)"""
        ratios = {}
        
        # Placeholder - would calculate from multi-period data
        ratios["revenue_growth"] = 0.15  # Default 15% assumption
        ratios["earnings_growth"] = 0.12  # Default 12% assumption
        ratios["asset_growth"] = 0.10    # Default 10% assumption
        
        return ratios
    
    def detect_trends(self, data: Dict[str, Any]) -> TrendAnalysis:
        """Detect financial trends from historical data"""
        
        # Simplified trend detection - would be more sophisticated with time-series data
        is_data = data.get("income_statement", {})
        cf = data.get("cash_flow", {})
        
        revenue = is_data.get("revenue", 0)
        net_income = is_data.get("net_income", 0)
        ocf = cf.get("operating_cash_flow", 0)
        
        observations = []
        
        if revenue > 0:
            observations.append(f"Current revenue: ${revenue:,.0f}")
        if net_income > 0:
            observations.append("Profitable operations")
        elif net_income < 0:
            observations.append("Net loss reported")
        
        if ocf > net_income:
            observations.append("Strong cash generation relative to earnings")
        
        return TrendAnalysis(
            revenue_trend="Growing" if revenue > 0 else "Unknown",
            profit_trend="Positive" if net_income > 0 else "Negative",
            cash_flow_trend="Positive" if ocf > 0 else "Negative",
            key_observations=observations
        )
    
    def find_anomalies(self, data: Dict[str, Any]) -> List[Anomaly]:
        """Identify unusual metrics or red flags"""
        anomalies = []
        
        bs = data.get("balance_sheet", {})
        is_data = data.get("income_statement", {})
        
        current_ratio = bs.get("current_assets", 0) / bs.get("current_liabilities", 1)
        
        # Check current ratio
        if current_ratio < 1.0:
            anomalies.append(Anomaly(
                metric="Current Ratio",
                value=round(current_ratio, 2),
                expected_range="1.5 - 3.0",
                severity="High",
                explanation="Current assets may not cover short-term liabilities"
            ))
        
        # Check debt levels
        debt_to_equity = bs.get("total_liabilities", 0) / bs.get("equity", 1)
        if debt_to_equity > 2.0:
            anomalies.append(Anomaly(
                metric="Debt-to-Equity",
                value=round(debt_to_equity, 2),
                expected_range="0.5 - 1.5",
                severity="Medium",
                explanation="High leverage may indicate financial risk"
            ))
        
        # Check profitability
        net_margin = is_data.get("net_income", 0) / is_data.get("revenue", 1)
        if net_margin < 0:
            anomalies.append(Anomaly(
                metric="Net Margin",
                value=round(net_margin * 100, 2),
                expected_range="10% - 20%",
                severity="High",
                explanation="Negative margins indicate operational losses"
            ))
        
        return anomalies
    
    def generate_chart_data(self, data: Dict[str, Any], ratios: FinancialRatios) -> List[ChartData]:
        """Generate data structures for visualizations"""
        charts = []
        
        # Liquidity radar chart
        charts.append(ChartData(
            chart_type="radar",
            title="Liquidity Health",
            data={
                "metrics": ["Current Ratio", "Quick Ratio", "Cash Ratio"],
                "values": [
                    ratios.liquidity.get("current_ratio", 0),
                    ratios.liquidity.get("quick_ratio", 0),
                    ratios.liquidity.get("cash_ratio", 0)
                ],
                "benchmarks": [2.0, 1.5, 0.5]
            },
            explanation="Measures ability to meet short-term obligations"
        ))
        
        # Profitability margins
        charts.append(ChartData(
            chart_type="bar",
            title="Profit Margins",
            data={
                "labels": ["Gross", "Operating", "Net", "EBITDA"],
                "values": [
                    ratios.profitability.get("gross_margin", 0) * 100,
                    ratios.profitability.get("operating_margin", 0) * 100,
                    ratios.profitability.get("net_margin", 0) * 100,
                    ratios.profitability.get("ebitda_margin", 0) * 100
                ]
            },
            explanation="Profitability at different operational levels"
        ))
        
        # Leverage gauge
        charts.append(ChartData(
            chart_type="gauge",
            title="Leverage Risk",
            data={
                "value": ratios.leverage.get("debt_to_equity", 0),
                "max": 3.0,
                "zones": [
                    {"from": 0, "to": 0.5, "color": "green"},
                    {"from": 0.5, "to": 1.5, "color": "yellow"},
                    {"from": 1.5, "to": 3.0, "color": "red"}
                ]
            },
            explanation="Debt-to-equity ratio indicates financial leverage"
        ))
        
        # DuPont ROE breakdown
        charts.append(ChartData(
            chart_type="waterfall",
            title="DuPont ROE Analysis",
            data={
                "components": ["Profit Margin", "Asset Turnover", "Equity Multiplier"],
                "values": [
                    ratios.profitability.get("dupont_profit_margin", 0),
                    ratios.profitability.get("dupont_asset_turnover", 0),
                    ratios.profitability.get("dupont_equity_multiplier", 0)
                ],
                "roe": ratios.profitability.get("roe", 0)
            },
            explanation="ROE decomposition showing drivers of return on equity"
        ))
        
        return charts
