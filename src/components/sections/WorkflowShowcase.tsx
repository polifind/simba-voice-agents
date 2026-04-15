'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';
import type { WorkflowData } from '@/templates/types';

interface WorkflowShowcaseProps {
  data: WorkflowData;
}

export function WorkflowShowcase({ data }: WorkflowShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data.items[activeIndex];

  return (
    <SectionWrapper className="bg-simba-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-simba-black">
          {data.headline}
        </h2>
        {data.description && (
          <p className="mt-4 text-lg text-simba-gray-600 max-w-2xl mx-auto">{data.description}</p>
        )}
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Workflow tabs */}
        <div className="lg:col-span-2 space-y-3">
          {data.items.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'w-full text-left p-4 rounded-xl transition-all duration-200',
                activeIndex === index
                  ? 'bg-white shadow-lg border border-simba-gray-200'
                  : 'hover:bg-white/50'
              )}
            >
              <h3 className={cn(
                'font-semibold',
                activeIndex === index ? 'text-simba-blue' : 'text-simba-gray-700'
              )}>
                {item.title}
              </h3>
              <p className="text-sm text-simba-gray-500 mt-1">{item.description}</p>
            </button>
          ))}
        </div>

        {/* Conversation preview */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-white border border-simba-gray-200 shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-simba-gray-100">
              <div className="h-8 w-8 rounded-full bg-simba-blue flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <span className="font-semibold text-sm">SIMBA Agent</span>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Active</span>
            </div>

            {activeItem.conversation ? (
              <div className="space-y-4">
                {activeItem.conversation.map((msg, i) => (
                  <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-3 text-sm',
                      msg.role === 'user'
                        ? 'bg-simba-blue text-white rounded-br-md'
                        : 'bg-simba-gray-100 text-simba-gray-800 rounded-bl-md'
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-simba-gray-400">
                <p className="text-lg font-semibold mb-2">{activeItem.title}</p>
                <p className="text-sm">{activeItem.description}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
