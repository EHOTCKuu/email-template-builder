import { EMAIL_VIEWPORT_WIDTHS, type EmailViewport } from '@/shared/config/constants';
import styles from './ViewportSwitch.module.scss';

const VIEWPORT_OPTIONS: EmailViewport[] = ['desktop', 'mobile'];

const VIEWPORT_LABELS: Record<EmailViewport, string> = {
  desktop: 'Desktop',
  mobile: 'Mobile',
};

export interface ViewportSwitchProps {
  viewport: EmailViewport;
  onChange: (viewport: EmailViewport) => void;
}

export const ViewportSwitch = ({ viewport, onChange }: ViewportSwitchProps) => (
  <div className={styles.switch} role="group" aria-label="Ширина предпросмотра">
    {VIEWPORT_OPTIONS.map((option) => (
      <button
        key={option}
        type="button"
        className={styles.option}
        aria-pressed={viewport === option}
        onClick={() => onChange(option)}
      >
        {VIEWPORT_LABELS[option]} ({EMAIL_VIEWPORT_WIDTHS[option]}px)
      </button>
    ))}
  </div>
);