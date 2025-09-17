import type React from 'react';
import type { Banner } from '@/types/banner.types';
import HeroCarousel from '@/components/ui/hero/HeroCarousel';

type HomeHeroProps = {
  banner: Banner[];
};

const HomeHero: React.FC<HomeHeroProps> = ({ banner }) => {
  return (
    <HeroCarousel
      items={banner.map((item) => ({
        ...item,
        subtitle: item.sub_title,
        placement_x: item.placement_text_x,
        placement_y: item.placement_text_y,
      }))}
    />
  );
};

export default HomeHero;
