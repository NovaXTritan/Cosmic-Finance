'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { AnalysisData } from '@/types';

interface FileUploadProps {
  onAnalysisComplete: (data: AnalysisData) => void;
  onLoadingChange: (loading: boolean) => void;
}

export default function FileUpload({ onAnalysisComplete, onLoadingChange }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setFileName(file.name);
    setUploading(true);
    setStatus('uploading');
    setProgress(0);
    setError('');
    onLoadingChange(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await axios.post<AnalysisData>(
        `${apiUrl}/api/analyze`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      clearInterval(progressInterval);
      setProgress(100);
      setStatus('success');
      
      setTimeout(() => {
        onAnalysisComplete(response.data);
        setUploading(false);
      }, 500);

    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.detail || 'Failed to analyze file. Please try again.');
      setUploading(false);
      onLoadingChange(false);
    }
  }, [onAnalysisComplete, onLoadingChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    disabled: uploading
  });

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        {...getRootProps()}
        className={`
          relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300
          ${isDragActive 
            ? 'border-cosmic-primary bg-cosmic-primary/10' 
            : status === 'error'
            ? 'border-cosmic-danger bg-cosmic-danger/5'
            : 'border-cosmic-primary/30 bg-cosmic-surface/30'
          }
          ${!uploading && 'hover:border-cosmic-primary hover:bg-cosmic-surface/50 cursor-pointer'}
          backdrop-blur-xl
        `}
      >
        <input {...getInputProps()} />
        
        <div className="px-8 py-16">
          {status === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cosmic-primary to-cosmic-secondary flex items-center justify-center shadow-cosmic">
                  <Upload className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              
              <h3 className="text-2xl font-display font-semibold text-white mb-3">
                {isDragActive ? 'Drop your file here' : 'Upload Financial Document'}
              </h3>
              <p className="text-gray-400 mb-6">
                Drag and drop or click to browse
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {['PDF', 'Excel', 'CSV', 'Images'].map((format) => (
                  <span
                    key={format}
                    className="px-3 py-1 rounded-full bg-cosmic-primary/20 text-cosmic-aurora-purple text-sm font-medium"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {(status === 'uploading' || status === 'processing') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <File className="w-8 h-8 text-cosmic-primary" />
                <span className="text-lg text-white font-medium">{fileName}</span>
              </div>
              
              <div className="relative w-full h-2 bg-cosmic-surface rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-cosmic-primary to-cosmic-secondary"
                />
              </div>
              
              <div className="flex items-center justify-center gap-2 text-cosmic-aurora-purple">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">
                  {status === 'uploading' ? 'Uploading...' : 'Processing...'}
                </span>
              </div>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-cosmic-success/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-cosmic-success" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Analysis Complete!</h3>
              <p className="text-gray-400">Loading your cosmic dashboard...</p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-cosmic-danger/20 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-cosmic-danger" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload Failed</h3>
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={() => setStatus('idle')}
                className="cosmic-button"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
