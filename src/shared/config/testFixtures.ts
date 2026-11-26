import { DEFAULT_EMAIL_TEMPLATE } from '@/entities/email/lib/defaultTemplate';
import type { EmailTemplateState, TextBlock } from '@/entities/email/model/types';

export const createTemplateState = (overrides: Partial<EmailTemplateState> = {}): EmailTemplateState => ({
  ...DEFAULT_EMAIL_TEMPLATE,
  ...overrides,
});

export const createTextBlock = (overrides: Partial<TextBlock['content']> = {}): TextBlock => ({
  id: 'text-fixture',
  type: 'text',
  content: {
    heading: 'Заголовок блока',
    body: 'Текст блока для тестов',
    backgroundColor: '#FFFFFF',
    textColor: '#1D241F',
    align: 'left',
    ...overrides,
  },
});