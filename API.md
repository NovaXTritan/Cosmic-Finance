# 📡 API Documentation

## Base URL
```
Development: http://localhost:8000
Production: https://api.cosmic-financials.com
```

## Authentication
Currently using guest mode. Future versions will support:
- JWT Bearer tokens
- OAuth2 (Google, GitHub)
- API Keys for programmatic access

---

## Endpoints

### 1. Health Check

**GET** `/health`

Check API status and version.

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-11-23T10:30:00Z"
}
```

---

### 2. Upload & Analyze File

**POST** `/api/analyze`

Upload and analyze a financial document.

**Request:**
- **Content-Type:** `multipart/form-data`
- **Body:**
  - `file`: File (PDF, Excel, CSV, or image)

**Supported Formats:**
- PDF (.pdf)
- Excel (.xlsx, .xls)
- CSV (.csv)
- Images with OCR (.jpg, .jpeg, .png)

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@financial-statement.pdf"
```

**Python Example:**
```python
import requests

url = "http://localhost:8000/api/analyze"
files = {"file": open("financial-statement.pdf", "rb")}
response = requests.post(url, files=files)
data = response.json()
```

**JavaScript Example:**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('http://localhost:8000/api/analyze', {
  method: 'POST',
  body: formData
});

const data = await response.json();
```

**Response:** (200 OK)
```json
{
  "summary": {
    "revenue": 15466663,
    "profit": 447218,
    "total_assets": 22000000,
    "total_liabilities": 11000000,
    "equity": 11000000,
    "total_debt": 8000000
  },
  "ratios": {
    "liquidity": {
      "current_ratio": 1.85,
      "quick_ratio": 1.42,
      "cash_ratio": 0.35,
      "working_capital": 4200000
    },
    "profitability": {
      "gross_margin": 28.5,
      "operating_margin": 12.3,
      "net_margin": 2.9,
      "roe": 4.07,
      "roa": 2.03,
      "ebitda_margin": 15.8
    },
    "leverage": {
      "debt_to_equity": 0.73,
      "debt_to_assets": 0.36,
      "equity_multiplier": 2.0,
      "interest_coverage": 3.5,
      "dscr": 1.85
    },
    "efficiency": {
      "asset_turnover": 0.70,
      "inventory_turnover": 8.5,
      "receivables_turnover": 6.2,
      "payables_turnover": 5.8,
      "cash_conversion_cycle": 42
    }
  },
  "trends": {
    "revenue_growth": 15.2,
    "profit_growth": -8.5,
    "asset_growth": 12.3
  },
  "anomalies": [
    {
      "metric": "profit_margin",
      "value": 2.9,
      "expected_range": "10-15%",
      "severity": "high",
      "explanation": "Profit margin is significantly below industry average"
    }
  ],
  "insights": {
    "executive_summary": "Company shows strong revenue growth...",
    "strengths": [
      "Robust revenue growth of 15.2% YoY",
      "Healthy current ratio indicating good liquidity"
    ],
    "weaknesses": [
      "Low profit margins require cost optimization",
      "High trade receivables impacting cash flow"
    ],
    "recommendations": [
      {
        "category": "operational",
        "priority": "high",
        "action": "Implement aggressive cost reduction program",
        "expected_impact": "Improve EBITDA margin by 3-5%",
        "timeline": "6-12 months"
      }
    ],
    "risk_assessment": {
      "overall_score": 72,
      "credit_risk": 85,
      "liquidity_risk": 75,
      "operational_risk": 65,
      "market_risk": 70
    }
  },
  "metadata": {
    "file_name": "financial-statement.pdf",
    "file_size": 245678,
    "processed_at": "2025-11-23T10:30:00Z",
    "processing_time_ms": 2345
  }
}
```

**Error Responses:**

**400 Bad Request** - Invalid file format
```json
{
  "detail": "Unsupported file format. Please upload PDF, Excel, CSV, or image files."
}
```

**413 Payload Too Large** - File too large
```json
{
  "detail": "File size exceeds maximum limit of 50MB"
}
```

**422 Unprocessable Entity** - Cannot extract data
```json
{
  "detail": "Unable to extract financial data from the uploaded file"
}
```

**500 Internal Server Error**
```json
{
  "detail": "An error occurred while processing your file"
}
```

---

### 3. Batch Analysis (Coming Soon)

**POST** `/api/analyze/batch`

Analyze multiple files in one request.

**Request:**
- Multiple file uploads
- Returns array of results

---

### 4. Export Report (Coming Soon)

**GET** `/api/export/{analysis_id}`

Export analysis as PDF report.

**Query Parameters:**
- `format`: pdf | excel | json (default: pdf)
- `template`: standard | detailed | executive

---

## Rate Limits

- **Free Tier:** 10 requests/hour
- **Pro Tier:** 100 requests/hour
- **Enterprise:** Unlimited

Rate limit headers included in response:
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1637654321
```

