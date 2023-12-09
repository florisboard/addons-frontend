import { useMutation } from '@tanstack/react-query';
import axios from '@/libs/axios';
import sanctum from './sanctum';

export interface IForgotPasswordDto {
  email: string;
}

async function forgotPassword(data: IForgotPasswordDto) {
  await sanctum();
  const resp = await axios.post('/forgot-password', data);
  return resp.data;
}

export default function useForgotPassword() {
  return useMutation({ mutationFn: forgotPassword });
}
