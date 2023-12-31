'use client';

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Poppins, Righteous } from 'next/font/google';
import '@/assets/css/tailwind.css';
import { useStore } from '@/hooks';
import useThemeState from '@/states/themeState';
import { THasChildren } from '@/types';
import { cn } from '@/utils';
import { MODAL_ROOT_ID } from '../modals/Modal';

const primaryFont = Poppins({
  variable: '--primary-font',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const displayFont = Righteous({
  variable: '--display-font',
  weight: ['400'],
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
  const finalTheme = currentTheme === 'system' ? systemColor : currentTheme;

  return (
    <html
      data-theme={finalTheme}
      className={cn(primaryFont.variable, displayFont.variable)}
      lang="en"
    >
      <body
        className={cn(
          'relative flex min-h-screen flex-col overflow-x-hidden font-sans antialiased',
          className,
        )}
      >
        <div id={MODAL_ROOT_ID} />
        <ToastContainer toastClassName="font-sans" theme={finalTheme} />
        {children}
      </body>
    </html>
  );
}
