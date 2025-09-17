import type React from 'react';
import type { Contact } from '@/types/contact.types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PhoneIcon, WhatsappIcon } from '@/libs/constants/assets.const';

type ContactInfoProps = {
  contact: Contact;
};

const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
  return (
    <div className="pt-12 lg:pb-12 lg:px-6">
      <div className="section flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-end lg:gap-8">
        {/* CONTACT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex-1 flex flex-col gap-8 px-6 lg:items-end lg:text-right lg:px-0"
        >
          <div className="flex flex-col">
            <h1 className="font-playfair font-semibold text-3xl mb-4">{contact.name}</h1>
            <span className="max-w-[300px]">{contact.location}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href={`https://wa.me/${contact.wa_phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex justify-center items-center gap-4 text-left bg-primary-black rounded-4xl py-2 px-8"
            >
              <Image src={WhatsappIcon} alt="Whatsapp" />
              <div className="flex flex-col">
                <span className="text-gray-300 text-sm">Whatsapp</span>
                <span className="text-white font-semibold">{contact.wa_phone}</span>
              </div>
            </Link>

            <Link
              href={`tel:${contact.phone}`}
              className="w-full sm:w-auto flex justify-center items-center gap-4 text-left bg-primary-black rounded-4xl py-2 px-8"
            >
              <Image src={PhoneIcon} alt="Phone" />
              <div className="flex flex-col">
                <span className="text-gray-300 text-sm">Phone</span>
                <span className="text-white font-semibold">{contact.phone}</span>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* MAPS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="flex-1"
        >
          <iframe
            className="w-full h-[450px] rounded-2xl shadow-lg"
            src={`https://www.google.com/maps?q=${contact.lat},${contact.lng}&hl=es;z=14&output=embed`}
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactInfo;
