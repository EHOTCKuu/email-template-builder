import { lintEmailTemplate, countIssuesBySeverity } from './emailLinter';
import { DEFAULT_EMAIL_TEMPLATE } from './defaultTemplate';
import type { EmailTemplateState } from '../model/types';

const buildState = (overrides: Partial<EmailTemplateState> = {}): EmailTemplateState => ({
  ...DEFAULT_EMAIL_TEMPLATE,
  ...overrides,
});

describe('lintEmailTemplate', () => {
  it('returns no issues for the default template', () => {
    expect(lintEmailTemplate(DEFAULT_EMAIL_TEMPLATE)).toHaveLength(0);
  });

  it('reports a hero image without alt text', () => {
    const state = buildState({
      blocks: [
        {
          id: 'hero-1',
          type: 'hero',
          content: {
            imageUrl: 'https://example.com/hero.png',
            alt: '',
            headline: 'Заголовок',
            subheadline: 'Подзаголовок',
            backgroundColor: '#E6F4E5',
            textColor: '#1D241F',
            align: 'center',
          },
        },
      ],
    });
    const issues = lintEmailTemplate(state);

    expect(issues).toHaveLength(1);
    expect(issues[0]?.message).toContain('alt-текста');
  });

  it('ignores an image block without an image url', () => {
    const state = buildState({
      blocks: [
        {
          id: 'hero-1',
          type: 'hero',
          content: {
            imageUrl: '',
            alt: '',
            headline: 'Заголовок',
            subheadline: 'Подзаголовок',
            backgroundColor: '#E6F4E5',
            textColor: '#1D241F',
            align: 'center',
          },
        },
      ],
    });

    expect(lintEmailTemplate(state)).toHaveLength(0);
  });

  it('reports an empty button href', () => {
    const state = buildState({
      blocks: [
        {
          id: 'button-1',
          type: 'button',
          content: {
            label: 'Купить',
            href: '',
            backgroundColor: '#2E6B2B',
            textColor: '#FFFFFF',
            align: 'center',
            fullWidth: false,
          },
        },
      ],
    });
    const issues = lintEmailTemplate(state);

    expect(issues).toHaveLength(1);
    expect(issues[0]?.message).toContain('пустая ссылка');
  });

  it('warns about a href without an http scheme', () => {
    const state = buildState({
      blocks: [
        {
          id: 'button-1',
          type: 'button',
          content: {
            label: 'Купить',
            href: 'example.com',
            backgroundColor: '#2E6B2B',
            textColor: '#FFFFFF',
            align: 'center',
            fullWidth: false,
          },
        },
      ],
    });
    const issues = lintEmailTemplate(state);

    expect(issues).toHaveLength(1);
    expect(issues[0]?.severity).toBe('warning');
  });

  it('counts issues by severity', () => {
    const state = buildState({
      blocks: [
        {
          id: 'button-1',
          type: 'button',
          content: {
            label: 'Купить',
            href: '',
            backgroundColor: '#2E6B2B',
            textColor: '#FFFFFF',
            align: 'center',
            fullWidth: false,
          },
        },
        {
          id: 'button-2',
          type: 'button',
          content: {
            label: 'Купить',
            href: 'example.com',
            backgroundColor: '#2E6B2B',
            textColor: '#FFFFFF',
            align: 'center',
            fullWidth: false,
          },
        },
      ],
    });
    const issues = lintEmailTemplate(state);

    expect(countIssuesBySeverity(issues, 'error')).toBe(1);
    expect(countIssuesBySeverity(issues, 'warning')).toBe(1);
  });
});