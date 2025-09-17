'use client';

import type React from 'react';
import DetailOthers from './components/DetailOthers';

const DetailOthersView: React.FC = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <DetailOthers />
      </div>
    </div>
  );
};

export default DetailOthersView;
