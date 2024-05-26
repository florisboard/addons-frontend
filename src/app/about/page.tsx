import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About',
};

export default async function About() {
  return (
    <div className="px-container prose">
      <h1>About</h1>
    </div>
  );
}
