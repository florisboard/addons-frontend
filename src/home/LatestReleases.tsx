'use client';

import React from 'react';
import { HiArrowUp } from 'react-icons/hi2';
import ProjectsList from '@/shared/home/ProjectsList';

export default function LatestReleases() {
  return (
    <ProjectsList
      section={{
        viewMore: { text: 'More', href: '/' },
        Icon: HiArrowUp,
        name: 'Latest Releases',
      }}
    />
  );
}
