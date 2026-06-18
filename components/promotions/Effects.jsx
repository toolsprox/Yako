'use client';

import { motion } from 'framer-motion';

export default function Effects({ type }) {
  if (type === 'effect_confetti') {
    // Lightweight pseudo-confetti using Framer Motion
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: -50, 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              rotate: 0 
            }}
            animate={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000) + (Math.random() * 200 - 100),
              rotate: 360 * (Math.random() * 5 + 1)
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              ease: "linear",
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              position: 'absolute',
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              background: colors[Math.floor(Math.random() * colors.length)],
              borderRadius: Math.random() > 0.5 ? '50%' : '0%'
            }}
          />
        ))}
      </div>
    );
  }

  if (type === 'effect_snow') {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
        {[...Array(70)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: -50, 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
            }}
            animate={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000) + (Math.random() * 100 - 50)
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              ease: "linear",
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              position: 'absolute',
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
