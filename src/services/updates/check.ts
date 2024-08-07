import { useQuery } from '@tanstack/react-query';
import { UpdatesCheckParams } from '@/generated';
import api from '@/libs/api';

async function checkUpdates(params: UpdatesCheckParams) {
  const resp = await api.v1.updatesCheck(params);
  return resp.data;
}

export default function useCheckUpdates(params: UpdatesCheckParams) {
  return useQuery({
    queryKey: ['updates', params],
    queryFn: () => checkUpdates(params),
    enabled: params.projects.length > 0,
  });
}
