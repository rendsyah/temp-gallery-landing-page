'use client';

import type React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { StateErrorImage } from '@/libs/constants/assets.const';

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  const onBack = () => {
    router.push('/');
  };

  return (
    <div className="px-6">
      <div className="section flex flex-col items-center justify-center gap-8 h-screen">
        <div>
          <Image src={StateErrorImage} alt="Not Found" />
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="font-playfair font-semibold text-4xl lg:text-5xl">
            This Path Leads Nowhere
          </h1>
          <p>
            The page you’re looking for isn’t where it’s supposed to be. Take a breath — and let’s
            find your way back.
          </p>
        </div>
        <button
          className="w-full sm:w-[150px] flex justify-center items-center gap-4 text-white bg-primary-black rounded-4xl py-3"
          onClick={onBack}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
