import React from 'react';
import {
  HiEllipsisVertical,
  HiOutlineFlag,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { useParams } from 'next/navigation';
import compact from 'lodash/compact';
import useDeleteReview from '@/services/reviews/delete';
import Button from '@/shared/forms/Button';
import { cn, extractIdFromSlug } from '@/utils';

type OptionsProps = {
  isOwner: boolean;
  reviewId: number;
  onReport: () => void;
  onEdit?: () => void;
  className?: string;
};

export default function Options({ className, onReport, isOwner, reviewId, onEdit }: OptionsProps) {
  const { slug } = useParams<{ slug: string }>();
  const { mutate: deleteReview } = useDeleteReview(extractIdFromSlug(slug)!);

  const handleDelete = () => {
    deleteReview(+reviewId);
  };

  const options = compact([
    { canShow: !isOwner, onClick: onReport, name: 'Report', Icon: HiOutlineFlag },
    { canShow: isOwner, onClick: onEdit, name: 'Edit', Icon: HiOutlinePencil },
    { canShow: isOwner, onClick: handleDelete, name: 'Delete', Icon: HiOutlineTrash },
  ]);

  if (options.length < 1) return null;

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
              <Button onClick={option.onClick}>
                <option.Icon className="h-6 w-6" />
                <span>{option.name}</span>
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
}
