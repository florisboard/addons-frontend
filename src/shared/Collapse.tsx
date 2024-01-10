import React, { useState } from 'react';
import { THasChildren } from '@/types';
import { cn } from '@/utils';

type CollapseProps = THasChildren & {
  title: string;
  isOpenByDefault?: boolean;
  contentClassName?: string;
};

export default function Collapse({
  title,
  contentClassName,
  children,
  isOpenByDefault = true,
}: CollapseProps) {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="collapse collapse-arrow border border-base-300 bg-base-200">
      <input checked={isOpen} onChange={handleToggle} type="checkbox" />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className={cn('collapse-content', contentClassName)}>{children}</div>
    </div>
  );
}
