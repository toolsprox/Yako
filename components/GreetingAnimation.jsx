'use client';

import { motion } from 'framer-motion';

export default function GreetingAnimation() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto 1.5rem auto'
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 800 160" style={{ maxWidth: '800px', overflow: 'visible' }}>
        <style>
          {`
            .stroke-text {
              fill: transparent;
              stroke: var(--primary);
              stroke-width: 0.6px;
              stroke-dasharray: 800;
              stroke-dashoffset: 800;
              animation: draw-text 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              font-family: system-ui, -apple-system, sans-serif;
              font-weight: 300;
              letter-spacing: 2px;
            }
            .stroke-text.english {
              font-family: var(--font-script);
              letter-spacing: 4px;
              font-size: 32px;
            }
            
            .line-1 { font-size: 26px; animation-delay: 0.1s; }
            .line-2 { font-size: 22px; animation-delay: 0.5s; }
            .line-3 { font-size: 26px; animation-delay: 0.9s; }
            
            @keyframes draw-text {
              0% { 
                stroke-dashoffset: 800; 
                fill: transparent; 
                stroke: var(--primary); 
              }
              50% { 
                stroke-dashoffset: 0; 
                fill: transparent; 
                stroke: var(--primary); 
              }
              80% {
                stroke-dashoffset: 0; 
                fill: var(--primary); 
                stroke: var(--primary);
                opacity: 1;
              }
              100% { 
                stroke-dashoffset: 0; 
                fill: var(--primary); 
                stroke: transparent;
                opacity: 0.8;
                text-shadow: 0px 0px 15px rgba(255, 100, 0, 0.4);
              }
            }

            /* Responsive adjustments */
            @media (max-width: 600px) {
              .line-1 { font-size: 22px; }
              .line-2 { font-size: 18px; }
              .line-3 { font-size: 22px; }
              .stroke-text.english { font-size: 28px; }
            }
          `}
        </style>
        
        {/* Line 1: Sinhalese and Tamil */}
        <text x="50%" y="25%" textAnchor="middle" dominantBaseline="middle" className="stroke-text line-1">
          ආයුබෝවන් <tspan style={{ opacity: 0.3, fontSize: '0.8em' }}>|</tspan> வணக்கம்
        </text>
        
        {/* Line 2: Hindi, Gujarati, Punjabi */}
        <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="stroke-text line-2">
          नमस्ते <tspan style={{ opacity: 0.3, fontSize: '0.8em' }}>|</tspan> સ્વાગત છે <tspan style={{ opacity: 0.3, fontSize: '0.8em' }}>|</tspan> ਸਤ ਸ੍ਰੀ ਅਕਾਲ
        </text>
        
        {/* Line 3: Urdu and English */}
        <text x="50%" y="95%" textAnchor="middle" dominantBaseline="middle" className="stroke-text line-3">
          خوش آمدید <tspan style={{ opacity: 0.3, fontSize: '0.8em' }}>|</tspan> <tspan className="stroke-text english">Welcome</tspan>
        </text>
      </svg>
    </motion.div>
  );
}
