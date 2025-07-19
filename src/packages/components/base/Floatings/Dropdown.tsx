'use client';

import { ReactNode, useRef, useState } from 'react';

import cn from '@/designs/utils/cn';
import useUpdated from '@/packages/hooks/useUpdated';

export interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  dropdownClassName?: string;
  position?: 'start' | 'end';
  open?: boolean;
  disabled?: boolean;
  liquidGlass?: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean) => void;
}

/**
 * Reusable dropdown component with liquid glass effect
 * Supports controlled and uncontrolled modes
 */
export default function Dropdown({
  trigger,
  children,
  className,
  dropdownClassName,
  liquidGlass,
  position = 'end',
  open: controlledOpen,
  disabled = false,
  onOpenChange
}: DropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  useUpdated(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  /**
   * Handle dropdown toggle
   */
  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn([
        'dropdown',
        position === 'end' ? 'dropdown-end' : 'dropdown-start',
        isOpen && 'dropdown-open',
        className
      ])}
      ref={dropdownRef}
    >
      <div
        tabIndex={disabled ? -1 : 0}
        role="button"
        className={cn([
          'btn btn-ghost btn-sm transition-all duration-300',
          liquidGlass && 'liquid-glass-shadow hover:bg-white/15 hover:text-black',
          disabled && 'btn-disabled opacity-60 cursor-not-allowed'
        ])}
        onClick={handleToggle}
      >
        {trigger}
      </div>
      <ul
        className={cn([
          'dropdown-content mt-1 menu rounded-box z-[1] w-52 p-2 shadow-lg gap-y-1.5',
          liquidGlass && 'liquid-glass-shadow',
          dropdownClassName
        ])}
      >
        {children}
      </ul>
    </div>
  );
}
