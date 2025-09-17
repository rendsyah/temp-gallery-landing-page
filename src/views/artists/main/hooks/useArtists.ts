import type { Artists } from '@/types/artists.types';
import type { Meta } from '@/types/commons.types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInternal } from '@/hooks/useInternal';
import { useDebounce } from '@/hooks/useDebounce';
import { Routes } from '@/libs/constants/routes.const';
import { HttpStatus } from '@/libs/constants/httpStatus.const';

type ArtistsProps = {
  artists: Artists[];
  meta: Meta;
};

const useArtists = ({ artists, meta }: ArtistsProps) => {
  const [artistsData, setArtitsData] = useState(artists);
  const [metaData, setMetaData] = useState(meta);

  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [search, setSearch] = useState('');

  const hasMounted = useRef(false);
  const internalAPI = useInternal();
  const debouncedSearch = useDebounce(search, 300);

  const fetchData = useCallback(
    async (page = 1, append = false) => {
      const response = await internalAPI(Routes.ARTISTS, {
        page,
        limit: metaData.limit,
        theme_id: selectedTheme || undefined,
        sub_category_id: selectedSubCategory || undefined,
        search: debouncedSearch || undefined,
      });

      if (response.status === HttpStatus.OK) {
        const json = await response.json();
        setArtitsData((prev) => (append ? [...prev, ...json.data.items] : json.data.items));
        setMetaData(json.data.meta);
      }
    },
    [metaData.limit, selectedTheme, selectedSubCategory, debouncedSearch, internalAPI],
  );

  const onChangeTheme = useCallback((value: string) => {
    setSelectedTheme(value);
    setMetaData((prev) => ({ ...prev, page: 1, getMore: false }));
  }, []);

  const onChangeSubCategory = useCallback((value: string) => {
    setSelectedSubCategory(value);
    setMetaData((prev) => ({ ...prev, page: 1, getMore: false }));
  }, []);

  const onChangeSearch = useCallback((value: string) => {
    setSearch(value);
    setMetaData((prev) => ({ ...prev, page: 1, getMore: false }));
  }, []);

  const onSeeMore = useCallback(async () => {
    fetchData(metaData.page + 1, true);
  }, [metaData.page, fetchData]);

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
    artistsData,
    metaData,
    selectedTheme,
    selectedSubCategory,
    search,
    onChangeTheme,
    onChangeSubCategory,
    onChangeSearch,
    onSeeMore,
  };
};

export default useArtists;
