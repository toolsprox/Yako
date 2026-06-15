'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

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
    <nav 
      className="glass-nav" 
      style={{ 
        position: 'fixed', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 50,
        padding: '12px 30px',
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
        width: 'max-content',
        maxWidth: '90vw'
      }}
    >
      <Link href="/" style={{ textDecoration: 'none' }}>
        <h2 className="font-script" style={{ color: 'var(--primary)', margin: 0, fontSize: '1.8rem', lineHeight: 1 }}>YAKO</h2>
      </Link>

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
    </nav>
  );
}
