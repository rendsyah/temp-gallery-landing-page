'use client';

import type React from 'react';
import Image from 'next/image';
import { startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StateErrorImage } from '@/libs/constants/assets.const';

const ErrorPage: React.FC<{ error: Error & { digest?: string }; reset: () => void }> = ({
  error,
  reset,
}) => {
  const router = useRouter();

  const onReset = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="px-6">
      <div className="section flex flex-col items-center justify-center gap-8 h-[calc(100vh-88px)]">
        <div>
          <Image src={StateErrorImage} alt="Error" />
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="font-playfair font-semibold text-4xl lg:text-5xl">
            Oops! Something Went Wrong
          </h1>
          <p>
            There was a system error while loading the page. Please refresh the page or return to
            the homepage.
          </p>
        </div>
        <button
          className="w-full sm:w-[150px] flex justify-center items-center gap-4 text-white bg-primary-black rounded-4xl py-3"
          onClick={onReset}
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
