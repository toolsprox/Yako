'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';

// Generate UUID v4
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = "Unknown";
  if (ua.indexOf("Firefox") > -1) browser = "Firefox";
  else if (ua.indexOf("SamsungBrowser") > -1) browser = "Samsung Internet";
  else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browser = "Opera";
  else if (ua.indexOf("Trident") > -1) browser = "Internet Explorer";
  else if (ua.indexOf("Edge") > -1) browser = "Edge";
  else if (ua.indexOf("Chrome") > -1) browser = "Chrome";
  else if (ua.indexOf("Safari") > -1) browser = "Safari";
  return browser;
}

function getOSInfo() {
  const ua = navigator.userAgent;
  if (ua.indexOf("Win") !== -1) return "Windows";
  if (ua.indexOf("Mac") !== -1) return "MacOS";
  if (ua.indexOf("X11") !== -1) return "UNIX";
  if (ua.indexOf("Linux") !== -1) return "Linux";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  return "Unknown";
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
  return "Desktop";
}

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const supabase = createBrowserSupabaseClient();
  const hasTrackedInitialLoad = useRef(false);

  useEffect(() => {
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
    
    const trackEvent = async (eventType) => {
      let mappedEventType = 'page_view';
      if (pathname.includes('menu')) mappedEventType = 'menu_view';
      if (pathname.includes('gallery')) mappedEventType = 'gallery_view';

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
        p_landing_page: window.location.href
      });
    };

    trackEvent();

    const interval = setInterval(() => {
      trackEvent('heartbeat');
    }, 10000);

    return () => clearInterval(interval);
  }, [pathname, searchParams]);

  useEffect(() => {
    window.trackYakoEvent = async (eventType, eventData = {}) => {
      const visitorId = localStorage.getItem('yako_visitor_id');
      const sessionId = sessionStorage.getItem('yako_session_id');
      if (visitorId && sessionId) {
        await supabase.rpc('track_event', {
          p_visitor_id: visitorId,
          p_session_id: sessionId,
          p_event_type: eventType,
          p_event_data: eventData,
          p_device_type: getDeviceType(),
          p_browser: getBrowserInfo(),
          p_os: getOSInfo(),
          p_source: '', p_referrer: '', p_landing_page: ''
        });
      }
    };
  }, []);

  return null;
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
