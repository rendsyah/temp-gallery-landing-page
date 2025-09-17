import type React from 'react';
import type { DetailArtists } from '@/types/artists.types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import BackButton from '@/components/ui/button/Back';
import ChevronLeftIcon from '@/components/icons/ChevronLeft';
import ChevronRightIcon from '@/components/icons/ChevronRight';

type DetailArtistsInfoProps = {
  artists: DetailArtists;
};

const DetailArtistsInfo: React.FC<DetailArtistsInfoProps> = ({ artists }) => {
  return (
    <div className="py-12 px-6">
      {/* DETAIL ARTISTS */}
      <div className="section flex flex-col gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <BackButton href="/artists">Browse Artists</BackButton>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-14">
          {/* IMAGE ARTISTS */}
          <motion.div
            className="lg:flex-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src={artists.image}
              alt="Artists"
              width={600}
              height={900}
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* INFO ARTISTS */}
          <motion.div
            className="lg:flex-1 flex flex-col gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <h1 className="font-playfair font-semibold text-2xl sm:text-4xl tracking-wider">
              {artists.name}
            </h1>
            <div className="space-y-2 text-gray-500">
              <p className="text-lg text-primary-black">Overview</p>
              <div dangerouslySetInnerHTML={{ __html: artists.desc }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* PREVIOUS & NEXT */}
      <motion.div
        className="hidden lg:block fixed top-1/2 left-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      >
        {artists.prev ? (
          <Link href={`/artists/${artists.prev}`} aria-label="Previous Artists">
            <ChevronLeftIcon className="w-8 h-8 text-gray-400 hover:text-primary-black transition-colors" />
          </Link>
        ) : (
          <span aria-label="Previous Artists" aria-disabled="true">
            <ChevronLeftIcon className="w-8 h-8 text-gray-400 cursor-not-allowed" />
          </span>
        )}
      </motion.div>

      <motion.div
        className="hidden lg:block fixed top-1/2 right-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      >
        {artists.next ? (
          <Link href={`/artists/${artists.next}`} aria-label="Next Artists">
            <ChevronRightIcon className="w-8 h-8 text-gray-400 hover:text-primary-black transition-colors" />
          </Link>
        ) : (
          <span aria-label="Next Artists" aria-disabled="true">
            <ChevronRightIcon className="w-8 h-8 text-gray-400 cursor-not-allowed" />
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default DetailArtistsInfo;
