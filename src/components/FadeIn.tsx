import React from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  id?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  id,
}) => {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
};
