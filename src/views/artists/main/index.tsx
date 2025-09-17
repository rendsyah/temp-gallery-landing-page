'use client';

import type React from 'react';
import type { Banner } from '@/types/banner.types';
import type { Artists } from '@/types/artists.types';
import type { Meta, Options } from '@/types/commons.types';
import ArtistsHero from './components/ArtistsHero';
import ArtistsFilter from './components/ArtistsFilter';
import ArtistsCard from './components/ArtistsCard';
import useArtists from './hooks/useArtists';

type ArtistsViewProps = {
  banner: Banner[];
  artists: Artists[];
  meta: Meta;
  theme: Options[];
  subCategory: Options[];
};

const ArtistsView: React.FC<ArtistsViewProps> = ({ banner, artists, meta, theme, subCategory }) => {
  const {
    artistsData,
    metaData,
    selectedTheme,
    selectedSubCategory,
    search,
    onChangeTheme,
    onChangeSubCategory,
    onChangeSearch,
    onSeeMore,
  } = useArtists({ artists, meta });

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <ArtistsHero banner={banner} />
      </div>
      <div className="col-span-12">
        <ArtistsFilter
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
        <ArtistsCard artistsData={artistsData} metaData={metaData} onSeeMore={onSeeMore} />
      </div>
    </div>
  );
};

export default ArtistsView;
