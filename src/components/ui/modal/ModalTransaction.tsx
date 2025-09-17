import type React from 'react';
import type { DetailArtworks } from '@/types/artworks.types';
import { useState } from 'react';
import { useGlobal } from '@/contexts/global.context';
import { CreateTransactionApi } from '@/actions/transaction';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import Image from 'next/image';
import Modal from './Modal';
import Input from '../form/Input';
import Textarea from '../form/Textarea';
import Notification from '../notification/Notification';
import LoadingIcon from '@/components/icons/Loading';

type ModalTransactionProps = {
  product: DetailArtworks;
};

const ModalTransaction: React.FC<ModalTransactionProps> = ({ product }) => {
  const { onCloseModal } = useGlobal();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const onValidate = () => {
    let valid = true;

    const newErrors = {
      name: '',
      email: '',
      phone: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
      valid = false;
    }
    if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setErrors({
      name: '',
      email: '',
      phone: '',
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!onValidate()) return;

    setIsSubmitting(true);

    try {
      const response = await CreateTransactionApi({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        items: [
          {
            product_id: product.id,
            quantity: 1,
            notes: '',
          },
        ],
      });

      if (response.status >= HttpStatus.BAD_REQUEST) {
        Notification({
          type: 'error',
          message: 'Failed to create enquiry',
          description: response.errors[0]?.message ?? response.message,
          position: 'bottom-right',
        });
        return;
      }

      Notification({
        type: 'success',
        message: 'Success',
        description: response.message,
        position: 'bottom-right',
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClose = () => {
    onReset();
    onCloseModal();
  };

  return (
    <Modal
      name="transaction"
      title="Enquiry Form"
      size="xl"
      onClose={onClose}
      action={
        <button
          type="submit"
          form="transaction-form"
          className="w-full flex items-center justify-center bg-primary-black text-white rounded-4xl py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoadingIcon className="w-6 h-6 text-white" /> : 'Send Enquiry'}
        </button>
      }
    >
      <form id="transaction-form" onSubmit={onSubmit}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <div className="flex flex-col sm:flex-row items-start gap-4 border border-gray-200 rounded-2xl p-4">
              <div className="w-full sm:w-[30%]">
                <Image
                  src={product.images[0].image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-auto max-h-64 sm:max-h-80 object-contain"
                />
              </div>
              <div className="flex-1 text-gray-600">
                <h1 className="text-sm">
                  {product.artist_name}, {product.year}
                </h1>
                <p className="text-xs">{product.category_name}</p>
                <p className="text-xs">
                  {product.length} x {product.width} {product.unit}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-12">
            <Input
              className="border rounded-2xl"
              label="Name"
              placeholder="Input Name"
              name="name"
              value={formData.name}
              onChange={onChange}
              error={errors.name}
              required
            />
          </div>
          <div className="col-span-12">
            <Input
              className="border rounded-2xl"
              label="Email"
              placeholder="Input Email"
              name="email"
              value={formData.email}
              onChange={onChange}
              error={errors.email}
              required
            />
          </div>
          <div className="col-span-12">
            <Input
              className="border rounded-2xl"
              label="Phone"
              placeholder="Input Phone"
              inputMode="numeric"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              error={errors.phone}
              required
            />
          </div>
          <div className="col-span-12">
            <Textarea
              className="border rounded-2xl"
              label="Message"
              placeholder="Input Message"
              name="message"
              value={formData.message}
              onChange={onChange}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalTransaction;
