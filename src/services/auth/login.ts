import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthResource } from '@/generated';
import axios from '@/libs/axios';
import { TMeta, TToast } from '@/types';
import { IRegisterDto } from './register';
import sanctum from './sanctum';

export interface ILoginDto extends Pick<IRegisterDto, 'email' | 'password'> {}

async function login(data: ILoginDto) {
  await sanctum();
  const resp = await axios.post<AuthResource>('/login', data);
  return resp.data;
}

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    meta: {
      success: {
        toast: { content: "You've logged in successfully." } satisfies TToast,
      },
    } satisfies TMeta,
    onSuccess: (data) => {
      queryClient.setQueryData(['users', 'me'], data);
    },
  });
}
