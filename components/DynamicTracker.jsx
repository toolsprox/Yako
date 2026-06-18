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
        if (script.provider === 'google_analytics' || script.provider === 'ga4') {
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

        if (script.provider === 'meta_pixel' || script.provider === 'fbpixel') {
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

        if (script.provider === 'tiktok_pixel') {
          return (
            <Script id={`tiktok-${script.id}`} strategy="afterInteractive" key={script.id}>
              {`
                !function (w, d, t) {
                  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                  ttq.load('${script.tracking_code}');
                  ttq.page();
                }(window, document, 'ttq');
              `}
            </Script>
          );
        }

        if (script.provider === 'linkedin_insight') {
          return (
            <Script id={`linkedin-${script.id}`} strategy="afterInteractive" key={script.id}>
              {`
                _linkedin_partner_id = "${script.tracking_code}";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);
                (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);})(window.lintrk);
              `}
            </Script>
          );
        }

        if (script.provider === 'gtm') {
          return (
            <div key={script.id}>
              <Script id={`gtm-${script.id}`} strategy="afterInteractive">
                {`
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${script.tracking_code}');
                `}
              </Script>
            </div>
          );
        }

        if (script.provider === 'hotjar') {
          return (
            <Script id={`hotjar-${script.id}`} strategy="afterInteractive" key={script.id}>
              {`
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:${script.tracking_code},hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
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
