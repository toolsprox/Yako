'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';

export default function DynamicTracker() {
  const pathname = usePathname();
  const [scripts, setScripts] = useState([]);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const fetchScripts = async () => {
      const { data } = await supabase
        .from('tracking_scripts')
        .select('*')
        .eq('is_active', true);
      
      if (data) setScripts(data);
    };

    fetchScripts();
  }, [supabase]);

  // Evaluate if a script should be rendered on the current path
  const shouldRenderScript = (script) => {
    if (!script.triggers || !Array.isArray(script.triggers)) return false;
    
    return script.triggers.some(trigger => {
      if (trigger.type === 'global') return true;
      if (trigger.type === 'path' && trigger.value && pathname === trigger.value) return true;
      if (trigger.type === 'path' && trigger.value && pathname.startsWith(trigger.value)) return true;
      // Event triggers are handled separately if needed, but for rendering the base script, we ignore them or assume it means we inject it globally so it's ready for the event.
      // For V1 simplicity, if a script ONLY has an event trigger, we won't inject the base script here unless they also added global.
      return false;
    });
  };

  return (
    <>
      {scripts.filter(shouldRenderScript).map(script => {
        if (script.provider === 'ga4') {
          return (
            <div key={script.id}>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${script.tracking_code}`} strategy="afterInteractive" />
              <Script id={`ga4-${script.id}`} strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${script.tracking_code}');
                `}
              </Script>
            </div>
          );
        }

        if (script.provider === 'fbpixel') {
          return (
            <Script id={`fb-${script.id}`} strategy="afterInteractive" key={script.id}>
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${script.tracking_code}');
                fbq('track', 'PageView');
              `}
            </Script>
          );
        }

        if (script.provider === 'custom_html') {
          // Note: using dangerouslySetInnerHTML for custom scripts
          return (
            <div key={script.id} dangerouslySetInnerHTML={{ __html: script.tracking_code }} />
          );
        }

        return null;
      })}
    </>
  );
}