---

## Webhooks (Coming Soon)

Register webhook URLs to receive analysis completion notifications.

**POST** `/api/webhooks`

```json
{
  "url": "https://your-server.com/webhook",
  "events": ["analysis.completed", "analysis.failed"]
}
```

---

## Data Models

### Financial Summary
```typescript
interface FinancialSummary {
  revenue: number;
  profit: number;
  total_assets: number;
  total_liabilities: number;
  equity: number;
  total_debt: number;
}
```

### Ratios
```typescript
interface Ratios {
  liquidity: LiquidityRatios;
  profitability: ProfitabilityRatios;
  leverage: LeverageRatios;
  efficiency: EfficiencyRatios;
}

interface LiquidityRatios {
  current_ratio: number;
  quick_ratio: number;
  cash_ratio: number;
  working_capital: number;
}

// ... (similar for other ratio categories)
```

### Anomaly
```typescript
interface Anomaly {
  metric: string;
  value: number;
  expected_range: string;
  severity: "low" | "medium" | "high" | "critical";
  explanation: string;
}
```

### Recommendation
```typescript
interface Recommendation {
  category: "operational" | "financial" | "strategic";
  priority: "low" | "medium" | "high" | "critical";
  action: string;
  expected_impact: string;
  timeline: string;
}
```

---

## Error Handling

All errors follow this structure:
```typescript
interface ErrorResponse {
  detail: string;
  error_code?: string;
  timestamp?: string;
}
```

**Common Error Codes:**
- `FILE_TOO_LARGE`: File exceeds size limit
- `INVALID_FORMAT`: Unsupported file format
- `EXTRACTION_FAILED`: Cannot extract data
- `ANALYSIS_FAILED`: Analysis processing error
- `RATE_LIMIT_EXCEEDED`: Too many requests

---

## SDK Examples

### Python SDK (Official)
```python
from cosmic_financials import Client

client = Client(api_key="your_api_key")

# Analyze file
result = client.analyze("financial-statement.pdf")

# Access data
print(f"Revenue: ${result.summary.revenue:,.2f}")
print(f"ROE: {result.ratios.profitability.roe}%")

# Export report
client.export(result.id, format="pdf", output="report.pdf")
```

### JavaScript SDK
```javascript
import { CosmicFinancials } from 'cosmic-financials-sdk';

const client = new CosmicFinancials({ apiKey: 'your_api_key' });

// Analyze file
const result = await client.analyze('financial-statement.pdf');

// Access data
console.log(`Revenue: $${result.summary.revenue.toLocaleString()}`);
console.log(`ROE: ${result.ratios.profitability.roe}%`);
```

---

## Changelog

### v1.0.0 (2025-11-23)
- ✨ Initial release
- 📊 Support for PDF, Excel, CSV analysis
- 🧮 50+ financial ratios
- 🤖 AI-powered insights
- 📈 Interactive visualizations

---

## Support

- **Documentation:** https://docs.cosmic-financials.com
- **API Status:** https://status.cosmic-financials.com
- **Email:** api@cosmic-financials.com
- **Discord:** https://discord.gg/cosmic-financials
