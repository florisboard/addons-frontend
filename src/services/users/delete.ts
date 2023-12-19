import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/libs/axios';
import { TMeta } from '@/types';

export interface IDeleteAccountDto {
  password: string;
}

async function deleteAccount(data: IDeleteAccountDto) {
  const resp = await axios.post('api/users/me/delete', data);
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
    } satisfies TMeta,
  });
}
