from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from app.services.file_processor import FileProcessor
from app.services.financial_analyzer import FinancialAnalyzer
from app.services.ai_insights import AIInsightGenerator
from app.models.schemas import AnalysisResponse, FileUploadResponse
import tempfile
import os
from typing import List

app = FastAPI(
    title="Cosmic Financials API",
    description="AI-powered financial analysis platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

file_processor = FileProcessor()
financial_analyzer = FinancialAnalyzer()
ai_insights = AIInsightGenerator()

@app.get("/")
async def root():
    return {"message": "Cosmic Financials API", "status": "operational"}

@app.post("/api/upload", response_model=FileUploadResponse)
async def upload_file(file: UploadFile = File(...)):
    """Upload and process financial document"""
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_path = temp_file.name
        
        file_type = file_processor.detect_file_type(file.filename)
        extracted_data = file_processor.process_file(temp_path, file_type)
        
        os.unlink(temp_path)
        
        return FileUploadResponse(
            success=True,
            filename=file.filename,
            file_type=file_type,
            data_preview=extracted_data.get("preview", {}),
            message="File processed successfully"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File processing error: {str(e)}")

@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze_financials(file: UploadFile = File(...)):
    """Complete financial analysis pipeline"""
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_path = temp_file.name
        
        file_type = file_processor.detect_file_type(file.filename)
        extracted_data = file_processor.process_file(temp_path, file_type)
        
        ratios = financial_analyzer.calculate_all_ratios(extracted_data)
        trends = financial_analyzer.detect_trends(extracted_data)
        anomalies = financial_analyzer.find_anomalies(extracted_data)
        insights = ai_insights.generate_insights(extracted_data, ratios, trends)
        
        os.unlink(temp_path)
        
        return AnalysisResponse(
            success=True,
            financial_data=extracted_data,
            ratios=ratios,
            trends=trends,
            anomalies=anomalies,
            ai_insights=insights,
            visualizations=financial_analyzer.generate_chart_data(extracted_data, ratios)
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis error: {str(e)}")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "cosmic-financials"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
