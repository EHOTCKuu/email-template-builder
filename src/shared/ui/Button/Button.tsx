import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'compact' | 'regular';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClassNames: Record<ButtonVariant, string | undefined> = {
  primary: styles.variantPrimary,
  secondary: styles.variantSecondary,
  ghost: styles.variantGhost,
};

const sizeClassNames: Record<ButtonSize, string | undefined> = {
  compact: styles.sizeCompact,
  regular: styles.sizeRegular,
};

export const Button = ({
  variant = 'primary',
  size = 'regular',
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) => (
  <button
    {...rest}
    type={type}
    className={cn(
      styles.button,
      sizeClassNames[size],
      variantClassNames[variant],
      className,
    )}
  >
    {children}
  </button>
);