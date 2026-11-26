export const APP_TITLE = 'Email Template Builder';

export const EMAIL_VIEWPORT_WIDTHS = {
  desktop: 600,
  mobile: 375,
} as const;

export type EmailViewport = keyof typeof EMAIL_VIEWPORT_WIDTHS;

export const GMAIL_HTML_SIZE_LIMIT_BYTES = 102 * 1024;

export const DRAFT_STORAGE_KEY = 'email-template-builder:draft:v1';

export const PREVIEW_SYNC_DEBOUNCE_MS = 180;