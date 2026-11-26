import type { FooterBlockContent } from '@/entities/email/model/types';
import { ColorField, SelectField, TextField } from '../fields';
import { TEXT_ALIGN_OPTIONS } from '../../model/blockFormSchemas';
import type { BlockFormProps } from './BlockFormProps';

export const FooterBlockForm = ({ register }: BlockFormProps<FooterBlockContent>) => (
  <>
    <TextField name="companyName" label="Название компании" register={register} />
    <TextField name="address" label="Адрес" register={register} />
    <TextField name="unsubscribeUrl" label="Ссылка отписки" register={register} />
    <ColorField name="backgroundColor" label="Цвет фона" register={register} />
    <ColorField name="textColor" label="Цвет текста" register={register} />
    <SelectField name="align" label="Выравнивание" register={register} options={TEXT_ALIGN_OPTIONS} />
  </>
);