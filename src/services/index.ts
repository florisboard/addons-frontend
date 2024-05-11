import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { AxiosResponse } from 'axios';
import { isAxiosError } from '@/utils';

type Tail<T extends any[]> = T extends [any, ...infer U] ? U : never;
type AsyncFunction<T, P extends any[]> = (...args: P) => Promise<AxiosResponse<T>>;

type UnstableCacheParameters = Parameters<typeof unstable_cache>;
type RestOfUnstableCacheParameters = Tail<UnstableCacheParameters>;

export const serverSideCache = <T, P extends any[]>(
  asyncFunction: AsyncFunction<T, P>,
  ...rest: RestOfUnstableCacheParameters
) => {
  return unstable_cache(
    cache(async (...args: any) => {
      try {
        const resp = await asyncFunction(...args);
        return resp.data;
      } catch (e) {
        if (isAxiosError(e, 404)) notFound();
        throw e;
      }
    }),
    ...rest,
  );
};
