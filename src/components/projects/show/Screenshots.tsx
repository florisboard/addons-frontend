import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageResource } from '@/generated';
import BlurImage from '@/shared/BlurImage';

type ScreenshotsProps = {
  screenshots: ImageResource[];
};

export default function Screenshots({ screenshots }: ScreenshotsProps) {
  return (
    <div>
      <Swiper
        spaceBetween={15}
        slidesPerView="auto"
        scrollbar={{ draggable: true, enabled: false }}
      >
        {screenshots.map((screenshot, i) => (
          <SwiperSlide className="!h-auto !w-auto" key={screenshot.id}>
            <BlurImage
              loading="lazy"
              width={500}
              height={300}
              src={screenshot.url}
              alt={`Screenshot ${i + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
