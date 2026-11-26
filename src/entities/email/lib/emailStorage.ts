import { DRAFT_STORAGE_KEY } from '@/shared/config/constants';
import type {
  EmailBlock,
  EmailBlockType,
  EmailGlobalSettings,
  EmailTemplateState,
} from '../model/types';

const BLOCK_TYPES: EmailBlockType[] = ['header', 'hero', 'text', 'button', 'productCard', 'footer'];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === 'string';

const isBlockType = (value: unknown): value is EmailBlockType =>
  isString(value) && BLOCK_TYPES.includes(value as EmailBlockType);

const isEmailBlock = (value: unknown): value is EmailBlock => {
  if (!isRecord(value)) {
    return false;
  }

  return isString(value.id) && isBlockType(value.type) && isRecord(value.content);
};

const isGlobalSettings = (value: unknown): value is EmailGlobalSettings => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.subject) &&
    isString(value.preheader) &&
    isString(value.backgroundColor) &&
    isString(value.contentBackgroundColor) &&
    isString(value.fontFamily) &&
    isString(value.textColor) &&
    isString(value.linkColor) &&
    typeof value.contentWidth === 'number'
  );
};

export const isEmailTemplateState = (value: unknown): value is EmailTemplateState => {
  if (!isRecord(value)) {
    return false;
  }

  const blocks = value.blocks;
  const selectedBlockId = value.selectedBlockId;

  return (
    isGlobalSettings(value.globalSettings) &&
    Array.isArray(blocks) &&
    blocks.every(isEmailBlock) &&
    (selectedBlockId === null || isString(selectedBlockId))
  );
};

export const readDraftFromStorage = (): EmailTemplateState | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawDraft = window.localStorage.getItem(DRAFT_STORAGE_KEY);

  if (!rawDraft) {
    return null;
  }

  try {
    const parsedDraft: unknown = JSON.parse(rawDraft);

    return isEmailTemplateState(parsedDraft) ? parsedDraft : null;
  } catch {
    return null;
  }
};

export const writeDraftToStorage = (state: EmailTemplateState): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(state));
};

export const clearDraftFromStorage = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(DRAFT_STORAGE_KEY);
};