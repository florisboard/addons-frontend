import { useQuery } from '@tanstack/react-query';
import api from '@/libs/api';

async function me() {
  const resp = await api.users.usersMe();
  return resp.data;
}

export default function useMe() {
  return useQuery({ queryKey: ['users', 'me'], queryFn: me });
}
