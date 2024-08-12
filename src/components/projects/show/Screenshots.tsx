import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import logo from '@/assets/svg/logo.svg';
import { ImageResource } from '@/generated';
import BlurImage from '@/shared/BlurImage';
import Button from '@/shared/forms/Button';
import DialogModal from '@/shared/modals/DialogModal';
import { openLink, openModal } from '@/utils';

type ScreenshotsProps = {
  screenshots: ImageResource[];
};

export default function Screenshots({ screenshots }: ScreenshotsProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleClose = () => setPreviewUrl(null);

  return (
    <div>
      {previewUrl && (
        <DialogModal
          onCloseOutside={handleClose}
          dialogClassName="modal-open"
          closeOnClickOutside
          id="screenshots#maximize"
        >
          <BlurImage
            width={0}
            height={0}
            className="h-auto w-full"
            sizes="100vw"
            src={previewUrl ?? logo}
            alt="Screenshot Preview"
          />
          <div className="flex items-center gap-4">
            <Button onClick={handleClose} className="btn btn-outline">
              Close
            </Button>
            <Button onClick={() => openLink(previewUrl)} className="btn btn-neutral">
              Open on New tab
            </Button>
          </div>
        </DialogModal>
      )}
      <Swiper
        spaceBetween={15}
        slidesPerView="auto"
        scrollbar={{ draggable: true, enabled: false }}
      >
        {screenshots.map((screenshot, i) => (
          <SwiperSlide className="!h-auto !w-auto" key={screenshot.id}>
            <BlurImage
              onClick={() => setPreviewUrl(screenshot.url)}
              loading="lazy"
              className="object-contain"
              width={250}
              height={250}
              src={screenshot.url}
              alt={`Screenshot ${i + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
