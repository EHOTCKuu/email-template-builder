import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { compileEmailToHtml } from '@/entities/email/lib/compileEmailToHtml';
import { lintEmailTemplate } from '@/entities/email/lib/emailLinter';
import { parseTemplateJson, serializeTemplateToJson, downloadTextFile } from '@/entities/email/lib/templateFileIo';
import { selectEmailState } from '@/entities/email/model/selectors';
import { replaceTemplate, resetToDefaultTemplate, selectBlock } from '@/entities/email/model/emailSlice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { LintReport } from '@/features/email-linting';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import styles from './ExportModal.module.scss';

export interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (text: string) => void;
}

type ExportTab = 'html' | 'json';

export const ExportModal = ({ isOpen, onClose, onNotify }: ExportModalProps) => {
  const dispatch = useAppDispatch();
  const emailState = useAppSelector(selectEmailState);
  const [tab, setTab] = useState<ExportTab>('html');
  const [importError, setImportError] = useState<string | null>(null);

  const html = compileEmailToHtml(emailState);
  const issues = lintEmailTemplate(emailState);
  const json = serializeTemplateToJson(emailState);

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      onNotify(tab === 'html' ? 'HTML скопирован в буфер обмена' : 'JSON скопирован в буфер обмена');
    } catch {
      onNotify('Не удалось скопировать: браузер запретил доступ к буферу');
    }
  };

  const handleCopy = (): void => {
    void copyToClipboard(tab === 'html' ? html : json);
  };

  const handleDownload = (): void => {
    if (tab === 'html') {
      downloadTextFile('email-template.html', html, 'text/html;charset=utf-8');
    } else {
      downloadTextFile('email-template.json', json, 'application/json;charset=utf-8');
    }
  };

  const importFromFile = async (file: File): Promise<void> => {
    const rawJson = await file.text();
    const result = parseTemplateJson(rawJson);

    if (result.ok) {
      dispatch(replaceTemplate(result.state));
      setImportError(null);
      onNotify('Шаблон импортирован');
    } else {
      setImportError(result.reason);
    }
  };

  const handleImport = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    event.target.value = '';

    if (file) {
      void importFromFile(file);
    }
  };

  const handleReset = (): void => {
    dispatch(resetToDefaultTemplate());
    onNotify('Шаблон сброшен к значениям по умолчанию');
  };

  return (
    <Modal title="Экспорт письма" isOpen={isOpen} onClose={onClose}>
      <div className={styles.tabs} role="tablist" aria-label="Формат экспорта">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'html'}
          className={styles.tab}
          onClick={() => setTab('html')}
        >
          HTML
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'json'}
          className={styles.tab}
          onClick={() => setTab('json')}
        >
          JSON
        </button>
      </div>
      <LintReport issues={issues} onSelectBlock={(blockId) => dispatch(selectBlock(blockId))} />
      <textarea className={styles.code} readOnly value={tab === 'html' ? html : json} aria-label="Код шаблона" />
      {importError ? (
        <p className={styles.importError} role="alert">
          {importError}
        </p>
      ) : null}
      <div className={styles.actions}>
        <Button variant="primary" onClick={handleCopy}>
          Скопировать {tab === 'html' ? 'HTML' : 'JSON'}
        </Button>
        <Button onClick={handleDownload}>Скачать файл</Button>
        <label className={styles.importLabel}>
          <span>Импорт JSON</span>
          <input type="file" accept="application/json" onChange={handleImport} />
        </label>
        <Button variant="ghost" onClick={handleReset}>
          Сбросить до шаблона
        </Button>
      </div>
    </Modal>
  );
};