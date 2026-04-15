'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variants = {
  primary: 'bg-simba-blue text-white hover:bg-simba-blue-dark shadow-lg shadow-simba-blue/25',
  secondary: 'border border-simba-gray-300 text-simba-black hover:bg-simba-gray-50',
  ghost: 'text-simba-blue hover:text-simba-blue-dark',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({ href, variant = 'primary', size = 'md', children, className, onClick }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200',
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return <button onClick={onClick} className={classes}>{children}</button>;
}
