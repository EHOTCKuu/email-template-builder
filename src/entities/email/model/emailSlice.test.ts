import {
  addBlock,
  duplicateBlock,
  emailReducer,
  moveBlockDown,
  moveBlockUp,
  removeBlock,
  resetToDefaultTemplate,
  selectBlock,
  updateBlockContent,
  updateGlobalSettings,
  type EmailSliceState,
} from './emailSlice';
import { DEFAULT_EMAIL_TEMPLATE } from '../lib/defaultTemplate';

const buildState = (): EmailSliceState => ({
  globalSettings: DEFAULT_EMAIL_TEMPLATE.globalSettings,
  blocks: DEFAULT_EMAIL_TEMPLATE.blocks.map((block) => ({ ...block, content: { ...block.content } })) as EmailSliceState['blocks'],
  selectedBlockId: 'header-default',
});

describe('emailSlice', () => {
  it('adds a block to the end and selects it', () => {
    const state = emailReducer(buildState(), addBlock('text'));

    expect(state.blocks).toHaveLength(DEFAULT_EMAIL_TEMPLATE.blocks.length + 1);
    expect(state.blocks.at(-1)?.type).toBe('text');
    expect(state.selectedBlockId).toBe(state.blocks.at(-1)?.id);
  });

  it('removes a block and selects the next neighbour when the removed block was selected', () => {
    const selected = emailReducer(buildState(), selectBlock('text-default'));
    const state = emailReducer(selected, removeBlock('text-default'));

    expect(state.blocks.find((block) => block.id === 'text-default')).toBeUndefined();
    expect(state.selectedBlockId).toBe('button-default');
  });

  it('selects the previous neighbour when the last block is removed', () => {
    const selected = emailReducer(buildState(), selectBlock('footer-default'));
    const state = emailReducer(selected, removeBlock('footer-default'));

    expect(state.selectedBlockId).toBe('product-card-default');
  });

  it('keeps the selection when another block is removed', () => {
    const state = emailReducer(buildState(), removeBlock('hero-default'));

    expect(state.selectedBlockId).toBe('header-default');
  });

  it('ignores removal of an unknown block', () => {
    const state = emailReducer(buildState(), removeBlock('missing'));

    expect(state.blocks).toHaveLength(DEFAULT_EMAIL_TEMPLATE.blocks.length);
  });

  it('moves a block up', () => {
    const state = emailReducer(buildState(), moveBlockUp('text-default'));

    expect(state.blocks.map((block) => block.id).indexOf('text-default')).toBe(1);
  });

  it('moves a block down', () => {
    const state = emailReducer(buildState(), moveBlockDown('hero-default'));

    expect(state.blocks.map((block) => block.id).indexOf('hero-default')).toBe(2);
  });

  it('keeps the order when moving the first block up', () => {
    const state = emailReducer(buildState(), moveBlockUp('header-default'));

    expect(state.blocks.map((block) => block.id)).toEqual(DEFAULT_EMAIL_TEMPLATE.blocks.map((block) => block.id));
  });

  it('keeps the order when moving the last block down', () => {
    const state = emailReducer(buildState(), moveBlockDown('footer-default'));

    expect(state.blocks.map((block) => block.id)).toEqual(DEFAULT_EMAIL_TEMPLATE.blocks.map((block) => block.id));
  });

  it('duplicates a block with a new id and selects the copy', () => {
    const state = emailReducer(buildState(), duplicateBlock('hero-default'));
    const sourceIndex = state.blocks.findIndex((block) => block.id === 'hero-default');
    const copy = state.blocks[sourceIndex + 1];

    expect(state.blocks).toHaveLength(DEFAULT_EMAIL_TEMPLATE.blocks.length + 1);
    expect(copy?.type).toBe('hero');
    expect(copy?.id).not.toBe('hero-default');
    expect(state.selectedBlockId).toBe(copy?.id);
  });

  it('duplicates content independently from the source block', () => {
    const duplicated = emailReducer(buildState(), duplicateBlock('hero-default'));
    const copy = duplicated.blocks.find((block) => block.id === duplicated.selectedBlockId);
    const nextState = emailReducer(duplicated, updateBlockContent({ blockId: copy?.id ?? '', content: { headline: 'Изменено' } }));
    const sourceBlock = nextState.blocks.find((block) => block.id === 'hero-default');

    expect(sourceBlock?.content).toMatchObject({ headline: 'Новая игра недели' });
  });

  it('selects a block by id and clears the selection with null', () => {
    const selected = emailReducer(buildState(), selectBlock('footer-default'));
    const cleared = emailReducer(selected, selectBlock(null));

    expect(selected.selectedBlockId).toBe('footer-default');
    expect(cleared.selectedBlockId).toBeNull();
  });

  it('updates block content partially', () => {
    const state = emailReducer(buildState(), updateBlockContent({ blockId: 'text-default', content: { heading: 'Новый текст' } }));
    const block = state.blocks.find((item) => item.id === 'text-default');

    expect(block?.content).toMatchObject({
      heading: 'Новый текст',
      body: 'Мы отобрали десять проектов с лучшими оценками игроков за последний месяц.',
    });
  });

  it('ignores content update for an unknown block', () => {
    const state = emailReducer(buildState(), updateBlockContent({ blockId: 'missing', content: { heading: 'Новый текст' } }));

    expect(state).toEqual(buildState());
  });

  it('updates global settings partially', () => {
    const state = emailReducer(buildState(), updateGlobalSettings({ contentWidth: 480, subject: 'Новая тема' }));

    expect(state.globalSettings.contentWidth).toBe(480);
    expect(state.globalSettings.subject).toBe('Новая тема');
    expect(state.globalSettings.fontFamily).toBe(DEFAULT_EMAIL_TEMPLATE.globalSettings.fontFamily);
  });

  it('resets the state to the default template', () => {
    const modified = emailReducer(buildState(), updateGlobalSettings({ subject: 'Изменено' }));
    const state = emailReducer(modified, resetToDefaultTemplate());

    expect(state).toEqual(DEFAULT_EMAIL_TEMPLATE);
  });
});