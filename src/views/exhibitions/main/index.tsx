'use client';

import type React from 'react';
import type { Banner } from '@/types/banner.types';
import type { Exhibitions } from '@/types/exhibitions.types';
import type { Meta } from '@/types/commons.types';
import ExhibitionsHero from './components/ExhibitionsHero';
import ExhibitionsFilter from './components/ExhibitionsFilter';
import ExhibitionsCard from './components/ExhibitionsCard';
import useExhibitions from './hooks/useExhibitions';

type ExhibitionsViewProps = {
  banner: Banner[];
  exhibitions: Exhibitions[];
  meta: Meta;
};

const ExhibitionsView: React.FC<ExhibitionsViewProps> = ({ banner, exhibitions, meta }) => {
  const { exhibitionsData, metaData, selectedType, onChangeType, onSeeMore } = useExhibitions({
    exhibitions,
    meta,
  });

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <ExhibitionsHero banner={banner} />
      </div>
      <div className="col-span-12">
        <ExhibitionsFilter selectedType={selectedType} onChangeType={onChangeType} />
      </div>
      <div className="col-span-12">
        <ExhibitionsCard
          exhibitionsData={exhibitionsData}
          metaData={metaData}
          onSeeMore={onSeeMore}
        />
      </div>
    </div>
  );
};

export default ExhibitionsView;
