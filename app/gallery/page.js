import GalleryClient from '@/components/GalleryClient';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Gallery | Yako London',
  description: 'A visual journey through the exquisite flavors and sophisticated ambiance of Yako London.',
};

export const revalidate = 60;

export default async function GalleryPage() {
  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  return <GalleryClient initialImages={images || []} />;
}
