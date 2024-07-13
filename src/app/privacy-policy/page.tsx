import React from 'react';
import { Metadata } from 'next';
import { promises as fs } from 'fs';
import Markdown from '@/shared/forms/Markdown';

export const metadata: Metadata = {
  title: 'Privacy & Policy',
  description: 'Privacy & Policy',
};

export default async function PrivacyPolicy() {
  const markdown = await fs.readFile(process.cwd() + '/src/docs/privacy-policy.md', 'utf8');

  return (
    <div className="px-container space-y-4">
      <Markdown className="prose-sm prose-h1:font-display">{markdown}</Markdown>
    </div>
  );
}
