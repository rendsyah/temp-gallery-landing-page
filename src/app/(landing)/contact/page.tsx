import type React from 'react';
import type { Metadata } from 'next';
import type { Banner } from '@/types/banner.types';
import type { Contact } from '@/types/contact.types';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { Routes } from '@/libs/constants/routes.const';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import ContactView from '@/views/contact/main';

export const generateMetadata = async (): Promise<Metadata> => {
  try {
    const banner = await externalAPI.get(Routes.BANNER, { params: { type: 'contact' } });
    const dataBanner: Banner[] = banner.data.data;

    const title = 'Contact';
    const defaultDesc = `Hubungi Hays Gallery untuk informasi pameran, koleksi seni, kemitraan, atau kunjungan. Temukan detail kontak dan lokasi resmi kami di sini.`;
    const description = dataBanner?.[0]?.sub_title ?? defaultDesc;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        url: '/contact',
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
    console.error('Failed to generate ContactPage metadata', error);
    return {
      title: 'Contact',
    };
  }
};

const ContactPage: React.FC = async () => {
  try {
    const [bannerRes, contactRes] = await Promise.all([
      externalAPI.get(Routes.BANNER, { params: { type: 'contact' } }),
      externalAPI.get(Routes.CONTACT),
    ]);

    const dataBanner: Banner[] = bannerRes.data.data;
    const dataContact: Contact = contactRes.data.data;

    return <ContactView banner={dataBanner} contact={dataContact} />;
  } catch (error) {
    catchServerComponent(error);
  }
};

export default ContactPage;
