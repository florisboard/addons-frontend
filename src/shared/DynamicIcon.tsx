import React from 'react';
import * as hiIcons from 'react-icons/hi2';

export interface DynamicIconProps extends React.AllHTMLAttributes<'span'> {
  iconName: string;
}

export default function DynamicIcon({ iconName, ...props }: DynamicIconProps) {
  const Icon = (hiIcons as any)[iconName] ?? hiIcons.HiFire;
  return <Icon {...props} />;
}
