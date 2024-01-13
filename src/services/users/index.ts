import { useInfiniteQuery } from '@tanstack/react-query';
import { UsersIndexParams } from '@/generated';
import api from '@/libs/api';

async function getUsers(params?: UsersIndexParams) {
  const resp = await api.users.usersIndex({ ...params });
  return resp.data;
}

export default function useUsers(params?: UsersIndexParams) {
  return useInfiniteQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.links.next,
  });
}
