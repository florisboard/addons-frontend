import { useSearchParams as useNextSearchParams, usePathname, useRouter } from 'next/navigation';

export default function useSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useNextSearchParams();

  const setSearchParams = (callback: (params: URLSearchParams) => URLSearchParams) => {
    router.replace(pathname + '?' + callback(new URLSearchParams(searchParams)).toString());
  };

  return [searchParams, setSearchParams] as const;
}
