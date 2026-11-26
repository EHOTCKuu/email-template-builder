import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createAppStore } from '@/app/store';
import { App } from '@/app/App';

const renderApp = () => {
  const store = createAppStore();

  return { store, ...render(<Provider store={store}><App /></Provider>) };
};

describe('export modal', () => {
  it('opens the modal, shows the lint report and closes on escape', async () => {
    const user = userEvent.setup();
    const { getByRole, queryByRole } = renderApp();

    await user.click(getByRole('button', { name: 'Экспорт HTML' }));

    await waitFor(() => {
      expect(getByRole('dialog', { name: 'Экспорт письма' })).toBeInTheDocument();
    });

    expect(getByRole('tab', { name: 'HTML' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('resets the template to defaults from the modal', async () => {
    const user = userEvent.setup();
    const { store, getByRole } = renderApp();

    await user.click(getByRole('button', { name: 'Экспорт HTML' }));
    await waitFor(() => {
      expect(getByRole('button', { name: 'Сбросить до шаблона' })).toBeInTheDocument();
    });

    await user.click(getByRole('button', { name: 'Сбросить до шаблона' }));

    await waitFor(() => {
      expect(store.getState().email.blocks).toHaveLength(6);
    });
  });
});