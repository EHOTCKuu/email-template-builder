import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Field } from '@/shared/ui/Field';
import styles from './fields.module.scss';

export interface TextAreaFieldProps<TValues extends FieldValues> {
  name: Path<TValues>;
  label: string;
  register: UseFormRegister<TValues>;
  rows?: number;
}

export const TextAreaField = <TValues extends FieldValues>({
  name,
  label,
  register,
  rows = 3,
}: TextAreaFieldProps<TValues>) => (
  <Field label={label}>
    {(controlId) => (
      <textarea id={controlId} className={styles.textarea} rows={rows} {...register(name)} />
    )}
  </Field>
);