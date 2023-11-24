import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...values: ClassValue[]) {
  return twMerge(clsx(...values));
}

export function calculateTimeLeft(targetDate: Date | number) {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  return {
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export const humanReadableFormatter = Intl.NumberFormat('en', { notation: 'compact' });
