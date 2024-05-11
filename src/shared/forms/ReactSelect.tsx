import React from 'react';
import ReactSelectMain from 'react-select';
import { cn } from '@/utils';

type ReactSelectProps = React.ComponentProps<typeof ReactSelectMain> & {
  menuClassName?: string;
};

export default function ReactSelect({ className, menuClassName, ...props }: ReactSelectProps) {
  return (
    <ReactSelectMain
      menuPlacement="auto"
      {...props}
      components={{ DropdownIndicator: () => null }}
      unstyled
      menuPosition="fixed"
      classNames={{
        container: () => cn(className, 'font-sans'),
        control: ({ isFocused, hasValue }) =>
          cn('select select-bordered', {
            'border-2 border-primary': isFocused,
            'h-auto': props.isMulti && hasValue,
          }),
        placeholder: () => 'text-gray-600',
        indicatorsContainer: () => 'gap-1',
        clearIndicator: () => 'btn btn-circle btn-ghost btn-sm p-1',
        dropdownIndicator: () => 'btn btn-circle btn-ghost btn-sm p-1',
        noOptionsMessage: () => 'py-4 font-display text-base',
        menu: () =>
          cn(
            'mt-1 min-h-[2rem] rounded-btn border border-base-300 bg-base-200 px-2 shadow',
            menuClassName,
          ),
        multiValue: () => 'm-1 rounded-btn bg-base-200 p-1 px-2 hover:bg-base-300',
        multiValueRemove: () => 'btn btn-circle btn-ghost btn-xs ml-1',
        option: ({ isFocused, isSelected }) =>
          cn('my-1 rounded-btn px-2 py-3 text-xs hover:cursor-pointer', {
            'bg-primary text-primary-content': isSelected,
            'bg-base-300 text-base-content': !isSelected && isFocused,
          }),
      }}
    />
  );
}
