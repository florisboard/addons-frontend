import React from 'react';
import { Metadata } from 'next';
import config from '@/fixtures/config';
import { THasChildren } from '@/types';

export const metadata: Metadata = {
  title: `New Project ${config.titleTemplate}`, // title template is not working on this page
  description: 'New Project',
};

export default function Layout({ children }: THasChildren) {
  return children;
}
