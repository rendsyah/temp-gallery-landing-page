import type React from 'react';
import type { Artworks } from '@/types/artworks.types';
import type { Meta } from '@/types/commons.types';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

type DetailArtistsWorksProps = {
  artworksData: Artworks[];
  artworksMetaData: Meta;
  onArtworksSeeMore: () => void;
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      ease: 'easeOut',
    },
  }),
};

const DetailArtistsWorks: React.FC<DetailArtistsWorksProps> = ({
  artworksData,
  artworksMetaData,
  onArtworksSeeMore,
}) => {
  return (
    <div className="py-12 px-6">
      <div className="section">
        {/* ARTWORKS CARD */}
        <div className="columns-1 sm:columns-2 lg:columns-3">
          {artworksData.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={cardVariant}
            >
              <div className="mb-6 break-inside-avoid">
                <Link href={`/artworks/${artwork.slug}`} className="block">
                  <div className="relative overflow-hidden group">
                    <Image
                      src={artwork.image}
                      alt={`${artwork.artist_name} – ${artwork.name}`}
                      width={600}
                      height={900}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <h1 className="font-playfair font-semibold text-2xl mt-2">
                    {artwork.artist_name}
                  </h1>
                  <h2 className="text-gray-500">{artwork.name}</h2>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEE MORE */}
        {artworksMetaData.getMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="flex items-center justify-center mt-10 lg:mt-8"
          >
            <button
              className="bg-primary-black text-white rounded-4xl py-2 px-8"
              onClick={onArtworksSeeMore}
            >
              See More...
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DetailArtistsWorks;
