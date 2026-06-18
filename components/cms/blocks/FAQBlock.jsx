'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQBlock({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!data.questions || data.questions.length === 0) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {data.questions.map((item, index) => {
          if (!item.q) return null;
          const isOpen = openIndex === index;
          
          return (
            <div key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              <button 
                onClick={() => setOpenIndex(isOpen ? null : index)}
                style={{
                  width: '100%', background: 'none', border: 'none', color: '#fff', 
                  fontSize: '1.2rem', padding: '15px 0', textAlign: 'left',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  cursor: 'pointer', fontWeight: 500
                }}
              >
                {item.q}
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                  <ChevronDown size={20} color="#A1A1AA" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden', color: '#A1A1AA', lineHeight: 1.6 }}
                  >
                    <div style={{ paddingBottom: '15px' }}>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
