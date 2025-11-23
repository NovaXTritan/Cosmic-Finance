"""
Test suite for Cosmic Finance Analyzer backend
"""

import pytest
from fastapi.testclient import TestClient
from main import app
from app.services.ratio_calculator import RatioCalculator
from app.services.file_processor import FileProcessor

client = TestClient(app)


class TestHealthEndpoints:
    """Test health check endpoints"""
    
    def test_root_endpoint(self):
        """Test root endpoint returns correct status"""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "online"
        assert data["service"] == "Cosmic Finance Analyzer"
    
    def test_health_endpoint(self):
        """Test detailed health endpoint"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "services" in data


class TestRatioCalculator:
    """Test financial ratio calculations"""
    
    def setup_method(self):
        """Setup test data"""
        self.calculator = RatioCalculator()
        self.sample_data = {
            "financial_statements": {
                "balance_sheet": {
                    "current_assets": 1000000,
                    "current_liabilities": 500000,
                    "total_assets": 2000000,
                    "total_liabilities": 800000,
                    "equity": 1200000,
                    "cash": 300000,
                    "inventory": 200000,
                    "receivables": 250000
                },
                "income_statement": {
                    "revenue": 5000000,
                    "cost_of_goods_sold": 3000000,
                    "gross_profit": 2000000,
                    "operating_income": 800000,
                    "net_income": 600000,
                    "interest_expense": 50000
                }
            }
        }
    
    def test_liquidity_ratios(self):
        """Test liquidity ratio calculations"""
        ratios = self.calculator.calculate_all_ratios(self.sample_data)
        
        # Current Ratio = Current Assets / Current Liabilities
        assert ratios["liquidity"]["current_ratio"] == 2.0
        
        # Quick Ratio = (Current Assets - Inventory) / Current Liabilities
        expected_quick = (1000000 - 200000) / 500000
        assert ratios["liquidity"]["quick_ratio"] == expected_quick
        
        # Cash Ratio
        expected_cash = 300000 / 500000
        assert ratios["liquidity"]["cash_ratio"] == expected_cash
    
    def test_profitability_ratios(self):
        """Test profitability ratio calculations"""
        ratios = self.calculator.calculate_all_ratios(self.sample_data)
        
        # Gross Margin = (Gross Profit / Revenue) * 100
        expected_gross = (2000000 / 5000000) * 100
        assert ratios["profitability"]["gross_margin"] == expected_gross
        
        # Net Margin = (Net Income / Revenue) * 100
        expected_net = (600000 / 5000000) * 100
        assert ratios["profitability"]["net_margin"] == expected_net
        
        # ROE = (Net Income / Equity) * 100
        expected_roe = (600000 / 1200000) * 100
        assert ratios["profitability"]["roe"] == expected_roe
    
    def test_leverage_ratios(self):
        """Test leverage ratio calculations"""
        ratios = self.calculator.calculate_all_ratios(self.sample_data)
        
        # Debt to Equity = Total Liabilities / Equity
        expected_de = 800000 / 1200000
        assert ratios["leverage"]["debt_to_equity"] == pytest.approx(expected_de)
        
        # Debt to Assets = Total Liabilities / Total Assets
        expected_da = 800000 / 2000000
        assert ratios["leverage"]["debt_to_assets"] == expected_da
        
        # Interest Coverage = Operating Income / Interest Expense
        expected_ic = 800000 / 50000
        assert ratios["leverage"]["interest_coverage"] == expected_ic
    
    def test_health_assessment(self):
        """Test health score calculations"""
        ratios = self.calculator.calculate_all_ratios(self.sample_data)
        
        assert "summary_scores" in ratios
        assert "overall_score" in ratios["summary_scores"]
        assert 0 <= ratios["summary_scores"]["overall_score"] <= 100
        assert ratios["summary_scores"]["overall_rating"] in [
            "A+ (Excellent)", "A (Very Good)", "B+ (Good)", 
            "B (Satisfactory)", "C (Fair)", "D (Poor)"
        ]
    
    def test_safe_divide(self):
        """Test safe division handling"""
        result = self.calculator._safe_divide(100, 0)
        assert result == 0.0
        
        result = self.calculator._safe_divide(100, 50)
        assert result == 2.0


class TestFileProcessor:
    """Test file processing functionality"""
    
    def setup_method(self):
        """Setup test processor"""
        self.processor = FileProcessor()
    
    def test_supported_formats(self):
        """Test supported file formats list"""
        assert '.pdf' in self.processor.supported_formats
        assert '.xlsx' in self.processor.supported_formats
        assert '.csv' in self.processor.supported_formats
    
    def test_extract_company_info(self):
        """Test company info extraction from text"""
        sample_text = """
        ABC Corporation Ltd.
        Financial Statements
        For the year ended December 31, 2023
        """
        
        info = self.processor._extract_company_info(sample_text)
        assert "name" in info or "period" in info
    
    def test_find_value_in_dataframe(self):
        """Test value extraction from DataFrame"""
        import pandas as pd
        
        df = pd.DataFrame({
            'Item': ['Total Assets', 'Revenue', 'Net Income'],
            'Value': [1000000, 500000, 50000]
        })
        
        result = self.processor._find_value_in_dataframe(df, ['total assets'])
        assert result == 1000000


class TestAPIEndpoints:
    """Test API endpoints"""
    
    def test_calculate_endpoint(self):
        """Test direct calculation endpoint"""
        payload = {
            "financial_data": {
                "financial_statements": {
                    "balance_sheet": {
                        "current_assets": 100000,
                        "current_liabilities": 50000
                    }
                }
            }
        }
        
        response = client.post("/api/calculate", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "financial_ratios" in data
    
    def test_invalid_file_type(self):
        """Test upload with invalid file type"""
        # This would require creating a mock file
        # Placeholder for actual implementation
        pass


class TestEdgeCases:
    """Test edge cases and error handling"""
    
    def test_empty_financial_data(self):
        """Test handling of empty financial data"""
        calculator = RatioCalculator()
        result = calculator.calculate_all_ratios({})
        
        # Should return structure with zeros
        assert "liquidity" in result
        assert "profitability" in result
    
    def test_negative_values(self):
        """Test handling of negative financial values"""
        calculator = RatioCalculator()
        data = {
            "financial_statements": {
                "income_statement": {
                    "revenue": -100000,  # Negative revenue
                    "net_income": -50000  # Net loss
                }
            }
        }
        
        result = calculator.calculate_all_ratios(data)
        # Should handle gracefully without crashing
        assert result is not None
    
    def test_division_by_zero(self):
        """Test division by zero scenarios"""
        calculator = RatioCalculator()
        data = {
            "financial_statements": {
                "balance_sheet": {
                    "current_assets": 1000,
                    "current_liabilities": 0  # Zero liabilities
                }
            }
        }
        
        result = calculator.calculate_all_ratios(data)
        # Should return 0 or handle gracefully
        assert result["liquidity"]["current_ratio"] == 0


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
