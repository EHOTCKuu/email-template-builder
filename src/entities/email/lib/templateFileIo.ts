import type { EmailTemplateState } from '../model/types';
import { isEmailTemplateState } from './emailStorage';

export const serializeTemplateToJson = (state: EmailTemplateState): string =>
  JSON.stringify(state, null, 2);

export type ParseTemplateResult =
  | { ok: true; state: EmailTemplateState }
  | { ok: false; reason: string };

export const parseTemplateJson = (rawJson: string): ParseTemplateResult => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { ok: false, reason: 'Файл не является корректным JSON' };
  }

  if (!isEmailTemplateState(parsed)) {
    return { ok: false, reason: 'Структура шаблона не соответствует схеме' };
  }

  return { ok: true, state: parsed };
};

export const downloadTextFile = (fileName: string, content: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
};