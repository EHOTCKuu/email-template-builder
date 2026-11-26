import { DRAFT_STORAGE_KEY } from '@/shared/config/constants';
import { DEFAULT_EMAIL_TEMPLATE } from './defaultTemplate';
import {
  clearDraftFromStorage,
  isEmailTemplateState,
  readDraftFromStorage,
  writeDraftToStorage,
} from './emailStorage';

beforeEach(() => {
  window.localStorage.clear();
});

describe('isEmailTemplateState', () => {
  it('accepts the default template', () => {
    expect(isEmailTemplateState(DEFAULT_EMAIL_TEMPLATE)).toBe(true);
  });

  it('rejects a state without blocks', () => {
    expect(isEmailTemplateState({ ...DEFAULT_EMAIL_TEMPLATE, blocks: 'nope' })).toBe(false);
  });

  it('rejects a block with an unknown type', () => {
    const invalid = {
      ...DEFAULT_EMAIL_TEMPLATE,
      blocks: [{ id: 'x', type: 'unknown', content: {} }],
    };

    expect(isEmailTemplateState(invalid)).toBe(false);
  });

  it('rejects settings without content width', () => {
    const { contentWidth: _contentWidth, ...settings } = DEFAULT_EMAIL_TEMPLATE.globalSettings;

    expect(isEmailTemplateState({ ...DEFAULT_EMAIL_TEMPLATE, globalSettings: settings })).toBe(false);
  });

  it('rejects a non object value', () => {
    expect(isEmailTemplateState('nope')).toBe(false);
    expect(isEmailTemplateState(null)).toBe(false);
  });
});

describe('emailStorage', () => {
  it('writes and reads the draft', () => {
    writeDraftToStorage(DEFAULT_EMAIL_TEMPLATE);

    expect(readDraftFromStorage()).toEqual(DEFAULT_EMAIL_TEMPLATE);
  });

  it('returns null for broken json', () => {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, '{broken');

    expect(readDraftFromStorage()).toBeNull();
  });

  it('returns null for a valid json with an invalid shape', () => {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ blocks: [] }));

    expect(readDraftFromStorage()).toBeNull();
  });

  it('returns null when the storage is empty', () => {
    expect(readDraftFromStorage()).toBeNull();
  });

  it('clears the draft', () => {
    writeDraftToStorage(DEFAULT_EMAIL_TEMPLATE);
    clearDraftFromStorage();

    expect(readDraftFromStorage()).toBeNull();
  });
});