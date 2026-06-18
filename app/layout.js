import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import DynamicTracker from '@/components/DynamicTracker';
import DynamicPromotions from '@/components/promotions/DynamicPromotions';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata = {
  title: 'Yako London | Authentic Sri Lankan Cuisine in Pinner',
  description: 'Experience authentic flavours born from Dutch, Portuguese, Malay, and South Indian influences. Discover the true taste of home cooking in Pinner.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
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
