import { toast } from 'react-toastify';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import errorMessages from '@/fixtures/forms/errorMessages';
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
      const toastMeta = mutation.meta?.success?.toast;
      if (toastMeta) {
        toast.success(toastMeta.content, toastMeta);
      }
    },
    onError: (e, variables, context, mutation) => {
      const toastMeta = mutation.meta?.error?.toast;
      if (toastMeta) {
        toast.error(toastMeta.content, toastMeta);
      }
      if (isAxiosError(e, 500)) {
        toast.error(errorMessages.somethingWentWrong);
      }
      if (isAxiosError(e, 429)) {
        toast.error(errorMessages.tooManyAttempts);
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 min
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
