import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Field } from '@/shared/ui/Field';
import styles from './fields.module.scss';

export interface TextFieldProps<TValues extends FieldValues> {
  name: Path<TValues>;
  label: string;
  register: UseFormRegister<TValues>;
  type?: 'text' | 'number';
  hint?: string;
}

export const TextField = <TValues extends FieldValues>({
  name,
  label,
  register,
  type = 'text',
  hint,
}: TextFieldProps<TValues>) => (
  <Field label={label} hint={hint}>
    {(controlId) => <input id={controlId} className={styles.input} type={type} {...register(name)} />}
  </Field>
);