'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-200 via-nebula-300 to-cosmic-400 bg-clip-text text-transparent">
          Transform Your Financial Data
        </h2>
        <p className="text-xl text-cosmic-200/70 max-w-2xl mx-auto">
          Upload any business document and unlock powerful AI-driven insights with stunning visualizations
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div
          {...getRootProps()}
          className={`
            relative p-12 border-2 border-dashed rounded-3xl cursor-pointer
            transition-all duration-300 backdrop-blur-sm
            ${isDragActive 
              ? 'border-cosmic-400 bg-cosmic-500/20 shadow-cosmic-lg' 
              : 'border-cosmic-500/30 bg-void-800/40 hover:border-cosmic-400/50 hover:bg-cosmic-500/10'
            }
          `}
        >
          <input {...getInputProps()} />
          
          {/* Upload Icon */}
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              animate={isDragActive ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              className="relative"
            >
              <div className="w-24 h-24 bg-cosmic-gradient rounded-2xl flex items-center justify-center shadow-cosmic">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              {isDragActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-cosmic-500 rounded-2xl opacity-20 blur-xl"
                />
              )}
            </motion.div>

            <div className="text-center space-y-3">
              <h3 className="text-2xl font-semibold text-cosmic-100">
                {isDragActive ? 'Drop your file here' : 'Drop your financial document'}
              </h3>
              <p className="text-cosmic-200/60 text-lg">
                or click to browse
              </p>
            </div>

            {/* Supported Formats */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {['PDF', 'Excel', 'CSV', 'Images'].map((format) => (
                <motion.span
                  key={format}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-cosmic-500/10 border border-cosmic-500/30 rounded-lg text-sm text-cosmic-200 backdrop-blur-sm"
                >
                  {format}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-nebula-500 rounded-full filter blur-2xl opacity-20 animate-pulse-slow" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-cosmic-500 rounded-full filter blur-2xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              ),
              title: 'Instant Analysis',
              description: 'AI-powered extraction and calculation in seconds'
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              ),
              title: 'Comprehensive Metrics',
              description: 'All major financial ratios and KPIs calculated'
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              ),
              title: 'Expert Insights',
              description: 'AI-generated recommendations and benchmarking'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-6 bg-void-800/40 backdrop-blur-sm border border-cosmic-500/20 rounded-2xl hover:border-cosmic-500/40 transition-all"
            >
              <div className="w-12 h-12 bg-cosmic-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cosmic-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-cosmic-100 mb-2">{feature.title}</h4>
              <p className="text-cosmic-200/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
