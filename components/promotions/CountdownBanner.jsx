'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CountdownBanner({ promotion }) {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!promotion.content.countdown_date) {
      setIsExpired(true);
      return;
    }

    const targetDate = new Date(promotion.content.countdown_date).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (isNaN(distance) || distance < 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [promotion.content.countdown_date]);

  if (!isVisible || isExpired) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          width: '100%',
          background: 'var(--primary)',
          color: '#fff',
          padding: '12px 20px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          position: 'relative',
          zIndex: 1000,
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: '1rem', letterSpacing: '0.5px' }}>
            {promotion.content.title}
          </span>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <TimeBox value={timeLeft.days} label="D" />
            <span style={{ fontWeight: 'bold' }}>:</span>
            <TimeBox value={timeLeft.hours} label="H" />
            <span style={{ fontWeight: 'bold' }}>:</span>
            <TimeBox value={timeLeft.minutes} label="M" />
            <span style={{ fontWeight: 'bold' }}>:</span>
            <TimeBox value={timeLeft.seconds} label="S" />
          </div>
        </div>

        {promotion.content.button_text && promotion.content.button_link && (
          <a 
            href={promotion.content.button_link}
            style={{
              background: '#fff',
              color: 'var(--primary)',
              padding: '6px 16px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
          >
            {promotion.content.button_text}
          </a>
        )}

        <button 
          onClick={() => setIsVisible(false)}
          style={{
            position: 'absolute', right: '15px',
            background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
            cursor: 'pointer', padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

function TimeBox({ value, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', background: 'rgba(0,0,0,0.2)', padding: '4px 8px', borderRadius: '6px' }}>
      <span style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: 'monospace' }}>
        {value.toString().padStart(2, '0')}
      </span>
      <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{label}</span>
    </div>
  );
}
