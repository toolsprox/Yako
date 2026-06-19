import Link from 'next/link';
import { getAllJournals } from '@/lib/cms';

export const metadata = {
  title: 'Journal | Stories from Sri Lanka',
  description: 'Explore the rich history, recipes, and cultural stories behind authentic Sri Lankan cuisine.',
};

export default function JournalIndex() {
  const journals = getAllJournals();
  return (
    <>
    <style>{`
      .journal-hub-container {
        min-height: 100vh;
        padding-top: 120px;
        padding-bottom: 100px;
        background: var(--background);
      }
      @media (max-width: 768px) {
        .journal-hub-container {
          padding-top: 80px;
          padding-bottom: 60px;
        }
      }
    `}</style>
    <div className="dark-theme journal-hub-container">
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="font-script" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--primary)', marginBottom: '1rem' }}>
            The Journal
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--foreground)', opacity: 0.8, maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Explore the rich history, recipes, and cultural stories behind authentic Sri Lankan cuisine.
          </p>
        </header>

        {journals.length === 0 ? (
          <div style={{ textAlign: 'center', opacity: 0.5 }}>
            <p>No journal entries found yet. Check back soon!</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', 
            gap: '2rem' 
          }}>
            {journals.map((journal) => (
              <Link 
                key={journal.slug} 
                href={`/journal/${journal.slug}`}
                className="hover-scale"
                style={{ textDecoration: 'none' }}
              >
                <article style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.05)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Decorative Header (Fallback for Cover Image) */}
                  <div style={{ 
                    height: '220px', 
                    background: 'linear-gradient(135deg, rgba(255,100,0,0.2) 0%, rgba(0,0,0,1) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                     <div style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,100,0,0.4) 0%, transparent 50%)' }}></div>
                  </div>
                  
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                        {journal.author}
                      </span>
                      <time style={{ fontSize: '0.85rem', color: '#A1A1AA' }}>
                        {new Date(journal.date).toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </time>
                    </div>
                    
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem', lineHeight: 1.3 }}>
                      {journal.title}
                    </h2>
                    
                    <p style={{ color: '#A1A1AA', fontSize: '1rem', lineHeight: 1.6, flex: 1 }}>
                      {journal.excerpt}
                    </p>
                    
                    <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                      Read Article <span style={{ color: 'var(--primary)' }}>&rarr;</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
