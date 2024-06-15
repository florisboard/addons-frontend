import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { useDebounce } from 'use-debounce';
import { ProjectsStorePayload } from '@/generated';
import { IOption } from '@/interfaces';
import useDomains from '@/services/domains';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import ReactSelect from '@/shared/forms/ReactSelect';

export default function DomainsSelect() {
  const [search, setSearch] = useState('');
  const { setFieldValue } = useFormikContext<ProjectsStorePayload>();
  const [debouncedSearch] = useDebounce(search, 1000);
  const { data, isLoading } = useDomains({ filter: { name: debouncedSearch } });
  const options: IOption<string>[] | undefined = data.data
    .filter((domain) => Boolean(domain.verified_at))
    .map((domain) => ({ label: domain.name, value: domain.name }));

  return (
    <FieldWrapper name="domains" isRequired label="Active Domains">
      <ReactSelect
        onChange={(values) => {
          setFieldValue('domain_name', (values as IOption<string>).value);
        }}
        inputValue={search}
        placeholder="Search Domains ..."
        onInputChange={setSearch}
        options={options}
        isLoading={isLoading}
      />
    </FieldWrapper>
  );
}
