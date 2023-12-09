import { useQuery } from '@tanstack/react-query';
import { IAuthUser } from '@/interfaces';
import axios from '@/libs/axios';

async function me() {
  const resp = await axios.get<IAuthUser>('/api/users/me');
  return resp.data;
}

export default function useMe() {
  return useQuery({ queryKey: ['users', 'me'], queryFn: me });
}
