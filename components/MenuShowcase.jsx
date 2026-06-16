'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuShowcase({ initialMenu = [] }) {
  // Group flat array from Supabase into an object by category
  const groupedMenu = useMemo(() => {
    const grouped = initialMenu.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
    
    // Sort items within each category by order_index
    for (const key in grouped) {
      grouped[key].sort((a, b) => a.order_index - b.order_index);
    }
    return grouped;
  }, [initialMenu]);

  const categories = Object.keys(groupedMenu);
  // Default to the first category, or empty string if no categories
  const [activeTab, setActiveTab] = useState(categories[0] || '');

  if (categories.length === 0) {
    return <div style={{ color: '#A1A1AA', textAlign: 'center', padding: '2rem' }}>Loading our glorious menu...</div>;
  }

  // Ensure activeTab is always valid if data loads late
  const currentCategoryData = groupedMenu[activeTab] || groupedMenu[categories[0]];
  const activeCategoryName = currentCategoryData === groupedMenu[categories[0]] ? categories[0] : activeTab;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* Category Navigation */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '1rem', 
          background: 'rgba(255, 255, 255, 0.03)', 
          padding: '8px', 
          borderRadius: '50px', 
          width: 'max-content',
          maxWidth: '100%',
          overflowX: 'auto',
          margin: '0 auto 4rem',
          border: '1px solid rgba(255,255,255,0.05)',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            style={{
              position: 'relative',
              background: 'transparent',
              color: activeCategoryName === category ? '#fff' : '#A1A1AA',
              padding: '12px 24px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              transition: 'color 0.3s ease',
              zIndex: 1
            }}
          >
            {activeCategoryName === category && (
              <motion.div
                layoutId="activeTabIndicator"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--primary)',
                  borderRadius: '50px',
                  zIndex: -1,
                  boxShadow: '0 4px 15px rgba(204, 0, 0, 0.4)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items with Animation */}
      <div style={{ minHeight: '500px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mobile-stack"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}
          >
            {currentCategoryData.map((item, index) => (
              <motion.div 
                key={item.id || index} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bento-card" 
                style={{ 
                  padding: '30px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px',
                  cursor: 'pointer'
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
              >
                <div className="bento-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '8px' }}>
                    <h3 className="font-script" style={{ fontSize: '2rem', color: 'var(--foreground)', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{item.name}</h3>
                    <span style={{ fontWeight: 800, color: '#fff', fontSize: '1.4rem', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)', background: 'var(--primary)', padding: '4px 12px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(204, 0, 0, 0.4)' }}>{item.price}</span>
                  </div>
                  <div style={{ height: '1px', width: '100%', background: 'linear-gradient(90deg, rgba(204,0,0,0.5) 0%, transparent 100%)', marginBottom: '8px' }}></div>
                  <p style={{ color: '#D1D5DB', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 300, fontFamily: 'var(--font-sans)' }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
