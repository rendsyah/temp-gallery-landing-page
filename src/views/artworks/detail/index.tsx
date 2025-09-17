'use client';

import type React from 'react';
import type { Contact } from '@/types/contact.types';
import type { DetailArtworks } from '@/types/artworks.types';
import dynamic from 'next/dynamic';
import DetailArtworksInfo from './components/DetailArtworksInfo';

const ModalTransaction = dynamic(() => import('@/components/ui/modal/ModalTransaction'), {
  ssr: false,
});

type DetailArtworksViewProps = {
  contact: Contact;
  artworks: DetailArtworks;
};

const DetailArtworksView: React.FC<DetailArtworksViewProps> = ({ contact, artworks }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <DetailArtworksInfo contact={contact} artworks={artworks} />
      </div>
      {/* MODAL */}
      <ModalTransaction product={artworks} />
    </div>
  );
};

export default DetailArtworksView;
