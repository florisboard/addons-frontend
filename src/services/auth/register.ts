import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IAuthUser } from '@/interfaces';
import axios from '@/libs/axios';
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
    onSuccess: (data) => {
      queryClient.setQueryData(['users', 'me'], data);
    },
  });
}
