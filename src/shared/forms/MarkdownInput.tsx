import React, { Fragment, useState } from 'react';
import { Field, useFormikContext } from 'formik';
import Markdown from '@/shared/forms/Markdown';
import { cn } from '@/utils';
import Button from './Button';

type MarkdownInputProps = {
  name: string;
};

type TTab = 'input' | 'preview';

export default function MarkdownInput(props: MarkdownInputProps) {
  const { values } = useFormikContext<any>();
  const [activeTab, setActiveTab] = useState<TTab>('input');

  const tabs: { type: TTab; label: string; content: React.ReactNode }[] = [
    {
      type: 'input',
      label: 'Input',
      content: (
        <Field
          {...props}
          className={cn('textarea textarea-bordered w-full', { hasError: 'textarea-error' })}
          as="textarea"
        />
      ),
    },
    {
      type: 'preview',
      label: 'Preview',
      content: <Markdown className="prose-sm">{values[props.name]}</Markdown>,
    },
  ];

  return (
    <div className="space-y-4">
      <div role="tablist" className="tabs tabs-bordered">
        {tabs.map((tab) => (
          <Fragment key={tab.type}>
            <Button
              onClick={() => setActiveTab(tab.type)}
              role="tab"
              className={cn('tab', { 'tab-active': activeTab === tab.type })}
            >
              {tab.label}
            </Button>
          </Fragment>
        ))}
      </div>
      <div className="w-full">{tabs.find((tab) => tab.type === activeTab)?.content}</div>
    </div>
  );
}
