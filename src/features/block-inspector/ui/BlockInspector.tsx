import { useEffect } from 'react';
import { useForm, type FieldValues, type UseFormReturn } from 'react-hook-form';
import type { EmailBlock, EmailGlobalSettings } from '@/entities/email/model/types';
import { useAppDispatch } from '@/app/store/hooks';
import { updateBlockContent } from '@/entities/email/model/emailSlice';
import { getBlockTypeLabel } from '@/entities/email/lib/blockFactory';
import { GlobalSettingsForm } from './GlobalSettingsForm';
import {
  ButtonBlockForm,
  FooterBlockForm,
  HeaderBlockForm,
  HeroBlockForm,
  ProductCardBlockForm,
  TextBlockForm,
} from './forms';
import { useDebouncedPreviewSync } from '../model/useDebouncedPreviewSync';
import styles from './BlockInspector.module.scss';

const renderBlockForm = (block: EmailBlock, form: UseFormReturn<FieldValues>) => {
  const register = form.register as never;

  switch (block.type) {
    case 'header':
      return <HeaderBlockForm register={register} />;
    case 'hero':
      return <HeroBlockForm register={register} />;
    case 'text':
      return <TextBlockForm register={register} />;
    case 'button':
      return <ButtonBlockForm register={register} />;
    case 'productCard':
      return <ProductCardBlockForm register={register} />;
    case 'footer':
      return <FooterBlockForm register={register} />;
  }
};

export interface BlockInspectorProps {
  block: EmailBlock | null;
  settings: EmailGlobalSettings;
}

export const BlockInspector = ({ block, settings }: BlockInspectorProps) => {
  const dispatch = useAppDispatch();
  const form = useForm<FieldValues>({ defaultValues: {} });
  const { reset } = form;

  useEffect(() => {
    if (block) {
      reset({ ...block.content });
    }
  }, [block, reset]);

  useDebouncedPreviewSync(form, (values) => {
    if (block) {
      dispatch(updateBlockContent({ blockId: block.id, content: values }));
    }
  });

  if (!block) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Выберите блок в списке слоёв, чтобы изменить его настройки.</p>
        <GlobalSettingsForm settings={settings} />
      </div>
    );
  }

  return (
    <div className={styles.inspector}>
      <p className={styles.blockType}>{getBlockTypeLabel(block.type)}</p>
      <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
        {renderBlockForm(block, form)}
      </form>
    </div>
  );
};