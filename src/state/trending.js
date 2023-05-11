import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = [];

export const setTrending = createAction('SET_TRENDING');

const trendingReducer = createReducer(initialState, {
  [setTrending]: (state, action) => {
    return action.payload;
  },
});

export default trendingReducer;
