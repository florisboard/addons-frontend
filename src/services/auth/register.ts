import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RegisterPayload } from '@/generated';
import api from '@/libs/api';
import sanctum from './sanctum';

async function register(data: RegisterPayload) {
  await sanctum();
  const resp = await api.auth.register(data);
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
