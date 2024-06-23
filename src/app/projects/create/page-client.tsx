'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/components/projects/form/Form';
import { IUnprocessableEntity } from '@/interfaces';
import useDomains from '@/services/domains';
import useCreateProject from '@/services/projects/create';
import useCreateProjectImage from '@/services/projects/image/create';
import useCreateProjectScreenshots from '@/services/projects/screenshots/create';
import { convertPackageName, isAxiosError, slugifyId } from '@/utils';

export default function ProjectsCreateClient() {
  const { isPending: isCreating, mutateAsync: createProject } = useCreateProject();
  const { isPending: isCreatingImage, mutateAsync: createImage } = useCreateProjectImage();
  const { data: domains } = useDomains();
  const { mutate: createScreenshots } = useCreateProjectScreenshots();
  const isPending = isCreating || isCreatingImage;

  const router = useRouter();
  return (
    <Form
      mode="create"
      isOwner
      onSubmit={async (values, { setErrors }) => {
        const verifiedDomainId = domains.data.find(
          (domain) => domain.name === values.domain_name,
        )!.id;
        const data = await createProject(
          {
            ...values,
            package_name: convertPackageName(values.package_name, values.domain_name),
            verified_domain_id: verifiedDomainId,
          },
          {
            onError: (e) => {
              if (isAxiosError<IUnprocessableEntity>(e, 422)) {
                setErrors(e.response?.data.errors as any);
              }
            },
          },
        );
        if (values.image_path) {
          await createImage({ image_path: values.image_path, projectId: data.id });
        }
        if (values.screenshots_path.length > 0) {
          await createScreenshots({
            screenshots_path: values.screenshots_path,
            projectId: data.id,
          });
        }
        router.push(`/projects/${slugifyId(data.id, data.title)}/edit?tab=releases`);
      }}
      submit={{ text: 'Create', disabled: isPending, isPending }}
    />
  );
}
