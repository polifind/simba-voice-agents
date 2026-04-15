'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  label: string;
  title: string;
  description: string;
}

interface TabGroupProps {
  tabs: Tab[];
}

export function TabGroup({ tabs }: TabGroupProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              'px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200',
              activeIndex === index
                ? 'bg-simba-blue text-white shadow-lg shadow-simba-blue/25'
                : 'bg-simba-gray-100 text-simba-gray-600 hover:bg-simba-gray-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-simba-gray-200 bg-simba-gray-50 p-8 sm:p-10"
      >
        <h3 className="text-2xl font-bold mb-3">{tabs[activeIndex].title}</h3>
        <p className="text-simba-gray-600 leading-relaxed text-lg">{tabs[activeIndex].description}</p>
      </motion.div>
    </div>
  );
}
