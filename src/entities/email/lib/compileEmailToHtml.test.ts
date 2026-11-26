import { compileEmailToHtml } from './compileEmailToHtml';
import { DEFAULT_EMAIL_TEMPLATE } from './defaultTemplate';
import type { EmailTemplateState, TextBlock } from '../model/types';

const buildState = (overrides: Partial<EmailTemplateState> = {}): EmailTemplateState => ({
  ...DEFAULT_EMAIL_TEMPLATE,
  blocks: [],
  ...overrides,
});

const buildTextBlock = (overrides: Partial<TextBlock['content']> = {}): TextBlock => ({
  id: 'text-1',
  type: 'text',
  content: {
    heading: 'Заголовок',
    body: 'Текст письма',
    backgroundColor: '#FFFFFF',
    textColor: '#1D241F',
    align: 'left',
    ...overrides,
  },
});

describe('compileEmailToHtml', () => {
  it('renders a doctype and the xhtml namespace', () => {
    const html = compileEmailToHtml(buildState());

    expect(html.startsWith('<!DOCTYPE html PUBLIC')).toBe(true);
    expect(html).toContain('xmlns="http://www.w3.org/1999/xhtml"');
  });

  it('renders presentation tables with the global content width', () => {
    const html = compileEmailToHtml(buildState());

    expect(html).toContain('role="presentation"');
    expect(html).toContain('max-width: 600px');
  });

  it('applies the global background and content colors', () => {
    const html = compileEmailToHtml(
      buildState({
        globalSettings: {
          ...DEFAULT_EMAIL_TEMPLATE.globalSettings,
          backgroundColor: '#101010',
          contentBackgroundColor: '#FAFAFA',
        },
      }),
    );

    expect(html).toContain('background-color: #101010');
    expect(html).toContain('background-color: #FAFAFA');
  });

  it('renders every block of the default template', () => {
    const html = compileEmailToHtml(DEFAULT_EMAIL_TEMPLATE);

    expect(html).toContain('GameStore');
    expect(html).toContain('Новая игра недели');
    expect(html).toContain('Почему стоит играть');
    expect(html).toContain('Смотреть подборку');
    expect(html).toContain('Neon Runner');
    expect(html).toContain('Отписаться от рассылки');
  });

  it('escapes dangerous characters in text content', () => {
    const html = compileEmailToHtml(
      buildState({ blocks: [buildTextBlock({ heading: '<script>alert(1)</script>', body: 'Tom & Jerry' })] }),
    );

    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).toContain('Tom &amp; Jerry');
  });

  it('escapes dangerous characters in link hrefs', () => {
    const html = compileEmailToHtml(
      buildState({
        blocks: [
          {
            id: 'button-1',
            type: 'button',
            content: {
              label: 'Купить',
              href: 'https://example.com/?a=1&b="2"',
              backgroundColor: '#2E6B2B',
              textColor: '#FFFFFF',
              align: 'center',
              fullWidth: false,
            },
          },
        ],
      }),
    );

    expect(html).toContain('href="https://example.com/?a=1&amp;b=&quot;2&quot;"');
  });

  it('maps the block align to the table align attribute', () => {
    const html = compileEmailToHtml(buildState({ blocks: [buildTextBlock({ align: 'right' })] }));

    expect(html).toContain('align="right"');
    expect(html).toContain('text-align: right');
  });

  it('keeps the button inline by default and stretches it when full width is on', () => {
    const state = buildState({
      blocks: [
        {
          id: 'button-1',
          type: 'button',
          content: {
            label: 'Купить',
            href: 'https://example.com',
            backgroundColor: '#2E6B2B',
            textColor: '#FFFFFF',
            align: 'center',
            fullWidth: true,
          },
        },
      ],
    });

    expect(compileEmailToHtml(state)).toContain('width: 100%');
  });

  it('uses the global content width for the hero image', () => {
    const state = buildState({
      globalSettings: { ...DEFAULT_EMAIL_TEMPLATE.globalSettings, contentWidth: 480 },
      blocks: [
        {
          id: 'hero-1',
          type: 'hero',
          content: {
            imageUrl: 'https://example.com/hero.png',
            alt: 'Hero',
            headline: 'Заголовок',
            subheadline: 'Подзаголовок',
            backgroundColor: '#E6F4E5',
            textColor: '#1D241F',
            align: 'center',
          },
        },
      ],
    });

    expect(compileEmailToHtml(state)).toContain('max-width: 480px');
  });

  it('keeps the product card image at a fixed width', () => {
    const html = compileEmailToHtml(DEFAULT_EMAIL_TEMPLATE);

    expect(html).toContain('max-width: 240px');
  });

  it('includes a mobile media query with the content width breakpoint', () => {
    const html = compileEmailToHtml(DEFAULT_EMAIL_TEMPLATE);

    expect(html).toContain('@media only screen and (max-width: 600px)');
    expect(html).toContain('.stack-column');
  });

  it('marks the content table with the fluid container class', () => {
    const html = compileEmailToHtml(DEFAULT_EMAIL_TEMPLATE);

    expect(html).toContain('class="email-container"');
  });

  it('produces identical output for identical input', () => {
    expect(compileEmailToHtml(DEFAULT_EMAIL_TEMPLATE)).toBe(compileEmailToHtml(DEFAULT_EMAIL_TEMPLATE));
  });

    it('marks the selected block with the selection class', () => {
    const html = compileEmailToHtml(DEFAULT_EMAIL_TEMPLATE, 'hero-default');

    expect(html).toContain('class="block-selected"');
  });

  it('does not mark any block when nothing is selected', () => {
    const html = compileEmailToHtml(DEFAULT_EMAIL_TEMPLATE, null);

    expect(html).not.toContain('class="block-selected"');
  });
});