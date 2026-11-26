import { escapeHtml } from './escapeHtml';
import type {
  ButtonBlock,
  EmailBlock,
  EmailGlobalSettings,
  EmailTemplateState,
  EmailTextAlign,
  FooterBlock,
  HeaderBlock,
  HeroBlock,
  ProductCardBlock,
  TextBlock,
} from '../model/types';

const EMAIL_DOCTYPE = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

const ALIGN_TO_ATTRIBUTE: Record<EmailTextAlign, string> = {
  left: 'left',
  center: 'center',
  right: 'right',
};

const MSO_FONT_FAMILY = 'Arial, Helvetica, sans-serif';

const PRODUCT_CARD_IMAGE_WIDTH = 240;

interface RenderContext {
  settings: EmailGlobalSettings;
}

const attribute = (name: string, value: string): string => `${name}="${escapeHtml(value)}"`;

const styleAttribute = (rules: Record<string, string>): string =>
  attribute(
    'style',
    Object.entries(rules)
      .map(([property, value]) => `${property}: ${value}`)
      .join('; '),
  );

const cellStyle = (context: RenderContext, overrides: Record<string, string>): Record<string, string> => ({
  'font-family': context.settings.fontFamily,
  'font-size': '14px',
  'line-height': '20px',
  color: context.settings.textColor,
  ...overrides,
});

const renderImage = (
  url: string,
  alt: string,
  width: number,
  align: string,
): string =>
  `<img ${attribute('src', url)} ${attribute('alt', alt)} ${attribute('style', `display: block; width: 100%; max-width: ${width}px; height: auto; border: 0; outline: none; text-decoration: none; margin: 0 auto;`)} align="${align}" />`;

const renderHeader = (block: HeaderBlock, context: RenderContext): string => {
  const { content } = block;
  const align = ALIGN_TO_ATTRIBUTE[content.align];

  return `<tr>
    <td ${attribute('bgcolor', content.backgroundColor)} ${attribute('align', align)} ${styleAttribute(cellStyle(context, { padding: '20px 24px', 'background-color': content.backgroundColor, 'text-align': align }))}>
      <img ${attribute('src', content.logoUrl)} ${attribute('alt', content.title)} ${attribute('style', 'display: block; width: 160px; max-width: 100%; height: auto; border: 0; outline: none; margin: 0 auto 8px;')} />
      <div ${attribute('style', `font-size: 20px; line-height: 26px; font-weight: bold; color: ${content.textColor};`)}>${escapeHtml(content.title)}</div>
      <div ${attribute('style', `font-size: 13px; line-height: 18px; color: ${content.textColor}; opacity: 0.85;`)}>${escapeHtml(content.subtitle)}</div>
    </td>
  </tr>`;
};

const renderHero = (block: HeroBlock, context: RenderContext): string => {
  const { content } = block;
  const align = ALIGN_TO_ATTRIBUTE[content.align];
  const heroImageWidth = context.settings.contentWidth;

  return `<tr>
    <td ${attribute('bgcolor', content.backgroundColor)} ${attribute('align', align)} ${styleAttribute(cellStyle(context, { padding: '0 0 16px', 'background-color': content.backgroundColor, 'text-align': align }))}>
      ${renderImage(content.imageUrl, content.alt, heroImageWidth, align)}
      <div ${attribute('style', `padding: 16px 24px 0; font-size: 22px; line-height: 28px; font-weight: bold; color: ${content.textColor};`)}>${escapeHtml(content.headline)}</div>
      <div ${attribute('style', `padding: 8px 24px 16px; font-size: 14px; line-height: 20px; color: ${content.textColor};`)}>${escapeHtml(content.subheadline)}</div>
    </td>
  </tr>`;
};

