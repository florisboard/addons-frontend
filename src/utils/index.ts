import axios, { AxiosError } from 'axios';
import { ClassValue, clsx } from 'clsx';
import { addDays, isBefore } from 'date-fns';
import capitalize from 'lodash/capitalize';
import kebabCase from 'lodash/kebabCase';
import { twMerge } from 'tailwind-merge';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import axiosInstance from '@/libs/axios';
import { TApiMeta } from '@/types';

export function cn(...values: ClassValue[]) {
  return twMerge(clsx(...values));
}

export function slugifyId(id: number, title: string) {
  return `${kebabCase(title)}-${id}`;
}

export function extractIdFromSlug(slug: string) {
  const matches = slug.match(/\d+$/);
  if (matches) return parseInt(matches[0], 10);
  return null;
}

export function enumToTitle(key: string) {
  return capitalize(key).replaceAll('_', ' ');
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

export function formatNumber(value: number): string {
  if (value < 10_000) return value.toString();
  return humanReadableFormatter.format(value);
}

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

export async function openLink(url: string) {
  const link = document.createElement('a');
  link.target = '_blank';
  link.href = url;

  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function convertNullToEmptyString(obj: object) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, value === null ? '' : value]),
  );
}

export function isInfiniteResultEmpty({
  isLoading,
  data,
}: UseInfiniteQueryResult<InfiniteData<TApiMeta>>) {
  return !isLoading && data?.pages.at(0)?.meta.total === 0;
}

export function isOfficialProject(packageName: string) {
  return packageName.startsWith('org.florisboard');
}

export async function copyTextToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

export function openModal(id: string) {
  (document.getElementById(id) as HTMLDialogElement).showModal();
}

export function closeModal(id: string) {
  (document.getElementById(id) as HTMLDialogElement).close();
}

export function createPackageName(domain: string, name: string) {
  if (!domain) return '';
  return domain.replaceAll('-', '_').split('.').reverse().join('.') + `.${name}`;
}
