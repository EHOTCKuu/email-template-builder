import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import { createBlock } from '../lib/blockFactory';
import { DEFAULT_EMAIL_TEMPLATE } from '../lib/defaultTemplate';
import type {
  EmailBlock,
  EmailBlockType,
  EmailGlobalSettings,
  EmailTemplateState,
} from './types';

export type EmailSliceState = EmailTemplateState;

type BlockContentPatch = Partial<EmailBlock['content']>;

const moveBlock = (blocks: EmailBlock[], fromIndex: number, toIndex: number): EmailBlock[] => {
  if (fromIndex === -1 || toIndex < 0 || toIndex >= blocks.length || fromIndex === toIndex) {
    return blocks;
  }

  const nextBlocks = [...blocks];
  const [movedBlock] = nextBlocks.splice(fromIndex, 1);

  if (!movedBlock) {
    return blocks;
  }

  nextBlocks.splice(toIndex, 0, movedBlock);

  return nextBlocks;
};

const findBlockIndex = (blocks: EmailBlock[], blockId: string): number =>
  blocks.findIndex((block) => block.id === blockId);

const initialState: EmailSliceState = DEFAULT_EMAIL_TEMPLATE;

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    addBlock: {
      prepare: (type: EmailBlockType) => ({ payload: { type } }),
      reducer: (state, action: PayloadAction<{ type: EmailBlockType }>) => {
        const block = createBlock(action.payload.type, nanoid(8));

        state.blocks.push(block);
        state.selectedBlockId = block.id;
      },
    },
    removeBlock: (state, action: PayloadAction<string>) => {
      const index = findBlockIndex(state.blocks, action.payload);

      if (index === -1) {
        return;
      }

      state.blocks.splice(index, 1);

      if (state.selectedBlockId === action.payload) {
        const fallbackBlock = state.blocks[index] ?? state.blocks[index - 1] ?? null;

        state.selectedBlockId = fallbackBlock ? fallbackBlock.id : null;
      }
    },
    moveBlockUp: (state, action: PayloadAction<string>) => {
      const index = findBlockIndex(state.blocks, action.payload);

      state.blocks = moveBlock(state.blocks, index, index - 1);
    },
    moveBlockDown: (state, action: PayloadAction<string>) => {
      const index = findBlockIndex(state.blocks, action.payload);

      state.blocks = moveBlock(state.blocks, index, index + 1);
    },
    duplicateBlock: (state, action: PayloadAction<string>) => {
      const index = findBlockIndex(state.blocks, action.payload);
      const sourceBlock = state.blocks[index];

      if (!sourceBlock) {
        return;
      }

      const copy = { ...sourceBlock, id: nanoid(8) };

      state.blocks.splice(index + 1, 0, copy);
      state.selectedBlockId = copy.id;
    },
    selectBlock: (state, action: PayloadAction<string | null>) => {
      state.selectedBlockId = action.payload;
    },
    updateBlockContent: (state, action: PayloadAction<{ blockId: string; content: BlockContentPatch }>) => {
      const block = state.blocks.find((item) => item.id === action.payload.blockId);

      if (!block) {
        return;
      }

      block.content = { ...block.content, ...action.payload.content };
    },
    updateGlobalSettings: (state, action: PayloadAction<Partial<EmailGlobalSettings>>) => {
      state.globalSettings = { ...state.globalSettings, ...action.payload };
    },
    resetToDefaultTemplate: () => DEFAULT_EMAIL_TEMPLATE,
    replaceTemplate: (_state, action: PayloadAction<EmailTemplateState>) => action.payload,
  },
});

export const {
  addBlock,
  removeBlock,
  moveBlockUp,
  moveBlockDown,
  duplicateBlock,
  selectBlock,
  updateBlockContent,
  updateGlobalSettings,
  resetToDefaultTemplate,
  replaceTemplate,
} = emailSlice.actions;

export const emailReducer = emailSlice.reducer;