import type React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/libs/utils/cn';

type HeroSectionProps = {
  title: string;
  subtitle?: string;
  placement_x?: string;
  placement_y?: string;
  image: string;
  height?: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  image,
  height = 'h-[575px]',
  placement_x = 'center',
  placement_y = 'center',
}) => {
  const placementXClasses = cn(
    placement_x === 'left' && 'justify-start text-left',
    placement_x === 'center' && 'justify-center text-center',
    placement_x === 'right' && 'justify-end text-right',
  );
  const placementYClasses = cn(
    placement_y === 'top' && 'items-start',
    placement_y === 'center' && 'items-center',
    placement_y === 'bottom' && 'items-end',
  );

  return (
    <div
      className={cn('w-full bg-cover bg-center bg-no-repeat px-6', height)}
      style={{
        backgroundImage: `linear-gradient(#000, #000000de 10%, #0006 96%), url(${image})`,
      }}
    >
      <div className={cn('section flex', placementXClasses, placementYClasses)}>
        <div className="flex flex-col gap-2">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-playfair font-semibold text-white text-4xl lg:text-5xl tracking-widest"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              className="text-gray-300 text-xl lg:text-2xl"
            >
              {subtitle}
            </motion.h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
