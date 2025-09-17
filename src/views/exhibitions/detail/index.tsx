'use client';

import type React from 'react';
import type { DetailExhibitions } from '@/types/exhibitions.types';
import DetailExhibitionsInfo from './components/DetailExhibitionsInfo';

type DetailExhibitionsViewProps = {
  exhibitions: DetailExhibitions;
};

const DetailExhibitionsView: React.FC<DetailExhibitionsViewProps> = ({ exhibitions }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <DetailExhibitionsInfo exhibitions={exhibitions} />
      </div>
    </div>
  );
};

export default DetailExhibitionsView;
