import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const createAppStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

export const store = createAppStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];