const renderText = (block: TextBlock, context: RenderContext): string => {
  const { content } = block;
  const align = ALIGN_TO_ATTRIBUTE[content.align];

  return `<tr>
    <td ${attribute('bgcolor', content.backgroundColor)} ${attribute('align', align)} ${styleAttribute(cellStyle(context, { padding: '20px 24px', 'background-color': content.backgroundColor, 'text-align': align }))}>
      <div ${attribute('style', `font-size: 17px; line-height: 24px; font-weight: bold; color: ${content.textColor};`)}>${escapeHtml(content.heading)}</div>
      <div ${attribute('style', `padding-top: 8px; font-size: 14px; line-height: 20px; color: ${content.textColor};`)}>${escapeHtml(content.body)}</div>
    </td>
  </tr>`;
};

const renderButton = (block: ButtonBlock, context: RenderContext): string => {
  const { content } = block;
  const align = ALIGN_TO_ATTRIBUTE[content.align];
  const width = content.fullWidth ? '100%' : 'auto';

  return `<tr>
    <td ${attribute('bgcolor', context.settings.contentBackgroundColor)} ${attribute('align', align)} ${styleAttribute(cellStyle(context, { padding: '8px 24px 20px', 'background-color': context.settings.contentBackgroundColor, 'text-align': align }))}>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" ${attribute('style', `width: ${width};`)}>
        <tr>
          <td ${attribute('bgcolor', content.backgroundColor)} ${attribute('align', 'center')} ${attribute('style', `border-radius: 4px; background-color: ${content.backgroundColor};`)}>
            <a ${attribute('href', content.href)} ${attribute('style', `display: inline-block; padding: 12px 28px; font-family: ${context.settings.fontFamily}; font-size: 14px; font-weight: bold; line-height: 20px; color: ${content.textColor}; text-decoration: none;`)}>${escapeHtml(content.label)}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
};

const renderProductCard = (block: ProductCardBlock, context: RenderContext): string => {
  const { content } = block;
  const align = ALIGN_TO_ATTRIBUTE[content.align];

  return `<tr>
    <td ${attribute('bgcolor', context.settings.contentBackgroundColor)} ${styleAttribute(cellStyle(context, { padding: '20px 24px', 'background-color': context.settings.contentBackgroundColor }))}>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" ${attribute('style', `width: 100%; background-color: ${content.backgroundColor}; border: 1px solid ${context.settings.backgroundColor};`)}>
        <tr>
          <td class="stack-column stack-column-cell" width="${PRODUCT_CARD_IMAGE_WIDTH}" valign="top" ${attribute('style', `max-width: ${PRODUCT_CARD_IMAGE_WIDTH}px; padding: 12px;`)}>
            ${renderImage(content.imageUrl, content.alt, PRODUCT_CARD_IMAGE_WIDTH, 'left')}
          </td>
          <td class="stack-column stack-column-cell" valign="top" ${attribute('align', align)} ${attribute('style', `padding: 12px; text-align: ${align};`)}>
            <div ${attribute('style', `font-size: 17px; line-height: 24px; font-weight: bold; color: ${content.textColor};`)}>${escapeHtml(content.name)}</div>
            <div ${attribute('style', `padding-top: 6px; font-size: 13px; line-height: 19px; color: ${content.textColor};`)}>${escapeHtml(content.description)}</div>
            <div ${attribute('style', `padding-top: 10px; font-size: 16px; line-height: 22px; font-weight: bold; color: ${content.textColor};`)}>${escapeHtml(content.price)}</div>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" ${attribute('style', 'margin-top: 10px;')}>
              <tr>
                <td ${attribute('bgcolor', context.settings.linkColor)} ${attribute('style', `border-radius: 4px; background-color: ${context.settings.linkColor};`)}>
                  <a ${attribute('href', content.buttonHref)} ${attribute('style', `display: inline-block; padding: 8px 20px; font-family: ${context.settings.fontFamily}; font-size: 13px; font-weight: bold; color: #FFFFFF; text-decoration: none;`)}>${escapeHtml(content.buttonLabel)}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
};

