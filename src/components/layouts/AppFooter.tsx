import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LogoImage,
} from '@/libs/constants/assets.const';
import { MenuItems } from '@/libs/constants/commons.const';

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-black py-12 px-6">
      <div className="section flex flex-col-reverse sm:flex-row sm:items-stretch sm:justify-between gap-18 text-sm text-gray-300">
        {/* SOCIALS */}
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-8">
            <Link href="/" className="hidden sm:block">
              <Image src={LogoImage} alt="Logo" />
            </Link>
            <div className="flex flex-col gap-4">
              <span>Follow us on</span>
              <div className="flex items-center gap-8">
                <Link href="#">
                  <Image src={FacebookIcon} alt="Facebook" width={25} height={25} />
                </Link>
                <Link href="#">
                  <Image src={InstagramIcon} alt="Instagram" width={25} height={25} />
                </Link>
                <Link href="#">
                  <Image src={LinkedinIcon} alt="Linkedin" width={25} height={25} />
                </Link>
              </div>
            </div>
          </div>
          <p>© 2025. Hay&apos;s Gallery All rights reserved</p>
        </div>

        {/* MENU */}
        <ul className="flex flex-col gap-10 text-left sm:text-right uppercase">
          {MenuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default AppFooter;
