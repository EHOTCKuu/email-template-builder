import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './IconButton.module.scss';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: ReactNode;
}

export const IconButton = ({ label, icon, type = 'button', className, ...rest }: IconButtonProps) => (
  <button {...rest} type={type} aria-label={label} title={label} className={cn(styles.iconButton, className)}>
    <span aria-hidden="true" className={styles.icon}>
      {icon}
    </span>
  </button>
);