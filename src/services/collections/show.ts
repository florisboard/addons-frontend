import { useQuery } from '@tanstack/react-query';
import { IProjectFull } from '@/interfaces';
import axios from '@/libs/axios';

async function collection(id: number) {
  const resp = await axios.get<IProjectFull>(`/api/collections/${id}`);
  return resp.data;
}

export default function useCollection(id: number) {
  return useQuery({ queryKey: ['collections', id], queryFn: () => collection(id) });
}
