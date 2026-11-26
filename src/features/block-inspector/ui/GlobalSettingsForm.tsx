import { useForm } from 'react-hook-form';
import type { EmailGlobalSettings } from '@/entities/email/model/types';
import { useAppDispatch } from '@/app/store/hooks';
import { updateGlobalSettings } from '@/entities/email/model/emailSlice';
import { ColorField, SelectField, TextField } from './fields';
import { FONT_FAMILY_OPTIONS } from '../model/globalFormSchema';
import { useDebouncedPreviewSync } from '../model/useDebouncedPreviewSync';
import styles from './BlockInspector.module.scss';

export interface GlobalSettingsFormProps {
  settings: EmailGlobalSettings;
}

export const GlobalSettingsForm = ({ settings }: GlobalSettingsFormProps) => {
  const dispatch = useAppDispatch();
  const form = useForm<EmailGlobalSettings>({ defaultValues: settings });

  useDebouncedPreviewSync(form, (values) => {
    dispatch(updateGlobalSettings(values));
  });

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <TextField name="subject" label="Тема письма" register={form.register} />
      <TextField name="preheader" label="Прехедер" register={form.register} />
      <TextField name="contentWidth" label="Ширина письма, px" type="number" register={form.register} />
      <SelectField name="fontFamily" label="Шрифт" register={form.register} options={FONT_FAMILY_OPTIONS} />
      <ColorField name="backgroundColor" label="Фон письма" register={form.register} />
      <ColorField name="contentBackgroundColor" label="Фон контента" register={form.register} />
      <ColorField name="textColor" label="Цвет текста" register={form.register} />
      <ColorField name="linkColor" label="Цвет ссылок" register={form.register} />
    </form>
  );
};