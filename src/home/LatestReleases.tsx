'use client';

import React from 'react';
import { HiArrowUp } from 'react-icons/hi2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { picksOfTheDay } from '@/data/home';
import Section from '@/shared/home/Section';
import Project from './Project';

export default function LatestReleases() {
  return (
    <Section viewMore={{ text: 'More', href: '/' }} Icon={HiArrowUp} name="Latest Releases">
      <Swiper
        spaceBetween={15}
        slidesPerView="auto"
        scrollbar={{ draggable: true, enabled: false }}
      >
        {picksOfTheDay.map((project) => (
          <SwiperSlide className="h-auto w-auto" key={project.name}>
            <Project {...project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
