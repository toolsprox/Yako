import { supabase } from '@/lib/supabase';
import HomeClient from '@/components/HomeClient';

// Revalidate public page every 60 seconds so menu updates reflect quickly
export const revalidate = 60;

export default async function Home() {
  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  return <HomeClient menuItems={menuItems || []} />;
}
