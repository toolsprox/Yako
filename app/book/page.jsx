import BookingSystem from '@/components/BookingSystem';

export const metadata = {
  title: 'Book a Table | Yako London',
  description: 'Reserve your table at Yako London. Experience the true taste of authentic Sri Lankan cuisine in Pinner.',
};

export default function BookPage() {
  return (
    <div className="section container" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="font-script heading-lg mb-4" style={{ textTransform: 'uppercase' }}>Reservations</h2>
          <div style={{ height: '3px', width: '60px', background: 'var(--primary)', margin: '0 auto', borderRadius: '3px', marginBottom: '1.5rem' }}></div>
          <p style={{ color: '#A1A1AA', lineHeight: 1.6, fontSize: '1.05rem' }}>
            Whether it's an intimate dinner or a grand celebration, our table is yours. Experience the warmth of Sri Lankan hospitality.
          </p>
        </div>
        
        <BookingSystem />
      </div>
    </div>
  );
}
