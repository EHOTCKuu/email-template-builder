import type { RootState } from '@/app/store/rootReducer';
import type { EmailBlock, EmailGlobalSettings, EmailTemplateState } from './types';

export const selectEmailState = (state: RootState): EmailTemplateState => state.email;

export const selectBlocks = (state: RootState): EmailBlock[] => state.email.blocks;

export const selectGlobalSettings = (state: RootState): EmailGlobalSettings => state.email.globalSettings;

export const selectSelectedBlockId = (state: RootState): string | null => state.email.selectedBlockId;

export const selectSelectedBlock = (state: RootState): EmailBlock | null => {
  const { blocks, selectedBlockId } = state.email;

  if (!selectedBlockId) {
    return null;
  }

  return blocks.find((block) => block.id === selectedBlockId) ?? null;
};

export const selectBlockById = (state: RootState, blockId: string): EmailBlock | null =>
  state.email.blocks.find((block) => block.id === blockId) ?? null;

export const selectBlockIndex = (state: RootState, blockId: string): number =>
  state.email.blocks.findIndex((block) => block.id === blockId);

export const selectCanMoveBlockUp = (state: RootState, blockId: string): boolean =>
  selectBlockIndex(state, blockId) > 0;

export const selectCanMoveBlockDown = (state: RootState, blockId: string): boolean => {
  const index = selectBlockIndex(state, blockId);

  return index !== -1 && index < state.email.blocks.length - 1;
};