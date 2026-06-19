import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import DynamicTracker from '@/components/DynamicTracker';
import DynamicPromotions from '@/components/promotions/DynamicPromotions';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';

export const metadata = {
  metadataBase: new URL('https://www.yakolondon.com'),
  title: {
    default: 'Yako London | Authentic Sri Lankan Restaurant in Pinner',
    template: '%s | Yako London'
  },
  description: 'Experience authentic flavours born from Dutch, Portuguese, Malay, and South Indian influences. Discover the true taste of home cooking at our Sri Lankan restaurant in Pinner, London.',
  keywords: ['Sri Lankan restaurant London', 'Authentic Sri Lankan food London', 'Sri Lankan cuisine Pinner', 'South Asian food London', 'Hoppers London', 'Kothu Roti London'],
  authors: [{ name: 'Yako London' }],
  creator: 'Yako London',
  publisher: 'Yako London',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Yako London | Authentic Sri Lankan Restaurant',
    description: 'Experience authentic flavours born from Dutch, Portuguese, Malay, and South Indian influences in Pinner, London.',
    url: 'https://www.yakolondon.com',
    siteName: 'Yako London',
    images: [
      {
        url: '/og-image.jpg', // Placeholder for now
        width: 1200,
        height: 630,
        alt: 'Yako London - Authentic Sri Lankan Cuisine',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yako London | Authentic Sri Lankan Cuisine',
    description: 'Discover the true taste of home cooking in Pinner, London.',
    creator: '@yakolondon',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <Preloader />
        <AnalyticsProvider>
          <DynamicTracker />
          <DynamicPromotions />
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
          </SmoothScroll>
          <Toaster 
            position="top-center" 
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                style: {
                  background: 'rgba(20, 150, 60, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                },
              },
            }}
          />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
