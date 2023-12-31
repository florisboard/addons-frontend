import React from 'react';
import { HiFire } from 'react-icons/hi2';
import Link from 'next/link';
import { ICategory } from '@/interfaces';

export default function CategoryCard({ name, slug, circle_bg, circle_fg }: ICategory) {
  return (
    <Link href={`/categories/${slug}`} className="btn btn-lg delay-75 hover:scale-105 md:gap-8">
      <h3 className="text-xl">{name}</h3>
      <HiFire
        style={{ backgroundColor: circle_bg, color: circle_fg }}
        className="h-12 w-12 rounded-full p-2 text-neutral"
      />
    </Link>
  );
}
