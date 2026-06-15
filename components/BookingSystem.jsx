'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function BookingSystem() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    phone: ''
  });

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Show a loading toast
    const loadingToast = toast.loading('Sending reservation request...');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Reservation request sent successfully!', { id: loadingToast });
        
        // Track conversion if analytics are set up
        if (typeof window !== 'undefined' && window.trackConversion) {
          window.trackConversion('booking_request', formData);
        }
        
        // Reset form
        setStep(1);
        setFormData({
          date: '',
          time: '',
          guests: '2',
          name: '',
          phone: ''
        });
      } else {
        toast.error(result.error || 'Failed to send request.', { id: loadingToast });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('A network error occurred. Please try again.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined' && window.trackConversion) {
      window.trackConversion('whatsapp_booking_click', {});
    }
    const message = encodeURIComponent(`Hi, I would like to reserve a table at Yako London.\nDate: ${formData.date || '[Date]'}\nTime: ${formData.time || '[Time]'}\nGuests: ${formData.guests}`);
    window.open(`https://wa.me/447000000000?text=${message}`, '_blank');
  };

  const labelStyle = { 
    fontSize: '0.9rem', 
    color: '#D1D5DB', 
    fontWeight: 400, 
    marginBottom: '8px',
    fontFamily: 'var(--font-sans)',
    letterSpacing: '0.5px'
  };

  const inputInlineStyle = { 
    width: '100%', 
    fontFamily: 'var(--font-sans)',
    colorScheme: 'dark'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
        <h3 className="font-script" style={{ fontSize: '2.5rem', color: 'var(--foreground)' }}>Book a Table</h3>
        <span style={{ color: 'var(--primary)', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>Step {step} of 2</span>
      </div>

      <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {step === 1 ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Date</label>
              <input 
                type="date" 
                required
                className="glass-input"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                style={inputInlineStyle}
              />
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Time</label>
                <input 
                  type="time" 
                  required
                  className="glass-input"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  style={inputInlineStyle}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Guests</label>
                <select 
                  className="glass-input"
                  value={formData.guests}
                  onChange={e => setFormData({...formData, guests: e.target.value})}
                  style={{ ...inputInlineStyle, appearance: 'none' }}
                >
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} People</option>)}
                  <option value="9+">9+ (Group)</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Full Name</label>
              <input 
                type="text" 
                required
                className="glass-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={inputInlineStyle}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Phone Number</label>
              <input 
                type="tel" 
                required
                className="glass-input"
                placeholder="+44 7000 000000"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                style={inputInlineStyle}
              />
            </div>
          </>
        )}

        <button 
          type="submit" 
          className="btn-primary" 
          style={{ width: '100%', marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
          disabled={isSubmitting}
        >
          {step === 1 ? 'Continue' : (isSubmitting ? 'Sending...' : 'Request Reservation')}
        </button>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0' }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        <span style={{ color: '#A1A1AA', fontSize: '0.85rem', fontWeight: 500, fontFamily: 'var(--font-sans)', letterSpacing: '1px' }}>OR</span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
      </div>

      <button onClick={handleWhatsApp} className="btn-outline" style={{ width: '100%', color: '#25D366', borderColor: 'rgba(37, 211, 102, 0.4)' }} type="button">
        Book via WhatsApp
      </button>
    </div>
  );
}
