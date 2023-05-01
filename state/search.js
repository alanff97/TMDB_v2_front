import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = '';

export const setSearchKey = createAction('SET_SEARCH_KEY');

const searchReducer = createReducer(initialState, {
  [setSearchKey]: (state, action) => {
    return action.payload;
  },
});

export default searchReducer;
