import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { useDebounce } from 'use-debounce';
import { ProjectsStorePayload } from '@/generated';
import { IOption } from '@/interfaces';
import useCategories from '@/services/categories';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import ReactSelect from '@/shared/forms/ReactSelect';

type CategoriesSelectProps = {
  defaultValue?: IOption;
};

export default function CategoriesSelect({ defaultValue }: CategoriesSelectProps) {
  const [search, setSearch] = useState('');
  const { setFieldValue } = useFormikContext<ProjectsStorePayload>();
  const [debouncedSearch] = useDebounce(search, 1000);
  const { data, isLoading } = useCategories({ filter: { name: debouncedSearch } });
  const options: IOption[] | undefined = data?.pages
    .map((page) => page.data.map((category) => ({ value: category.id, label: category.name })))
    .at(0);

  return (
    <FieldWrapper name="category_id" isRequired label="Category">
      <ReactSelect
        onChange={(value) => {
          setFieldValue('category_id', (value as IOption).value);
        }}
        defaultValue={defaultValue}
        inputValue={search}
        onInputChange={setSearch}
        options={options}
        isLoading={isLoading}
      />
    </FieldWrapper>
  );
}
