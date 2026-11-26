import type { TextBlockContent } from '@/entities/email/model/types';
import { ColorField, SelectField, TextAreaField, TextField } from '../fields';
import { TEXT_ALIGN_OPTIONS } from '../../model/blockFormSchemas';
import type { BlockFormProps } from './BlockFormProps';

export const TextBlockForm = ({ register }: BlockFormProps<TextBlockContent>) => (
  <>
    <TextField name="heading" label="Заголовок" register={register} />
    <TextAreaField name="body" label="Текст" register={register} rows={5} />
    <ColorField name="backgroundColor" label="Цвет фона" register={register} />
    <ColorField name="textColor" label="Цвет текста" register={register} />
    <SelectField name="align" label="Выравнивание" register={register} options={TEXT_ALIGN_OPTIONS} />
  </>
);