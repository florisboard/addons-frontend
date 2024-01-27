import React from 'react';
import { Metadata } from 'next';
import axios from '@/libs/axios';
import Markdown from '@/shared/forms/Markdown';

export const revalidate = 300; // 5 min

export const metadata: Metadata = {
  title: 'About',
  description: 'About',
};

export default async function About() {
  const about = await getAbout();

  return <Markdown className="px-container">{about.content}</Markdown>;
}

async function getAbout() {
  const resp = await axios.get<{ content: string }>('/api/about');
  return resp.data;
}
