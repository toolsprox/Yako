'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function GalleryClient({ initialImages }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Map db records to format used by component
  const images = initialImages?.map(img => ({
    src: img.image_url,
    alt: img.alt_text || 'Yako London Gallery',
    span: img.span_class || 'col-span-1 row-span-1'
  })) || [];

  return (
    <div style={{ paddingBottom: '100px', overflowX: 'hidden', position: 'relative', minHeight: '100vh', paddingTop: '120px' }}>
      
      {/* Background Aurora / Gradient Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -2, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(204, 0, 0, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', opacity: 0.8 }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)', filter: 'blur(80px)', opacity: 0.8 }}></div>
      </div>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E")' }}></div>

      <div className="container">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h1 className="font-script heading-xl mb-4" style={{ textTransform: 'uppercase' }}>Gallery</h1>
          <div style={{ height: '3px', width: '60px', background: 'var(--primary)', margin: '0 auto', borderRadius: '3px' }}></div>
          <p style={{ color: '#D1D5DB', marginTop: '1.5rem', fontSize: '1.1rem' }}>A visual taste of what awaits you at Yako.</p>
        </motion.div>

        {/* CSS Grid for pseudo-masonry layout */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="gallery-grid"
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className={`gallery-item ${img.span} glass hover-scale`}
              style={{ padding: '8px', cursor: 'pointer', overflow: 'hidden', position: 'relative', minHeight: '300px' }}
              onClick={() => setSelectedImage(img)}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                style={{ objectFit: 'cover', borderRadius: '8px' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div 
                className="gallery-overlay"
                style={{
                  position: 'absolute',
                  inset: '8px',
                  background: 'rgba(0,0,0,0.5)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  backdropFilter: 'blur(2px)'
                }}
              >
                <span className="font-script" style={{ color: '#fff', fontSize: '1.5rem' }}>View</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(10px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              cursor: 'zoom-out'
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={{ position: 'relative', width: '100%', maxWidth: '1000px', height: '80vh' }}
              onClick={e => e.stopPropagation()}
            >
              <Image 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                fill 
                style={{ objectFit: 'contain' }}
              />
              <p style={{ position: 'absolute', bottom: '-40px', left: 0, right: 0, textAlign: 'center', color: '#fff', fontSize: '1.1rem' }}>
                {selectedImage.alt}
              </p>
              <button 
                onClick={() => setSelectedImage(null)}
                style={{ position: 'absolute', top: '-40px', right: 0, background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 20px;
          grid-auto-flow: dense;
        }
        @media (min-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .col-span-2 { grid-column: span 2; }
        .row-span-2 { grid-row: span 2; }
        
        /* Reset for mobile so everything stacks nicely if needed */
        @media (max-width: 767px) {
          .col-span-2 { grid-column: span 1; }
          .row-span-2 { grid-row: span 1; }
        }
      `}} />
    </div>
  );
}
