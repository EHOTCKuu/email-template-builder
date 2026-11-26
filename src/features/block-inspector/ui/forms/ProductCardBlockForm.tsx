import type { ProductCardBlockContent } from '@/entities/email/model/types';
import { ColorField, SelectField, TextAreaField, TextField } from '../fields';
import { TEXT_ALIGN_OPTIONS } from '../../model/blockFormSchemas';
import type { BlockFormProps } from './BlockFormProps';

export const ProductCardBlockForm = ({ register }: BlockFormProps<ProductCardBlockContent>) => (
  <>
    <TextField name="imageUrl" label="Ссылка на изображение" register={register} />
    <TextField name="alt" label="Alt-текст изображения" register={register} />
    <TextField name="name" label="Название товара" register={register} />
    <TextAreaField name="description" label="Описание" register={register} />
    <TextField name="price" label="Цена" register={register} />
    <TextField name="buttonLabel" label="Текст кнопки" register={register} />
    <TextField name="buttonHref" label="Ссылка кнопки" register={register} />
    <ColorField name="backgroundColor" label="Цвет фона" register={register} />
    <ColorField name="textColor" label="Цвет текста" register={register} />
    <SelectField name="align" label="Выравнивание" register={register} options={TEXT_ALIGN_OPTIONS} />
  </>
);