'use client';

import type React from 'react';
import type { Banner } from '@/types/banner.types';
import type { Artworks } from '@/types/artworks.types';
import type { Exhibitions } from '@/types/exhibitions.types';
import type { Articles } from '@/types/articles.types';
import HomeHero from './components/HomeHero';
import HomeOverview from './components/HomeOverview';
import HomeArtworks from './components/HomeArtworks';
import HomeExhibitions from './components/HomeExhibitions';
import HomeArticles from './components/HomeArticles';

type HomeViewProps = {
  banner: Banner[];
  artworks: Artworks[];
  exhibitions: Exhibitions[];
  articles: Articles[];
};

const HomeView: React.FC<HomeViewProps> = ({ banner, artworks, exhibitions, articles }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <HomeHero banner={banner} />
      </div>
      <div className="col-span-12">
        <HomeOverview banner={banner} />
      </div>
      <div className="col-span-12">
        <HomeArtworks artworks={artworks} />
      </div>
      <div className="col-span-12">
        <HomeExhibitions exhibitions={exhibitions} />
      </div>
      <div className="col-span-12">
        <HomeArticles articles={articles} />
      </div>
    </div>
  );
};

export default HomeView;
