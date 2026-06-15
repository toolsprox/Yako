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
          justifyContent: 'center', 
          flexWrap: 'wrap',
          padding: '1rem',
          position: 'sticky',
          top: '20px',
          zIndex: 40,
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '50px',
          border: '1px solid rgba(255,255,255,0.05)'
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
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}
          >
            {currentCategoryData.map((item, index) => (
              <motion.div 
                key={item.id || index} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="hover-scale" 
                style={{ 
                  padding: '24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1, gap: '1rem' }}>
                  <h3 className="font-script" style={{ fontSize: '1.8rem', color: 'var(--foreground)' }}>{item.name}</h3>
                  <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.25rem', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)' }}>{item.price}</span>
                </div>
                <div style={{ height: '1px', width: '100%', background: 'rgba(255,255,255,0.05)', zIndex: 1 }}></div>
                <p style={{ color: '#A1A1AA', fontSize: '1rem', lineHeight: 1.6, zIndex: 1, fontWeight: 300, fontFamily: 'var(--font-sans)' }}>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
