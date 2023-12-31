import { useQuery } from '@tanstack/react-query';
import { ICategory } from '@/interfaces';
import axios from '@/libs/axios';

async function category(slug: string) {
  const resp = await axios.get<ICategory>(`/api/categories/${slug}`);
  return resp.data;
}

export default function useCategory(slug: string) {
  return useQuery({ queryKey: ['category', slug], queryFn: () => category(slug) });
}
