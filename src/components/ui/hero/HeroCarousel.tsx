import type React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { cn } from '@/libs/utils/cn';

type HeroItems = {
  title: string;
  subtitle?: string;
  placement_x?: string;
  placement_y?: string;
  image: string;
};

type HeroCarouselProps = {
  items: HeroItems[];
};

const HeroCarousel: React.FC<HeroCarouselProps> = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 1500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings}>
      {items.map((item, index) => {
        const placementXClasses = cn(
          item.placement_x === 'left' && 'justify-start text-left',
          item.placement_x === 'center' && 'justify-center text-center',
          item.placement_x === 'right' && 'justify-end text-right',
        );
        const placementYClasses = cn(
          item.placement_y === 'top' && 'items-start',
          item.placement_y === 'center' && 'items-center',
          item.placement_y === 'bottom' && 'items-end',
        );

        return (
          <div key={index}>
            <div
              className="w-full bg-cover bg-center bg-no-repeat px-6 h-[calc(100vh-88px)]"
              style={{
                backgroundImage: `linear-gradient(#000, #000000de 10%, #0006 96%), url(${item.image})`,
              }}
            >
              <div className={cn('section flex', placementXClasses, placementYClasses)}>
                <div className="flex flex-col gap-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="font-playfair font-semibold text-white text-4xl lg:text-5xl tracking-widest"
                  >
                    {item.title}
                  </motion.h1>
                  {item.subtitle && (
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                      className="text-gray-300 text-xl lg:text-2xl"
                    >
                      {item.subtitle}
                    </motion.h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default HeroCarousel;
