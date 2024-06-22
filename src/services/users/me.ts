import { useQuery } from '@tanstack/react-query';
import api from '@/libs/api';

async function getMe() {
  const resp = await api.v1.usersMe();
  return resp.data;
}

export default function useMe() {
  return useQuery({ queryKey: ['users', 'me'], queryFn: getMe });
}
