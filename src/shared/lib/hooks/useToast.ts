import { useCallback, useState } from 'react';

export interface ToastMessage {
  id: number;
  text: string;
}

export interface UseToastResult {
  message: ToastMessage | null;
  showToast: (text: string) => void;
}

export const useToast = (): UseToastResult => {
  const [message, setMessage] = useState<ToastMessage | null>(null);

  const showToast = useCallback((text: string): void => {
    setMessage({ id: Date.now(), text });

    setTimeout(() => {
      setMessage(null);
    }, 2400);
  }, []);

  return { message, showToast };
};