import { useState } from 'react';
import { LayersPanel } from '@/widgets/layers-panel';
import { CanvasPreview, ViewportSwitch } from '@/widgets/canvas-preview';
import { InspectorPanel } from '@/widgets/inspector-panel';
import { ExportModal } from '@/features/html-export';
import { selectEmailState, selectSelectedBlockId } from '@/entities/email/model/selectors';
import { useAppSelector } from '@/app/store/hooks';
import { useDraftAutosave } from '@/features/template-persistence';
import { useToast } from '@/shared/lib/hooks/useToast';
import { APP_TITLE, type EmailViewport } from '@/shared/config/constants';
import { Button } from '@/shared/ui/Button';
import { Toast } from '@/shared/ui/Toast';
import styles from './App.module.scss';

export const App = () => {
  const [viewport, setViewport] = useState<EmailViewport>('desktop');
  const [isExportOpen, setExportOpen] = useState(false);
  const emailState = useAppSelector(selectEmailState);
  const selectedBlockId = useAppSelector(selectSelectedBlockId);
  const { message, showToast } = useToast();

  useDraftAutosave();

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <h1 className={styles.title}>{APP_TITLE}</h1>
        <Button variant="primary" onClick={() => setExportOpen(true)}>
          Экспорт HTML
        </Button>
      </header>
      <main className={styles.workspace}>
        <aside className={styles.layersPanel}>
          <LayersPanel />
        </aside>
        <section className={styles.canvas} aria-label="Холст письма">
          <div className={styles.canvasToolbar}>
            <ViewportSwitch viewport={viewport} onChange={setViewport} />
          </div>
          <CanvasPreview template={emailState} viewport={viewport} selectedBlockId={selectedBlockId} />
        </section>
        <aside className={styles.inspectorPanel}>
          <InspectorPanel />
        </aside>
      </main>
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setExportOpen(false)}
        onNotify={showToast}
      />
      <Toast message={message} />
    </div>
  );
};