import type { Metadata } from 'next';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import Html from '@/shared/layouts/Html';
import { THasChildren } from '@/types';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type RootLayoutProps = THasChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Html>
      <ReactQueryProvider>
        <Navbar />
        <main className="space-y-4 md:space-y-8">{children}</main>
        <Footer />
      </ReactQueryProvider>
    </Html>
  );
}
