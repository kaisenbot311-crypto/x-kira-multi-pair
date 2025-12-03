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
          className={`fixed inset-0 flex flex-col items-center justify-center overflow-hidden ${
            isFirstVisit ? 'z-[100]' : 'z-[200]'
          }`}
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #0f172a 25%, #1e1b4b 50%, #0f172a 75%, #0a0a0a 100%)',
          }}
        >
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 40%), radial-gradient(ellipse at 20% 60%, rgba(14, 165, 233, 0.15) 0%, transparent 40%)',
            }}
          />

          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-[120px]"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            }}
          />

          <motion.div
            animate={{
              opacity: [0.15, 0.25, 0.15],
              scale: [1.1, 0.9, 1.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            }}
          />

          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

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
                className="absolute inset-0 blur-2xl opacity-60"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)',
                  transform: 'scale(1.5)',
                }}
              />
              <motion.img
                src="https://i.giphy.com/Hx48Na3LBp1Dy.webp"
                alt="Loading"
                className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 rounded-2xl"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))',
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
              className="mt-10 flex flex-col items-center"
            >
              <motion.h1
                className="text-3xl md:text-4xl font-bold tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
                }}
              >
                X-KIRA
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-2 text-sm text-blue-200/60 tracking-widest uppercase"
              >
                Loading
              </motion.p>

              <motion.div 
                className="mt-6 flex gap-2"
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
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                    style={{
                      boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)',
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background: 'linear-gradient(to top, rgba(59, 130, 246, 0.2) 0%, transparent 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
