import ContactClient from '@/components/ContactClient';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Contact Us | Yako London',
  description: 'Get in touch with Yako London. Find our location in Pinner, opening hours, and contact information for reservations and events.',
};

export const revalidate = 60;

export default async function ContactPage() {
  const { data } = await supabase.from('site_content').select('*').like('section_key', 'contact_%');
  
  const content = data?.reduce((acc, row) => {
    acc[row.section_key] = row.content_value;
    return acc;
  }, {}) || {};

  return <ContactClient content={content} />;
}
