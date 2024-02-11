import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/libs/api';

async function logout() {
  return await api.auth.logout({});
}

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    meta: {
      success: {
        toast: { content: "You've logged out successfully." },
      },
    },
    onSuccess: () => {
      queryClient.setQueryData(['users', 'me'], null);
    },
  });
}
