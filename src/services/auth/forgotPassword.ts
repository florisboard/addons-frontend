import { useMutation } from '@tanstack/react-query';
import { PasswordEmailPayload } from '@/generated';
import api from '@/libs/api';
import sanctum from './sanctum';

async function forgotPassword(data: PasswordEmailPayload) {
  await sanctum();
  const resp = await api.auth.passwordEmail(data);
  return resp.data;
}

export default function useForgotPassword() {
  return useMutation({ mutationFn: forgotPassword });
}
