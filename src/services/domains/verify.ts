import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/libs/api';

async function verifyDomain(id: number) {
  const resp = await api.domains.domainsVerifyStore(id, {});
  return resp.data;
}

export default function useVerifyDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyDomain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['domains'] });
    },
  });
}
