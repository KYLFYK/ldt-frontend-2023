import { createAction } from '@reduxjs/toolkit';

export const setApplicationIsInit = createAction<boolean>('app/set/isInit');
