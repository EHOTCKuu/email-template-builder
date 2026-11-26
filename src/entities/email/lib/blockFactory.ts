import { PUBLIC_BASE_URL } from '@/shared/config/constants';
import type {
  ButtonBlock,
  EmailBlock,
  EmailBlockContentByType,
  EmailBlockType,
  EmailTextAlign,
  FooterBlock,
  HeaderBlock,
  HeroBlock,
  ProductCardBlock,
  TextBlock,
} from '../model/types';

interface BlockTypeDescriptor<TContent> {
  label: string;
  createContent: () => TContent;
}

const DEFAULT_ALIGN: EmailTextAlign = 'left';

const LOGO_URL = `${PUBLIC_BASE_URL}images/logo.svg`;
const HERO_URL = `${PUBLIC_BASE_URL}images/hero.svg`;
const PRODUCT_URL = `${PUBLIC_BASE_URL}images/product.svg`;

const BLOCK_TYPE_DESCRIPTORS: {
  [TType in EmailBlockType]: BlockTypeDescriptor<EmailBlockContentByType[TType]>;
} = {
  header: {
    label: 'Шапка',
    createContent: () => ({
      title: 'Новый заголовок',
      subtitle: 'Короткое описание под заголовком',
      logoUrl: LOGO_URL,
      backgroundColor: '#263228',
      textColor: '#FFFFFF',
      align: 'center',
    }),
  },
  hero: {
    label: 'Hero-баннер',
    createContent: () => ({
      imageUrl: HERO_URL,
      alt: 'Изображение баннера',
      headline: 'Заголовок баннера',
      subheadline: 'Подзаголовок баннера',
      backgroundColor: '#E6F4E5',
      textColor: '#1D241F',
      align: 'center',
    }),
  },
  text: {
    label: 'Текст',
    createContent: () => ({
      heading: 'Заголовок блока',
      body: 'Текст блока с полезной информацией для получателя.',
      backgroundColor: '#FFFFFF',
      textColor: '#1D241F',
      align: DEFAULT_ALIGN,
    }),
  },
  button: {
    label: 'CTA-кнопка',
    createContent: () => ({
      label: 'Перейти',
      href: 'https://example.com',
      backgroundColor: '#2E6B2B',
      textColor: '#FFFFFF',
      align: 'center',
      fullWidth: false,
    }),
  },
  productCard: {
    label: 'Карточка товара',
    createContent: () => ({
      imageUrl: PRODUCT_URL,
      alt: 'Изображение товара',
      name: 'Название товара',
      description: 'Короткое описание товара.',
      price: '990 ₽',
      buttonLabel: 'Купить',
      buttonHref: 'https://example.com/product',
      backgroundColor: '#FFFFFF',
      textColor: '#1D241F',
      align: DEFAULT_ALIGN,
    }),
  },
  footer: {
    label: 'Подвал',
    createContent: () => ({
      companyName: 'Название компании',
      address: 'Город, улица, дом',
      unsubscribeUrl: 'https://example.com/unsubscribe',
      backgroundColor: '#F2F4F3',
      textColor: '#5A665E',
      align: 'center',
    }),
  },
};

export const BLOCK_TYPE_ORDER: EmailBlockType[] = [
  'header',
  'hero',
  'text',
  'button',
  'productCard',
  'footer',
];

export const getBlockTypeLabel = (type: EmailBlockType): string =>
  BLOCK_TYPE_DESCRIPTORS[type].label;

export const createBlockContent = <TType extends EmailBlockType>(
  type: TType,
): EmailBlockContentByType[TType] => BLOCK_TYPE_DESCRIPTORS[type].createContent();

export const createHeaderBlock = (id: string): HeaderBlock => ({
  id,
  type: 'header',
  content: createBlockContent('header'),
});

export const createHeroBlock = (id: string): HeroBlock => ({
  id,
  type: 'hero',
  content: createBlockContent('hero'),
});

export const createTextBlock = (id: string): TextBlock => ({
  id,
  type: 'text',
  content: createBlockContent('text'),
});

export const createButtonBlock = (id: string): ButtonBlock => ({
  id,
  type: 'button',
  content: createBlockContent('button'),
});

export const createProductCardBlock = (id: string): ProductCardBlock => ({
  id,
  type: 'productCard',
  content: createBlockContent('productCard'),
});

export const createFooterBlock = (id: string): FooterBlock => ({
  id,
  type: 'footer',
  content: createBlockContent('footer'),
});

export const createBlock = (type: EmailBlockType, id: string): EmailBlock => {
  switch (type) {
    case 'header':
      return createHeaderBlock(id);
    case 'hero':
      return createHeroBlock(id);
    case 'text':
      return createTextBlock(id);
    case 'button':
      return createButtonBlock(id);
    case 'productCard':
      return createProductCardBlock(id);
    case 'footer':
      return createFooterBlock(id);
  }
};