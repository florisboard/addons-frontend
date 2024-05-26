import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/libs/api';

async function deleteDomain(id: number) {
  const resp = await api.domains.domainsDestroy(id, {});
  return resp.data;
}

export default function useDeleteDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDomain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['domains'] });
    },
    meta: {
      success: {
        toast: { content: 'Domain has been deleted successfully.' },
      },
    },
  });
}
