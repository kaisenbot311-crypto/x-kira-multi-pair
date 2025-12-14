'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function RealTimeStats() {
  const [totalSessions, setTotalSessions] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayCount = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      if (displayCount.current) {
        displayCount.current.textContent = `${latest}+`;
      }
    });
    return () => unsubscribe();
  }, [rounded]);

  const fetchStats = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      
      const response = await fetch('/api/sessions', {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        const newTotal = data.total || 0;
        setTotalSessions(newTotal);
        setHasData(true);
        animate(count, newTotal, { duration: 1.2, ease: 'easeOut' });
      }
    } catch (error) {
      if (!hasData) {
        console.error('Error fetching stats:', error);
      }
    } finally {
      setLoading(false);
    }
  }, [count, hasData]);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center py-8"
    >
      <motion.div 
        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-4"
        whileHover={{ scale: 1.02 }}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm text-muted-foreground">Live Stats</span>
      </motion.div>
      
      <div className="text-5xl md:text-6xl font-bold mb-3 text-gradient">
        {loading ? (
          <span className="animate-pulse">--</span>
        ) : (
          <span ref={displayCount}>{totalSessions}+</span>
        )}
      </div>
      <div className="text-lg text-muted-foreground">Active Bot Deployments</div>
    </motion.div>
  );
}