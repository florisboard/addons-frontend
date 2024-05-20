import React from 'react';
import Markdown from 'react-markdown';
import { Metadata } from 'next';
import getAboutServer from '@/services/about/show';

export const metadata: Metadata = {
  title: 'About',
  description: 'About',
};

export default async function About() {
  const resp = await getAboutServer();

  return <Markdown className="px-container prose">{resp.data.content}</Markdown>;
}
