import { escapeHtml } from './escapeHtml';

describe('escapeHtml', () => {
  it('escapes the five dangerous html characters', () => {
    expect(escapeHtml('<a href="x">Tom & Jerry\'s</a>')).toBe(
      '&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/a&gt;',
    );
  });

  it('keeps plain text untouched', () => {
    expect(escapeHtml('Скидка 50% на игру')).toBe('Скидка 50% на игру');
  });

  it('returns an empty string for an empty input', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('escapes an ampersand only once', () => {
    expect(escapeHtml('&amp;')).toBe('&amp;amp;');
  });
});