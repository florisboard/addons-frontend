'use client';

import React from 'react';
import { HiMiniRectangleStack } from 'react-icons/hi2';
import { Swiper, SwiperSlide } from 'swiper/react';
import useHome from '@/services/home';
import CategoryCard from '@/shared/cards/category/CategoryCard';
import CategoryCardSkeleton from '@/shared/cards/category/CategoryCardSkeleton';
import Section from '@/shared/home/Section';

export default function TopCategories() {
  const { data } = useHome();

  return (
    <Section
      Icon={HiMiniRectangleStack}
      title="Top Categories"
      viewMore={{ text: 'All', href: '/categories' }}
    >
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        scrollbar={{ draggable: true, enabled: false, snapOnRelease: true }}
      >
        {data?.top_categories.map((category) => (
          <SwiperSlide className="!h-auto !w-auto" key={category.title}>
            <CategoryCard {...category} />
          </SwiperSlide>
        ))}
        {!data?.top_categories && (
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        )}
      </Swiper>
    </Section>
  );
}
