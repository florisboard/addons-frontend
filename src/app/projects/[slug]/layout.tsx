import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectServerCache } from '@/services/projects/show';
import { THasChildren } from '@/types';
import { extractIdFromSlug } from '@/utils';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = extractIdFromSlug(params.slug);
  if (!id) notFound();

  try {
    const project = await getProjectServerCache(id);

    return { title: project.title, description: project.short_description };
  } catch {
    // the project is not published the owner can see it so we create a simple metadata
    return { title: 'Project', description: 'Project' };
  }
}

export default function Layout({ children }: THasChildren) {
  return children;
}
