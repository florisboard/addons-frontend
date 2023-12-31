'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IProject } from '@/interfaces';
import ProjectCard from '@/shared/cards/project/ProjectCard';
import ProjectCardSkeleton from '@/shared/cards/project/ProjectCardSkeleton';
import Section, { SectionProps } from '@/shared/home/Section';

type ProjectsListProps = {
  section: Omit<SectionProps, 'children'>;
  projects: IProject[] | undefined;
};

export default function ProjectsList({ section, projects }: ProjectsListProps) {
  return (
    <Section {...section}>
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        scrollbar={{ draggable: true, enabled: false }}
      >
        {projects?.map((project) => (
          <SwiperSlide className="h-auto w-auto" key={project.name}>
            <ProjectCard {...project} />
          </SwiperSlide>
        ))}
      </Swiper>
      {!projects && (
        <div className="flex gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      )}
    </Section>
  );
}
