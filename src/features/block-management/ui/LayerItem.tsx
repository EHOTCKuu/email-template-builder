import { getBlockTypeLabel } from '@/entities/email/lib/blockFactory';
import type { EmailBlock } from '@/entities/email/model/types';
import { IconButton } from '@/shared/ui/IconButton';
import { cn } from '@/shared/lib/cn';
import styles from './LayerItem.module.scss';

export interface LayerItemProps {
  block: EmailBlock;
  index: number;
  isSelected: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onSelect: (blockId: string) => void;
  onMoveUp: (blockId: string) => void;
  onMoveDown: (blockId: string) => void;
  onDuplicate: (blockId: string) => void;
  onRemove: (blockId: string) => void;
}

export const LayerItem = ({
  block,
  index,
  isSelected,
  canMoveUp,
  canMoveDown,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onRemove,
}: LayerItemProps) => {
  const typeLabel = getBlockTypeLabel(block.type);

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={cn(styles.select, isSelected && styles.selectActive)}
        aria-pressed={isSelected}
        onClick={() => onSelect(block.id)}
      >
        <span className={styles.order} aria-hidden="true">
          {index + 1}
        </span>
        <span className={styles.label}>{typeLabel}</span>
      </button>
      <div className={styles.controls}>
        <IconButton label={`Переместить блок «${typeLabel}» вверх`} disabled={!canMoveUp} onClick={() => onMoveUp(block.id)} icon="↑" />
        <IconButton label={`Переместить блок «${typeLabel}» вниз`} disabled={!canMoveDown} onClick={() => onMoveDown(block.id)} icon="↓" />
        <IconButton label={`Дублировать блок «${typeLabel}»`} onClick={() => onDuplicate(block.id)} icon="⧉" />
        <IconButton label={`Удалить блок «${typeLabel}»`} onClick={() => onRemove(block.id)} icon="✕" />
      </div>
    </li>
  );
};