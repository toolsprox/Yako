'use client';

import { useMemo, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function MenuShowcase({ initialMenu = [] }) {
  // Group flat array from Supabase into an object by category
  const groupedMenu = useMemo(() => {
    const grouped = initialMenu.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
    
    for (const key in grouped) {
      grouped[key].sort((a, b) => a.order_index - b.order_index);
    }
    return grouped;
  }, [initialMenu]);

  const categories = Object.keys(groupedMenu);
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');
  const [isMobile, setIsMobile] = useState(false);
  const mobileScrollRef = useRef(null);

  // Detect Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop Scroll Observer no longer needed since it's tabbed

  // Mobile Scroll Observer (for Dots)
  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveCategory(entry.target.id.replace('mobile-', ''));
      });
    }, { root: mobileScrollRef.current, threshold: 0.5 });

    categories.forEach(cat => {
      const el = document.getElementById(`mobile-${cat}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [categories, isMobile]);

  if (categories.length === 0) {
    return <div style={{ color: '#A1A1AA', textAlign: 'center', padding: '2rem' }}>Loading our glorious menu...</div>;
  }

  const BentoCard = ({ item, index }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: index * 0.05 }}
      className="bento-card" 
      style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}
      onMouseMove={(e) => {
        if (isMobile) return; // No hover tracking on mobile
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }}
    >
      <div className="bento-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '8px' }}>
          <h3 className="font-script" style={{ fontSize: isMobile ? '1.6rem' : '2rem', color: 'var(--foreground)', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{item.name}</h3>
          <span style={{ fontWeight: 800, color: '#fff', fontSize: '1.2rem', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)', background: 'var(--primary)', padding: '4px 12px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(204, 0, 0, 0.4)' }}>{item.price}</span>
        </div>
        <div style={{ height: '1px', width: '100%', background: 'linear-gradient(90deg, rgba(204,0,0,0.5) 0%, transparent 100%)', marginBottom: '8px' }}></div>
        <p style={{ color: '#D1D5DB', fontSize: '1rem', lineHeight: 1.6, fontWeight: 300, fontFamily: 'var(--font-sans)' }}>{item.description}</p>
      </div>
    </motion.div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* =========================================
          DESKTOP: LONG SCROLL MENU
          ========================================= */}
      {!isMobile && (
        <>
          {/* Floating Jump Menu */}
          <div style={{ position: 'sticky', top: '20px', zIndex: 40, display: 'flex', justifyContent: 'center', marginBottom: '4rem', pointerEvents: 'none', padding: '0 20px' }}>
            <div className="hide-scrollbar" style={{ pointerEvents: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', paddingBottom: '10px' }}>
              {categories.map((category) => (
                <button
                  key={`nav-${category}`}
                  onClick={() => setActiveCategory(category)}
                  style={{ position: 'relative', background: 'transparent', color: activeCategory === category ? '#fff' : '#888', padding: '12px 24px', border: 'none', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)', fontSize: '1rem', transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '1px', zIndex: 1, textShadow: activeCategory === category ? '0 0 10px rgba(255,50,50,0.8), 0 0 20px rgba(204,0,0,0.5)' : 'none' }}
                >
                  {activeCategory === category && (
                    <motion.div layoutId="desktopNavButton" style={{ position: 'absolute', inset: 0, background: 'rgba(204, 0, 0, 0.1)', border: '1px solid rgba(255, 50, 50, 0.8)', borderRadius: '50px', zIndex: -1, boxShadow: '0 0 15px rgba(255, 50, 50, 0.5), 0 0 30px rgba(204, 0, 0, 0.3), inset 0 0 15px rgba(204, 0, 0, 0.4)' }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div
            key={`desktop-${activeCategory}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div style={{ marginBottom: '1rem', position: 'relative' }}>
              <h2 className="font-script heading-xl" style={{ textTransform: 'uppercase', color: '#fff', textShadow: '0 0 30px rgba(204,0,0,0.4)', display: 'inline-block' }}>{activeCategory}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {groupedMenu[activeCategory].map((item, index) => <BentoCard key={item.id} item={item} index={index} />)}
            </div>
          </div>
        </>
      )}

      {/* =========================================
          MOBILE: SWIPE SNAP CAROUSEL
          ========================================= */}
      {isMobile && (
        <div style={{ position: 'relative', width: '100%' }}> 
          
          {/* Paging Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '2rem' }}>
            {categories.map((category) => (
              <div 
                key={`dot-${category}`}
                style={{
                  width: activeCategory === category ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: activeCategory === category ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  boxShadow: activeCategory === category ? '0 0 10px rgba(204,0,0,0.5)' : 'none'
                }}
              />
            ))}
          </div>

          {/* Swipe Container */}
          <div 
            ref={mobileScrollRef}
            className="hide-scrollbar"
            style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              overflowY: 'hidden', // CRITICAL: Tells iOS NOT to trap vertical scrolling here
              scrollSnapType: 'x mandatory', // Restored to mandatory to ensure cards perfectly snap and never stop half-way
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              gap: '16px',
              paddingBottom: '20px' // Space for shadow
            }}
          >
            {categories.map((category) => (
              <div 
                key={`mobile-${category}`} 
                id={`mobile-${category}`} 
                style={{ 
                  flex: '0 0 100%', // Take up 100% width so only ONE category is visible at a time
                  scrollSnapAlign: 'start',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}
              >
                <h2 className="font-script heading-lg" style={{ textAlign: 'center', textTransform: 'uppercase', color: '#fff', textShadow: '0 0 20px rgba(204,0,0,0.4)', margin: 0 }}>{category}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  {groupedMenu[category].map((item, index) => <BentoCard key={item.id} item={item} index={index} />)}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '1rem', color: '#A1A1AA', fontSize: '0.85rem', fontWeight: 500 }}>
            ← Swipe to see more categories →
          </div>
        </div>
      )}

    </div>
  );
}
