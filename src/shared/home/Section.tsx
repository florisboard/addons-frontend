import React from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import Link from 'next/link';
import { THasChildren, TIcon } from '@/types';

export type SectionProps = THasChildren & {
  Icon: TIcon;
  name: string;
  viewMore?: { text: string; href: string };
  headingChildren?: React.ReactNode;
};

export default function Section({ Icon, name, viewMore, children, headingChildren }: SectionProps) {
  return (
    <section className="px-container space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
          <h2 className="font-display text-xl font-bold md:text-3xl">{name}</h2>
        </div>
        {viewMore && (
          <Link
            href={viewMore.href}
            className="btn btn-link p-0 no-underline transition-transform delay-75 hover:translate-x-2"
          >
            <span>{viewMore.text}</span>
            <HiChevronRight className="h-5 w-5 md:h-6 md:w-6 " />
          </Link>
        )}
        {headingChildren}
      </div>
      {children}
    </section>
  );
}
