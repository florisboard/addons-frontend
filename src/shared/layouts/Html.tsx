'use client';

import React from 'react';
import { Poppins } from 'next/font/google';
import '@/assets/css/tailwind.css';
import { useStore } from '@/hooks';
import useThemeState from '@/states/themeState';
import { THasChildren } from '@/types';
import { cn } from '@/utils';

const font = Poppins({
  variable: '--custom-font',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

type HtmlProps = THasChildren & {
  className?: string;
};

export default function Html({ children, className }: HtmlProps) {
  const currentTheme = useStore(useThemeState, (state) => state.theme);
  const systemColor =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  return (
    <html
      data-theme={currentTheme === 'system' ? systemColor : currentTheme}
      className={font.variable}
      lang="en"
    >
      <body className={cn('relative pb-4 font-sans antialiased', className)}>{children}</body>
    </html>
  );
}
