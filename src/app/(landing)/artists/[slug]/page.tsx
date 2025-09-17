import type React from 'react';
import type { Metadata } from 'next';
import type { Meta, Params } from '@/types/commons.types';
import type { DetailArtists } from '@/types/artists.types';
import type { Artworks } from '@/types/artworks.types';
import type { Exhibitions } from '@/types/exhibitions.types';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import DetailArtistsView from '@/views/artists/detail';

type DetailArtistPageProps = {
  params: Promise<Params>;
};

export const generateMetadata = async ({ params }: DetailArtistPageProps): Promise<Metadata> => {
  try {
    const { slug } = await params;

    const artists = await externalAPI.get(`${Routes.ARTISTS_SLUG}/${slug}`);
    const dataArtists: DetailArtists = artists.data.data;

    const title = dataArtists.name;
    const description = dataArtists.desc.slice(0, 160);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'profile',
        url: `/artists/${slug}`,
        images: dataArtists.image
          ? [{ url: dataArtists.image, width: 1200, height: 630, alt: dataArtists.name }]
          : [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: dataArtists.name }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: dataArtists.image ? [dataArtists.image] : ['/images/og-default.jpg'],
      },
    };
  } catch (error) {
    console.error('Failed to generate artists metadata', error);
    return {
      title: 'Artists',
    };
  }
};

const DetailArtistsPage: React.FC<DetailArtistPageProps> = async ({ params }) => {
  try {
    const { slug } = await params;

    const [artistRes, artworksRes, exhibitionsRes] = await Promise.all([
      externalAPI.get(`${Routes.ARTISTS_SLUG}/${slug}`),
      externalAPI.get(Routes.PRODUCTS, {
        params: { page: 1, limit: 6, artist_slug: slug },
      }),
      externalAPI.get(Routes.EXHIBITIONS, {
        params: { page: 1, limit: 6, type: 'current', artist_slug: slug },
      }),
    ]);

    const dataArtists: DetailArtists = artistRes.data.data;
    const dataArtworks: Artworks[] = artworksRes.data.data.items;
    const dataArtworksMeta: Meta = artworksRes.data.data.meta;
    const dataExhibitions: Exhibitions[] = exhibitionsRes.data.data.items;
    const dataExhibitionsMeta: Meta = exhibitionsRes.data.data.meta;

    return (
      <DetailArtistsView
        slug={slug}
        artists={dataArtists}
        artworks={dataArtworks}
        artworksMeta={dataArtworksMeta}
        exhibitions={dataExhibitions}
        exhibitionsMeta={dataExhibitionsMeta}
      />
    );
  } catch (error) {
    catchServerComponent(error);
  }
};

export default DetailArtistsPage;
