import type React from 'react';
import type { Exhibitions } from '@/types/exhibitions.types';
import type { Meta } from '@/types/commons.types';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { cn } from '@/libs/utils/cn';

type ExhibitionsCardProps = {
  exhibitionsData: Exhibitions[];
  metaData: Meta;
  onSeeMore: () => void;
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const ExhibitionsCard: React.FC<ExhibitionsCardProps> = ({
  exhibitionsData,
  metaData,
  onSeeMore,
}) => {
  return (
    <div className="pb-12 px-6">
      <div className="section">
        {/* EXHIBITION CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:pt-6 lg:pt-12">
          {exhibitionsData.map((exhibition, index) => (
            <motion.div
              key={exhibition.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={cardVariant}
            >
              <Link href={`/exhibitions/${exhibition.slug}`}>
                <div
                  className={cn(
                    'relative overflow-hidden group aspect-[4/3]',
                    index % 2 === 1 && 'sm:-translate-y-6 lg:translate-y-0',
                    index % 3 === 1 && 'lg:-translate-y-12',
                  )}
                >
                  <Image
                    src={exhibition.image}
                    alt={exhibition.name}
                    fill
                    sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 group-hover:bg-black/20 transition-colors" />
                </div>
                <div
                  className={cn(
                    index % 2 === 1 && 'sm:-translate-y-6 lg:translate-y-0',
                    index % 3 === 1 && 'lg:-translate-y-12',
                  )}
                >
                  <h1 className="font-playfair font-semibold text-2xl mt-2">{exhibition.name}</h1>
                  <h2 className="text-gray-500">
                    {dayjs(exhibition.start_date).format('DD MMMM YYYY')} -{' '}
                    {dayjs(exhibition.end_date).format('DD MMMM YYYY')}
                  </h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* SEE MORE */}
        {metaData.getMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="flex items-center justify-center mt-10 lg:mt-8"
          >
            <button
              className="bg-primary-black text-white rounded-4xl py-2 px-8"
              onClick={onSeeMore}
            >
              See More...
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExhibitionsCard;
