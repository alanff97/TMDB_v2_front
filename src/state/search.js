import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = false;

export const setSearchKey = createAction('SET_SEARCH_KEY');

const searchReducer = createReducer(initialState, {
  [setSearchKey]: (state, action) => {
    return action.payload;
  },
});

export default searchReducer;
