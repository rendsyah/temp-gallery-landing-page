import type React from 'react';
import type { Banner } from '@/types/banner.types';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

type HomeOverviewProps = {
  banner: Banner[];
};

const textVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const HomeOverview: React.FC<HomeOverviewProps> = ({ banner }) => {
  return (
    <div className="py-12 px-6 overflow-hidden">
      <div className="section">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          className="font-playfair font-semibold text-3xl lg:text-4xl mb-12"
        >
          Making Every Art Perfect
        </motion.h1>

        <div className="flex flex-col gap-6">
          {[
            `Art Museum adalah institusi seni multidisiplin yang memenangkan berbagai penghargaan,
            dipimpin oleh Direktur dan Kurator Seni yang memiliki hasrat mendalam terhadap sejarah
            seni dan inovasi visual. Art Museum dianggap sebagai salah satu museum terkemuka dalam
            bidang seni rupa dan desain kontemporer di Indonesia.`,
            `Penting bagi kami untuk menghadirkan pengalaman seni yang lebih dari sekadar visual.
            Setiap pameran kami adalah hasil dari penelitian intensif yang memungkinkan kami
            menggali dan mempresentasikan cerita yang tersembunyi di balik setiap karya seni,
            menghubungkan masa lalu dengan masa kini, serta memberikan wawasan baru tentang dunia
            seni yang terus berkembang.`,
          ].map((text, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={textVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-lg text-gray-500"
            >
              {text}
            </motion.p>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ willChange: 'transform' }}
          >
            <Image
              src={banner[0].image}
              alt={banner[0].title}
              width={1200}
              height={675}
              className="w-full max-h-[675px]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeOverview;
