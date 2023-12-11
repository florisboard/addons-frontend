import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IAuthUser } from '@/interfaces';
import axios from '@/libs/axios';
import { TToast } from '@/types';
import { IRegisterDto } from './register';
import sanctum from './sanctum';

export interface ILoginDto extends Pick<IRegisterDto, 'email' | 'password'> {}

async function login(data: ILoginDto) {
  await sanctum();
  const resp = await axios.post<IAuthUser>('/login', data);
  return resp.data;
}

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    meta: {
      toast: { content: "You've logged in successfully." } satisfies TToast,
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['users', 'me'], data);
    },
  });
}
