import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CategoryResource } from '@/generated';
import { slugifyId } from '@/utils';

const DynamicIcon = dynamic(() => import('@/shared/DynamicIcon'));

export default function CategoryCard({
  id,
  title,
  icon_name,
  circle_bg,
  circle_fg,
}: CategoryResource) {
  return (
    <Link
      href={`/categories/${slugifyId(id, title)}`}
      className="btn btn-lg delay-75 hover:scale-105 md:gap-8"
    >
      <h3 className="max-w-64 text-lg sm:max-w-none md:text-xl">{title}</h3>
      <DynamicIcon
        iconName={icon_name}
        style={{ backgroundColor: circle_bg, color: circle_fg }}
        className="h-8 w-8 rounded-full p-2 text-neutral md:h-12 md:w-12"
      />
    </Link>
  );
}
