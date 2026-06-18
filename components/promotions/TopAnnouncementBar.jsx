'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopAnnouncementBar({ promotion }) {
  const [isVisible, setIsVisible] = useState(false);
  const { id, content } = promotion;

  useEffect(() => {
    // Check if dismissed for the session
    const dismissed = sessionStorage.getItem(`dismissed_bar_${id}`);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, [id]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(`dismissed_bar_${id}`, 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9998,
            background: 'var(--primary)', color: '#fff', padding: '10px 40px',
            textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {content.title && <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{content.title}</span>}
            {content.subtitle && <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>{content.subtitle}</span>}
            
            {content.button_text && content.button_link && (
              <a 
                href={content.button_link}
                style={{
                  background: '#fff', color: 'var(--primary)', padding: '4px 12px',
                  borderRadius: '20px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600
                }}
              >
                {content.button_text}
              </a>
            )}
          </div>

          <button 
            onClick={handleClose}
            style={{
              position: 'absolute', right: '15px', background: 'transparent', border: 'none',
              color: '#fff', fontSize: '1.2rem', cursor: 'pointer', opacity: 0.8
            }}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
