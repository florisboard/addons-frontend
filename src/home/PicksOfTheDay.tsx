'use client';

import React from 'react';
import { HiCalendar } from 'react-icons/hi2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { picksOfTheDay } from '@/data/home';
import Section from '@/shared/home/Section';
import CountDown from './CountDown';
import Project from './Project';

export default function PicksOfTheDay() {
  return (
    <Section
      headingChildren={
        <CountDown targetDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)} />
      }
      Icon={HiCalendar}
      name="Picks of the Day"
    >
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
