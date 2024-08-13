import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { useDebounce } from 'use-debounce';
import { ProjectsStorePayload } from '@/generated';
import { IOption } from '@/interfaces';
import useCategories from '@/services/categories';
import FieldWrapper from '@/shared/forms/FieldWrapper';
import ReactSelect from '@/shared/forms/ReactSelect';

type CategoriesSelectProps = {
  defaultValue?: IOption<number>;
};

export default function CategoriesSelect({ defaultValue }: CategoriesSelectProps) {
  const [search, setSearch] = useState('');
  const { setFieldValue } = useFormikContext<ProjectsStorePayload>();
  const [debouncedSearch] = useDebounce(search, 1000);
  const { data, isLoading } = useCategories({ filter: { title: debouncedSearch } });
  const options: IOption<number>[] | undefined = data?.pages
    .map((page) => page.data.map((category) => ({ value: category.id, label: category.title })))
    .at(0);

  return (
    <FieldWrapper name="category_id" isRequired label="Category">
      <ReactSelect
        menuPosition="fixed"
        onChange={(value) => {
          setFieldValue('category_id', (value as IOption<number>).value);
        }}
        placeholder="Search Categories ..."
        defaultValue={defaultValue}
        inputValue={search}
        onInputChange={setSearch}
        options={options}
        isLoading={isLoading}
      />
    </FieldWrapper>
  );
}
