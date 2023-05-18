import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setApplicationIsInit } from './actions';

export interface IApplication {
  isInit: boolean;
}

const applicationState: IApplication = {
  isInit: false,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState: applicationState as IApplication,
  reducers: {
    doSomething: (state, { payload }: PayloadAction<boolean>) => {
      state.isInit = payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(setApplicationIsInit, (state, action) => {
      state.isInit = action.payload;
    }),
});

export const { doSomething } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
