import { ProjectFullResource } from '@/generated';
import useMe from '@/services/users/me';

export default function useCanEditProject(project: ProjectFullResource | undefined) {
  const { data: me, isLoading } = useMe();
  const canEdit =
    project?.user_id === me?.id || project?.maintainers.some((user) => user.id === me?.id);

  return { canEdit, isLoading } as const;
}
