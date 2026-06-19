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
    <div className="dark-theme" style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', paddingBottom: '120px' }}>
      
      {/* Article Hero */}
      <header style={{ 
        paddingTop: '120px', 
        paddingBottom: '60px', 
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'linear-gradient(to bottom, rgba(15,15,15,1) 0%, rgba(20,20,20,0) 100%)'
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
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            lineHeight: 1.1, 
            marginBottom: '2rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            letterSpacing: '-1px'
          }}>
            {journal.title}
          </h1>

          <p style={{ fontSize: '1.25rem', color: '#A1A1AA', lineHeight: 1.6, maxWidth: '650px', margin: '0 auto' }}>
            {journal.excerpt}
          </p>
        </div>
      </header>

      {/* Article Body */}
      <article className="container" style={{ maxWidth: '720px', marginTop: '60px' }}>
        
        {/* Custom Prose Styles for Markdown */}
        <style>{`
          .prose {
            font-family: var(--font-sans);
            font-size: 1.15rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.85);
          }
          .prose h2 {
            font-size: 2.2rem;
            color: #fff;
            margin-top: 3.5rem;
            margin-bottom: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            line-height: 1.3;
          }
          .prose h3 {
            font-size: 1.5rem;
            color: #fff;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            font-weight: 600;
          }
          .prose p {
            margin-bottom: 2rem;
          }
          .prose strong {
            color: #fff;
            font-weight: 600;
          }
          .prose ul {
            margin-bottom: 2rem;
            padding-left: 1.5rem;
          }
          .prose li {
            margin-bottom: 0.5rem;
          }
          .prose li::marker {
            color: var(--primary);
          }
          .prose em {
            color: #D1D5DB;
            font-style: italic;
          }
        `}</style>
        
        <div className="prose">
          <ReactMarkdown>{journal.content}</ReactMarkdown>
        </div>
        
      </article>

    </div>
  );
}
