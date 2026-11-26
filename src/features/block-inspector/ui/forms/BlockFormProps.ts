import type { FieldValues, UseFormRegister } from 'react-hook-form';

export interface BlockFormProps<TContent extends FieldValues> {
  register: UseFormRegister<TContent>;
}