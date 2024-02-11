import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginPayload } from '@/generated';
import api from '@/libs/api';
import sanctum from './sanctum';

async function login(data: LoginPayload) {
  await sanctum();
  const resp = await api.auth.login(data);
  return resp.data;
}

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    meta: {
      success: {
        toast: { content: "You've logged in successfully." },
      },
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['users', 'me'], data);
    },
  });
}
