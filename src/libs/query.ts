import { toast } from 'react-toastify';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { TMeta } from '@/types';

const queryClient = new QueryClient({
  queryCache: new QueryCache({}),
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      const meta = mutation.meta as TMeta | undefined;
      const toastMeta = meta?.success?.toast;
      if (toastMeta) {
        toast.success(toastMeta.content, toastMeta);
      }
    },
    onError: (e, variables, context, mutation) => {
      const meta = mutation.meta as TMeta | undefined;
      const toastMeta = meta?.error?.toast;
      if (toastMeta) {
        toast.error(toastMeta.content, toastMeta);
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
