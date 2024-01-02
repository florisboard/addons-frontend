import { usePathname } from 'next/navigation';
import config from '@/fixtures/config';

export default function useAuthRoutes() {
  const pathname = usePathname();

  const generateAuthUrl = (name: string, path?: string) => {
    return `${path ?? pathname}?${config.authParamName}=${name}`;
  };

  return {
    login: (path?: string) => generateAuthUrl('login', path),
    register: generateAuthUrl('register'),
    forgotPassword: generateAuthUrl('forgotPassword'),
    resetPassword: generateAuthUrl('resetPassword'),
    emailVerification: generateAuthUrl('emailVerification'),
  } as const;
}
