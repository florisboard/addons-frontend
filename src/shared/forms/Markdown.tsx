import React, { useEffect, useRef, useState } from 'react';
import MainMarkdown from 'react-markdown';
import { cn } from '@/utils';
import Button from '../Button';

type MarkdownProps = {
  className?: string;
  children: string;
  hasViewMore?: boolean;
};

export default function Markdown({ className, children, hasViewMore = false }: MarkdownProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // dynamically calculate if we should show button show more/less
  useEffect(() => {
    const handleResize = () => {
      if (contentRef && contentRef.current) {
        setIsClamped(contentRef.current.scrollHeight > contentRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        ref={contentRef}
        className={cn('prose w-full', { 'line-clamp-5': hasViewMore && !isMaximized }, className)}
      >
        <MainMarkdown>{children}</MainMarkdown>
      </div>
      {hasViewMore && isClamped && (
        <Button onClick={() => setIsMaximized((prev) => !prev)} className="divider">
          View {isMaximized ? 'Less' : 'More'}
        </Button>
      )}
    </>
  );
}
