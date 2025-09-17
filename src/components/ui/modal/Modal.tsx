'use client';

import type React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyModal, useGlobal } from '@/contexts/global.context';
import { cn } from '@/libs/utils/cn';
import XMarkIcon from '@/components/icons/XMark';

type ModalProps = {
  name: KeyModal;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  action?: React.ReactNode;
  onClose?: () => void;
};

const SIZE_CLASSES = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
};

const Modal: React.FC<ModalProps> = ({ name, title, children, size = 'lg', action, onClose }) => {
  const { modal, onCloseModal } = useGlobal();

  const isOpen = modal.type === name;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose ?? onCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* MODAL */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300, duration: 0.25 }}
            className={cn(
              'relative z-10 w-full max-w-xs rounded-2xl bg-background overflow-hidden',
              SIZE_CLASSES[size],
            )}
          >
            {/* HEADER */}
            <div className="w-full flex justify-between px-6 py-5 items-center">
              {title && (
                <h1 className="text-2xl font-playfair font-semibold tracking-wider">{title}</h1>
              )}
              <button onClick={onClose ?? onCloseModal}>
                <XMarkIcon className="h-6 w-6 stroke-3 text-gray-400" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 overflow-y-auto custom-scrollbar max-h-[450px] sm:max-h-[500px]">
              {children}
            </div>

            {/* ACTION */}
            {action && <div className="px-6 py-5">{action}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
