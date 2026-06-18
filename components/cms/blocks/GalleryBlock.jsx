'use client';

import { motion } from 'framer-motion';

export default function GalleryBlock({ data }) {
  if (!data.images || data.images.length === 0) return null;

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {data.images.map((img, i) => {
          if (!img) return null;
          return (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              style={{
                height: '300px', backgroundImage: `url("${img}")`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                borderRadius: '12px', overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
