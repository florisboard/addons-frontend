import React from 'react';
import { THasChildren } from '@/types';
import { cn } from '@/utils';

type CardProps = THasChildren & {
  title?: string;
  className?: string;
};

export default function Card({ title, children, className }: CardProps) {
  return (
    <section className={cn('card bg-base-200', className)}>
      <div className="card-body">
        {title && (
          <>
            <h2 className="card-title font-display text-2xl">{title}</h2>
            <div className="divider" />
          </>
        )}
        {children}
      </div>
    </section>
  );
}
