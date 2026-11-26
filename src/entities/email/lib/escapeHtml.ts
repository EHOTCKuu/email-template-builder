const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const HTML_ENTITY_PATTERN = /[&<>"']/g;

export const escapeHtml = (value: string): string =>
  value.replace(HTML_ENTITY_PATTERN, (character) => HTML_ENTITIES[character] ?? character);