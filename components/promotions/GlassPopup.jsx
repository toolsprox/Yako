'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlassPopup({ promotion }) {
  const [isVisible, setIsVisible] = useState(false);
  const { id, content } = promotion;

  useEffect(() => {
    // Check if the user already dismissed this specific popup
    const dismissed = sessionStorage.getItem(`dismissed_promo_${id}`);
    if (!dismissed) {
      // Small delay before showing the popup
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [id]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(`dismissed_promo_${id}`, 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
            zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
          }}
          onClick={handleClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              background: 'rgba(20, 20, 20, 0.8)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px', overflow: 'hidden', maxWidth: '450px', width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={handleClose}
              style={{
                position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.1)',
                border: 'none', color: '#fff', width: '30px', height: '30px', borderRadius: '50%',
                cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10
              }}
            >
              ×
            </button>
            
            {content.image_url && (
              <div style={{ width: '100%', height: '200px', backgroundImage: `url("${content.image_url}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            )}
            
            <div style={{ padding: '30px', textAlign: 'center' }}>
              {content.title && <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#fff' }}>{content.title}</h2>}
              {content.subtitle && <p style={{ color: '#A1A1AA', marginBottom: '25px', lineHeight: 1.6 }}>{content.subtitle}</p>}
              
              {content.button_text && content.button_link && (
                <a 
                  href={content.button_link}
                  style={{
                    display: 'inline-block', background: 'var(--primary)', color: '#fff',
                    padding: '12px 30px', borderRadius: '30px', textDecoration: 'none',
                    fontWeight: 600, transition: 'all 0.2s', letterSpacing: '1px'
                  }}
                >
                  {content.button_text}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
