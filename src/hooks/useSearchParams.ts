import { useSearchParams as useNextSearchParams, usePathname, useRouter } from 'next/navigation';

export default function useSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useNextSearchParams();

  const setSearchParams = (
    callback: (
      params: URLSearchParams,
    ) => { params: URLSearchParams; pathname: string } | URLSearchParams,
  ) => {
    const result = callback(new URLSearchParams(searchParams));
    let to = pathname;
    let params = new URLSearchParams();

    if (typeof result === 'object' && 'pathname' in result) {
      to = result.pathname;
      params = result.params;
    }

    router.replace(to + '?' + params.toString());
  };

  return [searchParams, setSearchParams] as const;
}
