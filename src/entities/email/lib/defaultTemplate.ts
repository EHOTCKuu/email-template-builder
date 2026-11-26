import type { EmailTemplateState } from '../model/types';

export const DEFAULT_EMAIL_TEMPLATE: EmailTemplateState = {
  globalSettings: {
    subject: 'Новинки недели в GameStore',
    preheader: 'Скидки до 60% только до воскресенья',
    backgroundColor: '#F2F4F3',
    contentBackgroundColor: '#FFFFFF',
    fontFamily: 'Arial, Helvetica, sans-serif',
    textColor: '#1D241F',
    linkColor: '#2E6B2B',
    contentWidth: 600,
  },
  blocks: [
    {
      id: 'header-default',
      type: 'header',
      content: {
        title: 'GameStore',
        subtitle: 'Игровые новинки и скидки каждую неделю',
        logoUrl: '/images/logo.svg',
        backgroundColor: '#263228',
        textColor: '#FFFFFF',
        align: 'center',
      },
    },
    {
      id: 'hero-default',
      type: 'hero',
      content: {
        imageUrl: '/images/hero.svg',
        alt: 'Обложка новой игры недели',
        headline: 'Новая игра недели',
        subheadline: 'Скидка 60% на старте продаж',
        backgroundColor: '#E6F4E5',
        textColor: '#1D241F',
        align: 'center',
      },
    },
    {
      id: 'text-default',
      type: 'text',
      content: {
        heading: 'Почему стоит играть',
        body: 'Мы отобрали десять проектов с лучшими оценками игроков за последний месяц.',
        backgroundColor: '#FFFFFF',
        textColor: '#1D241F',
        align: 'left',
      },
    },
    {
      id: 'button-default',
      type: 'button',
      content: {
        label: 'Смотреть подборку',
        href: 'https://example.com/games',
        backgroundColor: '#2E6B2B',
        textColor: '#FFFFFF',
        align: 'center',
        fullWidth: false,
      },
    },
    {
      id: 'product-card-default',
      type: 'productCard',
      content: {
        imageUrl: '/images/product.svg',
        alt: 'Обложка игры Neon Runner',
        name: 'Neon Runner',
        description: 'Динамичный раннер с кооперативом до четырёх игроков.',
        price: '1 490 ₽',
        buttonLabel: 'Купить',
        buttonHref: 'https://example.com/games/neon-runner',
        backgroundColor: '#FFFFFF',
        textColor: '#1D241F',
        align: 'left',
      },
    },
    {
      id: 'footer-default',
      type: 'footer',
      content: {
        companyName: 'GameStore',
        address: 'Москва, ул. Игровая, 15',
        unsubscribeUrl: 'https://example.com/unsubscribe',
        backgroundColor: '#F2F4F3',
        textColor: '#5A665E',
        align: 'center',
      },
    },
  ],
  selectedBlockId: 'header-default',
};