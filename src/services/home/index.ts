import { useQuery } from '@tanstack/react-query';
import api from '@/libs/api';

async function getHome() {
  const resp = await api.v1.home();
  return resp.data;
}

export default function useHome() {
  return useQuery({ queryKey: ['home'], queryFn: getHome });
}
