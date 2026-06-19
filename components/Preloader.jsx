'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  'ආයුබෝවන්',     // Sinhalese
  'வணக்கம்',      // Tamil
  'नमस्ते',         // Hindi
  'સ્વાગત છે',      // Gujarati
  'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',   // Punjabi
  'خوش آمدید',     // Urdu
  'Welcome'       // English
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Check if the preloader has already been shown in this session
    const hasSeenPreloader = sessionStorage.getItem('yako_has_seen_preloader');
    
    if (hasSeenPreloader) {
      setShowPreloader(false);
      return;
    }

    // Interval to cycle through the greetings
    // 300ms per language gives a fast, premium, cinematic feel
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex === greetings.length - 1) {
          clearInterval(interval);
          // Once the last greeting (Welcome) is shown, wait a moment, then fade out the whole overlay
          setTimeout(() => {
            setShowPreloader(false);
            sessionStorage.setItem('yako_has_seen_preloader', 'true');
          }, 800);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  if (!showPreloader) return null;

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'var(--background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Subtle noise overlay for premium feel */}
          <div style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E")' }}></div>

          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              style={{
                fontFamily: index === greetings.length - 1 ? 'var(--font-script)' : 'sans-serif',
                fontSize: index === greetings.length - 1 ? 'clamp(3rem, 6vw, 5rem)' : 'clamp(2rem, 5vw, 4rem)',
                color: 'var(--primary)',
                textAlign: 'center',
                margin: 0,
                letterSpacing: index === greetings.length - 1 ? '2px' : 'normal',
              }}
            >
              {greetings[index]}
            </motion.h2>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
