'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Don't show public navbar on admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null;
  }

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/#menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav 
        className="glass-nav" 
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
          gap: isMobile ? '0' : '2.5rem',
          width: 'max-content',
          maxWidth: '90vw',
          borderRadius: '50px'
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', zIndex: 61 }}>
          <h2 className="font-script" style={{ color: 'var(--primary)', margin: 0, fontSize: '1.8rem', lineHeight: 1 }}>YAKO</h2>
        </Link>

        {isMobile ? (
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', zIndex: 61, display: 'flex', alignItems: 'center' }}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              {links.map((link) => (
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
              ))}
            </div>

            <Link 
              href="/#reservations"
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.9rem' }}
            >
              Book
            </Link>
          </>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(30px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 55,
              background: 'rgba(10, 10, 10, 0.85)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem'
            }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link 
                  href={link.path}
                  style={{
                    textDecoration: 'none',
                    color: pathname === link.path ? 'var(--primary)' : '#fff',
                    fontWeight: 600,
                    fontSize: '2rem',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: links.length * 0.05 }}
              style={{ marginTop: '2rem' }}
            >
              <Link 
                href="/#reservations"
                className="btn-primary"
                onClick={() => setIsOpen(false)}
                style={{ fontSize: '1.2rem', padding: '16px 40px' }}
              >
                Book a Table
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
