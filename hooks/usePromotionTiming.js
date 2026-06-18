import { useState, useEffect } from 'react';

export default function usePromotionTiming(timing) {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (!timing || timing === 'immediate') {
      setIsTriggered(true);
      return;
    }

    if (timing === 'delay_5') {
      const timer = setTimeout(() => setIsTriggered(true), 5000);
      return () => clearTimeout(timer);
    }

    if (timing === 'delay_15') {
      const timer = setTimeout(() => setIsTriggered(true), 15000);
      return () => clearTimeout(timer);
    }

    if (timing === 'scroll_50') {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        // Check if docHeight is 0 to avoid division by zero
        const docHeight = Math.max(1, document.body.scrollHeight - window.innerHeight);
        const scrollPercent = scrollTop / docHeight;
        
        if (scrollPercent >= 0.5) {
          setIsTriggered(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };
      window.addEventListener('scroll', handleScroll);
      // Run once immediately in case they load already scrolled down
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }

    if (timing === 'exit_intent') {
      const handleMouseOut = (e) => {
        // If the mouse moves out of the top of the window (towards the URL bar)
        if (e.clientY <= 0 || e.clientY < 5) {
          setIsTriggered(true);
          document.removeEventListener('mouseout', handleMouseOut);
        }
      };
      document.addEventListener('mouseout', handleMouseOut);
      return () => document.removeEventListener('mouseout', handleMouseOut);
    }
  }, [timing]);

  return isTriggered;
}
