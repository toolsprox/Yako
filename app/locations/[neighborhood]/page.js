import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import HomeClient from '@/components/HomeClient';
import StructuredData from '@/components/StructuredData';
import { neighborhoods, getNeighborhoodBySlug } from '@/lib/seo/neighborhoods';

// Revalidate public page every 60 seconds
export const revalidate = 60;

// Tell Next.js to pre-render these specific neighborhood pages at build time
export function generateStaticParams() {
  return neighborhoods.map((n) => ({
    neighborhood: n.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const neighborhood = getNeighborhoodBySlug(resolvedParams.neighborhood);
  
  if (!neighborhood) return { title: 'Not Found' };

  return {
    title: `Authentic Sri Lankan Restaurant near ${neighborhood.name} | Yako`,
    description: `Looking for the best Sri Lankan and South Indian food near ${neighborhood.name}? Yako London offers an unforgettable journey of authentic flavors, just ${neighborhood.distance} away.`,
    alternates: {
      canonical: `https://www.yakolondon.com/locations/${neighborhood.slug}`,
    },
    openGraph: {
      title: `Authentic Sri Lankan Restaurant near ${neighborhood.name}`,
      description: `Discover the true taste of home cooking near ${neighborhood.name}.`,
    }
  };
}

export default async function LocationPage({ params }) {
  const resolvedParams = await params;
  const neighborhood = getNeighborhoodBySlug(resolvedParams.neighborhood);

  if (!neighborhood) {
    notFound();
  }

  // Fetch menu for this page
  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  const safeMenuItems = menuItems || [];

  // Group menu for Schema
  const groupedMenu = safeMenuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const menuSections = Object.keys(groupedMenu).map(category => ({
    "@type": "MenuSection",
    "name": category,
    "hasMenuItem": groupedMenu[category].map(item => ({
      "@type": "MenuItem",
      "name": item.name,
      "description": item.description || "",
      "offers": {
        "@type": "Offer",
        "price": item.price.replace(/[^0-9.]/g, ''),
        "priceCurrency": "GBP"
      }
    }))
  }));

  // Hyper-Local Schema targeting the specific neighborhood
  const localRestaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Yako London",
    "image": "https://www.yakolondon.com/og-image.jpg",
    "@id": `https://www.yakolondon.com/locations/${neighborhood.slug}`,
    "url": `https://www.yakolondon.com/locations/${neighborhood.slug}`,
    "telephone": "02084293778",
    "priceRange": "££",
    "menu": "https://www.yakolondon.com/#menu",
    "servesCuisine": "Sri Lankan",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "6 High Street",
      "addressLocality": "Pinner",
      "addressRegion": "London",
      "postalCode": "HA5 5PW",
      "addressCountry": "UK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5954,
      "longitude": -0.3804
    },
    "areaServed": {
      "@type": "City",
      "name": neighborhood.name
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Wednesday", "Thursday"],
        "opens": "17:00",
        "closes": "23:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Friday", "Saturday"],
        "opens": "12:00",
        "closes": "23:59"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "12:00",
        "closes": "22:00"
      }
    ],
    "hasMenu": {
      "@type": "Menu",
      "name": "Yako London Menu",
      "hasMenuSection": menuSections
    }
  };

  return (
    <>
      <StructuredData data={localRestaurantSchema} />
      <HomeClient menuItems={safeMenuItems} locationName={neighborhood.name} />
    </>
  );
}
