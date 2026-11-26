import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './Panel.module.scss';

export interface PanelProps {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Panel = ({ title, actions, children, className }: PanelProps) => (
  <section className={cn(styles.panel, className)} aria-label={title}>
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </header>
    <div className={styles.body}>{children}</div>
  </section>
);