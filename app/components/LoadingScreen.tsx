'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    setIsFirstVisit(!hasVisited);

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasVisited', 'true');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-black ${
            isFirstVisit ? 'z-[100]' : 'z-[200]'
          }`}
        >
          <motion.div
            initial={{ y: 200, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.2
            }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div 
                className="absolute inset-0 blur-3xl opacity-40"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
                  transform: 'scale(1.8)',
                }}
              />
              <motion.img
                src="https://i.giphy.com/Hx48Na3LBp1Dy.webp"
                alt="Loading"
                className="w-72 h-72 md:w-96 md:h-96 object-contain relative z-10 rounded-2xl"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.4))',
                }}
                initial={{ rotate: -5 }}
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 flex flex-col items-center"
            >
              <motion.h1
                className="text-3xl md:text-5xl font-bold tracking-wide text-center"
              >
                <span 
                  style={{
                    background: 'linear-gradient(90deg, #ffffff 0%, #60a5fa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  x-kira
                </span>
                <span className="text-white mx-2">Bot</span>
                <motion.span 
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Loading
                </motion.span>
              </motion.h1>

              <motion.div 
                className="mt-8 flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {[0, 0.2, 0.4].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut"
                    }}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #3b82f6 100%)',
                      boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)',
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
