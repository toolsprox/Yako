export default function TextBlock({ data }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
      <div 
        style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#e4e4e7' }}
        dangerouslySetInnerHTML={{ __html: data.content }} 
      />
    </div>
  );
}
