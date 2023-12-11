import { toast } from 'react-toastify';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { TToast } from '@/types';

const queryClient = new QueryClient({
  queryCache: new QueryCache({}),
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      const toastMeta = mutation.meta?.toast as TToast | undefined;
      if (toastMeta) {
        toast.success(toastMeta.content, toastMeta);
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
