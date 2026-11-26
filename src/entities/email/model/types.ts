export type EmailBlockType =
  | 'header'
  | 'hero'
  | 'text'
  | 'button'
  | 'productCard'
  | 'footer';

export type EmailTextAlign = 'left' | 'center' | 'right';

export interface HeaderBlockContent {
  title: string;
  subtitle: string;
  logoUrl: string;
  backgroundColor: string;
  textColor: string;
  align: EmailTextAlign;
}

export interface HeroBlockContent {
  imageUrl: string;
  alt: string;
  headline: string;
  subheadline: string;
  backgroundColor: string;
  textColor: string;
  align: EmailTextAlign;
}

export interface TextBlockContent {
  heading: string;
  body: string;
  backgroundColor: string;
  textColor: string;
  align: EmailTextAlign;
}

export interface ButtonBlockContent {
  label: string;
  href: string;
  backgroundColor: string;
  textColor: string;
  align: EmailTextAlign;
  fullWidth: boolean;
}

export interface ProductCardBlockContent {
  imageUrl: string;
  alt: string;
  name: string;
  description: string;
  price: string;
  buttonLabel: string;
  buttonHref: string;
  backgroundColor: string;
  textColor: string;
  align: EmailTextAlign;
}

export interface FooterBlockContent {
  companyName: string;
  address: string;
  unsubscribeUrl: string;
  backgroundColor: string;
  textColor: string;
  align: EmailTextAlign;
}

interface EmailBlockBase<TType extends EmailBlockType, TContent> {
  id: string;
  type: TType;
  content: TContent;
}

export type HeaderBlock = EmailBlockBase<'header', HeaderBlockContent>;
export type HeroBlock = EmailBlockBase<'hero', HeroBlockContent>;
export type TextBlock = EmailBlockBase<'text', TextBlockContent>;
export type ButtonBlock = EmailBlockBase<'button', ButtonBlockContent>;
export type ProductCardBlock = EmailBlockBase<'productCard', ProductCardBlockContent>;
export type FooterBlock = EmailBlockBase<'footer', FooterBlockContent>;

export type EmailBlock =
  | HeaderBlock
  | HeroBlock
  | TextBlock
  | ButtonBlock
  | ProductCardBlock
  | FooterBlock;

export type EmailBlockContent = EmailBlock['content'];

export interface EmailGlobalSettings {
  subject: string;
  preheader: string;
  backgroundColor: string;
  contentBackgroundColor: string;
  fontFamily: string;
  textColor: string;
  linkColor: string;
  contentWidth: number;
}

export interface EmailTemplateState {
  globalSettings: EmailGlobalSettings;
  blocks: EmailBlock[];
  selectedBlockId: string | null;
}

export interface EmailLintIssue {
  id: string;
  severity: 'error' | 'warning';
  blockId: string | null;
  message: string;
}

export type EmailBlockContentByType = {
  header: HeaderBlockContent;
  hero: HeroBlockContent;
  text: TextBlockContent;
  button: ButtonBlockContent;
  productCard: ProductCardBlockContent;
  footer: FooterBlockContent;
};