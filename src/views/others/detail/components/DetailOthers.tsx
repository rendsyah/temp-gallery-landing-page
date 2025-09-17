import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { EmailIcon, WhatsappIcon } from '@/libs/constants/assets.const';
import BackButton from '@/components/ui/button/Back';
import ChevronLeftIcon from '@/components/icons/ChevronLeft';
import ChevronRightIcon from '@/components/icons/ChevronRight';

const DetailOthers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isHover, setIsHover] = useState(false);
  const [zoom, setZoom] = useState({ originX: 50, originY: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom({ originX: x, originY: y });
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    setZoom({ originX: 50, originY: 50 });
  };

  return (
    <div className="py-12 px-6">
      {/* DETAIL OTHERS */}
      <div className="section flex flex-col gap-6 lg:gap-8">
        <div>
          <BackButton href="/others">Browse Others</BackButton>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-14">
          {/* IMAGE OTHERS */}
          <div className="lg:flex-1">
            <div
              ref={containerRef}
              className="overflow-hidden w-full h-auto cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsHover(true)}
            >
              <Image
                src="/images/others-card.jpg"
                alt="Others"
                width={600}
                height={900}
                className="w-full h-auto object-contain"
                style={{
                  transform: isHover ? 'scale(1.4)' : 'scale(1)',
                  transformOrigin: `${zoom.originX}% ${zoom.originY}%`,
                }}
              />
            </div>
          </div>

          {/* INFO OTHERS */}
          <div className="lg:flex-1 flex flex-col gap-8">
            <h1 className="font-playfair font-semibold text-2xl sm:text-4xl tracking-wider">
              Rendy Ferdiansyah
            </h1>
            <div className="space-y-2 text-gray-500">
              <p className="text-lg text-primary-black">Yadnya, 2025</p>
              <div>
                <p>lino cut and hand colouring on canvas</p>
                <p>120 x 100 cm</p>
              </div>
            </div>
            <div className="space-y-2 text-gray-500">
              <p className="text-lg text-primary-black">Copyright The Artist</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas, beatae
                exercitationem consequatur odit quibusdam iure ipsam pariatur debitis veritatis,
                numquam aut quod quaerat ea libero esse? Dolores molestias harum autem? Lorem, ipsum
                dolor sit amet consectetur adipisicing elit. Voluptas, beatae exercitationem
                consequatur odit quibusdam iure ipsam pariatur debitis veritatis, numquam aut quod
                quaerat ea libero esse? Dolores molestias harum autem? Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Voluptas, beatae exercitationem consequatur odit
                quibusdam iure ipsam pariatur debitis veritatis, numquam aut quod quaerat ea libero
                esse? Dolores molestias harum autem?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full flex justify-center items-center gap-4 border border-primary-black bg-primary-black rounded-4xl py-4">
                <Image src={WhatsappIcon} alt="Whatsapp" />
                <span className="text-xl text-white">Enquire</span>
              </button>
              <button className="w-full flex justify-center items-center gap-4 border border-primary-black rounded-4xl py-4">
                <Image src={EmailIcon} alt="Phone" />
                <span className="text-xl">Enquire</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PREVIOUS & NEXT */}
      <div className="hidden lg:block fixed top-1/2 left-6">
        <Link href={'#'} aria-label="Previous Article">
          <ChevronLeftIcon className="w-8 h-8 text-gray-400 hover:text-primary-black transition-colors" />
        </Link>
      </div>
      <div className="hidden lg:block fixed top-1/2 right-6">
        <Link href={'#'} aria-label="Next Article">
          <ChevronRightIcon className="w-8 h-8 text-gray-400 hover:text-primary-black transition-colors" />
        </Link>
      </div>
    </div>
  );
};

export default DetailOthers;
