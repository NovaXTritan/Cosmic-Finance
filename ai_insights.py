from typing import Dict, List, Any
from app.models.schemas import AIInsight, FinancialRatios, TrendAnalysis
import json

class AIInsightGenerator:
    """Generate AI-powered insights and recommendations"""
    
    def __init__(self):
        self.insight_templates = {
            "liquidity": self._analyze_liquidity,
            "leverage": self._analyze_leverage,
            "profitability": self._analyze_profitability,
            "efficiency": self._analyze_efficiency,
            "overall": self._analyze_overall
        }
    
    def generate_insights(self, 
                         data: Dict[str, Any], 
                         ratios: FinancialRatios,
                         trends: TrendAnalysis) -> List[AIInsight]:
        """Generate comprehensive AI insights"""
        
        insights = []
        
        # Analyze each category
        insights.extend(self._analyze_liquidity(ratios.liquidity))
        insights.extend(self._analyze_leverage(ratios.leverage))
        insights.extend(self._analyze_profitability(ratios.profitability))
        insights.extend(self._analyze_efficiency(ratios.efficiency))
        insights.extend(self._analyze_overall(ratios, trends))
        
        # Sort by priority
        priority_order = {"Critical": 0, "High": 1, "Medium": 2, "Low": 3}
        insights.sort(key=lambda x: priority_order.get(x.priority, 4))
        
        return insights
    
    def _analyze_liquidity(self, liquidity: Dict[str, float]) -> List[AIInsight]:
        """Analyze liquidity position"""
        insights = []
        
        current_ratio = liquidity.get("current_ratio", 0)
        quick_ratio = liquidity.get("quick_ratio", 0)
        working_capital = liquidity.get("working_capital", 0)
        
        # Current ratio analysis
        if current_ratio < 1.0:
            insights.append(AIInsight(
                category="Liquidity",
                insight=f"Critical liquidity concern: Current ratio of {current_ratio:.2f} indicates insufficient short-term assets to cover liabilities.",
                recommendation="Immediately focus on: 1) Accelerating receivables collection, 2) Reducing inventory levels, 3) Negotiating extended payment terms with suppliers, or 4) Securing short-term credit line.",
                impact="High risk of cash flow crisis and potential inability to meet obligations",
                priority="Critical"
            ))
        elif current_ratio < 1.5:
            insights.append(AIInsight(
                category="Liquidity",
                insight=f"Liquidity is below healthy range. Current ratio of {current_ratio:.2f} suggests tight working capital.",
                recommendation="Build cash reserves by improving collection processes and optimizing inventory turnover. Target current ratio above 1.5.",
                impact="May face challenges during economic downturns or unexpected expenses",
                priority="High"
            ))
        elif current_ratio > 3.0:
            insights.append(AIInsight(
                category="Liquidity",
                insight=f"Excess liquidity detected. Current ratio of {current_ratio:.2f} may indicate inefficient asset utilization.",
                recommendation="Consider investing excess cash in growth initiatives, reducing expensive debt, or returning capital to shareholders.",
                impact="Opportunity cost of holding idle assets instead of productive investments",
                priority="Medium"
            ))
        else:
            insights.append(AIInsight(
                category="Liquidity",
                insight=f"Strong liquidity position with current ratio of {current_ratio:.2f} in healthy range (1.5-3.0).",
                recommendation="Maintain current working capital management practices. Continue monitoring receivables and inventory levels.",
                impact="Well-positioned to handle normal business operations and moderate challenges",
                priority="Low"
            ))
        
        # Quick ratio analysis
        if quick_ratio < 1.0:
            insights.append(AIInsight(
                category="Liquidity",
                insight=f"Quick ratio of {quick_ratio:.2f} shows dependence on inventory to meet obligations.",
                recommendation="Reduce inventory dependency by accelerating cash conversion cycle. Focus on receivables management.",
                impact="Vulnerable if inventory cannot be quickly converted to cash",
                priority="High"
            ))
        
        return insights
    
    def _analyze_leverage(self, leverage: Dict[str, float]) -> List[AIInsight]:
        """Analyze debt and leverage position"""
        insights = []
        
        debt_to_equity = leverage.get("debt_to_equity", 0)
        interest_coverage = leverage.get("interest_coverage", 0)
        debt_ratio = leverage.get("debt_ratio", 0)
        
        # Debt-to-equity analysis
        if debt_to_equity > 2.0:
            insights.append(AIInsight(
                category="Leverage",
                insight=f"High leverage: Debt-to-equity ratio of {debt_to_equity:.2f} significantly exceeds healthy range (0.5-1.5).",
                recommendation="Priority: Deleveraging through: 1) Debt paydown from operating cash, 2) Equity raising if feasible, 3) Asset sales of non-core holdings. Avoid new debt.",
                impact="High financial risk, vulnerability to interest rate increases, reduced financial flexibility",
                priority="Critical"
            ))
        elif debt_to_equity > 1.5:
            insights.append(AIInsight(
                category="Leverage",
                insight=f"Elevated leverage at {debt_to_equity:.2f} debt-to-equity ratio.",
                recommendation="Focus on gradual deleveraging. Prioritize debt repayment in capital allocation. Monitor credit metrics closely.",
                impact="Moderate financial risk, may face constraints in raising additional capital",
                priority="High"
            ))
        elif debt_to_equity < 0.3:
            insights.append(AIInsight(
                category="Leverage",
                insight=f"Conservative capital structure with {debt_to_equity:.2f} debt-to-equity ratio.",
                recommendation="Consider strategic use of debt to optimize capital structure and potentially reduce WACC. Tax benefits of debt may be underutilized.",
                impact="Potential to enhance returns through modest leverage in favorable market conditions",
                priority="Low"
            ))
        
        # Interest coverage analysis
        if interest_coverage < 2.5 and interest_coverage > 0:
            insights.append(AIInsight(
                category="Leverage",
                insight=f"Weak interest coverage at {interest_coverage:.2f}x indicates limited buffer for debt service.",
                recommendation="Improve EBITDA through operational efficiency and revenue growth. Consider refinancing at lower rates if possible.",
                impact="Risk of debt default if earnings decline or interest rates rise",
                priority="Critical"
            ))
        elif interest_coverage > 5.0:
            insights.append(AIInsight(
                category="Leverage",
                insight=f"Strong interest coverage of {interest_coverage:.2f}x provides comfortable debt service cushion.",
                recommendation="Debt service is well-covered. Opportunity to take on additional leverage for growth if strategic opportunities arise.",
                impact="Low financial distress risk, flexibility for additional borrowing",
                priority="Low"
            ))
        
        return insights
    
    def _analyze_profitability(self, profitability: Dict[str, float]) -> List[AIInsight]:
        """Analyze profitability metrics"""
        insights = []
        
        net_margin = profitability.get("net_margin", 0) * 100
        roe = profitability.get("roe", 0) * 100
        roa = profitability.get("roa", 0) * 100
        gross_margin = profitability.get("gross_margin", 0) * 100
        
        # Net margin analysis
        if net_margin < 0:
            insights.append(AIInsight(
                category="Profitability",
                insight=f"Operating at a loss with {net_margin:.1f}% net margin.",
                recommendation="Urgent focus needed on: 1) Revenue growth through market expansion, 2) Cost reduction across all expense categories, 3) Product mix optimization toward higher-margin offerings, 4) Pricing power assessment.",
                impact="Unsustainable business model, cash burn threatens viability",
                priority="Critical"
            ))
        elif net_margin < 5.0:
            insights.append(AIInsight(
                category="Profitability",
                insight=f"Thin margins at {net_margin:.1f}% leave little buffer for market changes.",
                recommendation="Focus on margin expansion through operational leverage, pricing optimization, and cost discipline. Benchmark against industry leaders.",
                impact="Vulnerable to competitive pressure and cost increases",
                priority="High"
            ))
        elif net_margin > 20.0:
            insights.append(AIInsight(
                category="Profitability",
                insight=f"Exceptional profitability with {net_margin:.1f}% net margin, exceeding industry standards.",
                recommendation="Strong competitive position. Consider reinvesting excess returns in growth initiatives or innovation while maintaining pricing discipline.",
                impact="Market-leading profitability provides strategic options and resilience",
                priority="Low"
            ))
        
        # ROE analysis
        if roe > 0 and roe < 10.0:
            insights.append(AIInsight(
                category="Profitability",
                insight=f"ROE of {roe:.1f}% below cost of equity threshold.",
                recommendation="Shareholders are not earning adequate returns. Focus on DuPont components: improve margins, increase asset turnover, or optimize capital structure.",
                impact="Poor shareholder value creation, may struggle to attract capital",
                priority="High"
            ))
        elif roe > 20.0:
            insights.append(AIInsight(
                category="Profitability",
                insight=f"Outstanding ROE of {roe:.1f}% demonstrates superior capital efficiency.",
                recommendation="Sustain competitive advantages driving high returns. Monitor for mean reversion and invest in moats.",
                impact="Strong value creation, attractive investment profile",
                priority="Low"
            ))
        
        return insights
    
    def _analyze_efficiency(self, efficiency: Dict[str, float]) -> List[AIInsight]:
        """Analyze operational efficiency"""
        insights = []
        
        asset_turnover = efficiency.get("asset_turnover", 0)
        days_sales = efficiency.get("days_sales_outstanding", 0)
        days_inventory = efficiency.get("days_inventory", 0)
        cash_conversion = efficiency.get("cash_conversion_cycle", 0)
        
        # Asset turnover
        if asset_turnover < 0.5:
            insights.append(AIInsight(
                category="Efficiency",
                insight=f"Low asset turnover of {asset_turnover:.2f} indicates underutilized assets.",
                recommendation="Improve asset productivity through: 1) Revenue growth on existing asset base, 2) Divesting non-productive assets, 3) Optimizing capacity utilization.",
                impact="Suboptimal return on invested capital",
                priority="Medium"
            ))
        elif asset_turnover > 2.0:
            insights.append(AIInsight(
                category="Efficiency",
                insight=f"High asset turnover of {asset_turnover:.2f} shows efficient asset utilization.",
                recommendation="Strong operational efficiency. Ensure growth doesn't strain capacity. Plan capital investments proactively.",
                impact="Efficient operations supporting strong financial performance",
                priority="Low"
            ))
        
        # Cash conversion cycle
        if cash_conversion > 90:
            insights.append(AIInsight(
                category="Efficiency",
                insight=f"Extended cash conversion cycle of {cash_conversion:.0f} days ties up significant working capital.",
                recommendation="Accelerate cash conversion by: 1) Reducing DSO through better collections, 2) Optimizing inventory levels, 3) Extending DPO where feasible without harming supplier relationships.",
                impact=f"Approximately ${(cash_conversion - 60) * 1000:,.0f} in excess working capital tied up (estimated)",
                priority="High"
            ))
        elif cash_conversion < 30:
            insights.append(AIInsight(
                category="Efficiency",
                insight=f"Excellent cash conversion cycle of {cash_conversion:.0f} days demonstrates superior working capital management.",
                recommendation="Maintain best-in-class working capital practices. This is a competitive advantage worth protecting.",
                impact="Efficient cash generation supports growth without additional financing needs",
                priority="Low"
            ))
        
        return insights
    
    def _analyze_overall(self, ratios: FinancialRatios, trends: TrendAnalysis) -> List[AIInsight]:
        """Overall business health assessment"""
        insights = []
        
        # Calculate composite score
        scores = {
            "liquidity": self._score_liquidity(ratios.liquidity),
            "leverage": self._score_leverage(ratios.leverage),
            "profitability": self._score_profitability(ratios.profitability),
            "efficiency": self._score_efficiency(ratios.efficiency)
        }
        
        overall_score = sum(scores.values()) / len(scores)
        
        if overall_score >= 80:
            health_rating = "Excellent"
            color = "green"
        elif overall_score >= 65:
            health_rating = "Good"
            color = "blue"
        elif overall_score >= 50:
            health_rating = "Fair"
            color = "yellow"
        else:
            health_rating = "Poor"
            color = "red"
        
        insights.append(AIInsight(
            category="Overall Assessment",
            insight=f"Financial Health Score: {overall_score:.0f}/100 - {health_rating}. Breakdown: Liquidity {scores['liquidity']}, Leverage {scores['leverage']}, Profitability {scores['profitability']}, Efficiency {scores['efficiency']}.",
            recommendation=self._generate_strategic_recommendation(scores, ratios),
            impact=f"Company demonstrates {health_rating.lower()} financial performance relative to industry standards.",
            priority="High" if overall_score < 60 else "Medium"
        ))
        
        return insights
    
    def _score_liquidity(self, liquidity: Dict[str, float]) -> float:
        """Score liquidity (0-100)"""
        current_ratio = liquidity.get("current_ratio", 0)
        quick_ratio = liquidity.get("quick_ratio", 0)
        
        if current_ratio >= 1.5 and current_ratio <= 3.0:
            current_score = 100
        elif current_ratio < 1.0:
            current_score = 30
        elif current_ratio < 1.5:
            current_score = 60
        else:
            current_score = 75
        
        if quick_ratio >= 1.0:
            quick_score = 100
        else:
            quick_score = quick_ratio * 100
        
        return (current_score + quick_score) / 2
    
    def _score_leverage(self, leverage: Dict[str, float]) -> float:
        """Score leverage (0-100)"""
        dte = leverage.get("debt_to_equity", 0)
        interest_cov = leverage.get("interest_coverage", 0)
        
        if dte <= 0.5:
            dte_score = 100
        elif dte <= 1.5:
            dte_score = 80
        elif dte <= 2.0:
            dte_score = 60
        else:
            dte_score = max(0, 60 - (dte - 2.0) * 20)
        
        if interest_cov >= 5.0:
            ic_score = 100
        elif interest_cov >= 2.5:
            ic_score = 80
        elif interest_cov > 0:
            ic_score = max(0, interest_cov * 20)
        else:
            ic_score = 0
        
        return (dte_score + ic_score) / 2
    
    def _score_profitability(self, profitability: Dict[str, float]) -> float:
        """Score profitability (0-100)"""
        roe = profitability.get("roe", 0)
        net_margin = profitability.get("net_margin", 0)
        
        if roe >= 0.20:
            roe_score = 100
        elif roe >= 0.10:
            roe_score = 70
        elif roe > 0:
            roe_score = max(0, roe * 350)
        else:
            roe_score = 0
        
        if net_margin >= 0.15:
            margin_score = 100
        elif net_margin >= 0.05:
            margin_score = 70
        elif net_margin > 0:
            margin_score = max(0, net_margin * 350)
        else:
            margin_score = 0
        
        return (roe_score + margin_score) / 2
    
    def _score_efficiency(self, efficiency: Dict[str, float]) -> float:
        """Score efficiency (0-100)"""
        asset_turnover = efficiency.get("asset_turnover", 0)
        ccc = efficiency.get("cash_conversion_cycle", 90)
        
        if asset_turnover >= 2.0:
            at_score = 100
        elif asset_turnover >= 1.0:
            at_score = 80
        else:
            at_score = max(0, asset_turnover * 50)
        
        if ccc <= 30:
            ccc_score = 100
        elif ccc <= 60:
            ccc_score = 80
        elif ccc <= 90:
            ccc_score = 60
        else:
            ccc_score = max(0, 60 - (ccc - 90) * 0.5)
        
        return (at_score + ccc_score) / 2
    
    def _generate_strategic_recommendation(self, scores: Dict[str, float], ratios: FinancialRatios) -> str:
        """Generate strategic recommendations based on score breakdown"""
        
        weakest = min(scores, key=scores.get)
        strongest = max(scores, key=scores.get)
        
        recommendations = {
            "liquidity": "Strengthen working capital management and cash reserves",
            "leverage": "Focus on deleveraging and improving debt service coverage",
            "profitability": "Enhance margins through operational improvements and pricing power",
            "efficiency": "Optimize asset utilization and accelerate cash conversion"
        }
        
        return f"Strategic priority: {recommendations[weakest]}. Leverage strength in {strongest} to support improvements in {weakest}."
