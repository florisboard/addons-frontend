import { useQuery } from '@tanstack/react-query';
import api from '@/libs/api';

async function getCollection(id: number) {
  const resp = await api.collections.collectionsShow(id);
  return resp.data;
}

export default function useCollection(id: number) {
  return useQuery({ queryKey: ['collections', id], queryFn: () => getCollection(id) });
}
