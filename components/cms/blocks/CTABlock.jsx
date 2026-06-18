import Link from 'next/link';

export default function CTABlock({ data }) {
  return (
    <div style={{ padding: '80px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#fff' }}>{data.title}</h2>
      {data.button_text && data.button_link && (
        <Link 
          href={data.button_link}
          style={{
            display: 'inline-block', background: 'var(--primary)', color: '#fff',
            padding: '15px 40px', borderRadius: '30px', textDecoration: 'none',
            fontWeight: 600, letterSpacing: '1px', transition: 'all 0.3s'
          }}
        >
          {data.button_text}
        </Link>
      )}
    </div>
  );
}
