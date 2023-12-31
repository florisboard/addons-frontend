import React from 'react';
import Markdown from 'react-markdown';
import axios from '@/libs/axios';

export const revalidate = 300; // 5 min

export default async function About() {
  const about = await getAbout();

  return (
    <section className="px-container prose">
      <Markdown>{about.content}</Markdown>
    </section>
  );
}

async function getAbout() {
  const resp = await axios.get<{ content: string }>('/api/about');
  return resp.data;
}