const renderFooter = (block: FooterBlock, context: RenderContext): string => {
  const { content } = block;
  const align = ALIGN_TO_ATTRIBUTE[content.align];

  return `<tr>
    <td ${attribute('bgcolor', content.backgroundColor)} ${attribute('align', align)} ${styleAttribute(cellStyle(context, { padding: '20px 24px', 'background-color': content.backgroundColor, 'text-align': align }))}>
      <div ${attribute('style', `font-size: 13px; line-height: 19px; font-weight: bold; color: ${content.textColor};`)}>${escapeHtml(content.companyName)}</div>
      <div ${attribute('style', `padding-top: 6px; font-size: 12px; line-height: 18px; color: ${content.textColor};`)}>${escapeHtml(content.address)}</div>
      <div ${attribute('style', 'padding-top: 10px; font-size: 12px; line-height: 18px;')}>
        <a ${attribute('href', content.unsubscribeUrl)} ${attribute('style', `color: ${context.settings.linkColor}; text-decoration: underline;`)}>Отписаться от рассылки</a>
      </div>
    </td>
  </tr>`;
};

const renderBlock = (block: EmailBlock, context: RenderContext): string => {
  switch (block.type) {
    case 'header':
      return renderHeader(block, context);
    case 'hero':
      return renderHero(block, context);
    case 'text':
      return renderText(block, context);
    case 'button':
      return renderButton(block, context);
    case 'productCard':
      return renderProductCard(block, context);
    case 'footer':
      return renderFooter(block, context);
  }
};

const renderResponsiveStyles = (settings: EmailGlobalSettings): string => `<style type="text/css">
    body { margin: 0; padding: 0; width: 100% !important; background-color: ${settings.backgroundColor}; }
    table { border-collapse: collapse; }
    img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; max-width: 100% !important; height: auto; }
    a { text-decoration: underline; }
    .preheader { display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0; }
    .email-container { width: 100% !important; max-width: ${settings.contentWidth}px !important; }
    .email-container img { max-width: 100% !important; height: auto !important; }
    .block-selected { outline: 2px dashed #D6336C !important; outline-offset: -2px; }
    @media only screen and (max-width: ${settings.contentWidth}px) {
      .email-container { width: 100% !important; }
      .stack-column { display: block !important; width: 100% !important; max-width: 100% !important; }
      .stack-column img { width: 100% !important; max-width: 100% !important; height: auto !important; }
      .stack-column-cell { padding-left: 0 !important; padding-right: 0 !important; }
      .fluid-padding { padding-left: 16px !important; padding-right: 16px !important; }
    }
  </style>`;

export const compileEmailToHtml = (state: EmailTemplateState, selectedBlockId: string | null = null): string => {
  const context: RenderContext = { settings: state.globalSettings };
  const blocksHtml = state.blocks
    .map((block) => {
      const blockHtml = renderBlock(block, context);

      if (block.id !== selectedBlockId) {
        return blockHtml;
      }

      return blockHtml.replace('<tr>', '<tr class="block-selected">');
    })
    .join('\n    ');

  return `${EMAIL_DOCTYPE}
<html xmlns="http://www.w3.org/1999/xhtml" lang="ru">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${escapeHtml(state.globalSettings.subject)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a { font-family: ${MSO_FONT_FAMILY} !important; }
  </style>
  <![endif]-->
  ${renderResponsiveStyles(state.globalSettings)}
</head>
<body ${attribute('style', `margin: 0; padding: 0; background-color: ${state.globalSettings.backgroundColor};`)}>
  <div class="preheader" ${attribute('style', 'display: none; max-height: 0; overflow: hidden;')}>${escapeHtml(state.globalSettings.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" ${attribute('bgcolor', state.globalSettings.backgroundColor)} ${attribute('style', `width: 100%; background-color: ${state.globalSettings.backgroundColor};`)}>
    <tr>
      <td align="center" ${attribute('style', 'padding: 24px 12px;')}>
        <table class="email-container" role="presentation" width="${state.globalSettings.contentWidth}" cellpadding="0" cellspacing="0" border="0" ${attribute('bgcolor', state.globalSettings.contentBackgroundColor)} ${attribute('style', `width: 100%; max-width: ${state.globalSettings.contentWidth}px; background-color: ${state.globalSettings.contentBackgroundColor};`)}>
    ${blocksHtml}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};