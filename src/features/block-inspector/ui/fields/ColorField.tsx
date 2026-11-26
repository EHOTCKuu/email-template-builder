import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Field } from '@/shared/ui/Field';
import styles from './fields.module.scss';

export interface ColorFieldProps<TValues extends FieldValues> {
  name: Path<TValues>;
  label: string;
  register: UseFormRegister<TValues>;
}

export const ColorField = <TValues extends FieldValues>({
  name,
  label,
  register,
}: ColorFieldProps<TValues>) => (
  <Field label={label}>
    {(controlId) => <input id={controlId} className={styles.color} type="color" {...register(name)} />}
  </Field>
);