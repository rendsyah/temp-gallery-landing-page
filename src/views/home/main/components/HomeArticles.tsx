import type React from 'react';
import type { Articles } from '@/types/articles.types';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import ButtonPrev from '@/components/ui/carousel/ButtonPrev';
import ButtonNext from '@/components/ui/carousel/ButtonNext';
import ArrowUpRightIcon from '@/components/icons/ArrowUpRight';
import ChevronRightIcon from '@/components/icons/ChevronRight';

type HomeArticlesProps = {
  articles: Articles[];
};

const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const HomeArticles: React.FC<HomeArticlesProps> = ({ articles }) => {
  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <ButtonPrev />,
    nextArrow: <ButtonNext />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-12 px-6">
      <div className="section">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-playfair font-semibold text-3xl lg:text-4xl mb-12"
        >
          Articles
        </motion.h1>

        {/* ARTICLES */}
        {articles.length < 3 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="flex flex-col border border-black"
                >
                  <div className="relative overflow-hidden group aspect-[16/9] w-full h-[300px]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="bg-black text-white p-6">
                    <h1 className="font-playfair font-semibold text-xl mb-4">{article.title}</h1>
                    <div className="flex items-center gap-6">
                      <p className="text-sm italic">learn more</p>
                      <div className="flex items-center h-4 group">
                        <div className="w-20 h-0.25 bg-white group-hover:w-28 transition-all" />
                        <ChevronRightIcon className="w-5 h-5 -translate-x-3 group-hover:translate-x-0 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <Slider {...settings}>
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                className="px-1.5"
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="flex flex-col border border-black"
                >
                  <div className="relative overflow-hidden group aspect-[16/9] w-full h-[300px]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="bg-black text-white p-6">
                    <h1 className="font-playfair font-semibold text-xl mb-4">{article.title}</h1>
                    <div className="flex items-center gap-6">
                      <p className="text-sm italic">learn more</p>
                      <div className="flex items-center h-4 group">
                        <div className="w-20 h-0.25 bg-white group-hover:w-28 transition-all" />
                        <ChevronRightIcon className="w-5 h-5 -translate-x-3 group-hover:translate-x-0 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Slider>
        )}

        {/* SEE ALL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-center mt-12"
        >
          <Link
            href="/articles"
            className="flex flex-col items-center justify-center gap-1 bg-black text-white rounded-full w-28 h-28 lg:w-32 lg:h-32"
          >
            <ArrowUpRightIcon className="w-5 h-5 rotate-12 stroke-3" />
            <span>See All</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeArticles;
