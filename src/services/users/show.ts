import { useQuery } from '@tanstack/react-query';
import api from '@/libs/api';

async function show(username: string) {
  const resp = await api.users.usersShow(username);
  return resp.data;
}

export default function useUser(username: string) {
  return useQuery({ queryKey: ['users', username], queryFn: () => show(username) });
}
