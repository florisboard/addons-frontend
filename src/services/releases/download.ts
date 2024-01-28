import { useMutation } from '@tanstack/react-query';
import api from '@/libs/api';

async function getDownloadLink(releaseId: number) {
  const resp = await api.releases.releasesDownload(releaseId);
  return resp.data;
}

export default function useDownloadRelease() {
  return useMutation({ mutationFn: getDownloadLink });
}
