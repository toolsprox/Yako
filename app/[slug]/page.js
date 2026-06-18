import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import BlockRenderer from '@/components/cms/BlockRenderer';

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata({ params }) {
  const supabase = await createServerSupabaseClient();
  const slug = `/${params.slug}`;

  const { data: page } = await supabase
    .from('pages')
    .select('title, meta_description')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!page) {
    return {
      title: 'Page Not Found | Yako London',
    };
  }

  return {
    title: `${page.title} | Yako London`,
    description: page.meta_description || 'Yako London - Premium Dining Experience',
  };
}

export default async function DynamicCMSPage({ params }) {
  const supabase = await createServerSupabaseClient();
  const slug = `/${params.slug}`;

  // Check if the page exists in the database
  const { data: page, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  // If no page is found for this slug, return a standard 404
  if (error || !page) {
    notFound();
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--background)' }}>
      {/* We pass the JSON blocks into our master renderer */}
      <BlockRenderer blocks={page.blocks} />
    </div>
  );
}
