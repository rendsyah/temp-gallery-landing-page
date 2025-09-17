import type React from 'react';
import type { Metadata } from 'next';
import type { Banner } from '@/types/banner.types';
import type { Artists } from '@/types/artists.types';
import type { Meta, Options } from '@/types/commons.types';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import ArtistsView from '@/views/artists/main';

export const generateMetadata = async (): Promise<Metadata> => {
  try {
    const banner = await externalAPI.get(Routes.BANNER, { params: { type: 'artists' } });
    const dataBanner: Banner[] = banner.data.data;

    const title = 'Artists';
    const defaultDesc = `Jelajahi profil seniman berbakat, temukan karya eksklusif, dan kenali para Artists di Hays Gallery.`;
    const description = dataBanner?.[0]?.sub_title ?? defaultDesc;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        url: '/artists',
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
    console.error('Failed to generate ArtistsPage metadata', error);
    return {
      title: 'Artists',
    };
  }
};

const ArtistsPage: React.FC = async () => {
  try {
    const [bannerRes, artistsRes, themeRes, subCategoryRes] = await Promise.all([
      externalAPI.get(Routes.BANNER, { params: { type: 'artists' } }),
      externalAPI.get(Routes.ARTISTS, { params: { page: 1, limit: 12 } }),
      externalAPI.get(Routes.THEMES_OPTIONS),
      externalAPI.get(Routes.SUB_CATEGORY_OPTIONS),
    ]);

    const dataBanner: Banner[] = bannerRes.data.data;
    const dataArtists: Artists[] = artistsRes.data.data.items;
    const dataMeta: Meta = artistsRes.data.data.meta;
    const dataTheme: Options[] = themeRes.data.data;
    const dataSubCategory: Options[] = subCategoryRes.data.data;

    return (
      <ArtistsView
        banner={dataBanner}
        artists={dataArtists}
        meta={dataMeta}
        theme={dataTheme}
        subCategory={dataSubCategory}
      />
    );
  } catch (error) {
    catchServerComponent(error);
  }
};

export default ArtistsPage;
