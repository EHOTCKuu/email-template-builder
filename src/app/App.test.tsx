import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createAppStore } from '@/app/store';
import { App } from './App';

const renderApp = () => {
  const store = createAppStore();

  return { store, ...render(<Provider store={store}><App /></Provider>) };
};

describe('App', () => {
  it('renders the toolbar heading and the export action', () => {
    const { getByRole } = renderApp();

    expect(getByRole('heading', { name: 'Email Template Builder' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Экспорт HTML' })).toBeInTheDocument();
  });

  it('renders a layer entry for every block of the default template', () => {
    const { getAllByRole } = renderApp();
    const layerEntries = getAllByRole('button').filter((element) =>
      element.getAttribute('aria-pressed') === 'true' ||
      element.getAttribute('aria-pressed') === 'false',
    );

    expect(layerEntries.length).toBeGreaterThanOrEqual(6);
  });

  it('adds a text block through the add block menu', async () => {
    const user = userEvent.setup();
    const { store, getAllByRole } = renderApp();
    const textButton = getAllByRole('button').find((element) => element.textContent === 'Текст');

    expect(textButton).toBeDefined();

    await user.click(textButton as HTMLElement);

    await waitFor(() => {
      expect(store.getState().email.blocks).toHaveLength(7);
    });

    expect(store.getState().email.blocks.at(-1)?.type).toBe('text');
  });

  it('switches the preview viewport with aria-pressed', async () => {
    const user = userEvent.setup();
    const { getByRole } = renderApp();
    const mobileOption = getByRole('button', { name: /Mobile/ });

    expect(mobileOption).toHaveAttribute('aria-pressed', 'false');

    await user.click(mobileOption);

    expect(mobileOption).toHaveAttribute('aria-pressed', 'true');
  });
});