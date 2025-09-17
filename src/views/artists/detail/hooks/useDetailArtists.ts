import type { Artworks } from '@/types/artworks.types';
import type { Meta } from '@/types/commons.types';
import type { Exhibitions } from '@/types/exhibitions.types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInternal } from '@/hooks/useInternal';
import { Routes } from '@/libs/constants/routes.const';
import { HttpStatus } from '@/libs/constants/httpStatus.const';

type DetailArtistsProps = {
  slug: string;
  artworks: Artworks[];
  artworksMeta: Meta;
  exhibitions: Exhibitions[];
  exhibitionsMeta: Meta;
};

const useDetailArtists = ({
  slug,
  artworks,
  artworksMeta,
  exhibitions,
  exhibitionsMeta,
}: DetailArtistsProps) => {
  const [artworksData, setArtworksData] = useState(artworks);
  const [artworksMetaData, setArtworksMetaData] = useState(artworksMeta);
  const [exhibitionsData, setExhibitionsData] = useState(exhibitions);
  const [exhibitionsMetaData, setExhibitionsMetaData] = useState(exhibitionsMeta);

  const [selectedType, setSelectedType] = useState('works');

  const hasMounted = useRef(false);
  const internalAPI = useInternal();

  const fetchData = useCallback(
    async (page = 1, append = false) => {
      const route = selectedType === 'works' ? Routes.PRODUCTS : Routes.EXHIBITIONS;
      const limit = selectedType === 'works' ? artworksMetaData.limit : exhibitionsMetaData.limit;
      const type = selectedType !== 'works' ? 'current' : undefined;
      const artist_slug = slug;

      const response = await internalAPI(route, {
        page,
        limit,
        type,
        artist_slug,
      });

      if (response.status === HttpStatus.OK) {
        const json = await response.json();
        if (selectedType === 'works') {
          setArtworksData((prev) => (append ? [...prev, ...json.data.items] : json.data.items));
          setArtworksMetaData(json.data.meta);
        } else {
          setExhibitionsData((prev) => (append ? [...prev, ...json.data.items] : json.data.items));
          setExhibitionsMetaData(json.data.meta);
        }
      }
    },
    [artworksMetaData.limit, exhibitionsMetaData.limit, selectedType, slug, internalAPI],
  );

  const onChangeType = useCallback(async (value: string) => {
    setSelectedType(value);
    if (value === 'works') {
      setArtworksMetaData((prev) => ({ ...prev, page: 1, getMore: false }));
    } else {
      setExhibitionsMetaData((prev) => ({ ...prev, page: 1, getMore: false }));
    }
  }, []);

  const onSeeMore = useCallback(async () => {
    if (selectedType === 'works') {
      fetchData(artworksMetaData.page + 1, true);
    } else {
      fetchData(exhibitionsMetaData.page + 1, true);
    }
  }, [artworksMetaData.page, exhibitionsMetaData.page, selectedType, fetchData]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    return () => {
      hasMounted.current = false;
    };
  }, []);

  return {
    artworksData,
    artworksMetaData,
    exhibitionsData,
    exhibitionsMetaData,
    selectedType,
    onChangeType,
    onSeeMore,
  };
};

export default useDetailArtists;
