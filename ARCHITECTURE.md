# Architecture Overview

## System Design

Cosmic Financials is a modern, full-stack financial analysis platform built with a microservices-inspired architecture. The system is designed for scalability, maintainability, and exceptional user experience.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   Frontend Layer (Next.js)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   UI/UX      │  │  State Mgmt  │  │   Routing    │      │
│  │  Components  │  │   (React)    │  │  (Next.js)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend Layer (FastAPI)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   API        │  │  Business    │  │   Services   │      │
│  │  Endpoints   │  │   Logic      │  │   Layer      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Processing Pipeline                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     File     │  │  Financial   │  │      AI      │      │
│  │  Processing  │  │   Analysis   │  │   Insights   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Plotly.js, Chart.js
- **HTTP Client**: Axios
- **File Upload**: React Dropzone

### Component Hierarchy

```
App (page.tsx)
├── FileUpload
│   ├── Dropzone
│   └── ProgressBar
└── Dashboard
    ├── Overview
    │   ├── HealthScore
    │   ├── KeyMetrics
    │   └── TrendSummary
    ├── RatiosView
    │   ├── LiquidityRatios
    │   ├── LeverageRatios
    │   ├── ProfitabilityRatios
    │   ├── EfficiencyRatios
    │   └── DuPontAnalysis
    ├── InsightsView
    │   ├── AnomalyCards
    │   └── InsightCards
    └── ChartsView
        ├── RadarChart
        ├── GaugeChart
        ├── BarChart
        └── WaterfallChart
```

### State Management

```typescript
// Component-level state (useState)
const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [activeTab, setActiveTab] = useState<Tab>('overview');

// No global state management needed (yet)
// Data flows top-down from page.tsx through props
```

### Routing Strategy

- **App Router**: Next.js 14 app directory
- **Client-Side**: Single-page experience
- **Dynamic**: All routes are client-side transitions
- **Future**: Can add `/dashboard/[id]` for saved analyses

## Backend Architecture

### Technology Stack

- **Framework**: FastAPI
- **Data Processing**: Pandas, NumPy
- **File Parsing**: PyPDF2, openpyxl, pytesseract
- **Validation**: Pydantic
- **Server**: Uvicorn (ASGI)

### Service Layer Design

```
main.py (FastAPI App)
├── /api/upload      → file_processor.process_file()
├── /api/analyze     → Complete pipeline
│   ├── file_processor.process_file()
│   ├── financial_analyzer.calculate_all_ratios()
│   ├── financial_analyzer.detect_trends()
│   ├── financial_analyzer.find_anomalies()
│   └── ai_insights.generate_insights()
└── /api/health      → Health check
```

### Data Flow

```
1. File Upload
   ↓
2. File Type Detection
   ↓
3. Format-Specific Processing
   ├── PDF → PyPDF2 → Text Extraction
   ├── Excel → openpyxl → Sheet Parsing
   ├── CSV → pandas → DataFrame
   └── Image → pytesseract → OCR
   ↓
4. Data Structuring
   ├── Balance Sheet
   ├── Income Statement
   └── Cash Flow
   ↓
5. Financial Analysis
   ├── Liquidity Ratios
   ├── Leverage Ratios
   ├── Profitability Ratios
   └── Efficiency Ratios
   ↓
6. Trend & Anomaly Detection
   ↓
7. AI Insight Generation
   ↓
8. Visualization Data Preparation
   ↓
9. Response Assembly
```

### File Processing Pipeline

```python
class FileProcessor:
    def process_file(path, type):
        # 1. Format-specific parsing
        raw_data = self._parse_by_format(path, type)
        
        # 2. Data extraction
        structured = self._extract_financial_data(raw_data)
        
        # 3. Validation
        validated = self._validate_data(structured)
        
        return validated
```

### Financial Analyzer

```python
class FinancialAnalyzer:
    def calculate_all_ratios(data):
        return FinancialRatios(
            liquidity=self._calculate_liquidity_ratios(data),
            leverage=self._calculate_leverage_ratios(data),
            profitability=self._calculate_profitability_ratios(data),
            efficiency=self._calculate_efficiency_ratios(data)
        )
    
    def detect_trends(data):
        # Time-series analysis
        # Identify patterns
        return TrendAnalysis(...)
    
    def find_anomalies(data):
        # Statistical outlier detection
        # Benchmark comparison
        return List[Anomaly]
```

### AI Insights Generator

```python
class AIInsightGenerator:
    def generate_insights(data, ratios, trends):
        insights = []
        
        # Category-specific analysis
        insights.extend(self._analyze_liquidity(ratios.liquidity))
        insights.extend(self._analyze_leverage(ratios.leverage))
        insights.extend(self._analyze_profitability(ratios.profitability))
        insights.extend(self._analyze_efficiency(ratios.efficiency))
        
        # Overall assessment
        insights.extend(self._analyze_overall(ratios, trends))
        
        # Priority sorting
        return sorted(insights, key=lambda x: priority_order[x.priority])
```

