'use client';

import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');

  // Setup intersection observer to highlight the floating pill as we scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 });

    categories.forEach(cat => {
      const el = document.getElementById(cat);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  if (categories.length === 0) {
    return <div style={{ color: '#A1A1AA', textAlign: 'center', padding: '2rem' }}>Loading our glorious menu...</div>;
  }

  const scrollToCategory = (category) => {
    const el = document.getElementById(category);
    if (el) {
      // Smooth scroll, accounting for the floating navbar/pill
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Floating Jump Menu (The Glass Pill) */}
      <div 
        style={{ 
          position: 'sticky', 
          top: '20px', 
          zIndex: 40,
          display: 'flex', 
          justifyContent: 'center',
          marginBottom: '4rem',
          pointerEvents: 'none' // Let clicks pass through the container
        }}
      >
        <div 
          className="hide-scrollbar"
          style={{ 
            pointerEvents: 'auto', // But catch clicks on the pill itself
            display: 'flex', 
            gap: '0.5rem', 
            background: 'rgba(15, 15, 15, 0.7)', 
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '8px', 
            borderRadius: '50px', // Perfectly round pill
            width: 'max-content',
            maxWidth: '95vw',
            overflowX: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {categories.map((category) => (
            <button
              key={`nav-${category}`}
              onClick={() => scrollToCategory(category)}
              style={{
                position: 'relative',
                background: 'transparent',
                color: activeCategory === category ? '#fff' : '#A1A1AA',
                padding: '10px 24px',
                borderRadius: '50px', // Perfectly round inner pills
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                zIndex: 1
              }}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="jumpNavIndicator"
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
      </div>

      {/* Continuous Menu Scroll */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
        {categories.map((category) => (
          <div key={category} id={category} style={{ scrollMarginTop: '100px' }}>
            
            {/* Massive Glowing Category Header */}
            <div style={{ marginBottom: '3rem', position: 'relative' }}>
              <h2 
                className="font-script heading-xl" 
                style={{ 
                  textTransform: 'uppercase', 
                  color: '#fff', 
                  textShadow: '0 0 30px rgba(204,0,0,0.4)',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  paddingBottom: '1rem',
                  display: 'inline-block'
                }}
              >
                {category}
              </h2>
            </div>

            {/* Bento Grid for this category */}
            <div 
              className="mobile-stack"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}
            >
              {groupedMenu[category].map((item, index) => (
                <motion.div 
                  key={item.id || index} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bento-card" 
                  style={{ 
                    padding: '30px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px'
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
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
