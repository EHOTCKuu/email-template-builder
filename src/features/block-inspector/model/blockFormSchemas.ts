import type {
  ButtonBlockContent,
  EmailTextAlign,
  FooterBlockContent,
  HeaderBlockContent,
  HeroBlockContent,
  ProductCardBlockContent,
  TextBlockContent,
} from '@/entities/email/model/types';

export const TEXT_ALIGN_OPTIONS: { value: EmailTextAlign; label: string }[] = [
  { value: 'left', label: 'По левому краю' },
  { value: 'center', label: 'По центру' },
  { value: 'right', label: 'По правому краю' },
];

export const HEADER_BLOCK_DEFAULTS: HeaderBlockContent = {
  title: '',
  subtitle: '',
  logoUrl: '',
  backgroundColor: '#263228',
  textColor: '#FFFFFF',
  align: 'center',
};

export const HERO_BLOCK_DEFAULTS: HeroBlockContent = {
  imageUrl: '',
  alt: '',
  headline: '',
  subheadline: '',
  backgroundColor: '#E6F4E5',
  textColor: '#1D241F',
  align: 'center',
};

export const TEXT_BLOCK_DEFAULTS: TextBlockContent = {
  heading: '',
  body: '',
  backgroundColor: '#FFFFFF',
  textColor: '#1D241F',
  align: 'left',
};

export const BUTTON_BLOCK_DEFAULTS: ButtonBlockContent = {
  label: '',
  href: '',
  backgroundColor: '#2E6B2B',
  textColor: '#FFFFFF',
  align: 'center',
  fullWidth: false,
};

export const PRODUCT_CARD_BLOCK_DEFAULTS: ProductCardBlockContent = {
  imageUrl: '',
  alt: '',
  name: '',
  description: '',
  price: '',
  buttonLabel: '',
  buttonHref: '',
  backgroundColor: '#FFFFFF',
  textColor: '#1D241F',
  align: 'left',
};

export const FOOTER_BLOCK_DEFAULTS: FooterBlockContent = {
  companyName: '',
  address: '',
  unsubscribeUrl: '',
  backgroundColor: '#F2F4F3',
  textColor: '#5A665E',
  align: 'center',
};