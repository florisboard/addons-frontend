import React from 'react';
import { Metadata } from 'next';
import { THasChildren } from '@/types';

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.username} Profile`,
    description: `Explore ${params.username} profile to view their projects, reviews, and curated collections.`,
  };
}

export default function Layout({ children }: THasChildren) {
  return children;
}
