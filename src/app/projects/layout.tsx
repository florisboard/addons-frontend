import React from 'react';
import { Metadata } from 'next';
import { THasChildren } from '@/types';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects',
};

export default function Layout({ children }: THasChildren) {
  return children;
}
