import { useId } from 'react';
import type { ReactNode } from 'react';
import styles from './Field.module.scss';

export interface FieldProps {
  label: string;
  hint?: string;
  children: (controlId: string) => ReactNode;
}

export const Field = ({ label, hint, children }: FieldProps) => {
  const controlId = useId();
  const hintId = hint ? `${controlId}-hint` : undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={controlId}>
        {label}
      </label>
      {children(controlId)}
      {hint ? (
        <p className={styles.hint} id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
};