import React from 'react';
import { Card } from './ui/card';

interface LogoDirectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  directionLabel: string;
}

export function LogoDirection({ title, description, children, directionLabel }: LogoDirectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full mb-2">
          {directionLabel}
        </div>
        <h2>{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
