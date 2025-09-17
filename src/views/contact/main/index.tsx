'use client';

import type React from 'react';
import type { Banner } from '@/types/banner.types';
import type { Contact } from '@/types/contact.types';
import ContactHero from './components/ContactHero';
import ContactInfo from './components/ContactInfo';

type ContactViewProps = {
  banner: Banner[];
  contact: Contact;
};

const ContactView: React.FC<ContactViewProps> = ({ banner, contact }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <ContactHero banner={banner} />
      </div>
      <div className="col-span-12">
        <ContactInfo contact={contact} />
      </div>
    </div>
  );
};

export default ContactView;
