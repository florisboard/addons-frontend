import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import Footer from '@/components/footer/Footer';
import Bottom from '@/components/navbar/Bottom';
import Navbar from '@/components/navbar/Navbar';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import Html from '@/shared/layouts/Html';
import { THasChildren } from '@/types';

export const metadata: Metadata = {
  title: {
    template: `%s - FlorisBoard Addons`,
    default: 'FlorisBoard Addons',
  },
  description: 'FlorisBoard addons',
};

type RootLayoutProps = THasChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Html>
      <NextTopLoader color="green" showSpinner={false} />
      <ReactQueryProvider>
        <Navbar />
        <main className="flex flex-1 flex-col space-y-4 md:space-y-8">{children}</main>
        <Bottom />
        <Footer />
      </ReactQueryProvider>
    </Html>
  );
}
