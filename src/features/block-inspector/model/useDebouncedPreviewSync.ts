import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { useDebouncedCallback } from '@/shared/lib/hooks/useDebouncedCallback';
import { PREVIEW_SYNC_DEBOUNCE_MS } from '@/shared/config/constants';

export const useDebouncedPreviewSync = <TValues extends FieldValues>(
  form: UseFormReturn<TValues>,
  onSync: (values: TValues) => void,
): void => {
  const values = useWatch({ control: form.control }) as TValues;
  const syncValues = useDebouncedCallback(onSync, PREVIEW_SYNC_DEBOUNCE_MS);

  useEffect(() => {
    syncValues(values);
  }, [values, syncValues]);
};