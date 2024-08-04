import React, { createContext, useState, ReactNode, useContext } from 'react';
import { IToastMessage } from '@/types/toast-message';

interface ToastContextType {
  messages: IToastMessage[];
  addToast: (message: IToastMessage) => void;
}

interface Props {
  children: ReactNode
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: Props) {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const addToast = (message: IToastMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== message.id)
      );
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ messages, addToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
