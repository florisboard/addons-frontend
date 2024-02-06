import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/libs/axios';

async function logout() {
  return await axios.post('/logout');
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
