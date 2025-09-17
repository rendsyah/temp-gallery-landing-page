import type React from 'react';
import type { Metadata } from 'next';
import type { Params } from '@/types/commons.types';
import type { Contact } from '@/types/contact.types';
import type { DetailArtworks } from '@/types/artworks.types';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import DetailArtworksView from '@/views/artworks/detail';

type DetailArtworksPageProps = {
  params: Promise<Params>;
};

export const generateMetadata = async ({ params }: DetailArtworksPageProps): Promise<Metadata> => {
  try {
    const { slug } = await params;

    const artworks = await externalAPI.get(`${Routes.PRODUCTS_SLUG}/${slug}`);
    const dataArtworks: DetailArtworks = artworks.data.data;

    const title = dataArtworks.name;
    const description = dataArtworks.desc.slice(0, 160);
    const image = dataArtworks.images[0].image;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `/artworks/${slug}`,
        images: image
          ? [{ url: image, width: 1200, height: 630, alt: dataArtworks.name }]
          : [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: dataArtworks.name }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : ['/images/og-default.jpg'],
      },
    };
  } catch (error) {
    console.error('Failed to generate artworks metadata', error);
    return {
      title: 'Artworks',
    };
  }
};

const DetailArtworksPage: React.FC<DetailArtworksPageProps> = async ({ params }) => {
  try {
    const { slug } = await params;

    const fetchContact = externalAPI.get(Routes.CONTACT);
    const fetchArtworks = externalAPI.get(`${Routes.PRODUCTS_SLUG}/${slug}`);

    const [contact, artworks] = await Promise.all([fetchContact, fetchArtworks]);

    const dataContact: Contact = contact.data.data;
    const dataArtworks: DetailArtworks = artworks.data.data;

    return <DetailArtworksView contact={dataContact} artworks={dataArtworks} />;
  } catch (error) {
    catchServerComponent(error);
  }
};

export default DetailArtworksPage;
