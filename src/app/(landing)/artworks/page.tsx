import type React from 'react';
import type { Metadata } from 'next';
import type { Banner } from '@/types/banner.types';
import type { Artworks } from '@/types/artworks.types';
import type { Meta, Options } from '@/types/commons.types';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import ArtworksView from '@/views/artworks/main';

export const generateMetadata = async (): Promise<Metadata> => {
  try {
    const banner = await externalAPI.get(Routes.BANNER, { params: { type: 'artworks' } });
    const dataBanner: Banner[] = banner.data.data;

    const title = 'Artworks';
    const defaultDesc = `Jelajahi koleksi karya seni eksklusif di Hays Gallery, mulai dari lukisan kontemporer hingga karya inovatif para seniman berbakat.`;
    const description = dataBanner?.[0]?.sub_title ?? defaultDesc;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        url: '/artworks',
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
    console.error('Failed to generate ArtworksPage metadata', error);
    return {
      title: 'Artworks',
    };
  }
};

const ArtworksPage: React.FC = async () => {
  try {
    const [bannerRes, artworksRes, themeRes, subCategoryRes] = await Promise.all([
      externalAPI.get(Routes.BANNER, { params: { type: 'artworks' } }),
      externalAPI.get(Routes.PRODUCTS, { params: { page: 1, limit: 12 } }),
      externalAPI.get(Routes.THEMES_OPTIONS),
      externalAPI.get(Routes.SUB_CATEGORY_OPTIONS),
    ]);

    const dataBanner: Banner[] = bannerRes.data.data;
    const dataArtworks: Artworks[] = artworksRes.data.data.items;
    const dataMeta: Meta = artworksRes.data.data.meta;
    const dataTheme: Options[] = themeRes.data.data;
    const dataSubCategory: Options[] = subCategoryRes.data.data;

    return (
      <ArtworksView
        banner={dataBanner}
        artworks={dataArtworks}
        meta={dataMeta}
        theme={dataTheme}
        subCategory={dataSubCategory}
      />
    );
  } catch (error) {
    catchServerComponent(error);
  }
};

export default ArtworksPage;
