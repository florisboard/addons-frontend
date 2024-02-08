import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlurImage from '@/shared/BlurImage';

type ScreenshotsProps = {};

export default function Screenshots({}: ScreenshotsProps) {
  return (
    <div>
      <Swiper
        spaceBetween={15}
        slidesPerView="auto"
        scrollbar={{ draggable: true, enabled: false }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <SwiperSlide className="h-auto w-auto" key={i}>
            <BlurImage
              width={250}
              height={250}
              src="https://picsum.photos/250/250"
              alt={`Screenshot ${i + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
