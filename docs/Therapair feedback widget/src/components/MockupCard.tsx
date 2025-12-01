import React from 'react';
import { Card } from './ui/card';

interface MockupCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  background?: string;
}

export function MockupCard({ title, children, className = '', background = 'bg-white' }: MockupCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-4 bg-muted border-b">
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <div className={`p-8 ${background} ${className}`}>
        {children}
      </div>
    </Card>
  );
}
