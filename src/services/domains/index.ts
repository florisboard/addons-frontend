import { useSuspenseQuery } from '@tanstack/react-query';
import { DomainsIndexParams } from '@/generated';
import api from '@/libs/api';

export async function getDomains(params?: DomainsIndexParams) {
  const resp = await api.v1.domainsIndex({ ...params });
  return resp.data;
}

export default function useDomains(params?: DomainsIndexParams) {
  return useSuspenseQuery({
    queryKey: ['domains', params],
    queryFn: () => getDomains(),
  });
}