## Data Models

### TypeScript (Frontend)

```typescript
interface AnalysisData {
  success: boolean;
  financial_data: FinancialData;
  ratios: FinancialRatios;
  trends: TrendAnalysis;
  anomalies: Anomaly[];
  ai_insights: AIInsight[];
  visualizations: ChartData[];
}

interface FinancialRatios {
  liquidity: Record<string, number>;
  leverage: Record<string, number>;
  profitability: Record<string, number>;
  efficiency: Record<string, number>;
  growth: Record<string, number>;
}
```

### Python (Backend)

```python
class FinancialRatios(BaseModel):
    liquidity: Dict[str, float]
    leverage: Dict[str, float]
    profitability: Dict[str, float]
    efficiency: Dict[str, float]
    growth: Dict[str, float]

class AIInsight(BaseModel):
    category: str
    insight: str
    recommendation: str
    impact: str
    priority: Literal["Critical", "High", "Medium", "Low"]
```

## Design Patterns

### Frontend Patterns

1. **Component Composition**
   - Atomic design principles
   - Reusable, single-responsibility components

2. **Controlled Components**
   - All form inputs are controlled
   - State as single source of truth

3. **Custom Hooks** (future)
   - `useAnalysis()` - Analysis data management
   - `useCharts()` - Chart configuration

### Backend Patterns

1. **Service Layer Pattern**
   - Business logic separated from API layer
   - Testable, reusable services

2. **Dependency Injection**
   - Services instantiated in main.py
   - Passed to route handlers

3. **Repository Pattern** (future)
   - When database is added
   - Abstract data access

## Performance Optimizations

### Frontend

1. **Code Splitting**
   - Dynamic imports for charts
   - Lazy loading of dashboard views

2. **Memoization**
   - React.memo for expensive components
   - useMemo for calculations

3. **Image Optimization**
   - Next.js automatic optimization
   - WebP format support

### Backend

1. **Async Processing**
   - FastAPI async endpoints
   - Concurrent file processing

2. **Caching** (future)
   - Redis for repeated calculations
   - File hash-based caching

3. **Batch Processing**
   - Process multiple files
   - Parallel ratio calculations

## Security Considerations

### Frontend

1. **Input Validation**
   - File type checking
   - Size limits (10MB)
   - Client-side sanitization

2. **XSS Prevention**
   - React's automatic escaping
   - DOMPurify for user content

### Backend

1. **CORS Configuration**
   - Whitelist allowed origins
   - Credential handling

2. **Rate Limiting** (future)
   - Prevent abuse
   - API quotas

3. **File Validation**
   - Magic number checking
   - Virus scanning (production)

4. **Error Handling**
   - No sensitive data in errors
   - Structured error responses

## Scalability Strategy

### Horizontal Scaling

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     ▼
┌──────────┐
│   ALB    │  Load Balancer
└────┬─────┘
     │
     ├────────┬────────┐
     ▼        ▼        ▼
┌────────┐┌────────┐┌────────┐
│ API-1  ││ API-2  ││ API-3  │
└────────┘└────────┘└────────┘
```

### Vertical Scaling

- Increase container resources
- Optimize algorithms
- Add caching layers

### Database Strategy (future)

```
PostgreSQL (Primary)
├── User accounts
├── Saved analyses
└── Historical data

Redis (Cache)
├── Session data
├── Calculation cache
└── Rate limiting
```

## Monitoring & Observability

### Health Checks

- `/api/health` endpoint
- Container health checks
- Uptime monitoring

### Logging

```python
# Structured logging
logger.info("Analysis completed", extra={
    "file_type": file_type,
    "processing_time": elapsed,
    "ratios_calculated": len(ratios)
})
```

### Metrics (future)

- Request latency
- Error rates
- File processing time
- Memory usage

## Testing Strategy

### Frontend Tests

```
├── Unit Tests (Jest)
│   ├── Component rendering
│   ├── User interactions
│   └── Utility functions
├── Integration Tests
│   ├── API integration
│   └── Data flow
└── E2E Tests (Playwright)
    ├── Upload workflow
    └── Dashboard navigation
```

### Backend Tests

```
├── Unit Tests (pytest)
│   ├── Service logic
│   ├── Ratio calculations
│   └── Data processing
├── Integration Tests
│   ├── API endpoints
│   └── File processing
└── Load Tests (Locust)
    └── Performance benchmarks
```

## Future Enhancements

### Phase 1 (Q1 2024)
- User authentication
- Save/load analyses
- PDF report generation

### Phase 2 (Q2 2024)
- Multi-period analysis
- Custom benchmarks
- Industry templates

### Phase 3 (Q3 2024)
- Real-time collaboration
- API for integrations
- Mobile app

---

**Last Updated**: November 2024  
**Version**: 1.0.0
