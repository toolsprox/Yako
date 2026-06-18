'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import usePromotionTiming from '@/hooks/usePromotionTiming';

export default function GlassPopup({ promotion }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isTriggered = usePromotionTiming(promotion.content.timing);
  const { id, content } = promotion;

  useEffect(() => {
    // Only permanently dismiss if they took action, not if they just closed it
    const actionTaken = sessionStorage.getItem(`promo_action_${id}`);
    if (actionTaken) {
      setIsDismissed(true);
    }
  }, [id]);

  useEffect(() => {
    if (isTriggered && !isDismissed) {
      setIsVisible(true);
    }
  }, [isTriggered, isDismissed]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAction = () => {
    sessionStorage.setItem(`promo_action_${id}`, 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          style={{
            position: 'fixed',
            bottom: '40px',
            left: '40px',
            zIndex: 9999,
            background: 'rgba(20, 20, 20, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '30px',
            width: '400px',
            maxWidth: 'calc(100vw - 40px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <button 
            onClick={handleClose}
            style={{
              position: 'absolute', top: '15px', right: '15px',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: '#A1A1AA',
              cursor: 'pointer', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          {content.image_url && (
            <img src={content.image_url} alt="Promo" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }} />
          )}

          <h2 style={{ margin: '0 0 10px 0', color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--font-script)' }}>
            {content.title}
          </h2>
          
          <p style={{ margin: '0 0 20px 0', color: '#D1D5DB', fontSize: '0.95rem', lineHeight: 1.5 }}>
            {content.subtitle}
          </p>
          
          {content.button_text && content.button_link && (
            <a 
              href={content.button_link}
              onClick={handleAction}
              style={{
                display: 'block',
                background: 'var(--primary)',
                color: '#fff',
                textAlign: 'center',
                padding: '12px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'background 0.3s ease'
              }}
            >
              {content.button_text}
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
