import type React from 'react';
import type { Options } from '@/types/commons.types';
import Select from '@/components/ui/form/Select';
import Input from '@/components/ui/form/Input';
import SearchIcon from '@/components/icons/Search';

type ArtistsFilterProps = {
  themeData: Options[];
  subCategoryData: Options[];
  selectedTheme: string;
  selectedSubCategory: string;
  search: string;
  onChangeTheme: (value: string) => void;
  onChangeSubCategory: (value: string) => void;
  onChangeSearch: (value: string) => void;
};

const ArtistsFilter: React.FC<ArtistsFilterProps> = ({
  themeData,
  subCategoryData,
  selectedTheme,
  selectedSubCategory,
  search,
  onChangeTheme,
  onChangeSubCategory,
  onChangeSearch,
}) => {
  return (
    <div className="py-12 px-6">
      <div className="section flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gray-100 rounded-4xl py-4 px-6">
        <div className="w-full flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="w-full lg:w-[250px]">
            <Select
              value={selectedTheme}
              placeholder="Theme"
              onChange={(value) => onChangeTheme(value as string)}
              options={themeData}
            />
          </div>
          <div className="w-full lg:w-[250px]">
            <Select
              value={selectedSubCategory}
              placeholder="Category"
              onChange={(value) => onChangeSubCategory(value as string)}
              options={subCategoryData}
            />
          </div>
        </div>
        <div className="w-full lg:w-[500px]">
          <Input
            value={search}
            placeholder="Search..."
            onChange={(e) => onChangeSearch(e.target.value)}
            icon={<SearchIcon className="w-5 h-5" />}
            iconPosition="right"
          />
        </div>
      </div>
    </div>
  );
};

export default ArtistsFilter;
