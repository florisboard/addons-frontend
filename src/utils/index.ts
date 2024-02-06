import axios, { AxiosError } from 'axios';
import { ClassValue, clsx } from 'clsx';
import { addDays, isBefore } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import axiosInstance from '@/libs/axios';
import { TApiMeta } from '@/types';

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

export function isBetweenDate(date: Date, days: number) {
  const fourteenDaysAgo = addDays(new Date(), -days);
  return isBefore(date, fourteenDaysAgo);
}

export const humanReadableFormatter = Intl.NumberFormat('en', { notation: 'compact' });

export function isAxiosError<ResponseType>(
  error: unknown,
  statusCode?: number,
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error) && statusCode ? error.response?.status === statusCode : true;
}

export function getNextPageParam({ meta }: TApiMeta): number | undefined {
  if (meta.current_page === meta.last_page) return undefined;
  return meta.current_page + 1;
}

export async function downloadFile(url: string, fileName: string) {
  const { data } = await axiosInstance.get(url, { responseType: 'blob' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(new Blob([data]));
  link.setAttribute('download', fileName);

  document.body.appendChild(link);
  link.click();
  link.remove();
}
