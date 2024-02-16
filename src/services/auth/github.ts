import { useMutation } from '@tanstack/react-query';
import api from '@/libs/api';

async function githubUrl() {
  const resp = await api.auth.githubRedirect();
  return resp.data;
}

export default function useGithubRedirectUrl() {
  return useMutation({ mutationFn: githubUrl });
}
