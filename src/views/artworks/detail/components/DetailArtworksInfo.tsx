import type React from 'react';
import type { Contact } from '@/types/contact.types';
import type { DetailArtworks } from '@/types/artworks.types';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useGlobal } from '@/contexts/global.context';
import { formatCurrency } from '@/libs/utils/formatCurrency';
import { EmailIcon, WhatsappIcon } from '@/libs/constants/assets.const';
import BackButton from '@/components/ui/button/Back';
import ChevronLeftIcon from '@/components/icons/ChevronLeft';
import ChevronRightIcon from '@/components/icons/ChevronRight';

type DetailArtworksInfoProps = {
  contact: Contact;
  artworks: DetailArtworks;
};

const DetailArtworksInfo: React.FC<DetailArtworksInfoProps> = ({ contact, artworks }) => {
  const { onOpenModal } = useGlobal();

  const [isHover, setIsHover] = useState(false);
  const [zoom, setZoom] = useState({ originX: 50, originY: 50 });

  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const baseURL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const artworksURL = `${baseURL}${pathname}`;

  const message = `Halo, saya menemukan karya ini dan tertarik untuk tahu lebih lanjut: ${artworksURL}`;

  const onMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom({ originX: x, originY: y });
  };

  const onMouseLeave = () => {
    setIsHover(false);
    setZoom({ originX: 50, originY: 50 });
  };

  return (
    <div className="py-12 px-6">
      {/* DETAIL ARTWORKS */}
      <div className="section flex flex-col gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <BackButton href="/artworks">Browse Artworks</BackButton>
        </motion.div>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-14">
          {/* IMAGE ARTWORKS */}
          <motion.div
            className="lg:flex-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div
              ref={containerRef}
              className="overflow-hidden w-full h-auto cursor-pointer"
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              onMouseEnter={() => setIsHover(true)}
            >
              <Image
                src={artworks.images[0].image}
                alt={artworks.name}
                width={600}
                height={900}
                className="w-full h-auto object-contain"
                style={{
                  transform: isHover ? 'scale(1.4)' : 'scale(1)',
                  transformOrigin: `${zoom.originX}% ${zoom.originY}%`,
                }}
              />
            </div>
          </motion.div>

          {/* INFO ARTWORKS */}
          <motion.div
            className="lg:flex-1 flex flex-col gap-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <h1 className="font-playfair font-semibold text-2xl sm:text-4xl tracking-wider">
              {artworks.artist_name}
            </h1>
            {artworks.price > 0 && (
              <h2 className="font-semibold text-2xl sm:text-4xl">
                {formatCurrency(artworks.price)}
              </h2>
            )}
            <div className="space-y-2 text-gray-500">
              <p className="text-lg text-primary-black">
                {artworks.name}, {artworks.year}
              </p>
              <div>
                <p>{artworks.category_name}</p>
                <p>
                  {artworks.length} x {artworks.width} {artworks.unit}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-gray-500">
              <p className="text-lg text-primary-black">Copyright The Artist</p>
              <div dangerouslySetInnerHTML={{ __html: artworks.desc }} />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                href={`https://wa.me/${contact.wa_phone}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-4 border border-primary-black bg-primary-black rounded-4xl py-4"
              >
                <Image src={WhatsappIcon} alt="Whatsapp" />
                <span className="text-xl text-white">Enquire</span>
              </Link>
              <button
                className="w-full flex justify-center items-center gap-4 border border-primary-black rounded-4xl py-4"
                onClick={() => onOpenModal({ type: 'transaction' })}
              >
                <Image src={EmailIcon} alt="Phone" />
                <span className="text-xl">Enquire</span>
              </button>
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
        {artworks.prev ? (
          <Link href={`/artworks/${artworks.prev}`} aria-label="Previous Artworks">
            <ChevronLeftIcon className="w-8 h-8 text-gray-400 hover:text-primary-black transition-colors" />
          </Link>
        ) : (
          <span aria-label="Previous Artworks" aria-disabled="true">
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
        {artworks.next ? (
          <Link href={`/artworks/${artworks.next}`} aria-label="Next Artworks">
            <ChevronRightIcon className="w-8 h-8 text-gray-400 hover:text-primary-black transition-colors" />
          </Link>
        ) : (
          <span aria-label="Next Artworks" aria-disabled="true">
            <ChevronRightIcon className="w-8 h-8 text-gray-400 cursor-not-allowed" />
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default DetailArtworksInfo;
