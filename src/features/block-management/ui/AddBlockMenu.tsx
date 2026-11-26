import { BLOCK_TYPE_ORDER, getBlockTypeLabel } from '@/entities/email/lib/blockFactory';
import type { EmailBlockType } from '@/entities/email/model/types';
import { Button } from '@/shared/ui/Button';
import styles from './AddBlockMenu.module.scss';

export interface AddBlockMenuProps {
  onAddBlock: (type: EmailBlockType) => void;
}

export const AddBlockMenu = ({ onAddBlock }: AddBlockMenuProps) => (
  <div className={styles.menu} role="group" aria-label="Добавление блоков">
    {BLOCK_TYPE_ORDER.map((type) => (
      <Button key={type} size="compact" variant="secondary" onClick={() => onAddBlock(type)}>
        {getBlockTypeLabel(type)}
      </Button>
    ))}
  </div>
);