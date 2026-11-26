import type { EmailGlobalSettings } from '@/entities/email/model/types';

export const FONT_FAMILY_OPTIONS: { value: string; label: string }[] = [
  { value: 'Arial, Helvetica, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Verdana, Geneva, sans-serif', label: 'Verdana' },
  { value: '"Courier New", Courier, monospace', label: 'Courier New' },
];

export const GLOBAL_SETTINGS_DEFAULTS: EmailGlobalSettings = {
  subject: '',
  preheader: '',
  backgroundColor: '#F2F4F3',
  contentBackgroundColor: '#FFFFFF',
  fontFamily: 'Arial, Helvetica, sans-serif',
  textColor: '#1D241F',
  linkColor: '#2E6B2B',
  contentWidth: 600,
};

export const CONTENT_WIDTH_MIN = 320;
export const CONTENT_WIDTH_MAX = 720;