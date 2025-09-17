import type React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/libs/utils/cn';

type DetailArtistsFilterProps = {
  selectedType: string;
  onChangeType: (value: string) => void;
};

const DetailArtistsFilter: React.FC<DetailArtistsFilterProps> = ({
  selectedType,
  onChangeType,
}) => {
  return (
    <div className="px-6">
      <div className="section flex justify-center">
        <div className="relative w-full flex justify-center sm:justify-start items-center gap-4 bg-gray-100 rounded-4xl p-2">
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={cn(
              'absolute h-[40px] sm:h-[44px] rounded-4xl bg-primary-black',
              selectedType === 'works'
                ? 'left-2 w-[calc(50%-0.5rem)] sm:left-2 sm:w-[120px]'
                : 'left-[calc(50%+0.25rem)] w-[calc(50%-0.5rem)] sm:left-[calc(120px+1.4rem)] sm:w-[120px]',
            )}
          />
          <button
            className={cn(
              'relative z-10 w-full sm:w-[120px] rounded-4xl px-4 py-2 transition-colors',
              selectedType === 'works' ? 'text-white' : 'text-black hover:text-primary-black',
            )}
            onClick={() => onChangeType('works')}
          >
            Works
          </button>
          <button
            className={cn(
              'relative z-10 w-full sm:w-[120px] rounded-4xl px-4 py-2 transition-colors',
              selectedType === 'event' ? 'text-white' : 'text-black hover:text-primary-black',
            )}
            onClick={() => onChangeType('event')}
          >
            Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailArtistsFilter;
