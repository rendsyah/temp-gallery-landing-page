'use client';

import type React from 'react';
import type { Nullable } from '@/types/commons.types';
import { useCallback, useState } from 'react';
import { createSafeContext } from '@/libs/utils/createSafeContext';
import Notification from '@/components/ui/notification/Notification';

export type KeyModal = 'transaction' | null;

export type Modal = {
  id?: string | number;
  type: KeyModal;
};

type GlobalContextProps = Nullable<{
  modal: Modal;
  onOpenModal: (data: Modal) => void;
  onCloseModal: () => void;
  onCopyClipboard: (data: string) => void;
}>;

const [GlobalContext, useGlobal] = createSafeContext<GlobalContextProps>('Global');

const GlobalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [modal, setModal] = useState<Modal>({
    type: null,
    id: 0,
  });

  const onOpenModal = useCallback((data: Modal) => {
    setModal(data);
  }, []);

  const onCloseModal = useCallback(() => {
    setModal({
      id: 0,
      type: null,
    });
  }, []);

  const onCopyClipboard = useCallback((data: string) => {
    navigator.clipboard.writeText(data);
    Notification({
      message: 'Copied to clipboard',
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        modal,
        onOpenModal,
        onCloseModal,
        onCopyClipboard,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { useGlobal, GlobalProvider };
