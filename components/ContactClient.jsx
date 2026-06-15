'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Car, Train } from 'lucide-react';
import toast from 'react-hot-toast';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function ContactClient({ content }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      toast.success('Message sent! We will get back to you shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const inputStyle = { width: '100%', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', colorScheme: 'dark' };
  const labelStyle = { display: 'block', marginBottom: '0.5rem', color: '#D1D5DB', fontSize: '0.9rem' };

  return (
    <div style={{ paddingBottom: '100px', overflowX: 'hidden', position: 'relative', minHeight: '100vh', paddingTop: '120px' }}>
      
      {/* Background Aurora / Gradient Orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -2, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-20%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(204, 0, 0, 0.08) 0%, transparent 70%)', filter: 'blur(80px)', opacity: 0.8 }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '0%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)', filter: 'blur(60px)', opacity: 0.8 }}></div>
      </div>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E")' }}></div>

      <div className="container">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h1 className="font-script heading-xl mb-4" style={{ textTransform: 'uppercase' }}>{content?.contact_hero_title || 'Contact Us'}</h1>
          <div style={{ height: '3px', width: '60px', background: 'var(--primary)', margin: '0 auto', borderRadius: '3px' }}></div>
          <p 
            style={{ color: '#D1D5DB', marginTop: '1.5rem', fontSize: '1.1rem', maxWidth: '600px', margin: '1.5rem auto 0' }}
            dangerouslySetInnerHTML={{ __html: content?.contact_hero_subtitle || 'Get in touch with us.' }}
          />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          
          {/* Details & Map */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div className="glass" style={{ padding: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div className="glass-icon"><MapPin color="var(--primary)" size={24} /></div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem', color: 'var(--foreground)' }}>Location</h4>
                    <p style={{ color: '#A1A1AA', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: content?.contact_address || 'YAKO<br/>Pinner' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div className="glass-icon"><Clock color="var(--primary)" size={24} /></div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem', color: 'var(--foreground)' }}>Opening Hours</h4>
                    <p style={{ color: '#A1A1AA', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: content?.contact_hours || 'Mon-Sun' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div className="glass-icon"><Phone color="var(--primary)" size={24} /></div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem', color: 'var(--foreground)' }}>Call Us</h4>
                    <p style={{ color: '#A1A1AA', lineHeight: 1.5 }}>{content?.contact_phone || '020 8429 3778'}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div className="glass-icon"><Mail color="var(--primary)" size={24} /></div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1.1rem', color: 'var(--foreground)' }}>Email</h4>
                    <p style={{ color: '#A1A1AA', lineHeight: 1.5 }}>{content?.contact_email || 'info@yakolondon.com'}</p>
                  </div>
                </div>
                <div style={{ height: '1px', width: '100%', background: 'rgba(255,255,255,0.05)' }}></div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div className="glass-icon"><Train color="#A1A1AA" size={20} /></div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1rem', color: 'var(--foreground)' }}>Nearest Station</h4>
                    <p style={{ color: '#A1A1AA', lineHeight: 1.5, fontSize: '0.9rem' }}>{content?.contact_transport || 'Pinner Station'}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div className="glass-icon"><Car color="#A1A1AA" size={20} /></div>
                  <div>
                    <h4 style={{ marginBottom: '4px', fontSize: '1rem', color: 'var(--foreground)' }}>Parking</h4>
                    <p style={{ color: '#A1A1AA', lineHeight: 1.5, fontSize: '0.9rem' }}>{content?.contact_parking || 'Street parking available'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embedded */}
            <div className="glass" style={{ padding: '10px', height: '300px', overflow: 'hidden' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2478.261907722744!2d-0.383186!3d51.599982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487614e5b9f71c9b%3A0x7d6f5f3e9b0b4b0!2s6%20High%20St%2C%20Pinner%20HA5%205PW%2C%20UK!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '8px', filter: 'invert(90%) hue-rotate(180deg) brightness(80%) contrast(120%)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="glass"
            style={{ padding: '40px' }}
          >
            <h3 className="font-script" style={{ fontSize: '2rem', marginBottom: '2rem', color: '#fff' }}>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input 
                  type="text" 
                  required 
                  className="glass-input" 
                  style={inputStyle}
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="glass-input" 
                  style={inputStyle}
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label style={labelStyle}>Subject</label>
                <select 
                  className="glass-input" 
                  style={{ ...inputStyle, appearance: 'auto' }}
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                >
                  <option value="">General Inquiry</option>
                  <option value="private_event">Private Events & Catering</option>
                  <option value="dietary">Dietary Requirements</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea 
                  required
                  className="glass-input" 
                  style={{ ...inputStyle, height: '150px', resize: 'vertical' }}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '1.1rem', opacity: isSubmitting ? 0.7 : 1 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
