import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { isAxiosError } from '@/utils';

type AsyncFunction<T, P extends any[]> = (...args: P) => Promise<T>;

type UnstableCacheParameters = Parameters<typeof unstable_cache>;
type KeyParts = UnstableCacheParameters['1'];
type Options = UnstableCacheParameters['2'] & { throwNotFound?: boolean };

export const serverSideCache = <T, P extends any[]>(
  asyncFunction: AsyncFunction<T, P>,
  keyParts: KeyParts,
  { throwNotFound, ...options }: Options,
) => {
  return unstable_cache(
    cache(async (...args: any) => {
      try {
        return asyncFunction(...args);
      } catch (e) {
        if (isAxiosError(e, 404)) throwNotFound !== false && notFound();
        else throw e;
      }
    }),
    keyParts,
    options,
  );
};
