'use client';

import MenuShowcase from '@/components/MenuShowcase';
import CultureShowcase from '@/components/CultureShowcase';
import BookingSystem from '@/components/BookingSystem';
import SriLankaMap from '@/components/SriLankaMap';
import IntroSequence from '@/components/IntroSequence';
import { MapPin, Clock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

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

export default function HomeClient({ menuItems, locationName }) {
  const [showIntro, setShowIntro] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div style={{ paddingBottom: '100px', overflowX: 'hidden', position: 'relative' }}>
      
      {/* Background Aurora / Gradient Orbs for Glassmorphism to blur */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -2, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(255, 100, 0, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float1 20s infinite ease-in-out', willChange: 'transform' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(255, 200, 0, 0.2) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'float2 25s infinite ease-in-out', willChange: 'transform' }}></div>
        <div style={{ position: 'absolute', top: '40%', left: '30%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0, 168, 107, 0.1) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'float1 30s infinite ease-in-out reverse', willChange: 'transform' }}></div>
      </div>

      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '120px 20px',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center'
      }}>
        
        {/* The Map as a Majestic Centerpiece Background */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          zIndex: -1, 
          opacity: 0.3, 
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          <SriLankaMap width="min(90vw, 500px)" height="min(90vh, 700px)" />
        </div>

        <AnimatePresence>
          {showIntro && <IntroSequence onComplete={handleIntroComplete} />}
        </AnimatePresence>

        <motion.div 
          className="container" 
          key={showIntro ? 'waiting' : 'ready'}
          initial={hasMounted && showIntro ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
          animate={!showIntro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}
        >
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}>
             {/* Authentic Sri Lankan Greeting Fallback */}
             <h2 style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--primary)', marginBottom: '0.5rem' }}>
               ආයුබෝවන් <span style={{ color: 'var(--foreground)', opacity: 0.3, fontSize: '1.5rem', verticalAlign: 'middle', margin: '0 15px' }}>|</span> வணக்கம்
             </h2>
             <p style={{ fontSize: '0.9rem', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--foreground)', marginBottom: '3rem', opacity: 0.6 }}>
               Ayubowan &bull; Vanakkam &bull; Welcome
             </p>
          </motion.div>

          <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
            {locationName ? `Authentic Sri Lankan Restaurant near ${locationName} | Yako` : `Authentic Sri Lankan Restaurant in Pinner, London | Yako`}
          </h1>

          <motion.h2 
             initial={{ opacity: 0, scale: 0.95 }} 
             animate={{ opacity: 1, scale: 1 }} 
             transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
             className="font-script" 
             style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'var(--foreground)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.5rem', margin: 0 }}>
            MORE THAN A MEAL.<br/> <span className="text-gradient-primary">A JOURNEY HOME.</span>
          </motion.h2>

          <motion.p 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             transition={{ duration: 1.5, delay: 1.4 }}
             style={{ fontSize: '1.15rem', color: 'var(--foreground)', opacity: 0.8, marginBottom: '3.5rem', lineHeight: 1.7, fontWeight: 400, maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            {locationName ? `Proudly serving authentic flavours born from Dutch, Portuguese, Malay, and South Indian influences to our guests from ${locationName}. Discover the true taste of home cooking just a short trip away.` : `A true melting pot of cultures. Experience authentic flavours born from Dutch, Portuguese, Malay, and South Indian influences. Discover the true taste of home cooking.`}
          </motion.p>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ duration: 1, delay: 2 }}
             style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#menu" className="btn-primary hover-scale" style={{ fontSize: '1.05rem', padding: '14px 36px', letterSpacing: '1px' }}>
              See Menu
            </a>
            <a href="#reservations" className="btn-outline hover-scale" style={{ background: 'rgba(255,255,255,0.5)', color: 'var(--foreground)', borderColor: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)', fontSize: '1.05rem', padding: '14px 36px', letterSpacing: '1px' }}>
              Book a Table
            </a>
          </motion.div>

        </motion.div>
      </section>

      {/* Deep Dive: Culture & Nostalgia */}
      <CultureShowcase />

      {/* ==========================================================
          DARK THEME SECTION (Menu & Reservations)
          ========================================================== */}
      <div className="dark-theme" style={{ position: 'relative', zIndex: 1, overflow: 'hidden', minHeight: '100vh', paddingBottom: '100px' }}>
        
        {/* Dark Background Orbs just for this section */}
        <div style={{ position: 'absolute', inset: 0, zIndex: -2, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(204, 0, 0, 0.15) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'float2 25s infinite ease-in-out' }}></div>
          <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(204, 0, 0, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float1 30s infinite ease-in-out reverse' }}></div>
        </div>

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
            <h2 className="font-script heading-lg mb-6" style={{ textTransform: 'uppercase', color: 'var(--primary)' }}>Join Us</h2>
            <p style={{ color: 'var(--foreground)', opacity: 0.8, marginBottom: '3rem', lineHeight: 1.7, fontSize: '1.1rem' }}>
              Whether it's an intimate dinner or a grand celebration, our table is yours. Experience the warmth of Sri Lankan hospitality.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div className="glass-icon">
                  <MapPin color="var(--primary)" size={24} />
                </div>
                <div style={{ paddingTop: '2px' }}>
                  <h4 style={{ marginBottom: '4px', fontSize: '1.1rem', color: 'var(--foreground)' }}>Location</h4>
                  <p style={{ color: 'var(--foreground)', opacity: 0.7, lineHeight: 1.5 }}>YAKO, 6 High Street<br/>Pinner, HA5 5PW</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div className="glass-icon">
                  <Clock color="var(--primary)" size={24} />
                </div>
                <div style={{ paddingTop: '2px' }}>
                  <h4 style={{ marginBottom: '4px', fontSize: '1.1rem', color: 'var(--foreground)' }}>Hours</h4>
                  <p style={{ color: 'var(--foreground)', opacity: 0.7, lineHeight: 1.5 }}>Mon, Wed, Thu: 17:00 - 23:00<br/>Fri, Sat: 12:00 - 24:00<br/>Sun: 12:00 - 22:00</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div className="glass-icon">
                  <Phone color="var(--primary)" size={24} />
                </div>
                <div style={{ paddingTop: '2px' }}>
                  <h4 style={{ marginBottom: '4px', fontSize: '1.1rem', color: 'var(--foreground)' }}>Contact</h4>
                  <p style={{ color: 'var(--foreground)', opacity: 0.7, lineHeight: 1.5 }}>020 8429 3778<br/>info@yakolondon.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <BookingSystem />
          </div>
        </motion.div>
      </section>

      </div> {/* END DARK THEME SECTION */}
    </div>
  );
}
