import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Field } from '@/shared/ui/Field';
import styles from './fields.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps<TValues extends FieldValues> {
  name: Path<TValues>;
  label: string;
  register: UseFormRegister<TValues>;
  options: SelectOption[];
}

export const SelectField = <TValues extends FieldValues>({
  name,
  label,
  register,
  options,
}: SelectFieldProps<TValues>) => (
  <Field label={label}>
    {(controlId) => (
      <select id={controlId} className={styles.select} {...register(name)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )}
  </Field>
);