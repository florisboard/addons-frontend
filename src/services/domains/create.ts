import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DomainsStorePayload } from '@/generated';
import api from '@/libs/api';

async function createDomain(data: DomainsStorePayload) {
  const resp = await api.domains.domainsStore(data);
  return resp.data;
}

export default function useCreateDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDomain,
    onSuccess: (createdReview) => {
      queryClient.invalidateQueries({ queryKey: ['domains'] });
    },
    meta: {
      success: {
        toast: { content: 'Your domain has been created successfully.' },
      },
    },
  });
}
