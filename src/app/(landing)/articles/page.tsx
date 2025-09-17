import type React from 'react';
import type { Metadata } from 'next';
import type { Banner } from '@/types/banner.types';
import type { Articles } from '@/types/articles.types';
import type { Meta } from '@/types/commons.types';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import ArticlesView from '@/views/articles/main';

export const generateMetadata = async (): Promise<Metadata> => {
  try {
    const banner = await externalAPI.get(Routes.BANNER, { params: { type: 'articles' } });
    const dataBanner: Banner[] = banner.data.data;

    const title = 'Articles';
    const defaultDesc = `Temukan artikel terbaru seputar seni kontemporer, pameran, inspirasi, dan berita eksklusif hanya di Hays Gallery.`;
    const description = dataBanner?.[0]?.sub_title ?? defaultDesc;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        url: '/articles',
        images:
          dataBanner.length > 0
            ? [{ url: dataBanner[0].image, width: 1200, height: 630, alt: dataBanner[0].title }]
            : [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Hays Gallery' }],
      },
      twitter: {
        card: 'summary_large_image',
        description,
        images: dataBanner.length > 0 ? [dataBanner[0].image] : ['/images/og-default.jpg'],
      },
    };
  } catch (error) {
    console.error('Failed to generate ArticlesPage metadata', error);
    return {
      title: 'Articles',
    };
  }
};

const ArticlesPage: React.FC = async () => {
  try {
    const [bannerRes, articlesRes] = await Promise.all([
      externalAPI.get(Routes.BANNER, { params: { type: 'articles' } }),
      externalAPI.get(Routes.ARTICLES, { params: { page: 1, limit: 12 } }),
    ]);

    const dataBanner: Banner[] = bannerRes.data.data;
    const dataArticles: Articles[] = articlesRes.data.data.items;
    const dataMeta: Meta = articlesRes.data.data.meta;

    return <ArticlesView banner={dataBanner} articles={dataArticles} meta={dataMeta} />;
  } catch (error) {
    catchServerComponent(error);
  }
};

export default ArticlesPage;
