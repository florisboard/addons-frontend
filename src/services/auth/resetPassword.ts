import { useMutation } from '@tanstack/react-query';
import axios from '@/libs/axios';
import sanctum from './sanctum';

export interface IResetPasswordDto {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

async function resetPassword(data: IResetPasswordDto) {
  await sanctum();
  const resp = await axios.post('/reset-password', data);
  return resp.data;
}

export default function useResetPassword() {
  return useMutation({ mutationFn: resetPassword });
}
