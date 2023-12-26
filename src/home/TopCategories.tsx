'use client';

import React from 'react';
import { HiFire, HiMiniRectangleStack } from 'react-icons/hi2';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import useHome from '@/services/home';
import Section from '@/shared/home/Section';

export default function TopCategories() {
  const { data } = useHome();

  return (
    <Section
      Icon={HiMiniRectangleStack}
      name="Top Categories"
      viewMore={{ text: 'All', href: '/' }}
    >
      <Swiper
        spaceBetween={15}
        slidesPerView="auto"
        scrollbar={{ draggable: true, enabled: false, snapOnRelease: true }}
      >
        {data?.top_categories.map((category) => (
          <SwiperSlide className="h-auto w-auto" key={category.name}>
            <Link href="/" className="btn btn-lg delay-75 hover:scale-105 md:gap-8">
              <h3 className="text-xl">{category.name}</h3>
              <HiFire
                style={{ backgroundColor: category.circle_bg, color: category.circle_fg }}
                className="h-12 w-12 rounded-full p-2 text-neutral"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
