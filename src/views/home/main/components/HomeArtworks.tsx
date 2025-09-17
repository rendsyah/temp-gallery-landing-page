import type React from 'react';
import type { Artworks } from '@/types/artworks.types';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ArrowUpRightIcon from '@/components/icons/ArrowUpRight';

type HomeArtworksProps = {
  artworks: Artworks[];
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const HomeArtworks: React.FC<HomeArtworksProps> = ({ artworks }) => {
  return (
    <div className="bg-black py-12 px-6 overflow-hidden">
      <div className="section">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-playfair font-semibold text-white text-3xl lg:text-4xl mb-12"
        >
          Artworks
        </motion.h1>

        {/* ARTWORKS CARD */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="columns-1 sm:columns-2 lg:columns-3"
        >
          {artworks.map((artwork) => (
            <motion.div key={artwork.id} variants={cardVariant} className="mb-6 break-inside-avoid">
              <Link href={`/artworks/${artwork.slug}`} className="block group">
                <div className="relative overflow-hidden">
                  <Image
                    src={artwork.image}
                    alt={`${artwork.artist_name} – ${artwork.name}`}
                    width={600}
                    height={900}
                    className="w-full h-auto object-contain transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                <h1 className="font-playfair font-semibold text-white text-2xl mt-2">
                  {artwork.artist_name}
                </h1>
                <h2 className="text-gray-300">{artwork.name}</h2>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* SEE ALL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-center mt-12"
        >
          <Link
            href="/artworks"
            className="flex flex-col items-center justify-center gap-1 bg-white rounded-full w-28 h-28 lg:w-32 lg:h-32"
          >
            <ArrowUpRightIcon className="w-5 h-5 rotate-12 stroke-3" />
            <span>See All</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeArtworks;
