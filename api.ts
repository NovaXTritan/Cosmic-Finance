import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AnalysisResponse {
  analysis_id: string;
  status: string;
  timestamp: string;
  data?: any;
  insights?: any;
  error?: string;
}

export async function uploadFile(file: File): Promise<AnalysisResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export async function getAnalysis(analysisId: string): Promise<AnalysisResponse> {
  const response = await api.get(`/api/analysis/${analysisId}`);
  return response.data;
}

export async function downloadReport(analysisId: string, format: 'pdf' | 'excel'): Promise<void> {
  const response = await api.post(
    `/api/generate-report/${analysisId}`,
    null,
    {
      params: { format },
      responseType: 'blob',
    }
  );

  // Create download link
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `financial_analysis_${analysisId}.${format}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export async function healthCheck(): Promise<any> {
  const response = await api.get('/api/health');
  return response.data;
}
