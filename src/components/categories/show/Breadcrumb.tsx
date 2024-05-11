import React from 'react';
import Link from 'next/link';

type BreadcrumbProps = {
  slug: string;
};

export default function Breadcrumb({ slug }: BreadcrumbProps) {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link href="/">FlorisBoard</Link>
        </li>
        <li>
          <Link href="/categories">Categories</Link>
        </li>
        <li>{slug}</li>
      </ul>
    </div>
  );
}
