'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import useCategory from '@/services/categories/show';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const { data: category } = useCategory(slug);

  return <div>Category</div>;
}
