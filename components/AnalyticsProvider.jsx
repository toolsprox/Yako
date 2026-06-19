'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import Script from 'next/script';

// Generate UUID v4
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Generate Simple Hash for Fingerprint
async function generateFingerprintHash(text) {
  const msgBuffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate Dummy Name
function generateDummyName() {
  const adjectives = ['Curious', 'Silent', 'Golden', 'Mystic', 'Clever', 'Swift', 'Brave', 'Shadow', 'Azure', 'Crimson'];
  const animals = ['Owl', 'Fox', 'Eagle', 'Tiger', 'Wolf', 'Panther', 'Lion', 'Falcon', 'Hawk', 'Bear'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const anim = animals[Math.floor(Math.random() * animals.length)];
  return `${adj} ${anim}`;
}

// Device detection helpers
const getDeviceType = () => {
  if (typeof window === 'undefined') return 'Desktop';
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'Tablet';
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'Mobile';
  return 'Desktop';
};

const getBrowserInfo = () => {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Other';
};

const getOSInfo = () => {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'MacOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('like Mac')) return 'iOS';
  return 'Other';
};

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const supabase = createBrowserSupabaseClient();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    // Setup visitor and session IDs
    let visitorId = localStorage.getItem('yako_visitor_id');
    if (!visitorId) {
      visitorId = uuidv4();
      localStorage.setItem('yako_visitor_id', visitorId);
    }

    let sessionId = sessionStorage.getItem('yako_session_id');
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem('yako_session_id', sessionId);
    }

    const source = searchParams.get('utm_source') || (document.referrer ? new URL(document.referrer).hostname : 'Direct');
    
    // Function to ping RPC
    const trackEvent = async (eventType) => {
      let mappedEventType = 'page_view';
      if (pathname.includes('menu')) mappedEventType = 'menu_view';
      if (pathname.includes('gallery')) mappedEventType = 'gallery_view';
      if (pathname.includes('locations')) mappedEventType = 'location_view';
      if (pathname.includes('journal')) mappedEventType = 'article_view';

      // Get Geo data if it exists
      const city = localStorage.getItem('yako_geo_city') || '';
      const country = localStorage.getItem('yako_geo_country') || '';
      const lat = localStorage.getItem('yako_geo_lat') || null;
      const lng = localStorage.getItem('yako_geo_lng') || null;
      const fingerprint = localStorage.getItem('yako_fingerprint') || '';
      const dummyName = localStorage.getItem('yako_dummy_name') || '';

      // Sync with Clarity
      if (typeof window !== 'undefined' && window.clarity) {
        window.clarity("set", "visitor_id", visitorId);
        window.clarity("set", "dummy_name", dummyName);
        window.clarity("identify", visitorId);
      }

      await supabase.rpc('track_event', {
        p_visitor_id: visitorId,
        p_session_id: sessionId,
        p_event_type: eventType || mappedEventType,
        p_event_data: { path: pathname },
        p_device_type: getDeviceType(),
        p_browser: getBrowserInfo(),
        p_os: getOSInfo(),
        p_source: source,
        p_referrer: document.referrer || '',
        p_landing_page: window.location.href,
        p_city: city,
        p_country: country,
        p_lat: lat,
        p_lng: lng,
        p_dummy_name: dummyName,
        p_fingerprint: fingerprint
      });
    };

    // Track page view instantly on route change
    const initTracking = () => {
      if (!localStorage.getItem('yako_dummy_name')) {
        localStorage.setItem('yako_dummy_name', generateDummyName());
      }

      // 1. FIRE INSTANTLY: Do not wait for any API calls to track the page view
      trackEvent();

      // 2. BACKGROUND FETCH: If we don't have geo data, fetch it asynchronously
      if (!localStorage.getItem('yako_geo_city') || !localStorage.getItem('yako_geo_lat')) {
        fetch('https://get.geojs.io/v1/ip/geo.json')
          .then(res => res.json())
          .then(async (data) => {
            if (data.city) localStorage.setItem('yako_geo_city', data.city);
            if (data.country) localStorage.setItem('yako_geo_country', data.country);
            if (data.latitude) localStorage.setItem('yako_geo_lat', data.latitude);
            if (data.longitude) localStorage.setItem('yako_geo_lng', data.longitude);
            
            if (data.ip) {
              const rawFingerprint = `${data.ip}-${navigator.userAgent}-${window.screen.width}x${window.screen.height}`;
              const hash = await generateFingerprintHash(rawFingerprint);
              localStorage.setItem('yako_fingerprint', hash);
            }
            
            // 3. BACKFILL INSTANTLY: Fire a lightweight update to inject the new coordinates into Supabase
            trackEvent('location_update');
          })
          .catch(e => console.error("Geo fetch failed:", e));
      }
    };

    initTracking();

    const interval = setInterval(() => {
      trackEvent('heartbeat');
    }, 30000); // 30s heartbeat

    let hasFiredLeave = false;

    // Track the exact moment the user leaves the page or closes the tab
    // We use both visibilitychange (desktop) and pagehide (mobile/iOS)
    const handlePageLeave = (e) => {
      if (!hasFiredLeave && (document.visibilityState === 'hidden' || e?.type === 'pagehide')) {
        hasFiredLeave = true;
        trackEvent('page_leave');
      }
    };
    
    document.addEventListener('visibilitychange', handlePageLeave);
    window.addEventListener('pagehide', handlePageLeave);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handlePageLeave);
      window.removeEventListener('pagehide', handlePageLeave);
    };
  }, [pathname, searchParams]);

  // Expose track manual to window for global access
  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    window.trackYakoEvent = async (eventType, eventData = {}) => {
      const visitorId = localStorage.getItem('yako_visitor_id');
      const sessionId = sessionStorage.getItem('yako_session_id');
      const city = localStorage.getItem('yako_geo_city') || '';
      const country = localStorage.getItem('yako_geo_country') || '';
      const lat = localStorage.getItem('yako_geo_lat') || null;
      const lng = localStorage.getItem('yako_geo_lng') || null;
      const fingerprint = localStorage.getItem('yako_fingerprint') || '';
      const dummyName = localStorage.getItem('yako_dummy_name') || '';
      
      if (visitorId && sessionId) {
        await supabase.rpc('track_event', {
          p_visitor_id: visitorId,
          p_session_id: sessionId,
          p_event_type: eventType,
          p_event_data: eventData,
          p_device_type: getDeviceType(),
          p_browser: getBrowserInfo(),
          p_os: getOSInfo(),
          p_source: '', p_referrer: '', p_landing_page: '',
          p_city: city, p_country: country,
          p_lat: lat, p_lng: lng,
          p_dummy_name: dummyName,
          p_fingerprint: fingerprint
        });
      }
    };
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <Script id="clarity-script" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "x7w4u3v357");
      `}
    </Script>
  );
}

export default function AnalyticsProvider({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  );
}
