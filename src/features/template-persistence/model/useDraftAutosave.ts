import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { replaceTemplate } from '@/entities/email/model/emailSlice';
import { selectEmailState } from '@/entities/email/model/selectors';
import { readDraftFromStorage, writeDraftToStorage } from '@/entities/email/lib/emailStorage';
import { useDebouncedCallback } from '@/shared/lib/hooks/useDebouncedCallback';
import { PREVIEW_SYNC_DEBOUNCE_MS } from '@/shared/config/constants';

export const useDraftAutosave = (): void => {
  const dispatch = useAppDispatch();
  const emailState = useAppSelector(selectEmailState);
  const hasRestoredRef = useRef(false);

  useEffect(() => {
    if (hasRestoredRef.current) {
      return;
    }

    hasRestoredRef.current = true;

    const draft = readDraftFromStorage();

    if (draft) {
      dispatch(replaceTemplate(draft));
    }
  }, [dispatch]);

  const persistDraft = useDebouncedCallback(writeDraftToStorage, PREVIEW_SYNC_DEBOUNCE_MS);

  useEffect(() => {
    persistDraft(emailState);
  }, [emailState, persistDraft]);
};