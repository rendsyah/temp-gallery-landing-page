import type React from 'react';
import type { Metadata } from 'next';
import type { Banner } from '@/types/banner.types';
import type { Artworks } from '@/types/artworks.types';
import type { Exhibitions } from '@/types/exhibitions.types';
import type { Articles } from '@/types/articles.types';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import HomeView from '@/views/home/main';

export const generateMetadata = async (): Promise<Metadata> => {
  try {
    const banner = await externalAPI.get(Routes.BANNER, { params: { type: 'home' } });
    const dataBanner: Banner[] = banner.data.data;

    const defaultDesc = `Hays Gallery adalah galeri seni kontemporer yang menghadirkan pameran, koleksi eksklusif, dan pengalaman artistik bagi pecinta seni dan budaya.`;
    const description = dataBanner?.[0]?.sub_title ?? defaultDesc;

    return {
      description,
      openGraph: {
        description,
        type: 'website',
        url: '/',
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
    console.error('Failed to generate homepage metadata', error);
    return {};
  }
};

const HomePage: React.FC = async () => {
  try {
    const [bannerRes, artworksRes, exhibitionsRes, articlesRes] = await Promise.all([
      externalAPI.get(Routes.BANNER, { params: { type: 'home' } }),
      externalAPI.get(Routes.PRODUCTS, { params: { page: 1, limit: 9 } }),
      externalAPI.get(Routes.EXHIBITIONS, { params: { page: 1, limit: 6, type: 'current' } }),
      externalAPI.get(Routes.ARTICLES, { params: { page: 1, limit: 6 } }),
    ]);

    const dataBanner: Banner[] = bannerRes.data.data;
    const dataArtworks: Artworks[] = artworksRes.data.data.items;
    const dataExhibitions: Exhibitions[] = exhibitionsRes.data.data.items;
    const dataArticles: Articles[] = articlesRes.data.data.items;

    return (
      <HomeView
        banner={dataBanner}
        artworks={dataArtworks}
        exhibitions={dataExhibitions}
        articles={dataArticles}
      />
    );
  } catch (error) {
    catchServerComponent(error);
  }
};

export default HomePage;
