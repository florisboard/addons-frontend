import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectServerCache } from '@/services/projects/show';
import { THasChildren } from '@/types';
import { extractIdFromSlug } from '@/utils';

type Props = {
  params: { slug: string };
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const id = extractIdFromSlug(params.slug);
//   if (!id) notFound();
//   const project = await getProjectServerCache(id);

//   // the project is not published the owner can see it so we create a simple metadata
//   if (!project) {
//     return {
//       title: 'Project',
//       description: 'Project',
//     };
//   }

//   return {
//     title: project.title,
//     description: project.short_description,
//   };
// }

export default function Layout({ children }: THasChildren) {
  return children;
}
