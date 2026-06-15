/**
 * Basic Visitor Analytics Tracking Structure for Yako London Platform
 * This will eventually integrate with a backend service like Supabase or PostHog
 */

export const trackPageView = (url) => {
  if (typeof window !== 'undefined') {
    console.log(`[Analytics] Page View: ${url}`);
    // Future: Send to backend (e.g., fetch('/api/analytics/pageview', { method: 'POST', body: JSON.stringify({ url }) }))
  }
};

export const trackConversion = (type, data) => {
  if (typeof window !== 'undefined') {
    console.log(`[Analytics] Conversion Event: ${type}`, data);
    // Future: Send to backend
  }
};

export const initAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Expose tracking globally for easy integration in inline scripts
    window.trackConversion = trackConversion;
    
    // Track initial page view
    trackPageView(window.location.pathname);

    // Basic session tracking setup
    const sessionId = sessionStorage.getItem('yako_session_id') || crypto.randomUUID();
    sessionStorage.setItem('yako_session_id', sessionId);
    console.log(`[Analytics] Session Initialized: ${sessionId}`);
  }
};
