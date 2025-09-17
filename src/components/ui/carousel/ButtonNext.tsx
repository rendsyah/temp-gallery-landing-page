import type React from 'react';
import { CSSProperties } from 'react';
import { cn } from '@/libs/utils/cn';
import ChevronRightIcon from '@/components/icons/ChevronRight';

type ButtonNextProps = {
  style?: CSSProperties;
  onClick?: () => void;
};

const ButtonNext: React.FC<ButtonNextProps> = ({ style, onClick }) => (
  <button
    className={cn(
      'absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-primary-black hover:bg-black text-white p-2 rounded-full',
    )}
    style={{ ...style }}
    onClick={onClick}
  >
    <ChevronRightIcon className="w-6 h-6 text-white" />
  </button>
);

export default ButtonNext;
