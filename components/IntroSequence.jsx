'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

const greetings = [
  { text: 'ආයුබෝවන්', top: '20%', left: '20%', delay: '0.1s' }, 
  { text: 'வணக்கம்', top: '25%', left: '80%', delay: '0.3s' },  
  { text: 'नमस्ते', top: '45%', left: '15%', delay: '0.2s' }, 
  { text: 'સ્વાગત છે', top: '55%', left: '85%', delay: '0.4s' }, 
  { text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', top: '80%', left: '25%', delay: '0.1s' }, 
  { text: 'خوش آمدید', top: '75%', left: '75%', delay: '0.5s' }, 
  { text: 'Welcome', top: '50%', left: '50%', isEnglish: true, delay: '0.6s' }
];

export default function IntroSequence({ onComplete }) {
  useEffect(() => {
    // Fire onComplete just as the fade-out is finishing, so the homepage transitions in smoothly
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4000); 
    
    // Fallback to force removal from DOM
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 1 }}
      animate={{ scale: 1.4, opacity: 0 }}
      transition={{ 
        duration: 2.5, 
        delay: 2.5, // Wait for stroke animation to finish before scaling/fading
        ease: "easeInOut" 
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background)'
      }}
    >
      <style>
        {`
          .spilled-text {
            fill: transparent;
            stroke: var(--primary);
            stroke-width: 0.6px;
            stroke-dasharray: 600;
            stroke-dashoffset: 600;
            animation: draw-spilled 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            font-family: system-ui, -apple-system, sans-serif;
            font-weight: 300;
            white-space: nowrap;
          }
          
          @keyframes draw-spilled {
            0% { 
              stroke-dashoffset: 600; 
              fill: transparent; 
              stroke: rgba(255,100,0,0.8); 
            }
            70% { 
              stroke-dashoffset: 0; 
              fill: transparent; 
              stroke: var(--primary); 
            }
            100% { 
              stroke-dashoffset: 0; 
              fill: var(--primary); 
              stroke: transparent;
              text-shadow: 0px 0px 15px rgba(255, 100, 0, 0.6);
            }
          }
        `}
      </style>

      {/* Noise texture overlay for a premium cinematic feel */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E")' }}></div>

      {greetings.map((g, i) => (
        <svg 
          key={i} 
          style={{ 
            position: 'absolute', 
            top: g.top, 
            left: g.left, 
            transform: 'translate(-50%, -50%)',
            overflow: 'visible',
            width: '1px', 
            height: '1px'
          }}
        >
          <text 
            x="0" y="0" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className="spilled-text"
            style={{ 
              fontSize: g.isEnglish ? 'clamp(40px, 8vw, 80px)' : 'clamp(24px, 4vw, 40px)',
              fontFamily: g.isEnglish ? 'var(--font-script)' : 'inherit',
              letterSpacing: g.isEnglish ? '4px' : '2px',
              animationDelay: g.delay
            }}
          >
            {g.text}
          </text>
        </svg>
      ))}
    </motion.div>
  );
}
