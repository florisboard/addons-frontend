'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { picksOfTheDay } from '@/data/home';
import Project from '@/home/Project';
import Section, { SectionProps } from '@/shared/home/Section';

type ProjectsListProps = {
  section: Omit<SectionProps, 'children'>;
};

export default function ProjectsList({ section }: ProjectsListProps) {
  return (
    <Section {...section}>
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
