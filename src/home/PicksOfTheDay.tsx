import React from 'react';
import { HiCalendar } from 'react-icons/hi2';
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {picksOfTheDay.map((project) => (
          <Project key={project.name} {...project} />
        ))}
      </div>
    </Section>
  );
}
