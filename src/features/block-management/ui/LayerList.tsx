import type { EmailBlock } from '@/entities/email/model/types';
import { LayerItem } from './LayerItem';
import styles from './LayerList.module.scss';

export interface LayerListProps {
  blocks: EmailBlock[];
  selectedBlockId: string | null;
  canMoveUp: (blockId: string) => boolean;
  canMoveDown: (blockId: string) => boolean;
  onSelect: (blockId: string) => void;
  onMoveUp: (blockId: string) => void;
  onMoveDown: (blockId: string) => void;
  onDuplicate: (blockId: string) => void;
  onRemove: (blockId: string) => void;
}

export const LayerList = ({
  blocks,
  selectedBlockId,
  canMoveUp,
  canMoveDown,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onRemove,
}: LayerListProps) => {
  if (blocks.length === 0) {
    return <p className={styles.empty}>Писем пока нет — добавьте первый блок.</p>;
  }

  return (
    <ul className={styles.list}>
      {blocks.map((block, index) => (
        <LayerItem
          key={block.id}
          block={block}
          index={index}
          isSelected={block.id === selectedBlockId}
          canMoveUp={canMoveUp(block.id)}
          canMoveDown={canMoveDown(block.id)}
          onSelect={onSelect}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDuplicate={onDuplicate}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};