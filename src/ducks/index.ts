import { applicationReducer, IApplication } from './application/reducer';
import { configureStore, Dispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    application: applicationReducer,
  },
});

export type RootState = {
  application: IApplication;
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => Dispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
