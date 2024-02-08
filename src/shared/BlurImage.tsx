'use client';

import React, { useState } from 'react';
import NextImage, { ImageProps } from 'next/image';
import { cn } from '@/utils';

export default function BlurImage({ className, ...props }: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <NextImage
      {...props}
      className={cn('object-cover duration-700 ease-in-out', {
        'scale-110 blur-2xl grayscale': isLoading,
      })}
      onLoad={() => setLoading(false)}
    />
  );
}
