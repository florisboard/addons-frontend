import { usePathname } from 'next/navigation';
import config from '@/fixtures/config';

export default function useAuthRoutes() {
  const pathname = usePathname();

  const generateAuthUrl = (name: string) => {
    return `${pathname}?${config.authParamName}=${name}`;
  };

  return {
    login: generateAuthUrl('login'),
    register: generateAuthUrl('register'),
    forgotPassword: generateAuthUrl('forgotPassword'),
  } as const;
}
