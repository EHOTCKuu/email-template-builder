import { GMAIL_HTML_SIZE_LIMIT_BYTES } from '@/shared/config/constants';
import { compileEmailToHtml } from './compileEmailToHtml';
import { getBlockTypeLabel } from './blockFactory';
import type { EmailBlock, EmailLintIssue, EmailTemplateState } from '../model/types';

const IMAGE_BLOCK_TYPES: EmailBlock['type'][] = ['hero', 'productCard', 'header'];

const getByteSize = (text: string): number => new Blob([text]).size;

const hasImageUrl = (block: EmailBlock): boolean => {
  switch (block.type) {
    case 'hero':
    case 'productCard':
      return block.content.imageUrl.trim().length > 0;
    case 'header':
      return block.content.logoUrl.trim().length > 0;
    default:
      return false;
  }
};

const getImageAlt = (block: EmailBlock): string => {
  switch (block.type) {
    case 'hero':
    case 'productCard':
      return block.content.alt.trim();
    case 'header':
      return block.content.title.trim();
    default:
      return '';
  }
};

const getHrefEntries = (block: EmailBlock): { label: string; href: string }[] => {
  switch (block.type) {
    case 'button':
      return [{ label: block.content.label, href: block.content.href }];
    case 'productCard':
      return [{ label: block.content.buttonLabel, href: block.content.buttonHref }];
    case 'footer':
      return [{ label: 'Ссылка отписки', href: block.content.unsubscribeUrl }];
    default:
      return [];
  }
};

const lintBlock = (block: EmailBlock): EmailLintIssue[] => {
  const issues: EmailLintIssue[] = [];
  const typeLabel = getBlockTypeLabel(block.type);

  if (IMAGE_BLOCK_TYPES.includes(block.type) && hasImageUrl(block) && getImageAlt(block).length === 0) {
    issues.push({
      id: `${block.id}-alt`,
      severity: 'error',
      blockId: block.id,
      message: `Блок «${typeLabel}»: у изображения нет alt-текста`,
    });
  }

  for (const entry of getHrefEntries(block)) {
    if (entry.href.trim().length === 0) {
      issues.push({
        id: `${block.id}-href-${entry.label}`,
        severity: 'error',
        blockId: block.id,
        message: `Блок «${typeLabel}»: пустая ссылка у «${entry.label}»`,
      });
    } else if (!/^https?:\/\//i.test(entry.href)) {
      issues.push({
        id: `${block.id}-href-scheme-${entry.label}`,
        severity: 'warning',
        blockId: block.id,
        message: `Блок «${typeLabel}»: ссылка «${entry.href}» не начинается с http(s)`,
      });
    }
  }

  return issues;
};

export const lintEmailTemplate = (state: EmailTemplateState): EmailLintIssue[] => {
  const blockIssues = state.blocks.flatMap(lintBlock);
  const htmlSize = getByteSize(compileEmailToHtml(state));

  if (htmlSize > GMAIL_HTML_SIZE_LIMIT_BYTES) {
    const sizeInKb = Math.round(htmlSize / 1024);
    const limitInKb = Math.round(GMAIL_HTML_SIZE_LIMIT_BYTES / 1024);

    blockIssues.push({
      id: 'html-size',
      severity: 'error',
      blockId: null,
      message: `HTML весит ${sizeInKb} КБ — больше лимита Gmail в ${limitInKb} КБ`,
    });
  }

  return blockIssues;
};

export const countIssuesBySeverity = (
  issues: EmailLintIssue[],
  severity: EmailLintIssue['severity'],
): number => issues.filter((issue) => issue.severity === severity).length;