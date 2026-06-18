'use client';

import MenuShowcase from '@/components/MenuShowcase';
import CultureShowcase from '@/components/CultureShowcase';
import BookingSystem from '@/components/BookingSystem';
import { MapPin, Clock, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function HomeClient({ menuItems }) {
  return (
    <div style={{ paddingBottom: '100px', overflowX: 'hidden', position: 'relative' }}>
      
      {/* Background Aurora / Gradient Orbs for Glassmorphism to blur */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -2, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(204, 0, 0, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', opacity: 0.8, animation: 'float1 20s infinite ease-in-out' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', opacity: 0.8, animation: 'float2 25s infinite ease-in-out' }}></div>
        <div style={{ position: 'absolute', top: '40%', left: '30%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)', filter: 'blur(40px)', opacity: 0.5, animation: 'float1 30s infinite ease-in-out reverse' }}></div>
      </div>

      {/* Subtle Noise Texture overlay to make it feel premium */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E")' }}></div>

      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <div
            style={{ 
              maxWidth: '800px', 
              margin: '0 auto',
              textAlign: 'center'
            }}
          >
            <div>
              <h1 className="font-script heading-xl mb-6" style={{ color: '#FFFFFF', textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
                GLORIOUS <br/> <span className="text-gradient-primary">SRI LANKAN FOOD</span>
              </h1>
              <p className="mb-10" style={{ fontSize: '1.25rem', color: '#D1D5DB', margin: '0 auto 3rem', lineHeight: 1.7, fontWeight: 300, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                A true melting pot of cultures. Experience authentic flavours born from Dutch, Portuguese, Malay, and South Indian influences. Discover the true taste of home cooking.
              </p>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="#menu" className="btn-primary hover-scale">
                  See Menu
                </a>
                <a href="#reservations" className="btn-outline hover-scale" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                  Book a Table
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: Culture & Nostalgia */}
      <CultureShowcase />

      {/* Menu Highlight Section */}
      <section id="menu" style={{ padding: '100px 20px', position: 'relative', zIndex: 1 }}>
        <div className="container glass" style={{ padding: '60px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="font-script heading-lg mb-4">Our Menu</h2>
            <div style={{ height: '3px', width: '60px', background: 'var(--primary)', margin: '0 auto', borderRadius: '3px' }}></div>
          </div>
          <MenuShowcase initialMenu={menuItems} />
        </div>
      </section>

      {/* Booking Section */}
      <section id="reservations" className="section container hide-on-mobile">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="glass mobile-stack"
          style={{ padding: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}
        >
          <div>
            <h2 className="font-script heading-lg mb-6" style={{ textTransform: 'uppercase' }}>Join Us</h2>
            <p style={{ color: '#A1A1AA', marginBottom: '3rem', lineHeight: 1.7, fontSize: '1.1rem' }}>
              Whether it's an intimate dinner or a grand celebration, our table is yours. Experience the warmth of Sri Lankan hospitality.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div className="glass-icon">
                  <MapPin color="var(--primary)" size={24} />
                </div>
                <div style={{ paddingTop: '2px' }}>
                  <h4 style={{ marginBottom: '4px', fontSize: '1.1rem', color: 'var(--foreground)' }}>Location</h4>
                  <p style={{ color: '#A1A1AA', lineHeight: 1.5 }}>YAKO, 6 High Street<br/>Pinner, HA5 5PW</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div className="glass-icon">
                  <Clock color="var(--primary)" size={24} />
                </div>
                <div style={{ paddingTop: '2px' }}>
                  <h4 style={{ marginBottom: '4px', fontSize: '1.1rem', color: 'var(--foreground)' }}>Hours</h4>
                  <p style={{ color: '#A1A1AA', lineHeight: 1.5 }}>Mon, Wed, Thu: 17:00 - 23:00<br/>Fri, Sat: 12:00 - 24:00<br/>Sun: 12:00 - 22:00</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div className="glass-icon">
                  <Phone color="var(--primary)" size={24} />
                </div>
                <div style={{ paddingTop: '2px' }}>
                  <h4 style={{ marginBottom: '4px', fontSize: '1.1rem', color: 'var(--foreground)' }}>Contact</h4>
                  <p style={{ color: '#A1A1AA', lineHeight: 1.5 }}>020 8429 3778<br/>info@yakolondon.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <BookingSystem />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
