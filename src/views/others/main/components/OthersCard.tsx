import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/libs/utils/formatCurrency';

const others = [
  {
    id: 1,
    slug: 'lukisan abstrak kontemporer-bingkai',
    title: 'Lukisan Abstrak Kontemporer + Bingkai',
    price: 500_000,
    img: '/images/others-card.jpg',
  },
  {
    id: 2,
    slug: 'lukisan abstrak kontemporer-bingkai',
    title: 'Lukisan Abstrak Kontemporer + Bingkai',
    price: 500_000,
    img: '/images/others-card.jpg',
  },
  {
    id: 3,
    slug: 'lukisan abstrak kontemporer-bingkai',
    title: 'Lukisan Abstrak Kontemporer + Bingkai',
    price: 500_000,
    img: '/images/others-card.jpg',
  },
  {
    id: 4,
    slug: 'lukisan abstrak kontemporer-bingkai',
    title: 'Lukisan Abstrak Kontemporer + Bingkai',
    price: 500_000,
    img: '/images/others-card.jpg',
  },
  {
    id: 5,
    slug: 'lukisan abstrak kontemporer-bingkai',
    title: 'Lukisan Abstrak Kontemporer + Bingkai',
    price: 500_000,
    img: '/images/others-card.jpg',
  },
  {
    id: 6,
    slug: 'lukisan abstrak kontemporer-bingkai',
    title: 'Lukisan Abstrak Kontemporer + Bingkai',
    price: 500_000,
    img: '/images/others-card.jpg',
  },
];

const OthersCard = () => {
  return (
    <div className="pb-12 px-6">
      <div className="section">
        {/* OTHER CARD */}
        <div className="columns-1 sm:columns-2 lg:columns-3">
          {others.map((other) => (
            <div key={other.id} className="mb-6 break-inside-avoid">
              <Link href={`/others/${other.slug}`} className="block">
                <div className="relative overflow-hidden group">
                  <Image
                    src={other.img}
                    alt={other.title}
                    width={600}
                    height={900}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 group-hover:bg-black/20 transition-colors" />
                </div>
                <h1 className="font-playfair font-semibold text-2xl mt-2">{other.title}</h1>
                <h2 className="text-gray-500">{formatCurrency(other.price)}</h2>
              </Link>
            </div>
          ))}
        </div>

        {/* SEE MORE */}
        <div className="flex items-center justify-center mt-10 lg:mt-8">
          <button className="bg-primary-black text-white rounded-4xl py-2 px-8">See More...</button>
        </div>
      </div>
    </div>
  );
};

export default OthersCard;
