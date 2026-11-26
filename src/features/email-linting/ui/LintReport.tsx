import type { EmailLintIssue } from '@/entities/email/model/types';
import { countIssuesBySeverity } from '@/entities/email/lib/emailLinter';
import { cn } from '@/shared/lib/cn';
import styles from './LintReport.module.scss';

export interface LintReportProps {
  issues: EmailLintIssue[];
  onSelectBlock: (blockId: string) => void;
}

export const LintReport = ({ issues, onSelectBlock }: LintReportProps) => {
  const errorCount = countIssuesBySeverity(issues, 'error');
  const warningCount = countIssuesBySeverity(issues, 'warning');

  if (issues.length === 0) {
    return (
      <p className={styles.ok} role="status">
        Письмо готово к отправке: ошибок нет.
      </p>
    );
  }

  return (
    <div className={styles.report}>
      <p className={styles.summary} role="status">
        Ошибок: {errorCount}, предупреждений: {warningCount}
      </p>
      <ul className={styles.list}>
        {issues.map((issue) => (
          <li key={issue.id}>
            <button
              type="button"
              className={cn(styles.issue, issue.severity === 'error' ? styles.issueError : styles.issueWarning)}
              onClick={() => {
                if (issue.blockId) {
                  onSelectBlock(issue.blockId);
                }
              }}
            >
              <span className={styles.severity} aria-hidden="true">
                {issue.severity === 'error' ? '✕' : '!'}
              </span>
              {issue.message}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};