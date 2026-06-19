import { getJournalBySlug, getJournalSlugs } from '@/lib/cms';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = getJournalSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const journal = getJournalBySlug(resolvedParams.slug);
  if (!journal) return { title: 'Not Found' };
  
  return {
    title: `${journal.title} | Yako London Journal`,
    description: journal.excerpt,
  };
}

export default async function JournalArticle({ params }) {
  const resolvedParams = await params;
  const journal = getJournalBySlug(resolvedParams.slug);

  if (!journal) {
    notFound();
  }

  return (
    <div className="dark-theme" style={{ minHeight: '100vh', background: '#0a0908', color: '#e0ded8', paddingBottom: '120px', position: 'relative' }}>
      
      {/* Subtle Vintage Paper/Noise Texture Overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        opacity: 0.04,
        pointerEvents: 'none',
        zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* Article Hero */}
      <header style={{ 
        paddingTop: '120px', 
        paddingBottom: '60px', 
        textAlign: 'center',
        borderBottom: '3px double rgba(255,255,255,0.1)',
        background: 'linear-gradient(to bottom, #12100e 0%, transparent 100%)',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <Link href="/journal" style={{ color: '#A1A1AA', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', transition: 'color 0.2s' }} className="hover-scale">
              <ArrowLeft size={16} /> Back to Journal
            </Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
              {journal.author}
            </span>
            <span style={{ color: '#444' }}>|</span>
            <time style={{ fontSize: '0.9rem', color: '#A1A1AA', letterSpacing: '1px' }}>
              {new Date(journal.date).toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            lineHeight: 1.05, 
            marginBottom: '2rem',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            fontStyle: 'italic',
            letterSpacing: '-1px',
            color: '#f0ece1',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            {journal.title}
          </h1>

          <div style={{ width: '60px', height: '2px', background: 'var(--primary)', margin: '0 auto 2rem auto' }}></div>

          <p style={{ fontSize: '1.25rem', color: '#c4c1b9', lineHeight: 1.6, maxWidth: '650px', margin: '0 auto', fontFamily: 'var(--font-sans)', fontWeight: 300 }}>
            {journal.excerpt}
          </p>
        </div>
      </header>

      {/* Article Body */}
      <article className="container" style={{ maxWidth: '680px', marginTop: '60px', position: 'relative', zIndex: 1 }}>
        
        {/* Custom Prose Styles for Markdown */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

          .prose {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 1.25rem;
            line-height: 1.9;
            color: #dcdad2;
            text-align: justify;
            hyphens: auto;
          }

          /* Newspaper Drop Cap Effect */
          .prose > p:first-of-type::first-letter {
            float: left;
            font-size: 5.5rem;
            line-height: 0.8;
            padding-right: 0.75rem;
            padding-top: 0.2rem;
            color: var(--primary);
            font-weight: 700;
            text-shadow: 2px 2px 0px rgba(255, 100, 0, 0.2);
          }

          .prose h2 {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 2.5rem;
            color: #f0ece1;
            margin-top: 4rem;
            margin-bottom: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            line-height: 1.2;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 0.5rem;
          }

          .prose h3 {
            font-family: var(--font-sans);
            font-size: 1.3rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--primary);
            margin-top: 3rem;
            margin-bottom: 1rem;
            font-weight: 600;
          }

          .prose p {
            margin-bottom: 2rem;
          }

          /* Vivid keywords to hook audience */
          .prose strong {
            color: #ff9100;
            font-weight: 600;
            font-family: var(--font-sans);
            text-transform: uppercase;
            font-size: 0.9em;
            letter-spacing: 1px;
            background: rgba(255, 145, 0, 0.1);
            padding: 2px 6px;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(255, 145, 0, 0.1);
          }

          .prose ul {
            margin-bottom: 2.5rem;
            padding-left: 2rem;
            list-style-type: square;
          }

          .prose li {
            margin-bottom: 0.8rem;
          }

          .prose li::marker {
            color: #ff9100;
          }

          /* Elegant italic highlights */
          .prose em {
            color: #e2c792;
            font-style: italic;
            font-size: 1.1em;
          }
          
          .prose hr {
            border: 0;
            border-top: 2px dashed rgba(255,255,255,0.1);
            margin: 3rem 0;
          }
        `}</style>
        
        <div className="prose">
          <ReactMarkdown>{journal.content}</ReactMarkdown>
        </div>
        
      </article>

    </div>
  );
}
