import { useMutation } from '@tanstack/react-query';
import { PasswordStorePayload } from '@/generated';
import api from '@/libs/api';
import sanctum from './sanctum';

async function resetPassword(data: PasswordStorePayload) {
  await sanctum();
  const resp = await api.auth.passwordStore(data);
  return resp.data;
}

export default function useResetPassword() {
  return useMutation({ mutationFn: resetPassword });
}
