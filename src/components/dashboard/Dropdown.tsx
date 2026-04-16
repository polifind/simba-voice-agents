'use client';

import { useEffect, useRef, useState } from 'react';

type DropdownItem = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
};

type Props = {
  trigger: React.ReactNode;
  items: DropdownItem[];
};

export function Dropdown({ trigger, items }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && (
        <div className="absolute right-0 mt-1 w-56 rounded-xl border border-simba-gray-200 bg-white shadow-lg py-1 z-30">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-simba-gray-700 hover:bg-simba-gray-50 flex items-center gap-2"
            >
              {item.icon && <span className="h-4 w-4 text-simba-gray-500">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
