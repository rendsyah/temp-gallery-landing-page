import type React from 'react';
import type { Metadata } from 'next';
import type { Banner } from '@/types/banner.types';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import OthersView from '@/views/others/main';

export const generateMetadata = async (): Promise<Metadata> => {
  try {
    const banner = await externalAPI.get(Routes.BANNER, { params: { type: 'others' } });
    const dataBanner: Banner[] = banner.data.data;

    const title = 'Others';
    const defaultDesc = `Jelajahi berbagai konten, informasi tambahan, dan koleksi eksklusif lainnya hanya di Hays Gallery.`;
    const description = dataBanner?.[0]?.sub_title ?? defaultDesc;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        url: '/others',
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
    console.error('Failed to generate OthersPage metadata', error);
    return {
      title: 'Others',
    };
  }
};

const OthersPage: React.FC = async () => {
  try {
    const bannerRes = await externalAPI.get(Routes.BANNER, { params: { type: 'others' } });
    const dataBanner: Banner[] = bannerRes.data.data;

    return <OthersView banner={dataBanner} />;
  } catch (error) {
    catchServerComponent(error);
  }
};

export default OthersPage;
