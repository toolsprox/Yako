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

  // Desktop Scroll Observer
  useEffect(() => {
    if (isMobile) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveCategory(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 });

    categories.forEach(cat => {
      const el = document.getElementById(`desktop-${cat}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [categories, isMobile]);

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

  const scrollToDesktopCategory = (category) => {
    const el = document.getElementById(`desktop-${category}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const BentoCard = ({ item, index }) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.1, ease: "easeOut" }}
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
          <div style={{ position: 'sticky', top: '20px', zIndex: 40, display: 'flex', justifyContent: 'center', marginBottom: '4rem', pointerEvents: 'none' }}>
            <div className="hide-scrollbar" style={{ pointerEvents: 'auto', display: 'flex', gap: '0.5rem', background: 'rgba(15, 15, 15, 0.7)', backdropFilter: 'blur(20px)', padding: '8px', borderRadius: '50px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
              {categories.map((category) => (
                <button
                  key={`nav-${category}`}
                  onClick={() => scrollToDesktopCategory(category)}
                  style={{ position: 'relative', background: 'transparent', color: activeCategory === category ? '#fff' : '#A1A1AA', padding: '10px 24px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)', fontSize: '0.95rem', transition: 'all 0.3s ease', zIndex: 1 }}
                >
                  {activeCategory === category && (
                    <motion.div layoutId="jumpNavIndicator" style={{ position: 'absolute', inset: 0, background: 'var(--primary)', borderRadius: '50px', zIndex: -1, boxShadow: '0 4px 15px rgba(204, 0, 0, 0.4)' }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                  )}
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            {categories.map((category) => (
              <div key={`desktop-${category}`} id={`desktop-${category}`} style={{ scrollMarginTop: '100px' }}>
                <div style={{ marginBottom: '3rem', position: 'relative' }}>
                  <h2 className="font-script heading-xl" style={{ textTransform: 'uppercase', color: '#fff', textShadow: '0 0 30px rgba(204,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', display: 'inline-block' }}>{category}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                  {groupedMenu[category].map((item, index) => <BentoCard key={item.id} item={item} index={index} />)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* =========================================
          MOBILE: SWIPE SNAP CAROUSEL
          ========================================= */}
      {isMobile && (
        <div style={{ position: 'relative', width: '100vw', marginLeft: '-20px' }}> {/* Counteract container padding */}
          
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
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              gap: '20px',
              padding: '0 20px', // Peek effect for next cards
            }}
          >
            {categories.map((category) => (
              <div 
                key={`mobile-${category}`} 
                id={`mobile-${category}`} 
                style={{ 
                  minWidth: 'calc(100vw - 40px)', // Full width minus padding
                  scrollSnapAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}
              >
                <h2 className="font-script heading-lg" style={{ textAlign: 'center', textTransform: 'uppercase', color: '#fff', textShadow: '0 0 20px rgba(204,0,0,0.4)', margin: 0 }}>{category}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {groupedMenu[category].map((item, index) => <BentoCard key={item.id} item={item} index={index} />)}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#666', fontSize: '0.85rem' }}>
            ← Swipe to see more →
          </div>
        </div>
      )}

    </div>
  );
}
