import type { ToastMessage } from '@/shared/lib/hooks/useToast';
import styles from './Toast.module.scss';

export interface ToastProps {
  message: ToastMessage | null;
}

export const Toast = ({ message }: ToastProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      {message.text}
    </div>
  );
};