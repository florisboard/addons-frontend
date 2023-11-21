import React from 'react';
import { Poppins } from 'next/font/google';
import '@/assets/css/tailwind.css';
import { THasChildren } from '@/types';
import { cn } from '@/utils';

const poppins = Poppins({
  variable: '--custom-font',
  weight: ['400'],
  subsets: ['latin'],
});

type HtmlProps = THasChildren & {
  className?: string;
};

export default function Html({ children, className }: HtmlProps) {
  return (
    <html className={poppins.variable} lang="en">
      <body className={cn('relative pb-4 font-sans antialiased', className)}>{children}</body>
    </html>
  );
}
