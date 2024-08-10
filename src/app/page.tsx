'use client';

import React, { useMemo } from 'react';
import { HiArrowUp, HiCalendar, HiFire, HiStar } from 'react-icons/hi2';
import CountDown from '@/components/home/CountDown';
import TopCategories from '@/components/home/TopCategories';
import useHome from '@/services/home';
import ProjectHorizontalList from '@/shared/home/ProjectHorizontalList';

export default function Home() {
  const { data } = useHome();

  const sections = useMemo(() => {
    const targetDate = new Date(); // 12 AM UTC
    targetDate.setUTCDate(targetDate.getUTCDate() + 1);
    targetDate.setUTCHours(0, 0, 0, 0);

    return [
      <ProjectHorizontalList
        key="picksOfTheDay"
        section={{
          headingChildren: <CountDown targetDate={targetDate} />,
          Icon: HiCalendar,
          title: 'Picks of the Day',
        }}
        projects={data?.picks_of_the_day}
      />,
      <ProjectHorizontalList
        key="recommended"
        section={{ Icon: HiStar, title: 'Recommended' }}
        projects={data?.recommended}
      />,
      <ProjectHorizontalList
        key="latestReleases"
        section={{ Icon: HiArrowUp, title: 'Latest Releases' }}
        projects={data?.latest_releases}
      />,
      <ProjectHorizontalList
        key="latestProjects"
        section={{ Icon: HiFire, title: 'Latest Projects' }}
        projects={data?.latest_projects}
      />,
    ];
  }, [data]);

  return (
    <>
      <TopCategories />
      {sections}
    </>
  );
}
