import { combineReducers } from '@reduxjs/toolkit';
import { emailReducer } from '@/entities/email/model/emailSlice';

export const rootReducer = combineReducers({
  email: emailReducer,
});

export type RootState = ReturnType<typeof rootReducer>;