'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function AboutClient({ content }) {
  return (
    <div style={{ paddingBottom: '100px', overflowX: 'hidden', position: 'relative', minHeight: '100vh', paddingTop: '120px' }}>
      
      {/* Background Aurora / Gradient Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -2, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(204, 0, 0, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', opacity: 0.8 }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)', filter: 'blur(80px)', opacity: 0.8 }}></div>
      </div>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E")' }}></div>

      <div className="container">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h1 className="font-script heading-xl mb-4" style={{ textTransform: 'uppercase' }}>{content?.about_hero_title || 'Our Story'}</h1>
          <div style={{ height: '3px', width: '60px', background: 'var(--primary)', margin: '0 auto', borderRadius: '3px' }}></div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="glass"
            style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <h2 className="font-script heading-lg" style={{ color: 'var(--primary)' }}>{content?.about_heritage_title || 'Heritage'}</h2>
            <p style={{ fontSize: '1.1rem', color: '#D1D5DB', lineHeight: 1.8 }}>
              {content?.about_heritage_p1}
            </p>
            <p style={{ fontSize: '1.1rem', color: '#D1D5DB', lineHeight: 1.8 }}>
              {content?.about_heritage_p2}
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="glass"
            style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <h2 className="font-script heading-lg" style={{ color: 'var(--primary)' }}>{content?.about_chef_title || 'Meet the Chef'}</h2>
            <p style={{ fontSize: '1.1rem', color: '#D1D5DB', lineHeight: 1.8 }}>
              {content?.about_chef_p1}
            </p>
            <p style={{ fontSize: '1.1rem', color: '#D1D5DB', lineHeight: 1.8 }}>
              {content?.about_chef_p2}
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
