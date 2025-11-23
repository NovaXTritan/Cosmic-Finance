# ⚡ Quick Start Guide - Cosmic Finance Analyzer

Get up and running in **5 minutes**!

## 🎯 Prerequisites

- Docker & Docker Compose installed
- Anthropic API key ([Get one here](https://console.anthropic.com/))

## 🚀 3-Step Setup

### Step 1: Clone & Configure

```bash
# Clone the repository
git clone https://github.com/yourusername/cosmic-finance-analyzer.git
cd cosmic-finance-analyzer

# Set up environment
echo "ANTHROPIC_API_KEY=your-api-key-here" > .env
```

### Step 2: Launch

```bash
# Start everything with Docker
docker-compose up --build
```

Wait 2-3 minutes for containers to build and start.

### Step 3: Access

Open your browser:
- **Application**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs

## 📤 Upload Your First File

1. Visit http://localhost:3000
2. Drag and drop a financial document (PDF, Excel, CSV)
3. Watch the cosmic magic happen! ✨
4. Explore metrics, charts, and AI insights

## 🎨 What You'll See

### Homepage
Beautiful cosmic-themed landing with drag-and-drop file upload

### Processing
Animated loading screen with real-time progress

### Dashboard
- **Overview Tab**: All financial ratios with color-coded status
- **Analytics Tab**: Interactive charts (bar, pie, radar)
- **Insights Tab**: AI-generated SWOT analysis
- **Recommendations Tab**: Strategic action items

## 🛠️ Supported File Types

| Type | Extensions | Processing |
|------|-----------|-----------|
| PDF | `.pdf` | Text extraction |
| Excel | `.xlsx`, `.xls` | Spreadsheet parsing |
| CSV | `.csv` | Data import |
| Images | `.png`, `.jpg`, `.jpeg` | OCR text recognition |

## 📊 Metrics Calculated

- **Liquidity**: Current Ratio, Quick Ratio, Cash Ratio
- **Leverage**: Debt-to-Equity, Debt-to-Assets
- **Profitability**: Gross/Operating/Net Margins, ROA, ROE
- **Activity**: Asset Turnover, Inventory Turnover, DSO

## 🎯 Example Files

Try with these sample scenarios:

### Scenario 1: Balance Sheet Analysis
Upload a balance sheet to get liquidity and leverage insights

### Scenario 2: Income Statement
Upload P&L to analyze profitability margins

### Scenario 3: Complete Financials
Upload comprehensive statements for full analysis

## 🔧 Troubleshooting

### Backend not starting?
```bash
# Check logs
docker-compose logs backend

# Common fix: Restart
docker-compose restart backend
```

### Frontend not loading?
```bash
# Check if port 3000 is available
lsof -i :3000

# Restart frontend
docker-compose restart frontend
```

### Upload fails?
```bash
# Verify API connection
curl http://localhost:8000/api/health

# Check upload directory
docker-compose exec backend ls -la /tmp/cosmic_uploads
```

## 🎓 Learning Path

1. **Start Simple**: Upload a basic CSV file
2. **Try PDF**: Use a scanned financial report
3. **Complex Analysis**: Upload full financial statements
4. **Export**: Download PDF/Excel reports
5. **Customize**: Modify the cosmic theme colors

## 🌟 Pro Tips

### Get Better Results
- Upload clear, structured documents
- Include multiple periods for trend analysis
- Use standard accounting formats

### Customize Your Experience
```bash
# Edit cosmic colors
nano frontend/tailwind.config.js

# Modify AI prompts
nano backend/analysis/ai_insights.py

# Restart to see changes
docker-compose restart
```

### Performance Optimization
```bash
# Increase memory for large files
# Edit docker-compose.yml
services:
  backend:
    mem_limit: 4g  # Increase from default
```

## 📱 Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- Explore API at http://localhost:8000/docs
- Customize the cosmic theme
- Add your own metrics calculations

## 🤝 Get Help

- **Documentation**: Check `/docs` folder
- **Issues**: GitHub Issues
- **Community**: Discussions tab

## 🎉 You're Ready!

Your Cosmic Finance Analyzer is running. Upload a file and explore the future of financial analysis!

---

**Made with 💜 by the Cosmic Finance team**

*Powered by AI • Built with Next.js & FastAPI • Deployed with Docker*
