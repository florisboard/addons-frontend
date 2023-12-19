import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/interfaces';
import axios from '@/libs/axios';

async function show(username: string) {
  const resp = await axios.get<IUser>(`/api/users/${username}`);
  return resp.data;
}

export default function useUser(username: string) {
  return useQuery({ queryKey: ['users', username], queryFn: () => show(username) });
}
