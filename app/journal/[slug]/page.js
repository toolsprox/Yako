import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import BlockRenderer from '@/components/cms/BlockRenderer';
import StructuredData from '@/components/StructuredData';

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata({ params }) {
  const supabase = await createServerSupabaseClient();
  const resolvedParams = await params;
  const slug = `/journal/${resolvedParams.slug}`;

  const { data: page } = await supabase
    .from('pages')
    .select('title, meta_description, updated_at')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!page) {
    return {
      title: 'Article Not Found | Yako London',
    };
  }

  return {
    title: `${page.title} | Yako London Journal`,
    description: page.meta_description || 'Explore authentic Sri Lankan culture and recipes at Yako London.',
    alternates: {
      canonical: `https://www.yakolondon.com${slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.meta_description,
      type: 'article',
      publishedTime: page.updated_at,
    }
  };
}

export default async function JournalArticlePage({ params }) {
  const supabase = await createServerSupabaseClient();
  const resolvedParams = await params;
  const slug = `/journal/${resolvedParams.slug}`;

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

  // Weaponized Schema for Articles
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": page.title,
    "description": page.meta_description || 'Yako London Journal Article',
    "image": "https://www.yakolondon.com/og-image.jpg",  
    "author": {
      "@type": "Organization",
      "name": "Yako London",
      "url": "https://www.yakolondon.com/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Yako London",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.yakolondon.com/logo.png"
      }
    },
    "datePublished": page.created_at,
    "dateModified": page.updated_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.yakolondon.com${slug}`
    }
  };

  return (
    <article style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--background)' }}>
      <StructuredData data={articleSchema} />
      
      {/* Article Header */}
      <header className="container" style={{ maxWidth: '800px', marginBottom: '2rem', textAlign: 'center' }}>
        <h1 className="font-script" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--primary)', marginBottom: '1rem' }}>
          {page.title}
        </h1>
        {page.meta_description && (
          <p style={{ fontSize: '1.2rem', color: 'var(--foreground)', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            {page.meta_description}
          </p>
        )}
        <div style={{ marginTop: '2rem', height: '1px', width: '100px', background: 'var(--primary)', margin: '2rem auto 0', opacity: 0.5 }}></div>
      </header>

      {/* Article Body Content powered by Headless CMS */}
      <BlockRenderer blocks={page.blocks} />
      
      {/* Conversion Funnel at the bottom of the educational article */}
      <div className="container" style={{ maxWidth: '800px', padding: '60px 20px', textAlign: 'center', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 className="font-script" style={{ fontSize: '2.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>
          Taste the Authenticity
        </h3>
        <p style={{ color: 'var(--foreground)', opacity: 0.7, marginBottom: '2rem' }}>
          Don't feel like cooking tonight? Let our chefs make it for you. 
        </p>
        <a href="/#reservations" className="btn-primary" style={{ padding: '12px 32px' }}>
          Book a Table in Pinner
        </a>
      </div>
    </article>
  );
}
