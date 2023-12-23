import { useQuery } from '@tanstack/react-query';
import { IAuthUser } from '@/interfaces';
import axios from '@/libs/axios';

interface IProjectsParams {
  filter?: {
    name?: 'string';
    category_id?: number;
    user_id?: number;
    package_name?: string;
    is_recommended?: boolean;
  };
  include?: 'user' | 'category';
  sort?: 'name' | 'package_name' | 'id';
}

async function projects(params?: IProjectsParams) {
  const resp = await axios.get<IAuthUser>('/api/projects', { params });
  return resp.data;
}

export default function useProjects(params?: IProjectsParams) {
  return useQuery({ queryKey: ['projects', params], queryFn: () => projects(params) });
}
