import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/libs/axios';
import { TToast } from '@/types';

async function logout() {
  return await axios.post('/logout');
}

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    meta: {
      toast: { content: "You've logged out successfully." } satisfies TToast,
    },
    onSuccess: () => {
      queryClient.setQueryData(['users', 'me'], null);
    },
  });
}
