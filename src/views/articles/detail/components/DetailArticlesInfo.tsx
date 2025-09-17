import type React from 'react';
import type { DetailArticles } from '@/types/articles.types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import BackButton from '@/components/ui/button/Back';
import ChevronLeftIcon from '@/components/icons/ChevronLeft';
import ChevronRightIcon from '@/components/icons/ChevronRight';
import dayjs from 'dayjs';

type DetailArticlesInfoProps = {
  articles: DetailArticles;
};

const DetailArticlesInfo: React.FC<DetailArticlesInfoProps> = ({ articles }) => {
  return (
    <div className="py-12 px-6">
      {/* DETAIL ARTICLE */}
      <div className="section flex flex-col gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <BackButton href="/articles">Browse Articles</BackButton>
        </motion.div>

        <motion.div
          className="relative aspect-[16/9]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image src={articles.image} alt={articles.title} fill className="object-cover" priority />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <p className="text-gray-500 text-xl">
            By Art —{' '}
            <time dateTime={dayjs(articles.created_at).format('MM-YYYY')}>
              {dayjs(articles.created_at).format('MMMM YYYY')}
            </time>
          </p>
        </motion.div>

        <motion.h1
          className="font-playfair font-semibold text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
        >
          {articles.title}
        </motion.h1>

        <motion.section
          className="prose prose-lg text-xl max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.5 }}
        >
          <div dangerouslySetInnerHTML={{ __html: articles.content }} />
        </motion.section>
      </div>

      {/* PREVIOUS & NEXT */}
      <motion.div
        className="hidden lg:block fixed top-1/2 left-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      >
        {articles.prev ? (
          <Link href={`/articles/${articles.prev}`} aria-label="Previous Articles">
            <ChevronLeftIcon className="w-8 h-8 text-gray-400 hover:text-primary-black transition-colors" />
          </Link>
        ) : (
          <span aria-label="Previous Articles" aria-disabled="true">
            <ChevronLeftIcon className="w-8 h-8 text-gray-400 cursor-not-allowed" />
          </span>
        )}
      </motion.div>

      <motion.div
        className="hidden lg:block fixed top-1/2 right-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      >
        {articles.next ? (
          <Link href={`/articles/${articles.next}`} aria-label="Next Articles">
            <ChevronRightIcon className="w-8 h-8 text-gray-400 hover:text-primary-black transition-colors" />
          </Link>
        ) : (
          <span aria-label="Next Articles" aria-disabled="true">
            <ChevronRightIcon className="w-8 h-8 text-gray-400 cursor-not-allowed" />
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default DetailArticlesInfo;
