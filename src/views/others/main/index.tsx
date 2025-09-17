'use client';

import type React from 'react';
import type { Banner } from '@/types/banner.types';
import OthersHero from './components/OthersHero';
import OthersFilter from './components/OthersFilter';
import OthersCard from './components/OthersCard';

type OthersViewProps = {
  banner: Banner[];
};

const OthersView: React.FC<OthersViewProps> = ({ banner }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <OthersHero banner={banner} />
      </div>
      <div className="col-span-12">
        <OthersFilter />
      </div>
      <div className="col-span-12">
        <OthersCard />
      </div>
    </div>
  );
};

export default OthersView;
