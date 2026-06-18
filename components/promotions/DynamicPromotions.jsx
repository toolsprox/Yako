'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import GlassPopup from './GlassPopup';
import TopAnnouncementBar from './TopAnnouncementBar';
import Effects from './Effects';

export default function DynamicPromotions() {
  const pathname = usePathname();
  const [promotions, setPromotions] = useState([]);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const fetchPromotions = async () => {
      const { data } = await supabase
        .from('site_promotions')
        .select('*')
        .eq('is_active', true);
      
      if (data) setPromotions(data);
    };

    fetchPromotions();
  }, [supabase]);

  // Evaluate if a promotion should be rendered on the current path
  const shouldRenderPromo = (promo) => {
    if (!promo.triggers || !Array.isArray(promo.triggers)) return false;
    
    return promo.triggers.some(trigger => {
      if (trigger.type === 'global') return true;
      if (trigger.type === 'path' && trigger.value && pathname === trigger.value) return true;
      if (trigger.type === 'path' && trigger.value && pathname.startsWith(trigger.value) && trigger.value !== '/') return true;
      return false;
    });
  };

  return (
    <>
      {promotions.filter(shouldRenderPromo).map(promo => {
        if (promo.promo_type === 'popup') {
          return <GlassPopup key={promo.id} promotion={promo} />;
        }
        if (promo.promo_type === 'top_bar') {
          return <TopAnnouncementBar key={promo.id} promotion={promo} />;
        }
        if (promo.promo_type === 'effect_confetti' || promo.promo_type === 'effect_snow') {
          return <Effects key={promo.id} type={promo.promo_type} />;
        }
        return null;
      })}
    </>
  );
}
