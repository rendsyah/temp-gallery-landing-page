import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogoImage } from '@/libs/constants/assets.const';
import { cn } from '@/libs/utils/cn';
import Dropdown from '../ui/dropdown/Dropdown';
import DropdownItem from '../ui/dropdown/DropdownItem';
import Bars3Icon from '../icons/Bars3';
import XMarkIcon from '../icons/XMark';
import { MenuItems } from '@/libs/constants/commons.const';

const AppNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const onToggleDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const onCloseDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full bg-black sticky top-0 z-[999] p-6">
      <nav className="flex justify-between lg:justify-center items-center text-sm text-gray-300">
        {/* MOBILE VIEW */}
        <Link href="/" className="lg:hidden">
          <Image src={LogoImage} alt="Logo" />
        </Link>

        {/* DESKTOP VIEW */}
        <ul className="hidden lg:flex justify-center items-center gap-10 uppercase">
          {MenuItems.slice(0, 3).map((item) => (
            <li key={item.name} className="relative group">
              <Link
                href={item.href}
                className={cn('relative py-2', pathname === item.href && 'text-white')}
              >
                {item.name}
                <span
                  className={cn(
                    'absolute left-0 -bottom-1 h-0.25 bg-white transition-all duration-300',
                    pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full',
                  )}
                />
              </Link>
            </li>
          ))}

          <li>
            <Link href="/">
              <Image src={LogoImage} alt="Logo" />
            </Link>
          </li>

          {MenuItems.slice(-3).map((item) => (
            <li key={item.name} className="relative group">
              <Link
                href={item.href}
                className={cn('relative py-2', pathname === item.href && 'text-white')}
              >
                {item.name}
                <span
                  className={cn(
                    'absolute left-0 -bottom-1 h-0.25 bg-white transition-all duration-300',
                    pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full',
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* MOBILE VIEW */}
        <div className="lg:hidden">
          <button
            className={cn(
              'dropdown-toggle transition-transform duration-300',
              isOpen ? 'rotate-90' : 'rotate-0',
            )}
            aria-label="Open menu"
            onClick={onToggleDropdown}
          >
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        {/* DROPDOWN */}
        <Dropdown isOpen={isOpen} onClose={onCloseDropdown} className="w-full py-4">
          {MenuItems.map((item) => (
            <DropdownItem
              key={item.name}
              href={item.href}
              className={cn('text-center', pathname === item.href && 'text-white font-semibold')}
              onClick={onCloseDropdown}
            >
              {item.name}
            </DropdownItem>
          ))}
        </Dropdown>
      </nav>
    </div>
  );
};

export default AppNavbar;
