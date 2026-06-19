import { createClient } from '@supabase/supabase-js';
import { neighborhoods } from '@/lib/seo/neighborhoods';

export default async function sitemap() {
  const baseUrl = 'https://www.yakolondon.com';

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/#menu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#reservations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Programmatic Location Pages
  const locationRoutes = neighborhoods.map((n) => ({
    url: `${baseUrl}/locations/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  try {
    // Attempt to fetch dynamic CMS pages from Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data: pages } = await supabase
        .from('pages')
        .select('slug, updated_at')
        .eq('status', 'published');

      if (pages && pages.length > 0) {
        const dynamicRoutes = pages.map((page) => ({
          url: `${baseUrl}/${page.slug}`,
          lastModified: new Date(page.updated_at),
          changeFrequency: 'weekly',
          priority: 0.7,
        }));
        
        return [...staticRoutes, ...locationRoutes, ...dynamicRoutes];
      }
    }
  } catch (error) {
    console.error('Failed to generate dynamic sitemap routes:', error);
  }

  return [...staticRoutes, ...locationRoutes];
}
