'use client';

import type React from 'react';
import type { DetailArtists } from '@/types/artists.types';
import type { Artworks } from '@/types/artworks.types';
import type { Exhibitions } from '@/types/exhibitions.types';
import type { Meta } from '@/types/commons.types';
import DetailArtistsInfo from './components/DetailArtistsInfo';
import DetailArtistsFilter from './components/DetailArtistsFilter';
import DetailArtistsWorks from './components/DetailArtistsWorks';
import DetailArtistsEvents from './components/DetailArtistsEvents';
import useDetailArtists from './hooks/useDetailArtists';

type DetailArtistsViewProps = {
  slug: string;
  artists: DetailArtists;
  artworks: Artworks[];
  artworksMeta: Meta;
  exhibitions: Exhibitions[];
  exhibitionsMeta: Meta;
};

const DetailArtistsView: React.FC<DetailArtistsViewProps> = ({
  slug,
  artists,
  artworks,
  artworksMeta,
  exhibitions,
  exhibitionsMeta,
}) => {
  const {
    artworksData,
    artworksMetaData,
    exhibitionsData,
    exhibitionsMetaData,
    selectedType,
    onChangeType,
    onSeeMore,
  } = useDetailArtists({
    slug,
    artworks,
    artworksMeta,
    exhibitions,
    exhibitionsMeta,
  });

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <DetailArtistsInfo artists={artists} />
      </div>
      <div className="col-span-12">
        <DetailArtistsFilter selectedType={selectedType} onChangeType={onChangeType} />
      </div>
      <div className="col-span-12">
        {selectedType === 'works' && (
          <DetailArtistsWorks
            artworksData={artworksData}
            artworksMetaData={artworksMetaData}
            onArtworksSeeMore={onSeeMore}
          />
        )}
        {selectedType === 'event' && (
          <DetailArtistsEvents
            exhibitionsData={exhibitionsData}
            exhibitionsMetaData={exhibitionsMetaData}
            onExhibitionSeeMore={onSeeMore}
          />
        )}
      </div>
    </div>
  );
};

export default DetailArtistsView;
