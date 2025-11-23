"""
Report Generator - PDF and Excel report creation
Generates branded, professional financial analysis reports
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import pandas as pd
from datetime import datetime
from typing import Dict, Any
import os


class ReportGenerator:
    """
    Generate professional PDF and Excel reports
    Cosmic-themed branding with comprehensive analysis
    """
    
    def __init__(self):
        self.output_dir = "/tmp/cosmic_reports"
        os.makedirs(self.output_dir, exist_ok=True)
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
    
    def _setup_custom_styles(self):
        """Setup custom paragraph styles for cosmic theme"""
        
        # Title style
        self.styles.add(ParagraphStyle(
            name='CosmicTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#8B5CF6'),
            spaceAfter=30,
            alignment=TA_CENTER
        ))
        
        # Section header style
        self.styles.add(ParagraphStyle(
            name='CosmicSection',
            parent=self.styles['Heading2'],
            fontSize=16,
            textColor=colors.HexColor('#6366F1'),
            spaceBefore=20,
            spaceAfter=12
        ))
    
    def generate_report(
        self,
        analysis_id: str,
        data: Dict[str, Any],
        insights: Dict[str, Any],
        format: str = "pdf"
    ) -> str:
        """Generate report in specified format"""
        
        if format == "pdf":
            return self._generate_pdf(analysis_id, data, insights)
        elif format == "excel":
            return self._generate_excel(analysis_id, data, insights)
        else:
            raise ValueError(f"Unsupported format: {format}")
    
    def _generate_pdf(
        self,
        analysis_id: str,
        data: Dict[str, Any],
        insights: Dict[str, Any]
    ) -> str:
        """Generate PDF report"""
        
        filename = f"financial_analysis_{analysis_id}.pdf"
        filepath = os.path.join(self.output_dir, filename)
        
        doc = SimpleDocTemplate(filepath, pagesize=letter)
        story = []
        
        # Title
        title = Paragraph(
            "Cosmic Finance Analyzer",
            self.styles['CosmicTitle']
        )
        story.append(title)
        story.append(Spacer(1, 0.2 * inch))
        
        # Subtitle
        subtitle = Paragraph(
            f"Financial Analysis Report - {datetime.now().strftime('%B %d, %Y')}",
            self.styles['Normal']
        )
        story.append(subtitle)
        story.append(Spacer(1, 0.5 * inch))
        
        # Executive Summary
        story.append(Paragraph("Executive Summary", self.styles['CosmicSection']))
        summary_text = insights.get('executive_summary', 'Analysis complete.')
        story.append(Paragraph(summary_text, self.styles['Normal']))
        story.append(Spacer(1, 0.3 * inch))
        
        # Key Metrics Table
        story.append(Paragraph("Key Financial Metrics", self.styles['CosmicSection']))
        metrics_data = self._prepare_metrics_table(data['metrics'])
        if metrics_data:
            table = Table(metrics_data)
            table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#8B5CF6')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 12),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                ('GRID', (0, 0), (-1, -1), 1, colors.grey)
            ]))
            story.append(table)
        story.append(Spacer(1, 0.3 * inch))
        
        # Strengths
        story.append(Paragraph("Key Strengths", self.styles['CosmicSection']))
        for strength in insights.get('strengths', []):
            story.append(Paragraph(f"• {strength}", self.styles['Normal']))
        story.append(Spacer(1, 0.2 * inch))
        
        # Weaknesses
        story.append(Paragraph("Areas for Improvement", self.styles['CosmicSection']))
        for weakness in insights.get('weaknesses', []):
            story.append(Paragraph(f"• {weakness}", self.styles['Normal']))
        story.append(Spacer(1, 0.2 * inch))
        
        # Recommendations
        story.append(PageBreak())
        story.append(Paragraph("Strategic Recommendations", self.styles['CosmicSection']))
        for rec in insights.get('recommendations', []):
            story.append(Paragraph(
                f"<b>{rec['priority']} Priority - {rec['category']}</b>",
                self.styles['Normal']
            ))
            story.append(Paragraph(rec['recommendation'], self.styles['Normal']))
            story.append(Paragraph(
                f"<i>Expected Impact: {rec['expected_impact']}</i>",
                self.styles['Normal']
            ))
            story.append(Spacer(1, 0.15 * inch))
        
        # Build PDF
        doc.build(story)
        return filepath
    
    def _generate_excel(
        self,
        analysis_id: str,
        data: Dict[str, Any],
        insights: Dict[str, Any]
    ) -> str:
        """Generate Excel report"""
        
        filename = f"financial_analysis_{analysis_id}.xlsx"
        filepath = os.path.join(self.output_dir, filename)
        
        with pd.ExcelWriter(filepath, engine='openpyxl') as writer:
            # Summary sheet
            summary_data = {
                'Metric': [],
                'Value': [],
                'Benchmark': [],
                'Interpretation': []
            }
            
            metrics = data.get('metrics', {})
            for category, category_metrics in metrics.items():
                if isinstance(category_metrics, dict):
                    for metric_name, metric_data in category_metrics.items():
                        if isinstance(metric_data, dict) and 'value' in metric_data:
                            summary_data['Metric'].append(f"{category} - {metric_name}")
                            summary_data['Value'].append(metric_data.get('value'))
                            summary_data['Benchmark'].append(metric_data.get('benchmark'))
                            summary_data['Interpretation'].append(metric_data.get('interpretation'))
            
            df_summary = pd.DataFrame(summary_data)
            df_summary.to_excel(writer, sheet_name='Summary', index=False)
            
            # Insights sheet
            insights_data = {
                'Category': [],
                'Insight': []
            }
            
            for strength in insights.get('strengths', []):
                insights_data['Category'].append('Strength')
                insights_data['Insight'].append(strength)
            
            for weakness in insights.get('weaknesses', []):
                insights_data['Category'].append('Weakness')
                insights_data['Insight'].append(weakness)
            
            df_insights = pd.DataFrame(insights_data)
            df_insights.to_excel(writer, sheet_name='Insights', index=False)
            
            # Recommendations sheet
            rec_data = {
                'Priority': [],
                'Category': [],
                'Recommendation': [],
                'Expected Impact': []
            }
            
            for rec in insights.get('recommendations', []):
                rec_data['Priority'].append(rec['priority'])
                rec_data['Category'].append(rec['category'])
                rec_data['Recommendation'].append(rec['recommendation'])
                rec_data['Expected Impact'].append(rec['expected_impact'])
            
            df_recommendations = pd.DataFrame(rec_data)
            df_recommendations.to_excel(writer, sheet_name='Recommendations', index=False)
        
        return filepath
    
    def _prepare_metrics_table(self, metrics: Dict[str, Any]) -> list:
        """Prepare metrics data for table"""
        
        table_data = [['Category', 'Metric', 'Value', 'Benchmark', 'Status']]
        
        for category, category_metrics in metrics.items():
            if isinstance(category_metrics, dict):
                for metric_name, metric_data in category_metrics.items():
                    if isinstance(metric_data, dict) and 'value' in metric_data:
                        value = metric_data.get('value')
                        benchmark = metric_data.get('benchmark')
                        
                        # Format value
                        if value is not None:
                            if isinstance(value, float):
                                value_str = f"{value:.2f}"
                            else:
                                value_str = str(value)
                        else:
                            value_str = "N/A"
                        
                        # Format benchmark
                        benchmark_str = f"{benchmark:.2f}" if benchmark else "N/A"
                        
                        # Status
                        interpretation = metric_data.get('interpretation', '')
                        if 'Excellent' in interpretation or 'Good' in interpretation:
                            status = "✓"
                        elif 'Fair' in interpretation:
                            status = "~"
                        else:
                            status = "⚠"
                        
                        table_data.append([
                            category.replace('_', ' ').title(),
                            metric_name.replace('_', ' ').title(),
                            value_str,
                            benchmark_str,
                            status
                        ])
        
        return table_data if len(table_data) > 1 else None
