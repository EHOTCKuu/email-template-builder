import type { HeroBlockContent } from '@/entities/email/model/types';
import { ColorField, SelectField, TextField } from '../fields';
import { TEXT_ALIGN_OPTIONS } from '../../model/blockFormSchemas';
import type { BlockFormProps } from './BlockFormProps';

export const HeroBlockForm = ({ register }: BlockFormProps<HeroBlockContent>) => (
  <>
    <TextField name="imageUrl" label="Ссылка на изображение" register={register} />
    <TextField name="alt" label="Alt-текст изображения" register={register} />
    <TextField name="headline" label="Заголовок" register={register} />
    <TextField name="subheadline" label="Подзаголовок" register={register} />
    <ColorField name="backgroundColor" label="Цвет фона" register={register} />
    <ColorField name="textColor" label="Цвет текста" register={register} />
    <SelectField name="align" label="Выравнивание" register={register} options={TEXT_ALIGN_OPTIONS} />
  </>
);