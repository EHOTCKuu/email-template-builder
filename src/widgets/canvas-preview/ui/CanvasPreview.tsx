import { useEffect, useMemo, useState } from 'react';
import { compileEmailToHtml } from '@/entities/email/lib/compileEmailToHtml';
import type { EmailTemplateState } from '@/entities/email/model/types';
import type { EmailViewport } from '@/shared/config/constants';
import { PREVIEW_SYNC_DEBOUNCE_MS } from '@/shared/config/constants';
import { useDebouncedCallback } from '@/shared/lib/hooks/useDebouncedCallback';
import { cn } from '@/shared/lib/cn';
import styles from './CanvasPreview.module.scss';

export interface CanvasPreviewProps {
  template: EmailTemplateState;
  viewport: EmailViewport;
  selectedBlockId: string | null;
}

export const CanvasPreview = ({ template, viewport, selectedBlockId }: CanvasPreviewProps) => {
  const html = useMemo(
    () => compileEmailToHtml(template, selectedBlockId),
    [template, selectedBlockId],
  );
  const [previewHtml, setPreviewHtml] = useState(html);

  const syncPreview = useDebouncedCallback((nextHtml: string) => {
    setPreviewHtml(nextHtml);
  }, PREVIEW_SYNC_DEBOUNCE_MS);

  useEffect(() => {
    syncPreview(html);
  }, [html, syncPreview]);

  return (
    <div className={styles.stage}>
      <iframe
        className={cn(styles.frame, viewport === 'mobile' ? styles.frameMobile : styles.frameDesktop)}
        srcDoc={previewHtml}
        title="Предпросмотр письма"
        sandbox=""
      />
    </div>
  );
};