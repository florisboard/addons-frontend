import React from 'react';
import LatestReleases from '@/home/LatestReleases';
import PicksOfTheDay from '@/home/PicksOfTheDay';
import RecommendCollections from '@/home/RecommendCollections';
import TopCategories from '@/home/TopCategories';

export default function Home() {
  return (
    <>
      <TopCategories />
      <PicksOfTheDay />
      <LatestReleases />
      <RecommendCollections />
    </>
  );
}
