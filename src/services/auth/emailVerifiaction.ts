import { useMutation } from '@tanstack/react-query';
import axios from '@/libs/axios';

async function emailVerification() {
  const resp = await axios.post('/email/verification-notification');
  return resp.data;
}

export default function useSendEmailVerification() {
  return useMutation({ mutationFn: emailVerification });
}
