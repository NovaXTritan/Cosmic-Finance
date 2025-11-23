# 🌌 Cosmic Financials

> **AI-Powered Financial Intelligence Platform** - Transform any financial document into actionable insights with world-class visualizations and expert-level analysis.

![Cosmic Financials](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![React](https://img.shields.io/badge/React-18.2+-blue)

## ✨ Features

### 🚀 **Smart Document Processing**
- **Multi-Format Support**: PDF, Excel (xls/xlsx), CSV, and scanned images (OCR)
- **Intelligent Extraction**: AI-powered data extraction from unstructured documents
- **Automatic Classification**: Identifies balance sheets, income statements, and cash flow automatically

### 🧮 **Comprehensive Financial Analysis**
- **50+ Financial Ratios**: Complete coverage across all categories
  - Liquidity Ratios (Current, Quick, Cash, Working Capital)
  - Leverage Ratios (Debt-to-Equity, Interest Coverage, DSCR)
  - Profitability Ratios (ROE, ROA, Margins, EBITDA)
  - Efficiency Ratios (Asset Turnover, Cash Conversion Cycle)
- **DuPont Analysis**: ROE decomposition into component drivers
- **Trend Detection**: Identify revenue, profit, and cash flow patterns
- **Anomaly Detection**: Automatic flagging of metrics outside healthy ranges

### 🎨 **Cosmic-Themed Visualizations**
- **Interactive Dashboards**: Responsive, single-page application
- **Advanced Charts**: Radar, Waterfall, Gauge, Bar, and more
- **Real-Time Filtering**: Dynamic data exploration
- **Export Capabilities**: Download analysis as JSON

### 🤖 **AI-Powered Insights**
- **Expert Commentary**: Human-readable explanations for every metric
- **Strategic Recommendations**: Actionable advice with ROI projections
- **Risk Assessment**: Multi-dimensional scoring across credit, liquidity, and operational risk
- **Industry Benchmarking**: Compare against standards and best practices

## 🏗️ Architecture

### **Tech Stack**

#### Backend (Python/FastAPI)
```
├── FastAPI           # High-performance async framework
├── Pandas            # Data manipulation and analysis
├── PyPDF2            # PDF text extraction
├── pytesseract       # OCR for scanned documents
├── openpyxl          # Excel file processing
└── Pydantic          # Data validation and serialization
```

#### Frontend (React/Next.js)
```
├── Next.js 14        # React framework with SSR
├── TypeScript        # Type-safe development
├── Tailwind CSS      # Utility-first styling
├── Framer Motion     # Smooth animations
├── Plotly.js         # Interactive charts
├── Chart.js          # Additional visualizations
└── React Dropzone    # Drag-and-drop file upload
```

### **System Architecture**

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Next.js        │
│  Frontend       │◄──── Cosmic UI/UX
│  (Port 3000)    │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│  FastAPI        │
│  Backend        │◄──── Business Logic
│  (Port 8000)    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  Processing Pipeline        │
├─────────────────────────────┤
│ 1. File Upload & Validation │
│ 2. Data Extraction          │
│ 3. Financial Analysis       │
│ 4. Ratio Calculation        │
│ 5. AI Insight Generation    │
│ 6. Visualization Prep       │
└─────────────────────────────┘
```

## 🚀 Quick Start

### **Prerequisites**
- Docker & Docker Compose (recommended)
- OR Python 3.11+ and Node.js 18+

### **Option 1: Docker (Recommended)**

```bash
# Clone the repository
git clone https://github.com/yourusername/cosmic-financials.git
cd cosmic-financials

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### **Option 2: Manual Setup**

#### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install system dependencies (OCR)
# Ubuntu/Debian:
sudo apt-get install tesseract-ocr

# macOS:
brew install tesseract

# Start the backend server
python main.py
# Server runs on http://localhost:8000
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Application runs on http://localhost:3000
```

## 📖 Usage Guide

### **1. Upload Financial Document**
- Drag and drop or click to browse
- Supported formats: PDF, Excel, CSV, Images (PNG/JPG)
- Real-time upload progress tracking

### **2. Automatic Analysis**
The system automatically:
- Extracts all financial data
- Calculates 50+ financial ratios
- Generates AI-powered insights
- Creates interactive visualizations

### **3. Explore Dashboard**

#### **Overview Tab**
- Overall financial health score
- Key metrics at a glance
- Trend analysis summary

#### **Financial Ratios Tab**
- Detailed ratio breakdown by category
- Benchmarks and healthy ranges
- Interactive tooltips with explanations
- DuPont ROE analysis

#### **AI Insights Tab**
- Priority-ranked recommendations
- Anomaly detection and alerts
- Strategic action items with ROI
- Risk assessment

#### **Visualizations Tab**
- Interactive Plotly charts
- Radar charts for multi-dimensional analysis
- Gauge charts for risk metrics
- Waterfall charts for decomposition
- Bar charts for comparisons

### **4. Export Results**
- Download complete analysis as JSON
- Share dashboard link
- Generate PDF reports (coming soon)

## 🎨 UI/UX Design Philosophy

### **Cosmic Theme**
Inspired by Perplexity and modern SaaS platforms, featuring:

- **Dark Void Background**: `#0a0a0f` base with celestial gradients
- **Vibrant Accents**: Indigo, purple, and pink gradients
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Framer Motion for fluid transitions
- **Responsive Design**: Mobile-first approach

### **Color Palette**
```css
--cosmic-void:      #0a0a0f  /* Deep space background */
--cosmic-surface:   #1a1a2e  /* Card surfaces */
--cosmic-primary:   #6366f1  /* Primary actions */
--cosmic-secondary: #8b5cf6  /* Secondary accents */
--cosmic-accent:    #ec4899  /* Highlights */
--cosmic-success:   #10b981  /* Positive metrics */
--cosmic-warning:   #f59e0b  /* Caution */
--cosmic-danger:    #ef4444  /* Critical issues */
```

## 🔧 Configuration

### **Environment Variables**

Create `.env` files in backend and frontend directories:

#### Backend `.env`
```env
PYTHONUNBUFFERED=1
LOG_LEVEL=INFO
MAX_UPLOAD_SIZE=10485760  # 10MB
```

#### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📊 API Documentation

### **Endpoints**

#### `POST /api/upload`
Upload and preview file data
```bash
curl -X POST http://localhost:8000/api/upload \
  -F "file=@financial-statement.pdf"
```

#### `POST /api/analyze`
Complete financial analysis
```bash
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@financial-statement.xlsx"
```

#### `GET /api/health`
Health check endpoint
```bash
curl http://localhost:8000/api/health
```

### **Interactive API Docs**
Visit `http://localhost:8000/docs` for Swagger UI

## 🧪 Testing

### **Backend Tests**
```bash
cd backend
pytest tests/ -v
```

### **Frontend Tests**
```bash
cd frontend
npm test
```

## 📦 Deployment

### **Production Deployment**

#### **Docker**
```bash
# Build for production
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose scale backend=3
```

#### **Cloud Platforms**

**Vercel (Frontend)**
```bash
cd frontend
vercel --prod
```

**Railway/Render (Backend)**
```bash
# Push to Git
git push origin main

# Auto-deploy on Railway/Render
```

**AWS ECS/Fargate**
```bash
# Build and push images
docker build -t cosmic-backend:latest ./backend
docker build -t cosmic-frontend:latest ./frontend

# Deploy to ECR and ECS
```

## 🛠️ Development

### **Project Structure**
```
cosmic-financials/
├── backend/
│   ├── app/
│   │   ├── services/
│   │   │   ├── file_processor.py      # File parsing
│   │   │   ├── financial_analyzer.py  # Ratio calculations
│   │   │   └── ai_insights.py         # AI insights
│   │   ├── models/
│   │   │   └── schemas.py             # Pydantic models
│   │   └── utils/
│   ├── main.py                         # FastAPI app
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx               # Main page
│   │   │   ├── layout.tsx             # Root layout
│   │   │   └── globals.css            # Global styles
│   │   ├── components/
│   │   │   ├── FileUpload.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── dashboard/
│   │   │       ├── Overview.tsx
│   │   │       ├── RatiosView.tsx
│   │   │       ├── InsightsView.tsx
│   │   │       └── ChartsView.tsx
│   │   └── types/
│   │       └── index.ts               # TypeScript types
│   ├── package.json
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

### **Adding New Features**

#### **New Financial Ratio**
1. Add calculation to `financial_analyzer.py`
2. Update Pydantic schema in `schemas.py`
3. Add to appropriate ratio category in frontend

#### **New Chart Type**
1. Create data structure in backend
2. Add chart component in `ChartsView.tsx`
3. Configure Plotly/Chart.js options

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Perplexity, Stripe, Notion
- **Chart Libraries**: Plotly.js, Chart.js
- **UI Framework**: Tailwind CSS
- **Animation**: Framer Motion

## 📧 Contact

- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Email**: your.email@example.com
- **Website**: https://cosmic-financials.com

## 🎯 Roadmap

- [ ] Multi-period trend analysis
- [ ] PDF report generation
- [ ] Custom benchmark creation
- [ ] Industry-specific templates
- [ ] API authentication
- [ ] Multi-user support
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)

---

**Built with ❤️ and ☄️ cosmic energy**

*"Turning financial chaos into cosmic clarity"*
