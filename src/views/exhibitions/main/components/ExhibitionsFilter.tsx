import type React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/libs/utils/cn';

type ExhibitionsFilterProps = {
  selectedType: string;
  onChangeType: (value: string) => void;
};

const ExhibitionsFilter: React.FC<ExhibitionsFilterProps> = ({ selectedType, onChangeType }) => {
  return (
    <div className="py-12 px-6">
      <div className="section flex justify-center">
        <div className="relative w-full sm:w-auto flex justify-center items-center gap-4 bg-gray-100 rounded-4xl p-2">
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={cn(
              'absolute h-[40px] sm:h-[44px] rounded-4xl bg-primary-black',
              selectedType === 'current'
                ? 'left-2 w-[calc(50%-0.5rem)] sm:w-[120px]'
                : 'right-2 w-[calc(50%-0.5rem)] sm:w-[120px]',
            )}
          />

          <button
            className={cn(
              'relative z-10 w-full sm:w-[120px] rounded-4xl px-4 py-2 transition-colors',
              selectedType === 'current' ? 'text-white' : 'text-black hover:text-primary-black',
            )}
            onClick={() => onChangeType('current')}
          >
            Current
          </button>
          <button
            className={cn(
              'relative z-10 w-full sm:w-[120px] rounded-4xl px-4 py-2 transition-colors',
              selectedType === 'past' ? 'text-white' : 'text-black hover:text-primary-black',
            )}
            onClick={() => onChangeType('past')}
          >
            Past
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionsFilter;
