'use client';

import { motion } from 'framer-motion';

export default function TypewriterText({ text }) {
  // We use a custom simple markdown-like syntax:
  // *word* makes it white and bold.
  // ~word~ makes it primary color and bold.
  
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring", damping: 15, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      filter: "blur(4px)",
      y: 5,
    },
  };

    return (
      <motion.p
        style={{ 
          color: 'var(--foreground)', 
          opacity: 0.85,
          fontSize: '1.2rem', 
          lineHeight: 1.8, 
          fontWeight: 400, 
          display: 'inline-flex', 
          flexWrap: 'wrap', 
          columnGap: '6px' 
        }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {words.map((word, index) => {
          let isWhite = word.includes('*');
          let isPrimary = word.includes('~');
          
          let displayWord = word.replace(/[*~]/g, '');
  
          return (
            <motion.span
              variants={child}
              key={index}
              style={{
                color: isPrimary ? 'var(--primary)' : isWhite ? 'var(--foreground)' : 'inherit',
                fontWeight: isPrimary || isWhite ? 600 : 400,
                opacity: isWhite ? 1 : 'inherit'
              }}
            >
              {displayWord}
            </motion.span>
          );
        })}
      </motion.p>
    );
}
