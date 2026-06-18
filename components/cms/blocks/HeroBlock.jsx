'use client';

import { motion } from 'framer-motion';

export default function HeroBlock({ data }) {
  const { title, subtitle, image_url } = data;

  return (
    <div style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
      {image_url && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url("${image_url}")`,
          backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0
        }} />
      )}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1 }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 2, padding: '0 20px', maxWidth: '800px' }}
      >
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '1.2rem', color: '#e4e4e7', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
