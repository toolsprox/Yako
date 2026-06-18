'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import usePromotionTiming from '@/hooks/usePromotionTiming';

export default function SlideInToast({ promotion }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isTriggered = usePromotionTiming(promotion.content.timing);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem(`toast_dismissed_${promotion.id}`);
    if (dismissed) {
      setIsDismissed(true);
    }
  }, [promotion.id]);

  useEffect(() => {
    if (isTriggered && !isDismissed) {
      setIsVisible(true);
    }
  }, [isTriggered, isDismissed]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(`toast_dismissed_${promotion.id}`, 'true');
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 9999,
            background: 'rgba(20, 20, 20, 0.8)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '24px',
            width: '350px',
            maxWidth: 'calc(100vw - 40px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <button 
            onClick={handleClose}
            style={{
              position: 'absolute', top: '12px', right: '12px',
              background: 'none', border: 'none', color: '#A1A1AA',
              cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', paddingRight: '20px', fontFamily: 'var(--font-sans)' }}>
            {promotion.content.title}
          </h3>
          
          {promotion.content.subtitle && (
            <p style={{ margin: 0, color: '#A1A1AA', fontSize: '0.95rem', lineHeight: 1.5 }}>
              {promotion.content.subtitle}
            </p>
          )}

          {promotion.content.button_text && promotion.content.button_link && (
            <a 
              href={promotion.content.button_link}
              onClick={handleClose}
              style={{
                display: 'block',
                marginTop: '8px',
                background: 'var(--primary)',
                color: '#fff',
                textAlign: 'center',
                padding: '10px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'background 0.3s ease'
              }}
            >
              {promotion.content.button_text}
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
