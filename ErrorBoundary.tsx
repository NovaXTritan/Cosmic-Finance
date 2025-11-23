'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-cosmic-dark flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full"
          >
            {/* Error Card */}
            <div className="bg-cosmic-surface/50 backdrop-blur-xl rounded-3xl border border-cosmic-danger/30 p-8 shadow-2xl">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 5, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: 3,
                  }}
                  className="w-20 h-20 rounded-full bg-cosmic-danger/20 flex items-center justify-center"
                >
                  <AlertTriangle className="w-10 h-10 text-cosmic-danger" />
                </motion.div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-display font-bold text-white text-center mb-3">
                Oops! Something went wrong
              </h1>

              {/* Description */}
              <p className="text-gray-400 text-center mb-6">
                We encountered an unexpected error. Don't worry, your data is safe.
              </p>

              {/* Error Details (Development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-black/30 rounded-xl border border-cosmic-danger/20">
                  <p className="text-xs font-mono text-cosmic-danger mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                        Stack Trace
                      </summary>
                      <pre className="text-xs text-gray-500 mt-2 overflow-x-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={this.handleReset}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cosmic-primary to-cosmic-secondary text-white font-medium shadow-cosmic hover:shadow-cosmic-lg transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>

                <button
                  onClick={this.handleReload}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cosmic-surface/50 border border-cosmic-primary/30 text-white font-medium hover:border-cosmic-primary/50 transition-all"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </button>
              </div>

              {/* Support */}
              <p className="text-center text-xs text-gray-500 mt-6">
                If this problem persists, please{' '}
                <a href="mailto:support@example.com" className="text-cosmic-primary hover:text-cosmic-secondary transition-colors">
                  contact support
                </a>
              </p>
            </div>

            {/* Cosmic Background Effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cosmic-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cosmic-danger/5 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
