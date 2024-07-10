import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy & Policy',
  description: 'Privacy & Policy',
};

export default function PrivacyPolicy() {
  return (
    <div className="px-container space-y-4">
      <h1 className="h1">Privacy and Policy</h1>
    </div>
  );
}
