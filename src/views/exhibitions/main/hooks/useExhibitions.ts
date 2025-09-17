import type { Exhibitions } from '@/types/exhibitions.types';
import type { Meta } from '@/types/commons.types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInternal } from '@/hooks/useInternal';
import { Routes } from '@/libs/constants/routes.const';
import { HttpStatus } from '@/libs/constants/httpStatus.const';

type ExhibitionsProps = {
  exhibitions: Exhibitions[];
  meta: Meta;
};

const useExhibitions = ({ exhibitions, meta }: ExhibitionsProps) => {
  const [exhibitionsData, setExhibitionsData] = useState(exhibitions);
  const [metaData, setMetaData] = useState(meta);

  const [selectedType, setSelectedType] = useState('current');

  const hasMounted = useRef(false);
  const internalAPI = useInternal();

  const fetchData = useCallback(
    async (page = 1, append = false) => {
      const response = await internalAPI(Routes.EXHIBITIONS, {
        page,
        limit: metaData.limit,
        type: selectedType || undefined,
      });

      if (response.status === HttpStatus.OK) {
        const json = await response.json();
        setExhibitionsData((prev) => (append ? [...prev, ...json.data.items] : json.data.items));
        setMetaData(json.data.meta);
      }
    },
    [metaData.limit, selectedType, internalAPI],
  );

  const onChangeType = useCallback(async (value: string) => {
    setSelectedType(value);
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
    exhibitionsData,
    metaData,
    selectedType,
    onChangeType,
    onSeeMore,
  };
};

export default useExhibitions;
