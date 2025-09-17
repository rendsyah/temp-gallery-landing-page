'use client';

import type React from 'react';
import type { Banner } from '@/types/banner.types';
import type { Artworks } from '@/types/artworks.types';
import type { Meta, Options } from '@/types/commons.types';
import ArtworksHero from './components/ArtworksHero';
import ArtworksFilter from './components/ArtworksFilter';
import ArtworksCard from './components/ArtworksCard';
import useArtworks from './hooks/useArtworks';

type ArtworksViewProps = {
  banner: Banner[];
  artworks: Artworks[];
  meta: Meta;
  theme: Options[];
  subCategory: Options[];
};

const ArtworksView: React.FC<ArtworksViewProps> = ({
  banner,
  artworks,
  meta,
  theme,
  subCategory,
}) => {
  const {
    artworksData,
    metaData,
    selectedTheme,
    selectedSubCategory,
    search,
    onChangeTheme,
    onChangeSubCategory,
    onChangeSearch,
    onSeeMore,
  } = useArtworks({ artworks, meta });

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <ArtworksHero banner={banner} />
      </div>
      <div className="col-span-12">
        <ArtworksFilter
          themeData={theme}
          subCategoryData={subCategory}
          selectedTheme={selectedTheme}
          selectedSubCategory={selectedSubCategory}
          search={search}
          onChangeTheme={onChangeTheme}
          onChangeSubCategory={onChangeSubCategory}
          onChangeSearch={onChangeSearch}
        />
      </div>
      <div className="col-span-12">
        <ArtworksCard artworksData={artworksData} metaData={metaData} onSeeMore={onSeeMore} />
      </div>
    </div>
  );
};

export default ArtworksView;
