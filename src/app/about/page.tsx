import React from 'react';
import Markdown from 'react-markdown';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About',
};

export default async function About() {
  return <Markdown className="px-container prose"># About</Markdown>;
}
