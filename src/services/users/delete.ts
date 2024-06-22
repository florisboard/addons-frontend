import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersMeDestroyPayload } from '@/generated';
import api from '@/libs/api';

async function deleteAccount(data: UsersMeDestroyPayload) {
  const resp = await api.v1.usersMeDestroy(data);
  return resp.data;
}

export default function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.setQueryData(['users', 'me'], null);
    },
    meta: {
      success: {
        toast: { content: "You've deleted your account successfully." },
      },
    },
  });
}
