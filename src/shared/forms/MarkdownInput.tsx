import React, { Fragment, useState } from 'react';
import { Field, useFormikContext } from 'formik';
import Markdown from '@/shared/forms/Markdown';
import { cn } from '@/utils';

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
    <div role="tablist" className="tabs tabs-bordered">
      {tabs.map((tab) => (
        <Fragment key={tab.type}>
          <input
            checked={activeTab === tab.type}
            onChange={() => setActiveTab(tab.type)}
            type="radio"
            name="markdown_tab"
            role="tab"
            className="tab"
            aria-label={tab.label}
          />
          <div role="tabpanel" className="tab-content py-4">
            {tab.content}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
