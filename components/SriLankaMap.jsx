'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import sriLankaMap from '@svg-maps/sri-lanka';

export default function SriLankaMap({ width = '300px', height = '400px' }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // The cultures that make up the Sri Lankan melting pot
  const cultures = [
    "Sinhalese", "Tamil", "Dutch", "Portuguese", 
    "Malay", "Moor", "Burgher", "South Indian",
    "Kaffir", "Veddah", "British", "Chetty"
  ];

  return (
    <div style={{ position: 'relative', width, height, margin: '0 auto' }}>
      <svg 
        viewBox={sriLankaMap.viewBox}
        style={{ width: '100%', height: '100%', filter: 'drop-shadow(0px 0px 10px rgba(230, 57, 0, 0.3))' }}
      >
        <defs>
          {/* Vibrant Fiery Gradient for the Strokes */}
          <linearGradient id="vibrantStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4500">
              <animate attributeName="stop-color" values="#ff4500;#ffd700;#ff4500" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#ffd700">
              <animate attributeName="stop-color" values="#ffd700;#ff8c00;#ffd700" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#dc143c">
              <animate attributeName="stop-color" values="#dc143c;#ff4500;#dc143c" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        {/* The Animated Map Path Strokes */}
        {sriLankaMap.locations.map((location, index) => (
          <motion.path
            key={location.id}
            d={location.path}
            fill="transparent"
            stroke="url(#vibrantStroke)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, strokeOpacity: 0 }}
            animate={{ pathLength: 1, strokeOpacity: 1 }}
            transition={{ 
              pathLength: { duration: 4, ease: "easeInOut", delay: index * 0.15 },
              strokeOpacity: { duration: 0.5, delay: index * 0.15 }
            }}
          />
        ))}
      </svg>
      
      {/* Vibrant Pulsing glow behind the map */}
      <motion.div 
        style={{
          position: 'absolute',
          inset: '-20px',
          background: 'radial-gradient(circle, rgba(230, 57, 0, 0.1) 0%, transparent 60%)',
          zIndex: -1,
          borderRadius: '50%'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 0.8, 0.4], scale: [0.8, 1.1, 1] }}
        transition={{ delay: 1, duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </div>
  );
}
