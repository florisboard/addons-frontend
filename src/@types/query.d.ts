import '@tanstack/react-query';
import { TReactQueryErrorMeta, TReactQuerySuccessMeta } from '@/types';

interface MyMeta extends Record<string, unknown> {
  success?: TReactQuerySuccessMeta;
  error?: TReactQueryErrorMeta;
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: MyMeta;
    mutationMeta: MyMeta;
  }
}
