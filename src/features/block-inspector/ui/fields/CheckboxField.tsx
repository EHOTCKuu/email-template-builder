import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import styles from './fields.module.scss';

export interface CheckboxFieldProps<TValues extends FieldValues> {
  name: Path<TValues>;
  label: string;
  register: UseFormRegister<TValues>;
}

export const CheckboxField = <TValues extends FieldValues>({
  name,
  label,
  register,
}: CheckboxFieldProps<TValues>) => (
  <label className={styles.checkbox}>
    <input type="checkbox" {...register(name)} />
    <span>{label}</span>
  </label>
);