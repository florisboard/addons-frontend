'use client';

import React, { useMemo } from 'react';
import { HiArrowUp, HiCalendar, HiFire, HiStar } from 'react-icons/hi2';
import CountDown from '@/home/CountDown';
import RecommendCollections from '@/home/RecommendCollections';
import TopCategories from '@/home/TopCategories';
import useHome from '@/services/home';
import ProjectsList from '@/shared/home/ProjectsList';

export default function Home() {
  const { data } = useHome();

  const sections = useMemo(() => {
    const targetDate = new Date(); // 12 AM UTC
    targetDate.setUTCDate(targetDate.getUTCDate() + 1);
    targetDate.setUTCHours(0, 0, 0, 0);

    return [
      <ProjectsList
        key="picksOfTheDay"
        section={{
          headingChildren: <CountDown targetDate={targetDate} />,
          Icon: HiCalendar,
          name: 'Picks of the Day',
        }}
        projects={data?.picks_of_the_day}
      />,
      <ProjectsList
        key="recommended"
        section={{ Icon: HiStar, name: 'Recommended' }}
        projects={data?.recommended}
      />,
      <ProjectsList
        key="latestReleases"
        section={{ Icon: HiArrowUp, name: 'Latest Releases' }}
        projects={data?.latest_releases}
      />,
      <ProjectsList
        key="latestProjects"
        section={{ Icon: HiFire, name: 'Latest Projects' }}
        projects={data?.latest_projects}
      />,
    ];
  }, [data]);

  return (
    <>
      <TopCategories />
      {sections}
      <RecommendCollections />
    </>
  );
}
