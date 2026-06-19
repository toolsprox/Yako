'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Home, UtensilsCrossed, Image as ImageIcon, CalendarHeart, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track full path including hash for active state highlighting
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePath(window.location.pathname + window.location.hash);
      
      const handleHashChange = () => {
        setActivePath(window.location.pathname + window.location.hash);
      };
      
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, [pathname]);

  // Don't show public navbar on admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null;
  }

  const links = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/#menu', icon: UtensilsCrossed },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'Journal', path: '/journal', icon: BookOpen },
    { name: 'Book', path: '/book', icon: CalendarHeart } // Dedicated booking page for mobile
  ];

  return (
    <>
      {/* Desktop Navigation (Unchanged) */}
      {!isMobile && (
        <nav 
          className="dark-theme-nav" 
          style={{ 
            position: 'fixed', 
            top: '20px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 60,
            padding: '12px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2.5rem',
            width: 'max-content',
            maxWidth: '90vw',
            borderRadius: '50px'
          }}
        >
          <Link href="/" style={{ textDecoration: 'none', zIndex: 61 }}>
            <h2 className="font-script" style={{ color: 'var(--primary)', margin: 0, fontSize: '1.8rem', lineHeight: 1 }}>YAKO</h2>
          </Link>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {links.map((link) => {
              if(link.name === 'Book') return null; // We handle Book separately as a button on desktop
              return (
                <Link 
                  key={link.name} 
                  href={link.path}
                  style={{
                    textDecoration: 'none',
                    color: pathname === link.path ? '#fff' : '#A1A1AA',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)',
                    transition: 'color 0.2s ease',
                    letterSpacing: '0.5px'
                  }}
                >
                  {link.name}
                </Link>
              )
            })}
            <Link 
              href="/about"
              style={{
                textDecoration: 'none',
                color: pathname === '/about' ? '#fff' : '#A1A1AA',
                fontWeight: 500,
                fontSize: '0.95rem',
                fontFamily: 'var(--font-sans)',
                transition: 'color 0.2s ease',
                letterSpacing: '0.5px'
              }}
            >
              About
            </Link>
          </div>

          <Link 
            href="/#reservations"
            className="btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.9rem' }}
          >
            Book
          </Link>
        </nav>
      )}

      {/* App-Style Bottom Navigation for Mobile */}
      {isMobile && (
        <>
          {/* Top minimal brand (No hamburger, just the logo so they know where they are) */}
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '15px 20px', zIndex: 50, background: 'linear-gradient(to bottom, rgba(10,10,10,0.9), transparent)' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <h2 className="font-script" style={{ color: 'var(--primary)', margin: 0, fontSize: '1.8rem', lineHeight: 1 }}>YAKO</h2>
            </Link>
          </div>

          {/* Bottom Nav Bar */}
          <motion.nav 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            style={{ 
              position: 'fixed', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              zIndex: 60,
              background: 'rgba(15, 15, 15, 0.85)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '12px 10px 25px 10px', // Extra bottom padding for iOS home bar
              boxShadow: '0 -10px 40px rgba(0,0,0,0.5)'
            }}
          >
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = activePath === link.path || (activePath === '/' && link.path === '/');
              
              return (
                <Link 
                  key={link.name} 
                  href={link.path}
                  onClick={() => setActivePath(link.path)}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    flex: 1,
                    position: 'relative'
                  }}
                >
                  <div style={{ 
                    color: isActive ? 'var(--primary)' : '#A1A1AA',
                    transition: 'color 0.2s',
                    padding: '4px'
                  }}>
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#fff' : '#A1A1AA',
                    fontFamily: 'var(--font-sans)',
                    transition: 'all 0.2s'
                  }}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </motion.nav>
        </>
      )}
    </>
  );
}
