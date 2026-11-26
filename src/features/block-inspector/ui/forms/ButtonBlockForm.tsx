import type { ButtonBlockContent } from '@/entities/email/model/types';
import { CheckboxField, ColorField, SelectField, TextField } from '../fields';
import { TEXT_ALIGN_OPTIONS } from '../../model/blockFormSchemas';
import type { BlockFormProps } from './BlockFormProps';

export const ButtonBlockForm = ({ register }: BlockFormProps<ButtonBlockContent>) => (
  <>
    <TextField name="label" label="Текст кнопки" register={register} />
    <TextField name="href" label="Ссылка" register={register} />
    <ColorField name="backgroundColor" label="Цвет кнопки" register={register} />
    <ColorField name="textColor" label="Цвет текста" register={register} />
    <SelectField name="align" label="Выравнивание" register={register} options={TEXT_ALIGN_OPTIONS} />
    <CheckboxField name="fullWidth" label="На всю ширину" register={register} />
  </>
);