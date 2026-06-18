import { createServerSupabaseClient } from '@/lib/supabase-server';
import MenuShowcase from '@/components/MenuShowcase';

export default async function MenuHighlightsBlock({ data }) {
  const supabase = await createServerSupabaseClient();
  
  // Fetch top 3 most popular items or just random 3 items for highlights
  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_available', true)
    .limit(3);

  if (!menuItems || menuItems.length === 0) return null;

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {data.title && <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', color: '#fff' }}>{data.title}</h2>}
      <MenuShowcase initialMenu={menuItems} />
    </div>
  );
}
