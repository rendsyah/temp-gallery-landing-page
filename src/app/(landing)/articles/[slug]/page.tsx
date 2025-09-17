import type React from 'react';
import type { Metadata } from 'next';
import type { Params } from '@/types/commons.types';
import type { DetailArticles } from '@/types/articles.types';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import DetailArticlesView from '@/views/articles/detail';

type DetailArticlesPageProps = {
  params: Promise<Params>;
};

export const generateMetadata = async ({ params }: DetailArticlesPageProps): Promise<Metadata> => {
  try {
    const { slug } = await params;

    const articles = await externalAPI.get(`${Routes.ARTICLES_SLUG}/${slug}`);
    const dataArticles: DetailArticles = articles.data.data;

    const title = dataArticles.title;
    const description = dataArticles.content.slice(0, 160);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `/articles/${slug}`,
        images: dataArticles.image
          ? [{ url: dataArticles.image, width: 1200, height: 630, alt: dataArticles.title }]
          : [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: dataArticles.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: dataArticles.image ? [dataArticles.image] : ['/images/og-default.jpg'],
      },
    };
  } catch (error) {
    console.error('Failed to generate articles metadata', error);
    return {
      title: 'Articles',
    };
  }
};

const DetailArticlesPage: React.FC<DetailArticlesPageProps> = async ({ params }) => {
  try {
    const { slug } = await params;

    const articlesRes = await externalAPI.get(`${Routes.ARTICLES_SLUG}/${slug}`);
    const dataArticles: DetailArticles = articlesRes.data.data;

    return <DetailArticlesView articles={dataArticles} />;
  } catch (error) {
    catchServerComponent(error);
  }
};

export default DetailArticlesPage;
