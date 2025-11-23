'use client';

import { motion } from 'framer-motion';

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      {/* Animated Logo */}
      <div className="relative">
        <motion.div
          className="w-32 h-32 bg-cosmic-gradient rounded-3xl flex items-center justify-center shadow-cosmic-lg"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </motion.div>

        {/* Orbital Rings */}
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute inset-0 border-2 border-cosmic-500/30 rounded-full"
            style={{
              width: `${140 + index * 20}px`,
              height: `${140 + index * 20}px`,
              left: `${-10 - index * 10}px`,
              top: `${-10 - index * 10}px`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                duration: 3 + index,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        ))}

        {/* Pulsing Glow */}
        <motion.div
          className="absolute inset-0 bg-cosmic-500 rounded-full filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-4">
        <motion.h3
          className="text-2xl font-semibold bg-gradient-to-r from-cosmic-200 via-nebula-300 to-cosmic-400 bg-clip-text text-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Analyzing Your Financial Data
        </motion.h3>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 text-sm">
          {['Extracting', 'Calculating', 'Generating Insights'].map((step, index) => (
            <motion.div
              key={step}
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <motion.div
                className="w-2 h-2 bg-cosmic-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
              <span className="text-cosmic-200/70">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Loading Bar */}
      <div className="w-full max-w-md">
        <div className="h-2 bg-void-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cosmic-gradient"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-cosmic-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
