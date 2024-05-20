import React from 'react';
import Link from 'next/link';

type BreadcrumbProps = {
  title: string;
};

export default function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link href="/">FlorisBoard</Link>
        </li>
        <li>
          <Link href="/categories">Categories</Link>
        </li>
        <li>{title}</li>
      </ul>
    </div>
  );
}
