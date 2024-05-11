import React from 'react';
import { HiFire } from 'react-icons/hi2';
import Link from 'next/link';
import { CategoryResource } from '@/generated';
import { slugifyId } from '@/utils';

export default function CategoryCard({ id, title, circle_bg, circle_fg }: CategoryResource) {
  return (
    <Link
      href={`/categories/${slugifyId(id, title)}`}
      className="btn btn-lg delay-75 hover:scale-105 md:gap-8"
    >
      <h3 className="max-w-64 text-lg sm:max-w-none md:text-xl">{title}</h3>
      <HiFire
        style={{ backgroundColor: circle_bg, color: circle_fg }}
        className="h-8 w-8 rounded-full p-2 text-neutral md:h-12 md:w-12"
      />
    </Link>
  );
}
