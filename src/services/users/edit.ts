import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersMeUpdatePayload } from '@/generated';
import api from '@/libs/api';

export async function editMe(data: UsersMeUpdatePayload) {
  const resp = await api.users.usersMeUpdate(data);
  return resp.data;
}

export default function useEditMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMe,
    onSuccess: (data) => {
      queryClient.setQueryData(['users', 'me'], data);
      queryClient.setQueryData(['users', data.username], data);
    },
    meta: {
      success: { toast: { content: 'Account information updated successfully.' } },
    },
  });
}
