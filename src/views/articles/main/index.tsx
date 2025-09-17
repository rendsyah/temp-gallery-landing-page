'use client';

import type React from 'react';
import type { Banner } from '@/types/banner.types';
import type { Articles } from '@/types/articles.types';
import type { Meta } from '@/types/commons.types';
import ArticlesHero from './components/ArticlesHero';
import ArticlesCard from './components/ArticlesCard';
import useArticles from './hooks/useArticles';

type ArticlesViewProps = {
  banner: Banner[];
  articles: Articles[];
  meta: Meta;
};

const ArticlesView: React.FC<ArticlesViewProps> = ({ banner, articles, meta }) => {
  const { articlesData, metaData, onSeeMore } = useArticles({ articles, meta });

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <ArticlesHero banner={banner} />
      </div>
      <div className="col-span-12">
        <ArticlesCard articlesData={articlesData} metaData={metaData} onSeeMore={onSeeMore} />
      </div>
    </div>
  );
};

export default ArticlesView;
