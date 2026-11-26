import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createAppStore } from '@/app/store';
import { InspectorPanel } from '@/widgets/inspector-panel';
import { App } from '@/app/App';

const renderApp = () => {
  const store = createAppStore();

  return { store, ...render(<Provider store={store}><App /></Provider>) };
};

describe('block inspector', () => {
  it('renders the form of the selected block', () => {
    const { getByLabelText } = renderApp();

    expect(getByLabelText('Заголовок')).toBeInTheDocument();
  });

  it('updates the selected block content through the form', async () => {
    const user = userEvent.setup();
    const { store, getByLabelText } = renderApp();
    const titleInput = getByLabelText('Заголовок');

    await user.clear(titleInput);
    await user.type(titleInput, 'Новый заголовок');

    await waitFor(() => {
      const headerBlock = store.getState().email.blocks.find((block) => block.id === 'header-default');

      expect(headerBlock?.content).toMatchObject({ title: 'Новый заголовок' });
    });
  });

  it('resets the form when another block gets selected', async () => {
    const user = userEvent.setup();
    const { getByRole, getByLabelText } = renderApp();
    const layerButtons = getByRole('list').querySelectorAll('button[aria-pressed]');
    const textLayerButton = Array.from(layerButtons).find((element) => element.textContent?.includes('Текст'));

    expect(textLayerButton).toBeDefined();

    await user.click(textLayerButton as HTMLElement);

    await waitFor(() => {
      expect(getByLabelText('Заголовок')).toHaveValue('Почему стоит играть');
    });
  });

  it('shows global settings when nothing is selected', () => {
    const store = createAppStore();
    store.dispatch({ type: 'email/selectBlock', payload: null });
    const { getByLabelText } = render(
      <Provider store={store}>
        <InspectorPanel />
      </Provider>,
    );

    expect(getByLabelText('Тема письма')).toBeInTheDocument();
  });
});