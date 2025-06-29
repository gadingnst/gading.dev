'use client';

import { useState, useRef, ReactNode } from 'react';
import useUpdated from '@/packages/hooks/useUpdated';
import cn from '@/designs/utils/cn';

export interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  isScrolled?: boolean;
  className?: string;
  dropdownClassName?: string;
  position?: 'start' | 'end';
  open?: boolean;
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
  isScrolled = false,
  className,
  dropdownClassName,
  position = 'end',
  open: controlledOpen,
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
        tabIndex={0}
        role="button"
        className={cn([
          'btn btn-ghost btn-sm transition-all duration-300 liquid-glass',
          'text-base-content hover:text-base-content',
          isScrolled && 'shadow-xl'
        ])}
        onClick={handleToggle}
      >
        {trigger}
      </div>
      <ul className={cn([
        'dropdown-content mt-1 menu liquid-glass rounded-box z-[1] w-52 p-2 shadow-lg',
        dropdownClassName
      ])}>
        {children}
      </ul>
    </div>
  );
}
