import AboutClient from '@/components/AboutClient';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'About Us | Yako London',
  description: 'Discover the heritage behind Yako London. A true melting pot of cultures and authentic Sri Lankan home cooking.',
};

export const revalidate = 60;

export default async function AboutPage() {
  const { data } = await supabase.from('site_content').select('*').like('section_key', 'about_%');
  
  const content = data?.reduce((acc, row) => {
    acc[row.section_key] = row.content_value;
    return acc;
  }, {}) || {};

  return <AboutClient content={content} />;
}
