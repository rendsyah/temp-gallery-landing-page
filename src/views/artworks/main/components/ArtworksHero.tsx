import type React from 'react';
import type { Banner } from '@/types/banner.types';
import HeroSection from '@/components/ui/hero/HeroSection';

type ArtworksHeroProps = {
  banner: Banner[];
};

const ArtworksHero: React.FC<ArtworksHeroProps> = ({ banner }) => {
  return (
    <HeroSection
      image={banner?.[0]?.image ?? '/images/og-default.jpg'}
      title={banner?.[0]?.title ?? 'Artworks'}
      subtitle={banner?.[0]?.sub_title}
      placement_x={banner?.[0]?.placement_text_x ?? 'left'}
      placement_y={banner?.[0]?.placement_text_y ?? 'center'}
    />
  );
};

export default ArtworksHero;
