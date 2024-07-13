import React, { Suspense } from 'react';
import { Metadata } from 'next';
import CheckUpdatesClient from './page-client';

export const metadata: Metadata = {
  title: 'Check Updates',
  description: "Check if the projects that you're using on FlorisBoard is up to date.",
};

export default function CheckUpdates() {
  return (
    <div className="px-container space-y-4">
      <h1 className="h1">Check Updates</h1>
      <Suspense>
        <CheckUpdatesClient />
      </Suspense>
    </div>
  );
}
