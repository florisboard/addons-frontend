import React from 'react';
import Markdown from 'react-markdown';
import { Metadata } from 'next';
import api from '@/libs/api';

export const revalidate = 300; // 5 min

export const metadata: Metadata = {
  title: 'About',
  description: 'About',
};

export default async function About() {
  const { data } = await api.about.about();

  return <Markdown className="px-container prose">{data.content}</Markdown>;
}
