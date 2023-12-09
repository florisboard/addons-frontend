'use client';

import React from 'react';
import { HiCalendar } from 'react-icons/hi2';
import ProjectsList from '@/shared/home/ProjectsList';
import CountDown from './CountDown';

export default function PicksOfTheDay() {
  return (
    <ProjectsList
      section={{
        headingChildren: (
          <CountDown targetDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)} />
        ),
        Icon: HiCalendar,
        name: 'Picks of the Day',
      }}
    />
  );
}
