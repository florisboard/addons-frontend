import React from 'react';
import { Metadata } from 'next';
import { THasChildren } from '@/types';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Categories',
};

export default function Layout({ children }: THasChildren) {
  return children;
}
