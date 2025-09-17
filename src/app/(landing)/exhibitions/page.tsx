import type React from 'react';
import type { Metadata } from 'next';
import type { Banner } from '@/types/banner.types';
import type { Exhibitions } from '@/types/exhibitions.types';
import type { Meta } from '@/types/commons.types';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import ExhibitionsView from '@/views/exhibitions/main';

export const generateMetadata = async (): Promise<Metadata> => {
  try {
    const banner = await externalAPI.get(Routes.BANNER, { params: { type: 'exhibitions' } });
    const dataBanner: Banner[] = banner.data.data;

    const title = 'Exhibitions';
    const defaultDesc = `Jelajahi pameran seni eksklusif di Hays Gallery, menghadirkan karya kontemporer dan eksibisi inspiratif dari seniman berbakat`;
    const description = dataBanner?.[0]?.sub_title ?? defaultDesc;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        url: '/exhibitions',
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
    console.error('Failed to generate ExhibitionsPage metadata', error);
    return {
      title: 'Exhibitions',
    };
  }
};

const ExhibitionsPage: React.FC = async () => {
  try {
    const [bannerRes, exhibitionsRes] = await Promise.all([
      externalAPI.get(Routes.BANNER, { params: { type: 'exhibitions' } }),
      externalAPI.get(Routes.EXHIBITIONS, { params: { page: 1, limit: 12, type: 'current' } }),
    ]);

    const dataBanner: Banner[] = bannerRes.data.data;
    const dataExhibitions: Exhibitions[] = exhibitionsRes.data.data.items;
    const dataMeta: Meta = exhibitionsRes.data.data.meta;

    return <ExhibitionsView banner={dataBanner} exhibitions={dataExhibitions} meta={dataMeta} />;
  } catch (error) {
    catchServerComponent(error);
  }
};

export default ExhibitionsPage;
