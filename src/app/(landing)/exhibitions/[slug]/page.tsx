import type React from 'react';
import type { Metadata } from 'next';
import type { Params } from '@/types/commons.types';
import type { DetailExhibitions } from '@/types/exhibitions.types';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import DetailExhibitionsView from '@/views/exhibitions/detail';

type DetailExhibitionsPageProps = {
  params: Promise<Params>;
};

export const generateMetadata = async ({
  params,
}: DetailExhibitionsPageProps): Promise<Metadata> => {
  try {
    const { slug } = await params;

    const exhibitions = await externalAPI.get(`${Routes.EXHIBITIONS_SLUG}/${slug}`);
    const dataExhibitions: DetailExhibitions = exhibitions.data.data;

    const title = dataExhibitions.name;
    const description = dataExhibitions.desc.slice(0, 160);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `/exhibitions/${slug}`,
        images: dataExhibitions.image
          ? [
              {
                url: dataExhibitions.image,
                width: 1200,
                height: 630,
                alt: dataExhibitions.name,
              },
            ]
          : [
              {
                url: '/images/og-default.jpg',
                width: 1200,
                height: 630,
                alt: dataExhibitions.name,
              },
            ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: dataExhibitions.image ? [dataExhibitions.image] : ['/images/og-default.jpg'],
      },
    };
  } catch (error) {
    console.error('Failed to generate exhibitions metadata', error);
    return {
      title: 'Exhibitions',
    };
  }
};

const DetailExhibitionsPage: React.FC<DetailExhibitionsPageProps> = async ({ params }) => {
  try {
    const { slug } = await params;

    const exhibitionsRes = await externalAPI.get(`${Routes.EXHIBITIONS_SLUG}/${slug}`);
    const dataExhibitions: DetailExhibitions = exhibitionsRes.data.data;

    return <DetailExhibitionsView exhibitions={dataExhibitions} />;
  } catch (error) {
    catchServerComponent(error);
  }
};

export default DetailExhibitionsPage;
