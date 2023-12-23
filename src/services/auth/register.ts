import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IAuthUser } from '@/interfaces';
import axios from '@/libs/axios';
import { TMeta, TToast } from '@/types';
import sanctum from './sanctum';

export interface IRegisterDto {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

async function register(data: IRegisterDto) {
  await sanctum();
  const resp = await axios.post<IAuthUser>('/register', data);
  return resp.data;
}

export default function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    meta: {
      success: {
        toast: { content: "You've registered successfully." } satisfies TToast,
      },
    } satisfies TMeta,
    onSuccess: (data) => {
      queryClient.setQueryData(['users', 'me'], data);
    },
  });
}