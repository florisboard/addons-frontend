import React from 'react';
import {
  HiEllipsisVertical,
  HiOutlineFlag,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi2';
import compact from 'lodash/compact';
import Button from '@/shared/Button';
import { cn } from '@/utils';

type OptionsProps = {
  className?: string;
  isOwner: boolean;
};

export default function Options({ className, isOwner }: OptionsProps) {
  const options = compact([
    { canShow: true, name: 'Report', Icon: HiOutlineFlag },
    { canShow: isOwner, name: 'Edit', Icon: HiOutlinePencil },
    { canShow: isOwner, name: 'Delete', Icon: HiOutlineTrash },
  ]);

  return (
    <div className={cn('dropdown dropdown-left md:ml-auto', className)}>
      <div tabIndex={0} role="button" className="btn btn-square btn-ghost btn-sm">
        <HiEllipsisVertical className="h-6 w-6" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-44 rounded-box bg-base-100 p-2 shadow"
      >
        {options
          .filter(({ canShow }) => canShow)
          .map((option) => (
            <li key={option.name}>
              <Button>
                <option.Icon className="h-6 w-6" />
                <span>{option.name}</span>
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
}
