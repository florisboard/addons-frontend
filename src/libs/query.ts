import { toast } from 'react-toastify';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import errorMessages from '@/fixtures/errorMessages';
import { TReactQueryMeta } from '@/types';
import { isAxiosError } from '@/utils';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e, query) => {
      if (isAxiosError(e, 500)) {
        toast.error(errorMessages.somethingWentWrong);
      }
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      const meta = mutation.meta as TReactQueryMeta | undefined;
      const toastMeta = meta?.success?.toast;
      if (toastMeta) {
        toast.success(toastMeta.content, toastMeta);
      }
    },
    onError: (e, variables, context, mutation) => {
      const meta = mutation.meta as TReactQueryMeta | undefined;
      const toastMeta = meta?.error?.toast;
      if (toastMeta) {
        toast.error(toastMeta.content, toastMeta);
      }

      if (isAxiosError(e, 500)) {
        toast.error(errorMessages.somethingWentWrong);
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
