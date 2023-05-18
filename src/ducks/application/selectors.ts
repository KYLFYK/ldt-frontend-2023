import { RootState } from '../index';

export const useIsInitSelector = (state: RootState) => state.application.isInit;
