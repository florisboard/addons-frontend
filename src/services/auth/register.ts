import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthResource } from '@/generated';
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
  const resp = await axios.post<AuthResource>('/register', data);
  return resp.data;
}

export default function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    meta: {
      success: {
        toast: { content: "You've registered successfully." },
      },
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['users', 'me'], data);
    },
  });
}
