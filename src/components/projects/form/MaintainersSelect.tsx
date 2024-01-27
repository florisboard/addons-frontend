import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { useDebounce } from 'use-debounce';
import { ProjectsStorePayload } from '@/generated';
import { IOption } from '@/interfaces';
import useUsers from '@/services/users';
import useMe from '@/services/users/me';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import ReactSelect from '@/shared/forms/ReactSelect';

type MaintainersSelectProps = {
  defaultValue?: IOption<number>[];
  ownerId: number | undefined;
};

export default function MaintainersSelect({ defaultValue, ownerId }: MaintainersSelectProps) {
  const [search, setSearch] = useState('');
  const { setFieldValue, values } = useFormikContext<ProjectsStorePayload>();
  const { data: me } = useMe();
  const [debouncedSearch] = useDebounce(search, 1000);
  const { data, isLoading } = useUsers({ filter: { username: debouncedSearch } });
  const isMaxMaintainers = (values.maintainers?.length ?? 0) >= 5;

  const options: IOption<number>[] | undefined = data?.pages
    .map((page) =>
      page.data
        .map((user) => ({ value: user.id, label: user.username }))
        .filter((user) => user.value !== me?.id),
    )
    .at(0);

  if (me?.id === ownerId) return null;

  return (
    <FieldWrapper name="maintainers" isRequired={false} label="Maintainers">
      <ReactSelect
        onChange={(values) => {
          setFieldValue(
            'maintainers',
            (values as IOption<number>[]).map((option) => option.value),
          );
        }}
        defaultValue={defaultValue}
        isMulti
        inputValue={search}
        onInputChange={setSearch}
        options={isMaxMaintainers ? [] : options}
        noOptionsMessage={() => (isMaxMaintainers ? 'Max maintainers is selected.' : undefined)}
        isLoading={isLoading}
      />
    </FieldWrapper>
  );
}
