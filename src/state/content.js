import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = [];

export const setContent = createAction('SET_CONTENT');

const contentReducer = createReducer(initialState, {
  [setContent]: (state, action) => {
    return action.payload;
  },
});

export default contentReducer;
