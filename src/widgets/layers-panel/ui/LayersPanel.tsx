import { AddBlockMenu, LayerList } from '@/features/block-management';
import { addBlock, duplicateBlock, moveBlockDown, moveBlockUp, removeBlock, selectBlock } from '@/entities/email/model/emailSlice';
import { selectBlocks, selectSelectedBlockId } from '@/entities/email/model/selectors';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { Panel } from '@/shared/ui/Panel';

export const LayersPanel = () => {
  const dispatch = useAppDispatch();
  const blocks = useAppSelector(selectBlocks);
  const selectedBlockId = useAppSelector(selectSelectedBlockId);

  const getBlockIndex = (blockId: string): number => blocks.findIndex((block) => block.id === blockId);

  return (
    <Panel title="Слои и блоки">
      <AddBlockMenu onAddBlock={(type) => dispatch(addBlock(type))} />
      <LayerList
        blocks={blocks}
        selectedBlockId={selectedBlockId}
        canMoveUp={(blockId) => getBlockIndex(blockId) > 0}
        canMoveDown={(blockId) => {
          const index = getBlockIndex(blockId);

          return index !== -1 && index < blocks.length - 1;
        }}
        onSelect={(blockId) => dispatch(selectBlock(blockId))}
        onMoveUp={(blockId) => dispatch(moveBlockUp(blockId))}
        onMoveDown={(blockId) => dispatch(moveBlockDown(blockId))}
        onDuplicate={(blockId) => dispatch(duplicateBlock(blockId))}
        onRemove={(blockId) => dispatch(removeBlock(blockId))}
      />
    </Panel>
  );
};