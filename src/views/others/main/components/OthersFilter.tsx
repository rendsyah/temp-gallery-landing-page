import type React from 'react';
import Select from '@/components/ui/form/Select';
import Input from '@/components/ui/form/Input';
import SearchIcon from '@/components/icons/Search';

const OthersFilter = () => {
  return (
    <div className="py-12 px-6">
      <div className="section flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gray-100 rounded-4xl py-4 px-6">
        <div className="w-full flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="w-full lg:w-[250px]">
            <Select value={''} placeholder="Category" onChange={() => null} options={[]} />
          </div>
          <div className="w-full lg:w-[250px]">
            <Select value={''} placeholder="Sub Category" onChange={() => null} options={[]} />
          </div>
        </div>
        <div className="w-full lg:w-[500px]">
          <Input
            value={''}
            placeholder="Search..."
            onChange={() => null}
            icon={<SearchIcon className="w-5 h-5" />}
            iconPosition="right"
          />
        </div>
      </div>
    </div>
  );
};

export default OthersFilter;
