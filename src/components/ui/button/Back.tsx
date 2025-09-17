import type React from 'react';
import { useRouter } from 'next/navigation';
import { Button as HeadlessButton } from '@headlessui/react';
import { cn } from '@/libs/utils/cn';
import ChevronLeftIcon from '@/components/icons/ChevronLeft';

type BackButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href: string;
};

const BackButton: React.FC<BackButtonProps> = ({
  children,
  type,
  href,
  className,
  disabled,
  ...restProps
}) => {
  const router = useRouter();

  const onBack = () => {
    router.push(href);
  };

  const baseClasses = cn('flex items-center text-lg gap-2', className);

  return (
    <HeadlessButton
      type={type}
      disabled={disabled}
      className={baseClasses}
      onClick={onBack}
      {...restProps}
    >
      <ChevronLeftIcon className="w-5 h-5" />
      <span>{children}</span>
    </HeadlessButton>
  );
};

export default BackButton;
