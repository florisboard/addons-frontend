import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryServerCache } from '@/services/categories/show';
import { THasChildren } from '@/types';
import { extractIdFromSlug } from '@/utils';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = extractIdFromSlug(params.slug);
  if (!id) notFound();
  const category = await getCategoryServerCache(id);

  return {
    title: `${category?.title} Projects`,
    description: `Find useful projects from category ${category?.title} for your FlorisBoard Keyboard`,
  };
}

export default function Layout({ children }: THasChildren) {
  return children;
}
