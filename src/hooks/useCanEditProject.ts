import { ProjectFullResource } from '@/generated';
import useMe from '@/services/users/me';

export default function useCanEditProject(project: ProjectFullResource | undefined) {
  const { data: me, isLoading } = useMe();
  const isOwner = project?.user_id === me?.id;
  const isMaintainer = project?.maintainers.some((user) => user.id === me?.id);

  return { canEdit: isOwner || isMaintainer, isLoading, isOwner, isMaintainer } as const;
}
