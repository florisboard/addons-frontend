import { useInfiniteQuery } from '@tanstack/react-query';
import { UsersIndexParams } from '@/generated';
import api from '@/libs/api';
import { getNextPageParam } from '@/utils';

async function getUsers(params?: UsersIndexParams) {
  const resp = await api.v1.usersIndex({ ...params });
  return resp.data;
}

export default function useUsers(params?: UsersIndexParams) {
  return useInfiniteQuery({
    queryKey: ['users', params],
    queryFn: ({ pageParam }) => getUsers({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: getNextPageParam,
  });
}
