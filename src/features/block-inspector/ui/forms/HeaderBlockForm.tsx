import type { HeaderBlockContent } from '@/entities/email/model/types';
import { ColorField, SelectField, TextField } from '../fields';
import { TEXT_ALIGN_OPTIONS } from '../../model/blockFormSchemas';
import type { BlockFormProps } from './BlockFormProps';

export const HeaderBlockForm = ({ register }: BlockFormProps<HeaderBlockContent>) => (
  <>
    <TextField name="title" label="Заголовок" register={register} />
    <TextField name="subtitle" label="Подзаголовок" register={register} />
    <TextField name="logoUrl" label="Ссылка на логотип" register={register} />
    <ColorField name="backgroundColor" label="Цвет фона" register={register} />
    <ColorField name="textColor" label="Цвет текста" register={register} />
    <SelectField name="align" label="Выравнивание" register={register} options={TEXT_ALIGN_OPTIONS} />
  </>
);