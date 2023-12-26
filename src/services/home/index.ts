import { useQuery } from '@tanstack/react-query';
import { IHome } from '@/interfaces';
import axios from '@/libs/axios';

async function home() {
  const resp = await axios.get<IHome>('/api/home');
  return resp.data;
}

export default function useHome() {
  return useQuery({ queryKey: ['home'], queryFn: home });
}
