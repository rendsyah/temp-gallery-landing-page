import type React from 'react';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/libs/utils/cn';

type DropdownProps = {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
};

const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose, children, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.dropdown-toggle')
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn('absolute left-0 top-full bg-black z-40', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
