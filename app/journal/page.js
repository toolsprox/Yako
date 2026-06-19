import { createServerSupabaseClient } from '@/lib/supabase-server';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';

export const metadata = {
  title: 'Journal & Recipes | Yako London',
  description: 'Discover authentic Sri Lankan recipes, cultural stories, and the history behind our most popular dishes at Yako London.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function JournalIndex() {
  const supabase = await createServerSupabaseClient();
  
  // We fetch pages where slug starts with /journal/ OR maybe we add a 'type' column to Supabase later.
  // For now, let's fetch all published pages and filter those we designate as articles if they have a specific tag.
  // Since we don't have a 'type' column, we will query pages whose slug begins with '/journal/'
  
  const { data: articles } = await supabase
    .from('pages')
    .select('title, slug, meta_description, updated_at')
    .eq('status', 'published')
    .like('slug', '/journal/%')
    .order('updated_at', { ascending: false });

  const safeArticles = articles || [];

  // Generate ItemList Schema for the Index Page
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": safeArticles.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.yakolondon.com${article.slug}`
    }))
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--background)' }}>
      <StructuredData data={itemListSchema} />
      
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 className="font-script" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--primary)', marginBottom: '1rem', textAlign: 'center' }}>
          The Journal
        </h1>
        <p style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--foreground)', opacity: 0.8, marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
          Recipes, cultural stories, and the history behind authentic Sri Lankan cooking.
        </p>

        {safeArticles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {safeArticles.map((article) => (
              <Link key={article.slug} href={article.slug} style={{ textDecoration: 'none' }}>
                <div 
                  className="glass hover-scale" 
                  style={{ 
                    padding: '30px', 
                    borderRadius: '12px', 
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255,255,255,0.05)' 
                  }}
                >
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{article.title}</h2>
                  <p style={{ color: 'var(--foreground)', opacity: 0.7, marginBottom: '1rem', lineHeight: 1.5 }}>
                    {article.meta_description || "Read more about this topic..."}
                  </p>
                  <span style={{ fontSize: '0.85rem', color: 'var(--foreground)', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {new Date(article.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
