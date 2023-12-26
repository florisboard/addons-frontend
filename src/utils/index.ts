import axios, { AxiosError } from 'axios';
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

export function daysAgoFormatter(date: Date): string {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return 'today';
  } else if (diffInDays === 1) {
    return 'yesterday';
  } else {
    return `${diffInDays} days ago`;
  }
}

export function isBetweenDate(date: Date, days: number) {
  const now = new Date();
  const fourteenDaysAgo = new Date().setDate(now.getDate() - days);

  return date.getTime() >= fourteenDaysAgo && date <= now;
}

export const humanReadableFormatter = Intl.NumberFormat('en', { notation: 'compact' });

export function isAxiosError<ResponseType>(
  error: unknown,
  statusCode?: number,
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error) && statusCode ? error.response?.status === statusCode : true;
}
