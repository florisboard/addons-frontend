'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IProject } from '@/interfaces';
import ProjectCard from '@/shared/ProjectCard';
import Section, { SectionProps } from '@/shared/home/Section';

type ProjectsListProps = {
  section: Omit<SectionProps, 'children'>;
  projects: IProject[] | undefined;
};

export default function ProjectsList({ section, projects }: ProjectsListProps) {
  return (
    <Section {...section}>
      <Swiper
        spaceBetween={15}
        slidesPerView="auto"
        scrollbar={{ draggable: true, enabled: false }}
      >
        {projects?.map((project) => (
          <SwiperSlide className="h-auto w-auto" key={project.name}>
            <ProjectCard {...project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
