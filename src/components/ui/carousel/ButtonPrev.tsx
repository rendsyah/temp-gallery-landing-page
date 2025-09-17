import type React from 'react';
import { CSSProperties } from 'react';
import { cn } from '@/libs/utils/cn';
import ChevronLeftIcon from '@/components/icons/ChevronLeft';

type ButtonPrevProps = {
  style?: CSSProperties;
  onClick?: () => void;
};

const ButtonPrev: React.FC<ButtonPrevProps> = ({ style, onClick }) => (
  <button
    className={cn(
      'absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-primary-black hover:bg-black text-white p-2 rounded-full',
    )}
    style={{ ...style }}
    onClick={onClick}
  >
    <ChevronLeftIcon className="w-6 h-6" />
  </button>
);

export default ButtonPrev;
