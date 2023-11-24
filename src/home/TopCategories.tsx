import React from 'react';
import { HiFire, HiMiniRectangleStack } from 'react-icons/hi2';
import Link from 'next/link';
import { topCategories } from '@/data/home';
import Section from '@/shared/home/Section';

export default function TopCategories() {
  return (
    <Section
      Icon={HiMiniRectangleStack}
      name="Top Categories"
      viewMore={{ text: 'All', href: '/' }}
    >
      <div className="flex flex-wrap items-center gap-4">
        {topCategories.map((category) => (
          <Link
            href="/"
            key={category.name}
            className="btn btn-lg delay-75 hover:scale-105 md:gap-8"
          >
            <h3 className="text-xl">{category.name}</h3>
            <HiFire
              style={{ backgroundColor: category.circleColor }}
              className="h-12 w-12 rounded-full p-2"
            />
          </Link>
        ))}
      </div>
    </Section>
  );
}
