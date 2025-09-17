'use client';

import type React from 'react';
import type { DetailArticles } from '@/types/articles.types';
import DetailArticlesInfo from './components/DetailArticlesInfo';

type DetailArticlesViewProps = {
  articles: DetailArticles;
};

const DetailArticlesView: React.FC<DetailArticlesViewProps> = ({ articles }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <DetailArticlesInfo articles={articles} />
      </div>
    </div>
  );
};

export default DetailArticlesView;
