'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  message?: string;
  progress?: number;
}

export default function LoadingSpinner({ message = 'Processing...', progress }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-20">
      {/* Cosmic Orbit Animation */}
      <div className="relative w-32 h-32 mb-8">
        {/* Center Core */}
        <motion.div
          className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-gradient-to-br from-cosmic-primary to-cosmic-secondary"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Orbiting Particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.3,
            }}
          >
            <div
              className="absolute w-3 h-3 rounded-full bg-cosmic-accent shadow-cosmic"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translateY(-${40 + i * 8}px)`,
              }}
            />
          </motion.div>
        ))}

        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cosmic-primary/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Message */}
      <motion.p
        className="text-lg font-medium text-white mb-2"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {message}
      </motion.p>

      {/* Progress Bar (if provided) */}
      {progress !== undefined && (
        <div className="w-64 mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-cosmic-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cosmic-primary to-cosmic-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Pulsing Dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-cosmic-primary"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
