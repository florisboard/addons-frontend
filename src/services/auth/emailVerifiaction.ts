import { useMutation } from '@tanstack/react-query';
import api from '@/libs/api';

async function emailVerification() {
  const resp = await api.auth.verificationSend({});
  return resp.data;
}

export default function useSendEmailVerification() {
  return useMutation({ mutationFn: emailVerification });
}
