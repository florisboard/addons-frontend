import React from 'react';
import { redirect } from 'next/navigation';
import { getProject } from '@/services/projects/show';

type ShowProps = {
  params: { id: string };
};

export default async function Show({ params }: ShowProps) {
  const project = await getProject(params.id).catch((e) => redirect('/'));
  redirect(`/projects/${project.id}/${project.slug}`);
}
