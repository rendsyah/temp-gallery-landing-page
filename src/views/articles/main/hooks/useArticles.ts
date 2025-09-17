import type { Articles } from '@/types/articles.types';
import type { Meta } from '@/types/commons.types';
import { useCallback, useState } from 'react';
import { useInternal } from '@/hooks/useInternal';
import { Routes } from '@/libs/constants/routes.const';
import { HttpStatus } from '@/libs/constants/httpStatus.const';

type ArticlesProps = {
  articles: Articles[];
  meta: Meta;
};

const useArticles = ({ articles, meta }: ArticlesProps) => {
  const [articlesData, setArticlesData] = useState(articles);
  const [metaData, setMetaData] = useState(meta);

  const internalAPI = useInternal();

  const fetchData = useCallback(
    async (page = 1, append = false) => {
      const response = await internalAPI(Routes.EXHIBITIONS, {
        page,
        limit: metaData.limit,
      });

      if (response.status === HttpStatus.OK) {
        const json = await response.json();
        setArticlesData((prev) => (append ? [...prev, ...json.data.items] : json.data.items));
        setMetaData(json.data.meta);
      }
    },
    [metaData.limit, internalAPI],
  );

  const onSeeMore = useCallback(async () => {
    fetchData(metaData.page + 1, true);
  }, [metaData.page, fetchData]);

  return {
    articlesData,
    metaData,
    onSeeMore,
  };
};

export default useArticles;
