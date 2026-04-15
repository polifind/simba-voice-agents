'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}

export function SectionWrapper({ children, className, dark, id }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'py-20 sm:py-28',
        dark ? 'bg-simba-black text-white' : 'bg-white text-simba-black',
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
}
