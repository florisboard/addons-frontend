'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProjectResource } from '@/generated';
import ProjectCard from '@/shared/cards/project/ProjectCard';
import ProjectCardSkeleton from '@/shared/cards/project/ProjectCardSkeleton';
import Section, { SectionProps } from '@/shared/home/Section';

export type ProjectHorizontalListProps = {
  section: Omit<SectionProps, 'children'>;
  projects: ProjectResource[] | undefined;
};

export default function ProjectHorizontalList({ section, projects }: ProjectHorizontalListProps) {
  return (
    <Section {...section}>
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        scrollbar={{ draggable: true, enabled: false }}
      >
        {projects?.map((project) => (
          <SwiperSlide className="!h-auto !w-auto" key={project.id}>
            <ProjectCard {...project} />
          </SwiperSlide>
        ))}
      </Swiper>
      {!projects && (
        <div className="flex gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      )}
    </Section>
  );
}
