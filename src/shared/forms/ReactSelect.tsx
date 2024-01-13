import React from 'react';
import ReactSelectMain from 'react-select';
import { cn } from '@/utils';

type ReactSelectProps = React.ComponentProps<typeof ReactSelectMain> & {
  menuClassName?: string;
};

export default function ReactSelect({ className, menuClassName, ...props }: ReactSelectProps) {
  return (
    <ReactSelectMain
      {...props}
      components={{ DropdownIndicator: () => null }}
      unstyled
      classNames={{
        container: () => cn(className, 'font-sans'),
        control: ({ isFocused, hasValue }) =>
          cn('select select-bordered', {
            'border-2 border-primary': isFocused,
            'h-auto': props.isMulti && hasValue,
          }),
        placeholder: () => cn('text-gray-600'),
        indicatorsContainer: () => cn('gap-1'),
        clearIndicator: () => cn('btn btn-circle btn-ghost btn-sm p-1'),
        dropdownIndicator: () => cn('btn btn-circle btn-ghost btn-sm p-1'),
        noOptionsMessage: () => cn('py-4 font-display text-base'),
        menu: () =>
          cn(
            'mt-1 min-h-[2rem] rounded-btn border border-base-300 bg-base-200 px-2 shadow',
            menuClassName,
          ),
        multiValue: () => cn('m-1 rounded-btn bg-base-200 p-1 px-2 hover:bg-base-300'),
        multiValueRemove: () => cn('btn btn-circle btn-ghost btn-xs ml-1'),
        option: ({ isFocused, isSelected }) =>
          cn('my-2 rounded-btn px-2 py-3 text-base hover:cursor-pointer', {
            'bg-primary text-primary-content': isSelected,
            'bg-base-300 text-base-content': !isSelected && isFocused,
          }),
      }}
    />
  );
}
